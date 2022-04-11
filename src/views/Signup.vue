<template>
  <div class="bg-success p-2 text-white">
    <input type="email" placeholder="Email" v-model="email" />
    <br />
    <input type="password" placeholder="Password" v-model="password" />
    <br />
    <button @click="signup">Signup</button>
    <p>
      <router-link to="/login">back to login</router-link>
    </p>
  </div>
</template>

<script>
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
//const auth = firebase.auth();

export default {
  name: "Signup",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    signup: function () {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(
          (user) => {
            console.log(user.data);

            localStorage.setItem();
          },
          (err) => {
            alert(err);
          }
        );
    },
  },
};
</script>

<style>
.bg-success {
  --bs-bg-opacity: 1;
  background-color: rgba(
    var(--bs-success-rgb),
    var(--bs-bg-opacity)
  ) !important;
}
</style>
