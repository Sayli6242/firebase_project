<template>
  <!-- to do appointment list  -->
  <div class="tbl">
    <b-table striped hover :items="items">
      <button>Accept</button>
    </b-table>
  </div>
</template>



<style>
.tbl {
  width: 100%;
}
</style>


<script>
import { ButtonPlugin } from "bootstrap-vue";
import Home from "./Home.vue";
export default {
  data() {
    return {
      items: [
        {
          patient_name: "John Doe ",
          Appointment_date: " 02/05/2022",
          Paid_Amount: "750",
          Status: "",
        },
        {
          patient_name: "colvin KLain ",
          Appointment_date: " 02/05/2022",
          Paid_Amount: "750",
          Status: " ",
        },
        {
          patient_name: "JUstin bieber ",
          Appointment_date: " 02/05/2022",
          Paid_Amount: "750",
          Status: " ",
        },
        {
          patient_name: "Selena gomez ",
          Appointment_date: " 02/05/2022",
          Paid_Amount: "750",
          Status: " ",
        },
        {},
      ],
    };
  },

  components: { Home },
};
</script>