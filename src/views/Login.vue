<template>
  <div class="bg-success p-2 text-white mx-auto">
    <input type="email" placeholder="Email" v-model="email" />
    <br />
    <input type="password" placeholder="Password" v-model="password" />
    <br />
    <button @click="login">Login</button>

    <p>
      <router-link to="/signup">Need an account?</router-link>
    </p>
  </div>
</template>

<script>
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
//const auth = firebase.auth();

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          (user) => {
            console.log(user.user._delegate.accessToken);
            localStorage.setItem(
              "accessToken",
              user.user._delegate.accessToken
            );
            this.$router.push("/home");
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