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
                style="
                  width: 250px;
                  height: 250px;
                  border-radius: 25px;
                  object-fit: cover;
                "
              />
            </div>
          </div>
          <div class="row py-7">
            <div
              class="col-lg-7 col-md-7 z-index-2 position-relative px-md-2 px-sm-5 mx-auto"
            >
              <div
                class="d-flex justify-content-between align-items-center mb-2">
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
                <p class="text-dark">Work Time <span class="text-danger font-weight-bold" style="font-size: 15px;">9:00 - 17:00</span> </p>
                <p class="text-dark"><span class="text-success font-weight-bold" style="font-size: 15px;">{{doctor.category}}</span> <span class="text-success">{{ doctor.price }} DH</span></p>
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

    <div class="container booking" :style="{ display: formVisible ? 'block' : 'none' }">
      <div class="row mb-5">
        <div class="col-md-8 text-center mb-5 w-100">
          <h3 class="text-dark z-index-1 position-relative">
            Let's Make an Appointment
          </h3>
          <p class="text-dark opacity-8 mb-0">
            There’s nothing I really wanted to do in life that I wasn’t able to
            get good at. That’s my skill.
          </p>
        </div>
      </div>
      <form @submit.prevent="submitAppointment">
        <div class="row pad">
          <flat-pickr
            v-model="selectedDateTime"
            :config="dateTimeConfig"
            class="form-control bg-white mb-4"
            placeholder="Select date and time"
          ></flat-pickr>
          <div class="row mb-4 text-start">
            <div class="col-6">
              <div class="form-check radio-group">
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
            <div class="col-6">
              <div class="form-check radio-group">
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
          <PreLoader :loading="loading" :color="loaderColor" :size="loaderSize" class="mb-4"></PreLoader>
          <button type="submit" class="btn btn-success">
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
import PreLoader from '@/components/icons/PreLoader.vue'


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
        price : ""
      },
      loading: false,
      loaderColor: '#6437e0', 
      loaderSize: '10px', 
      formVisible: false,
      selectedType: "local",
      selectedDateTime: "",
      dateTimeConfig: {
        enableTime: true,
        altFormat: "F j, Y h:i K",
        dateFormat: "Y-m-d H:i",
        minDate: "today",
        maxDate: new Date().fp_incr(365),
        disable: [
          function(date) {
            return date.getDay() === 0 || date.getDay() === 6;
          }
        ],
        minTime: "09:00",
        maxTime: "17:00"
      }
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
      this.loading = true;
      const selectedDate = this.selectedDateTime.split(" ")[0];
      const selectedTime = this.selectedDateTime.split(" ")[1];

      const formData = {
        doctor_id: this.doctor.id,
        appointment_date: selectedDate,
        appointment_hour: selectedTime,
        type: this.selectedType,
        user_id: localStorage.getItem("userId"),
      };

      try {
        await api.post("/patient/appointment", formData);
        this.loading = false;
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Appointments successfully",
          timer: 1500,
        });
      } catch (error) {
        this.loading = false;
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.error,
        });
      }
    },
  },
  components: {
    FlatPickr,
    PreLoader,
  },
};
</script>

<style>
.radio-group label{
  min-width: 100px;
  min-height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: 10px;
  border: 1px solid rgb(94, 114, 228);
}

.radio-group input:checked + .form-check-label{
  background-color: rgb(94, 114, 228);
  color: white;
  font-weight: 600;
}

.radio-group input{
  display: none;
}
.booking{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.pad{
  padding: 0px 30%;
}

</style>
