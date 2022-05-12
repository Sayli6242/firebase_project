<template>
  <div>
    <h2>1. Start your Webcam</h2>
    <div class="videos">
      <span>
        <h3>Local Stream</h3>
        <video ref="webcamVideo" autoplay playsinline></video>
      </span>
      <span>
        <h3>Remote Stream</h3>
        <video ref="remoteVideo" autoplay playsinline></video>
      </span>
    </div>

    <button ref="webcamButton" @click="webcamButtonClick">Start webcam</button>
    <h2>2. Create a new Call</h2>
    <button ref="callButton" disabled @click="callButtonClick">
      Create Call (offer)
    </button>

    <h2>3. Join a Call</h2>
    <p>Answer the call from a different browser window or device</p>

    <input ref="callInput" />
    <button ref="answerButton" disabled @click="answerClick">Answer</button>

    <h2>4. Hangup</h2>

    <button ref="hangupButton" disabled>Hangup</button>
  </div>
</template>

<script>
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const servers = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
  ],
  iceCandidatePoolSize: 10,
};

const pc = new RTCPeerConnection(servers);

export default {
  name: "JoinAppointment",

  data() {
    return {
      localStream: null,
      remoteStream: null,
    };
  },

  methods: {
    async webcamButtonClick() {
      this.localStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      this.remoteStream = new MediaStream();

      // Push tracks from local stream to peer connection
      this.localStream.getTracks().forEach((track) => {
        pc.addTrack(track, this.localStream);
      });

      // Pull tracks from remote stream, add to video stream
      pc.ontrack = (event) => {
        event.streams[0].getTracks().forEach((track) => {
          this.remoteStream.addTrack(track);
        });
      };

      this.$refs.webcamVideo.srcObject = this.localStream;
      this.$refs.remoteVideo.srcObject = this.remoteStream;

      this.$refs.callButton.disabled = false;
      this.$refs.answerButton.disabled = false;
      this.$refs.webcamButton.disabled = true;
    },
    async callButtonClick() {
      // Reference Firestore collections for signaling
      const callDoc = firebase.firestore().collection("calls").doc();
      const offerCandidates = callDoc.collection("offerCandidates");
      const answerCandidates = callDoc.collection("answerCandidates");

      this.$refs.callInput.value = callDoc.id;

      // Get candidates for caller, save to db
      pc.onicecandidate = (event) => {
        event.candidate && offerCandidates.add(event.candidate.toJSON());
      };

      // Create offer
      const offerDescription = await pc.createOffer();
      await pc.setLocalDescription(offerDescription);

      const offer = {
        sdp: offerDescription.sdp,
        type: offerDescription.type,
      };

      await callDoc.set({ offer });

      // Listen for remote answer
      callDoc.onSnapshot((snapshot) => {
        const data = snapshot.data();
        if (!pc.currentRemoteDescription && data?.answer) {
          const answerDescription = new RTCSessionDescription(data.answer);
          pc.setRemoteDescription(answerDescription);
        }
      });

      // When answered, add candidate to peer connection
      answerCandidates.onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            const candidate = new RTCIceCandidate(change.doc.data());
            pc.addIceCandidate(candidate);
          }
        });
      });

      this.$refs.hangupButton.disabled = false;
    },
    async answerClick() {
      const callId = this.$refs.callInput.value;
      const callDoc = firebase.firestore().collection("calls").doc(callId);
      const answerCandidates = callDoc.collection("answerCandidates");
      const offerCandidates = callDoc.collection("offerCandidates");

      pc.onicecandidate = (event) => {
        event.candidate && answerCandidates.add(event.candidate.toJSON());
      };

      const callData = (await callDoc.get()).data();

      const offerDescription = callData.offer;
      await pc.setRemoteDescription(
        new RTCSessionDescription(offerDescription)
      );

      const answerDescription = await pc.createAnswer();
      await pc.setLocalDescription(answerDescription);

      const answer = {
        type: answerDescription.type,
        sdp: answerDescription.sdp,
      };

      await callDoc.update({ answer });

      offerCandidates.onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          console.log(change);
          if (change.type === "added") {
            let data = change.doc.data();
            pc.addIceCandidate(new RTCIceCandidate(data));
          }
        });
      });
    },
  },
};
</script>
