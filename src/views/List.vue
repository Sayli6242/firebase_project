<template>
  <div class="card mb-3" style="max-width: 700px">
    <div class="card mb-4" style="max-width: 100%">
      <div class="row g-1">
        <div class="row">
          <div class="col-sm-4">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title"></h5>
                <p class="card-text"></p>
                <img
                  src="../assets/img.png"
                  class="img-fluid rounded-start"
                  alt="..."
                />
              </div>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title"></h5>
                <p class="card-text">Dr. JOhn Chancelor</p>
              </div>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title"></h5>
                <p class="card-text"></p>
                <b-button @click="showModal = true" variant="success" size="lg">
                  View Profile </b-button
                ><br />
                <b-button @click="showModal = true" variant="success" size="lg">
                  Schedule</b-button
                ><br />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <br />
    <!-- Reproduction sample (this will work if line 11 in main.js is uncommented) -->
    <!-- use Modal for form preview -->
    <b-modal v-model="showModal">
      <b-button class="d-block mx-auto">
        <form @submit.prevent>
          <div class="form-group">
            <label for="l-email">Email address</label>
            <input
              class="form-control"
              id="l-email"
              name="email"
              type="email"
            />
          </div>
          <div class="form-group">
            <label for="l-password">Password</label>
            <input
              class="form-control"
              id="l-password"
              name="password"
              type="password"
            />
          </div>
          <div>
            <button class="btn btn-danger" type="button" data-dismiss="modal">
              CANCEL
            </button>
            &nbsp;
            <button class="btn btn-success" type="submit">SIGN IN</button>
          </div>
        </form>
      </b-button>
    </b-modal>
  </div>
</template>



<style></style>



<script>
export default {
  name: "List",
  props: {
    msg: String,
  },
  data() {
    return {
      showModal: false,
      showModal2: false,
      message: "Hello World",
    };
  },

  methods: {
    solution2(message) {
      this.$copyText(message, this.$refs.modalBody);
    },
  },
};
</script>
