<template>
  <div class="table-responsive">
    <table class="table align-items-center">
      <thead>
        <tr>
          <th
            class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
          >
            Patient
          </th>
          <th
            class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
          >
            Prescription
          </th>

          <th
            class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
          >
            Actions
          </th>
          <th class="text-secondary opacity-7"></th>
        </tr>
      </thead>

      <div v-if="isLoading">Loading...</div>
      <tbody v-else-if="appointments">
        <tr v-for="appointment in appointments" :key="appointment.id">
          <td>
            <div class="d-flex px-2 py-1">
              <div>
                <img
                  :src="
                    appointment.patient_img ||
                    require('@/assets/img/avatar.png')
                  "
                  class="avatar avatar-sm me-3"
                  style="object-fit: cover"
                  alt="user1"
                />
              </div>
              <div class="d-flex flex-column justify-content-center">
                <h6 class="mb-0 text-sm">{{ appointment.patient }}</h6>
                <p class="text-xs text-success mb-0">
                  {{ appointment.patient_phone }}
                </p>
              </div>
            </div>
          </td>
          <td>
            <div class="d-flex px-2 py-1">
         
            </div>
          </td>

          <td class="align-middle text-center">
            <button
              class="text-danger font-weight-bold text-xs"
              data-toggle="tooltip"
              data-original-title="Edit user"
              @click="deleteAppointment(appointment.id)"
              style="background-color: transparent; border: none"
            >
              Cancel
            </button>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <td class="align-middle text-center">
          <p class="text-xs text-danger mb-0 text-center">
            There is no Online Appointments Associated To You
          </p>
        </td>
      </tbody>
    </table>
  </div>
</template>

<script>
import api from "@/services/api";
import "moment-timezone";
import Swal from "sweetalert2";
export default {
  name: "AllArticlesComponent",
  data() {
    return {
      appointments: [],
      isLoading: true,
    };
  },
  created() {
    this.fetchAppointment();
  },
  computed: {
    isToday() {
      return (appointment) => {
        const today = new Date().toISOString().slice(0, 10);
        return appointment.date === today;
      };
    },
  },
  methods: {
    async fetchAppointment() {
      try {
        const response = await api.get("/doctor/appointments");
        this.appointments = response.data.online_appointments;
        this.isLoading = false;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteAppointment(id) {
      try {
        await api.delete(`/doctor/appointments/${id}`);
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Appointment canceled successfully",
          timer: 1500,
        });
        await this.fetchArticles();
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style></style>
