<template>
  <div>
    <h2>Appointment</h2>
    <div class="videos">
      <span>
        <h3>Local Video</h3>
        <video ref="webcamVideo" autoplay playsinline></video>
      </span>
      <span>
        <h3>Remote Video</h3>
        <video ref="remoteVideo" autoplay playsinline></video>
      </span>
    </div>

    <button ref="webcamButton" @click="webcamButtonClick">Start webcam</button>

    <button ref="callButton" disabled @click="callButtonClick">
      Start Consultation
    </button>

    <!-- <input ref="callInput" /> -->
    <button ref="answerButton" disabled @click="answerClick">Answer</button>

    <button ref="hangupButton" disabled @click="navigateHome">End Call</button>
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
        audio: false,
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
      const d = new Date();

      const h =
        d.getFullYear().toString() +
        d.getMonth().toString() +
        d.getDate().toString() +
        d.getHours().toString() +
        d.getMinutes().toString();

      // Reference Firestore collections for signaling
      const callDoc = firebase.firestore().collection("calls").doc(h);
      const offerCandidates = callDoc.collection("offerCandidates");
      const answerCandidates = callDoc.collection("answerCandidates");

      // this.$refs.callInput.value = callDoc.id;

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
      // const callId = this.$refs.callInput.value;
      const d = new Date();

      const h =
        d.getFullYear().toString() +
        d.getMonth().toString() +
        d.getDate().toString() +
        d.getHours().toString() +
        d.getMinutes().toString();

      const callDoc = firebase.firestore().collection("calls").doc(h);
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

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Syne+Mono&display=swap");

body {
  font-family: "Syne Mono", monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 80px 10px;
}

video {
  width: 35vw;
  height: 28vw;
  margin: 1rem;
  background: #2c3e50;
}

.videos {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
