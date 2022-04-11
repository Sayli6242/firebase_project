<template>
  <div class="card mb-3" style="max-width: 700px">
    <!----------- code for one card with modal starts here ------------->
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

    <!------------- use Modal for form preview--------------->
    <b-modal v-model="showModal">
      <b-button class="d-block mx-50">
        <form @submit.prevent>
          <div class="form-group">
            <label for="name">Full Name</label>
            <input class="form-control" id="text" name="name" type="name" />
          </div>
          <div class="form-group">
            <label for="l-password">mobile no</label>
            <input class="form-control" id="number" name="number" type="text" />
          </div>

          <div>
            <label for="example-datepicker">Choose a date</label>
            <b-form-datepicker
              id="example-datepicker"
              v-model="value"
              class="col-sm-right"
            ></b-form-datepicker>
          </div>
          <div>
            <!-- <div>
              <b-dropdown id="dropdown-1" text="Select Time" class="m-md-2">
                <b-dropdown-item>9:00 Am To 9.30 Pm</b-dropdown-item>
                <b-dropdown-item>9:30 Am To 10.00 Pm</b-dropdown-item>
                <b-dropdown-item>10:00 Am To 10.30 Pm</b-dropdown-item>
                <b-dropdown-item>10:30 Am To 11.00 Pm</b-dropdown-item>
                <b-dropdown-item>11:00 Am To 11.30 Pm</b-dropdown-item>
                <b-dropdown-item>11:30 Am To 12.00 Pm</b-dropdown-item>
                <b-dropdown-item>1:00 Am To 1.30 Pm</b-dropdown-item>
                <b-dropdown-item>1:30 Am To 2.00 Pm</b-dropdown-item>
                <b-dropdown-item>2:00 Am To 2.30 Pm</b-dropdown-item>
                <b-dropdown-item>2:30 Am To 3.00 Pm</b-dropdown-item>
                <b-dropdown-item>3:00 Am To 3.30 Pm</b-dropdown-item>
                <b-dropdown-item>3:30 Am To 4.00 Pm</b-dropdown-item>
                <b-dropdown-item>4:00 Am To 4.30 Pm</b-dropdown-item>
                <b-dropdown-item>4:30 Am To 5.00 Pm</b-dropdown-item>
                <b-dropdown-item>5:00 Am To 5.30 Pm</b-dropdown-item>
                <b-dropdown-item>9:00 Am To 9.30 Pm</b-dropdown-item>
              </b-dropdown>
            </div> -->
            <div class="col-md-10">
              <label for="validationCustom04" class="form-label"
                >Select Time</label
              >
              <select class="form-select" id="validationCustom04" required>
                <option selected disabled value="">Select Time</option>
                <option>9:00 Am To 9.30</option>
                <option>9:30 Am To 10.00</option>
                <option>10:00 Am To 10.30 Pm</option>
                <option>10:30 Am To 11.00 Pm</option>
                <option>11:00 Am To 11.30 Pm</option>

                <option>11:30 Am To 12.00 Pm</option>
                <option>1:00 Am To 1.30 Pm</option>
                <option>1:30 Am To 2.00 Pm</option>
                <option>2:00 Am To 2.30 Pm</option>
                <option>2:30 Am To 3.00 Pm</option>
                <option>3:00 Am To 3.30 Pm</option>
                <option>3:30 Am To 4.00 Pm</option>
                <option>4:00 Am To 4.30 Pm</option>
                <option>4:30 Am To 5.00 Pm</option>
                <option>5:00 Am To 5.30 Pm</option>
                <option>9:00 Am To 9.30Pm</option>
              </select>
              <!-- <div class="invalid-feedback">Please select a valid state.</div> -->
            </div>
          </div>
        </form>
        <!-- <form class="row g-3 needs-validation" novalidate>
          <div class="col-md-4">
            <label for="validationCustom01" class="form-label"
              >First name</label
            >
            <input
              type="text"
              class="form-control"
              id="validationCustom01"
              value="Mark"
              required
            />
            <div class="valid-feedback">Looks good!</div>
          </div>
          <div class="col-md-4">
            <label for="validationCustom02" class="form-label">Last name</label>
            <input
              type="text"
              class="form-control"
              id="validationCustom02"
              required
            />
            <div class="valid-feedback">Looks good!</div>
          </div>
          <div class="col-md-4">
            <label for="validationCustomUsername" class="form-label"
              >Username</label
            >
            <div class="input-group has-validation">
              <span class="input-group-text" id="inputGroupPrepend">@</span>
              <input
                type="text"
                class="form-control"
                id="validationCustomUsername"
                aria-describedby="inputGroupPrepend"
                required
              />
              <div class="invalid-feedback">Please choose a username.</div>
            </div>
          </div>
          <div class="col-md-6">
            <label for="validationCustom03" class="form-label">City</label>
            <input
              type="text"
              class="form-control"
              id="validationCustom03"
              required
            />
            <div class="invalid-feedback">Please provide a valid city.</div>
          </div>
          <div class="col-md-3">
            <label for="validationCustom04" class="form-label">State</label>
            <select class="form-select" id="validationCustom04" required>
              <option selected disabled value="">Choose...</option>
              <option>...</option>
            </select>
            <div class="invalid-feedback">Please select a valid state.</div>
          </div>
          <div class="col-md-3">
            <label for="validationCustom05" class="form-label">Zip</label>
            <input
              type="text"
              class="form-control"
              id="validationCustom05"
              required
            />
            <div class="invalid-feedback">Please provide a valid zip.</div>
          </div>
          <div class="col-md-3">
            <label for="validationCustom04" class="form-label">State</label>
            <select class="form-select" id="validationCustom04" required>
              <option selected disabled value="">Choose...</option>
              <option>...</option>
            </select>
            <div class="invalid-feedback">Please select a valid state.</div>
          </div>
          <div class="col-md-3">
            <label for="validationCustom04" class="form-label">State</label>
            <select class="form-select" id="validationCustom04" required>
              <option selected disabled value="">Choose...</option>
              <option>...</option>
            </select>
            <div class="invalid-feedback">Please select a valid state.</div>
          </div>
          <div class="col-12">
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="invalidCheck"
                required
              />
              <label class="form-check-label" for="invalidCheck">
                Agree to terms and conditions
              </label>
              <div class="invalid-feedback">
                You must agree before submitting.
              </div>
            </div>
          </div>

          <div>
            <label for="example-datepicker">Choose a date</label>
            <b-form-datepicker
              id="example-datepicker"
              v-model="value"
              class="mb-2"
            ></b-form-datepicker>
            <p>Value: '{{ value }}'</p>
          </div>

          <div class="col-12">
            <button class="btn btn-primary" type="submit">Submit form</button>
          </div>
        </form> -->
      </b-button>
    </b-modal>
    <!-- one card with modal ends here -->
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
