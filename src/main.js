import Vue from 'vue'
import App from './App.vue'
import router from './router'
// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/scss/bootstrap.scss'
import { ButtonPlugin, ModalPlugin, CardPlugin } from 'bootstrap-vue'
import VueSidebarMenu from 'vue-sidebar-menu'
import { FormDatepickerPlugin } from 'bootstrap-vue'
import { DropdownPlugin } from 'bootstrap-vue'




Vue.use(DropdownPlugin)
Vue.use(VueSidebarMenu)
Vue.use(ButtonPlugin)
Vue.use(CardPlugin);

Vue.use(ModalPlugin)

Vue.use(FormDatepickerPlugin)

const firebaseConfig = {
  apiKey: "AIzaSyBj_XYZQgKH-9YU6fdivTnNHQAySbDhkiw",
  authDomain: "onlinedoctor-beed3.firebaseapp.com",
  projectId: "onlinedoctor-beed3",
  storageBucket: "onlinedoctor-beed3.appspot.com",
  messagingSenderId: "319467208568",
  appId: "1:319467208568:web:3c8b9dd8395a203edcd28d",
  measurementId: "G-ZYYDE8XF2N"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
