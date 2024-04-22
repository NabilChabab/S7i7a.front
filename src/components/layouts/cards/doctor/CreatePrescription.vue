<template>
  <form enctype="multipart/form-data" @submit.prevent="addPrescription">
    <div class="card mb-4">
      <div
        class="card-header pb-0 d-flex justify-content-between align-items-center"
      >
        <h6>Add New Prescription</h6>
        <button class="btn btn-primary" type="submit">Add Prescription</button>
      </div>
      <div class="card-body px-0 pt-0 pb-2">
        <div class="table-responsive p-0">
          <div class="form-outline mb-4">
            <label for="">Medication</label>
            <input
              type="text"
              class="form-control text-dark fullname"
              placeholder="Medication"
              v-model="medication"
            />
          </div>
          <div class="form-outline mb-4">
            <label for="">Dosage</label>
            <textarea
              class="form-control text-dark fullname"
              placeholder="Dosage"
              v-model="dosage"
            />
          </div>
          <div class="form-outline mb-4">
            <label for="">Instructions</label>
            <textarea
              class="form-control text-dark fullname"
              placeholder="Instructions"
              v-model="instructions"
            />
            <p class="fname-error text-danger"></p>
          </div>
          <div class="form-outline mb-4">
            <select
              class="form-control text-dark fullname"
              v-model="appointment_id"
            >
              <option value="" disabled selected>Select a Patient</option>
              <option
                v-for="appointment in appointments"
                :key="appointment.id"
                :value="appointment.id"
              >
                {{ appointment.patient }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import api from "@/services/api";

export default {
  data() {
    return {
      medication: "",
      dosage: "",
      instructions: "",
      appointment_id: "",
      appointments: [],
    };
  },
  created() {
    this.fetchOnlineAppointments();
  },
  methods: {
    async addPrescription() {
      try {
        const formData = new FormData();
        formData.append("medication", this.medication);
        formData.append("dosage", this.dosage);
        formData.append("instructions", this.instructions);
        formData.append("appointment_id", this.appointment_id);
        await api.post("doctor/prescriptions", formData);
        this.medication = "";
        this.dosage = "";
        this.instructions = "";
        this.appointment_id = "";
      } catch (error) {
        console.log(error);
      }
    },
    async fetchOnlineAppointments() {
      try {
        const response = await api.get("/doctor/appointments");
        this.appointments = response.data.online_appointments;
        this.isLoading = false;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
