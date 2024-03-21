<template>
  <section class="py-sm-7 py-5 position-relative">
    <div class="container">
      <div class="row">
        <div class="col-12 mx-auto">
          <div class="mt-n8 mt-md-n9 text-center">
            <div class="blur-shadow-avatar">
              <img
                :src="doctor.profile"
                class="shadow-xl position-relative z-index-2"
                alt="Avatar"
                style="width: 200px; height: 200px; border-radius: 25px"
              />
            </div>
          </div>
          <div class="row py-7">
            <div
              class="col-lg-7 col-md-7 z-index-2 position-relative px-md-2 px-sm-5 mx-auto"
            >
              <div
                class="d-flex justify-content-between align-items-center mb-2"
              >
                <h3 class="mb-0">{{ doctor.name }}</h3>
                <div class="d-block">
                  <a
                    href="#"
                    class="btn"
                    :class="{
                      'btn-primary': !formVisible,
                      'btn-danger': formVisible,
                    }"
                    @click="toggleFormVisibility"
                  >
                    {{ formVisible ? "Cancel choice" : "Consult with me" }}
                  </a>
                </div>
              </div>
              <div class="row mb-4">
                <div class="col-auto">
                  <span class="h6 me-1"
                    ><i class="bx bxs-location-plus"></i
                  ></span>
                  <span class="text-dark">{{ doctor.address }}</span>
                </div>
                <div class="col-auto">
                  <span class="h6 me-1"><i class="bx bxs-graduation"></i></span>
                  <span class="text-dark">{{ doctor.qualification }}</span>
                </div>
              </div>
              <p class="text-lg mb-0 text-dark">
                {{ doctor.description }}
                <a href="javascript:;" class="text-primary icon-move-right mt-5"
                  >{{ doctor.email }}
                  <i class="fas fa-arrow-right text-sm ms-1"></i>
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="container d-flex justify-content-center align-items-center w-25"
    >
      <form
        @submit.prevent="submitAppointment"
        :style="{ display: formVisible ? 'block' : 'none' }"
      >
        <div class="row">
          <label>Date:</label>
          <flat-pickr
            v-model="selectedDate"
            :config="dateConfig"
            class="form-control bg-white mb-4"
            placeholder="Select a date"
          ></flat-pickr>
          <label>Time:</label>
          <flat-pickr
            v-model="selectedTime"
            :config="timeConfig"
            class="form-control bg-white mb-4"
            placeholder="Select a time"
          ></flat-pickr>
          <div class="row mb-4">
            <label>Type:</label>
            <div class="col-4">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  id="onlineType"
                  value="online"
                  v-model="selectedType"
                />
                <label class="form-check-label" for="onlineType">Online</label>
              </div>
            </div>
            <div class="col-4">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  id="localType"
                  value="local"
                  v-model="selectedType"
                />
                <label class="form-check-label" for="localType">Local</label>
              </div>
            </div>
          </div>
          <button type="submit" class="btn btn-primary">
            Make Appointment
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import api from "@/services/api";
import FlatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import Swal from "sweetalert2";
export default {
  data() {
    return {
      doctor: {
        id: "",
        name: "",
        email: "",
        phone: "",
        address: "",
        experience: "",
        description: "",
        profile: "",
        qualification: "",
      },
      formVisible: false,
      selectedType: "local",
      selectedDate: "",
      selectedTime: "",
      dateConfig: {
        enableTime: false,
        altInput: true,
        altFormat: "F j, Y",
        dateFormat: "Y-m-d",
      },
      timeConfig: {
        enableTime: true,
        altFormat: "h:i K",
        dateFormat: "H:i",
      },
    };
  },
  created() {
    const docId = this.$route.params.id;
    this.fetchDoctorById(docId);
  },
  methods: {
    toggleFormVisibility() {
      const token = localStorage.getItem("token");
      if (!token) {
        this.$router.push("/login");
      } else {
        this.formVisible = !this.formVisible;
      }
    },
    async fetchDoctorById(docId) {
      const response = await api.get(`/doctor-details/${docId}`);
      this.doctor = response.data.doctor;
    },
    async submitAppointment() {
      const formData = {
        doctor_id: this.doctor.id,
        appointment_date: this.selectedDate,
        appointment_hour: this.selectedTime,
        type: this.selectedType,
        user_id: localStorage.getItem("userId"),
      };

      try {
        await api.post("/patient/appointment", formData);
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Appointments successfully",
          timer: 1500,
        });
      } catch (error) {
        console.error("Error creating appointment:", error.response.data);
      }
    },
  },
  components: {
    FlatPickr,
  },
};
</script>

<style></style>
