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
            class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
          >
            Phone
          </th>
          <th
            class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
          >
            Joined_at
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
      <tbody v-else>
        <tr v-for="patient in allPatients.patients" :key="patient.id">
          <td>
            <div class="d-flex px-2 py-1">
              <div>
                <img
                  src="@/assets/img/avatar.png"
                  class="avatar avatar-sm me-3"
                  alt="user1"
                />
              </div>
              <div class="d-flex flex-column justify-content-center">
                <h6 class="mb-0 text-sm">{{ patient.name }}</h6>
                <p class="text-xs text-secondary mb-0">
                  {{ patient.email }}
                </p>
              </div>
            </div>
          </td>
          <td>
            <p class="text-xs text-secondary mb-0">{{ patient.phone }}</p>
          </td>
          <td class="align-middle text-center text-sm">
            <span class="text-secondary text-xs font-weight-bold">{{
              getFormattedDate(patient.created_at)
            }}</span>
          </td>

          <td class="align-middle text-center">
            <button
              class="text-danger font-weight-bold text-xs"
              data-toggle="tooltip"
              data-original-title="Edit user"
              @click="deletePatient(patient.id)"
              style="background-color: transparent; border: none"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import api from "@/services/api";
import moment from "moment";
import "moment-timezone";

export default {
  name: "AllPatientsComponent",
  data() {
    return {
      allPatients: [],
      isLoading: true,
    };
  },

  created() {
    this.getPatients();
  },

  methods: {
    getFormattedDate(date) {
      return moment(date).fromNow();
    },
    async getPatients() {
      try {
        const response = await api.get("/admin/patients");
        this.allPatients = response.data;
        this.isLoading = false;
      } catch (error) {
        console.log(error);
      }
    },

    async deletePatient(patientId) {
      try {
        await api.delete(`admin/patients/${patientId}`);
        this.getPatients();
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
