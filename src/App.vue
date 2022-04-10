<template>
  <div class="d-flex flex-row">
    <div
      class="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark"
      style="width: 280px"
    >
      <div>
        <a
          href="/"
          class="
            d-flex
            align-items-center
            mb-3 mb-md-0
            me-md-auto
            text-white text-decoration-none
          "
        >
          <svg class="bi me-2" width="40" height="32">
            <use xlink:href="#bootstrap" />
          </svg>
          <span class="fs-4">Sidebar</span>
        </a>
        <hr />
        <ul class="nav nav-pills flex-column mb-auto">
          <li class="nav-item">
            <router-link to="/home" class="nav-link text-white"
              >Admin</router-link
            >
          </li>

          <li>
            <router-link to="/appointments" class="nav-link text-white"
              >Doctors</router-link
            >
          </li>
          <li>
            <router-link to="/List" class="nav-link text-white"
              >Appointments</router-link
            >
          </li>
        </ul>
        <hr />
        <div class="dropdown">
          <a
            href="#"
            class="
              d-flex
              align-items-center
              text-white text-decoration-none
              dropdown-toggle
            "
            id="dropdownUser1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src="https://github.com/mdo.png"
              alt=""
              width="32"
              height="32"
              class="rounded-circle me-2"
            />
            <strong>mdo</strong>
          </a>
          <ul
            class="dropdown-menu dropdown-menu-dark text-small shadow"
            aria-labelledby="dropdownUser1"
          >
            <li><a class="dropdown-item" href="#">New project...</a></li>
            <li><a class="dropdown-item" href="#">Settings</a></li>
            <li><a class="dropdown-item" href="#">Profile</a></li>
            <li><hr class="dropdown-divider" /></li>
            <li><a class="dropdown-item" href="#">Sign out</a></li>
          </ul>

          <!-- route outlet -->
          <!-- component matched by the route will render here -->
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { SidebarMenu } from "vue-sidebar-menu";
export default {
  name: "App",
  data() {
    return {};
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
