import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../src/views/Home.vue";
import Appointments from "../src/views/Appointments.vue";
import Login from "../src/views/Login.vue";
import Signup from "../src/views/Signup.vue";
import List from "../src/views/List.vue";
import ViewOfList from "../src/views/ViewOfList.vue";
import AddUser from "../src/views/AddUser.vue";
import JoinAppointment from "../src/views/JoinAppointment.vue";

Vue.use(VueRouter);

const guard = function (to, from, next) {
  const at = localStorage.getItem("accessToken");
  if (at) {
    next();
  } else {
    window.location.href = "/login";
  }
};
const routes = [
  { path: "/", redirect: { name: "Home" } },
  {
    path: "/home",
    name: "Home",
    component: Home,
    beforeEnter: (to, from, next) => {
      guard(to, from, next);
    },
  },
  {
    path: "/appointments",
    name: "Appointments",
    component: Appointments,
    beforeEnter: (to, from, next) => {
      guard(to, from, next);
    },
  },
  {
    path: "/join-appointment",
    name: "JoinAppointment",
    component: JoinAppointment,
    beforeEnter: (to, from, next) => {
      guard(to, from, next);
    },
  },

  {
    path: "/ViewOfList",
    name: "ViewOfList",
    component: ViewOfList,
  },

  {
    path: "/AddUser",
    name: "AddUser",
    component: AddUser,
  },
  {
    path: "/list",
    name: "List",
    component: List,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
];
// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  mode: "history",
  base: process.env.BASE_URL,
  routes, // short for `routes: routes`
});
export default router;
