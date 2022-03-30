<template>
  <div>
    <table class="table table-bordered border-dark">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Speciality</th>
          <th scope="col">Location</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(doc, index) in doctors" :key="doc.id">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ doc.Name }}</td>
          <td>{{ doc.Speciality }}</td>
          <td>{{ doc.location }}</td>
        </tr>
      </tbody>
    </table>
    <br />

    <div>
      <form class="row g-3 table-bordered border-dark">
        <div class="col-md-6">
          <label for="inputName" class="form-label">First Name</label>
          <input
            type="text"
            class="form-control"
            id="inputEmail4"
            v-model="name"
          />
        </div>
        <div class="col-md-6">
          <label for="inputLastname" class="form-label">Last Name </label>
          <input
            type="text"
            class="form-control"
            id="inputPassword4"
            v-model="lastName"
          />
        </div>
        <div class="col-12">
          <label for="inputUsername" class="form-label">Username</label>
          <input
            type="text"
            class="form-control"
            id="inputAddress"
            placeholder=" enter username"
            v-model="Username"
          />
        </div>
        <div class="col-12">
          <label for="inputAddress2" class="form-label">Email</label>
          <input
            type="text"
            class="form-control"
            id="inputAddress2"
            placeholder="enter"
            v-model="Email"
          />
        </div>
        <div class="col-12">
          <button @click="addDoctors" type="submit" class="btn btn-primary">
            Add Doctor
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
    


<style>
.table {
  margin-left: 0;
  margin-top: auto;
}

.row {
  background-color: rgb(193, 137, 245);
}
.form {
  display: flexbox;
}
</style>
  
<script>
import axios from "axios";

export default {
  name: "Home",
  props: {
    msg: String,
  },
  data() {
    return {
      doctors: [],
      name: "",
      lastName: "",
      Username: "",
      Email: "",
    };
  },
  async mounted() {
    await this.getDoctors();
    console.log(this.doctors);
  },
  methods: {
    async getDoctors() {
      let config = {
        Headers: {
          Accept: "application/json",
        },
      };
      const doctors = await axios.get(
        "http://localhost:5000/onlinedoctor-beed3/us-central1/app",

        config
      );
      this.doctors = doctors.data;
    },
    async addDoctors() {
      const data = {
        firstName: this.name,
        lastName: this.lastName,
        Username: this.Username,
        Email: this.Email,
      };
      const response = await axios.post(
        "http://localhost:5000/onlinedoctor-beed3/us-central1/app",
        data
      );
      console.log(response);
    },
  },
};
</script>
