<template>
  <div>
    <table class="table table-bordered border-dark" v-if="doctors.length">
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
        <tr v-for="(doc, index) in doctors" :key="doc.id">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ doc.name }}</td>
          <td>{{ doc.speciality }}</td>
          <td>{{ doc.location }}</td>
          <td @click="deleteDoctor(doc.id)">🔥delete</td>
          <td @click="editDoctor(doc)">✏️edit</td>
        </tr>
      </tbody>
    </table>
    <div v-else>No doctors present in system</div>
    <br />

    <div>
      <div class="row g-3 table-bordered border-dark">
        <div class="col-md-12">
          <label class="form-label"> Name</label>
          <input type="text" class="form-control" v-model="name" />
        </div>

        <div class="col-12">
          <label for="inputUsername" class="form-label">Location</label>
          <input
            type="text"
            class="form-control"
            id="inputUsername"
            placeholder=" enter location"
            v-model="location"
          />
        </div>
        <div class="col-12">
          <label for="inputAddress2" class="form-label">speciality</label>
          <input
            type="text"
            class="form-control"
            id="inputAddress2"
            placeholder="enter"
            v-model="speciality"
          />
        </div>
        <div class="col-12">
          <button @click="addDoctors" class="btn btn-primary">
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
  background-color: rgb(193, 137, 245);
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
      return this.mode === "add" ? "Add Doctor" : "update";
    },
  },
  data() {
    return {
      doctors: [],
      name: "",
      id: "",
      location: "",
      speciality: "",
      mode: "add",
    };
  },
  async mounted() {
    await this.getDoctors();
    console.log(this.doctors);
  },
  methods: {
    async getDoctors() {
      const doctors = await axios.get(
        "http://localhost:5000/onlinedoctor-beed3/us-central1/app"
      );
      this.doctors = doctors.data;
    },
    async addDoctors() {
      if (this.mode === "edit") {
        this.updateDoctor();
        return;
      }
      const payload = {
        location: this.location,
        speciality: this.speciality,
        name: this.name,
      };
      const response = await axios.post(
        "http://localhost:5000/onlinedoctor-beed3/us-central1/app",
        payload
      );
      console.log(response);
      // After post,  get all doctors again.
      //  This will remove deleted doctor entry from page.
      this.getDoctors();
      this.name = "";
      this.speciality = "";
      this.location = "";
    },
    async deleteDoctor(id) {
      await axios.delete(
        `http://localhost:5000/onlinedoctor-beed3/us-central1/app/${id}`
      );
      // After delete,  get all doctors again.
      //  This will remove deleted doctor entry from page.
      this.getDoctors();
    },
    editDoctor(doc) {
      this.name = doc.name;
      this.speciality = doc.speciality;
      this.location = doc.location;
      this.id = doc.id;
      this.mode = "edit";
    },
    async updateDoctor() {
      const payload = {
        location: this.location,
        speciality: this.speciality,
        name: this.name,
      };
      const response = await axios.put(
        "http://localhost:5000/onlinedoctor-beed3/us-central1/app/" + this.id,
        payload
      );
      console.log(response);
      // After post,  get all doctors again.
      //  This will remove deleted doctor entry from page.
      this.getDoctors();
      this.name = "";
      this.speciality = "";
      this.location = "";
      this.mode = "add";
    },
  },
};
</script>