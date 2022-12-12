<template>
  <div>
    <table class="table table-bordered border-dark" v-if="users.length">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">speciality</th>
          <th scope="col">Location</th>
          <th scope="col"></th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(doc, index) in users" :key="doc.id">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ doc.name }}</td>
          <td>{{ doc.speciality }}</td>
          <td>{{ doc.location }}</td>
          <td @click="deleteUser(doc.id)">delete</td>
          <td @click="editUser(doc)">edit</td>
        </tr>
      </tbody>
    </table>
    <div v-else>No User present in system</div>
    <br />

    <div>
      <div class="row g-3 table-bordered border-dark">
        <div class="col-md-12">
          <label class="form-label"> Name</label>
          <input type="text" class="form-control" v-model="name" />
        </div>

        <div class="col-12">
          <label for="inputUsername" class="form-label">Address</label>
          <input
            type="text"
            class="form-control"
            id="inputUsername"
            placeholder=" your address"
            v-model="location"
          />
        </div>
        <div class="col-12">
          <label for="inputAddress2" class="form-label">Contact</label>
          <input
            type="text"
            class="form-control"
            id="inputAddress2"
            placeholder="enter"
            v-model="speciality"
          />
        </div>
        <div class="col-12">
          <button @click="add" class="btn btn-primary">
            {{ btnLabel }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.table {
  margin-left: 0;
  margin-top: auto;
}

.row {
  background-color: rgb(248, 248, 244);
}
.form {
  display: flexbox;
}
</style>

<script>
import axios from "axios";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
  props: {
    msg: String,
  },
  computed: {
    btnLabel() {
      return this.mode === "add" ? "Add User" : "update";
    },
  },
  data() {
    return {
      users: [],
      name: "",
      id: "",
      location: "",
      speciality: "",
      mode: "add",
    };
  },
  async mounted() {
    await this.getUsers();
    console.log(this.users);
  },
  methods: {
    async getUsers() {
      const users = await axios.get(
        "https://us-central1-onlinedoctor-beed3.cloudfunctions.net/app/user"
      );
      this.users = users.data;
    },
    async addUsers() {
      if (this.mode === "edit") {
        this.updateUsers();
        return;
      }
      const payload = {
        location: this.location,
        speciality: this.speciality,
        name: this.name,
      };
      const response = await axios.post(
        "https://us-central1-onlinedoctor-beed3.cloudfunctions.net/app/user",
        payload
      );
      console.log(response);
      // After post,  get all doctors again.
      //  This will remove deleted doctor entry from page.
      this.getUsers();
      this.name = "";
      this.speciality = "";
      this.location = "";
    },
    async deleteUsers(id) {
      await axios.delete(
        `https://us-central1-onlinedoctor-beed3.cloudfunctions.net/app/user/${id}`
      );
      // After delete,  get all doctors again.
      //  This will remove deleted doctor entry from page.
      this.getUsers();
    },
    editUsers(doc) {
      this.name = doc.name;
      this.speciality = doc.speciality;
      this.location = doc.location;
      this.id = doc.id;
      this.mode = "edit";
    },
    async updateUsers() {
      const payload = {
        location: this.location,
        speciality: this.speciality,
        name: this.name,
      };
      const response = await axios.put(
        `https://us-central1-onlinedoctor-beed3.cloudfunctions.net/app/user/${this.id}`,
        payload
      );
      console.log(response);
      // After post,  get all doctors again.
      //  This will remove deleted doctor entry from page.
      this.getUsers();
      this.name = "";
      this.speciality = "";
      this.location = "";
      this.mode = "add";
    },
  },
};
</script>