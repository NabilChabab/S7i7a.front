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
            Deleted_at
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
        <tr
          v-for="deleted_patients in allPatients.deleted_patients"
          :key="deleted_patients.id"
        >
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
                <h6 class="mb-0 text-sm">{{ deleted_patients.name }}</h6>
                <p class="text-xs text-secondary mb-0">
                  {{ deleted_patients.email }}
                </p>
              </div>
            </div>
          </td>
          <td>
            <p class="text-xs text-secondary mb-0">
              {{ deleted_patients.phone }}
            </p>
          </td>
          <td class="align-middle text-center text-sm">
            <span class="text-secondary text-xs font-weight-bold">{{
              getFormattedDate(deleted_patients.deleted_at)
            }}</span>
          </td>

          <td class="align-middle text-center">
            <button
              class="text-success font-weight-bold text-xs"
              data-toggle="tooltip"
              data-original-title="Edit user"
              @click="restorePatient(deleted_patients.id)"
              style="background-color: transparent; border: none"
            >
              Restore
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import api from "@/services/api";
import Swal from "sweetalert2";
import moment from "moment";
import "moment-timezone";

export default {
  name: "DeletedPatientsComponent",
  data() {
    return {
      allPatients: {
        patients: [],
        deleted_patients: [],
      },
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
        console.log(this.allPatients);
      } catch (error) {
        console.log(error);
      }
    },
    async restorePatient(patientId) {
      try {
        await api.put(`admin/patients/${patientId}/restore`);
        this.getPatients(); 
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Patient restored successfully!",
        });
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to restore patient",
        });
      }
    },
  },
};
</script>
