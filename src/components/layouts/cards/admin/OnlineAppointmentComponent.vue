<template>
  <div class="table-responsive">
    <table class="table align-items-center">
      <thead>
        <tr>
          <th class="text-uppercase text-light text-xxs font-weight-bolder opacity-7">
            Patient
          </th>
          <th
            class="text-uppercase text-light text-xxs font-weight-bolder opacity-7 ps-2"
          >
            Date
          </th>
          <th class="text-uppercase text-light text-xxs font-weight-bolder opacity-7">
            Time
          </th>
          <th
            class="text-center text-uppercase text-light text-xxs font-weight-bolder opacity-7"
          >
            Status
          </th>
          <th
            class="text-center text-uppercase text-light text-xxs font-weight-bolder opacity-7"
          >
            Type
          </th>

          <th
            class="text-center text-uppercase text-light text-xxs font-weight-bolder opacity-7"
          >
            Actions
          </th>
        </tr>
      </thead>

      <div v-if="isLoading">Loading...</div>
      <tbody v-else-if="appointments">
        <tr v-for="appointment in appointments" :key="appointment.id">
          <td>
            <div class="d-flex px-2 py-1">
              <div>
                <img
                  :src="appointment.patient_img || require('@/assets/img/avatar.png')"
                  class="avatar avatar-sm me-3"
                  style="object-fit: cover"
                  alt="user1"
                />
              </div>
              <div class="d-flex flex-column justify-content-center">
                <h6 class="mb-0 text-sm text-white">{{ appointment.patient }}</h6>
                <p class="text-xs text-success mb-0">
                  {{ appointment.patient_phone }}
                </p>
              </div>
            </div>
          </td>
          <td>
            <p
              class="text-xs text-light mb-0"
              :class="{
                'badge badge-sm bg-gradient-primary text-white text-lowercase': isToday(
                  appointment
                ),
              }"
            >
              {{ isToday(appointment) ? "Today" : appointment.date }}
            </p>
          </td>
          <td>
            <p class="text-xs text-light mb-0">{{ appointment.time }}</p>
          </td>
          <td class="align-middle text-center text-sm">
            <span
              :class="`badge badge-sm ${
                appointment.status === 'pending'
                  ? 'bg-gradient-warning'
                  : appointment.status === 'accepted'
                  ? 'bg-gradient-success'
                  : 'bg-gradient-danger'
              }`"
              >{{ appointment.status }}</span
            >
          </td>
          <td class="align-middle text-center text-sm">
            <span class="badge badge-sm bg-gradient-success" style="width: 60px">{{
              appointment.type
            }}</span>
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
        const response = await api.get("/admin/appointment");
        this.appointments = response.data.online_appointments;
        this.isLoading = false;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteAppointment(id) {
      try {
        await api.delete(`/admin/appointment/${id}`);

        await this.fetchAppointment();
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style></style>
