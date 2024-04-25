<template>
  <div class="table-responsive">
    <table class="table align-items-center">
      <thead>
        <tr>
          <th
            class="text-uppercase text-light text-xxs font-weight-bolder opacity-7"
          >
            Doctor
          </th>
          <th
            class="text-uppercase text-light text-xxs font-weight-bolder opacity-7 ps-2"
          >
            Qualification
          </th>
          <th
            class="text-center text-uppercase text-light text-xxs font-weight-bolder opacity-7"
          >
            Speciality
          </th>
          <th
            class="text-center text-uppercase text-light text-xxs font-weight-bolder opacity-7"
          >
            Joined_at
          </th>
          <th
            class="text-center text-uppercase text-light text-xxs font-weight-bolder opacity-7"
          >
            Actions
          </th>
        </tr>
      </thead>

      <div v-if="isLoading">Loading...</div>
      <tbody v-else>
        <tr v-for="doctor in allDocs" :key="doctor.id">
          <td>
            <div class="d-flex px-2 py-1">
              <div>
                <img
                  :src="doctor.profile"
                  class="avatar avatar-sm me-3"
                  alt="user1"
                  style="object-fit: cover"
                />
              </div>
              <div class="d-flex flex-column justify-content-center">
                <h6 class="mb-0 text-sm text-white">{{ doctor.name }}</h6>
                <p class="text-xs text-secondary mb-0 ">
                  {{ doctor.email }}
                </p>
              </div>
            </div>
          </td>
          <td>
            <p class="text-xs text-light mb-0">
              {{ doctor.qualification ?? "- - - - - - - - - - - -" }}
            </p>
          </td>
          <td class="align-middle text-center text-sm">
            <span class="badge badge-sm bg-gradient-success">{{
              doctor.category
            }}</span>
          </td>
          <td class="align-middle text-center">
            <span class="text-light text-xs font-weight-bold">{{
              getFormattedDate(doctor.created_at)
            }}</span>
          </td>
          <td class="align-middle text-center">
            <router-link
              :to="{ name: 'edit_doctor', params: { id: doctor.id } }"
              class="text-primary font-weight-bold text-xs me-3"
              data-toggle="tooltip"
              data-original-title="Edit user"
            >
              Edit
            </router-link>
            <button
              class="text-danger font-weight-bold text-xs"
              data-toggle="tooltip"
              data-original-title="Edit user"
              @click="deleteDoctor(doctor.id)"
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
  name: "AllDoctorsComponent",
  data() {
    return {
      allDocs: [],
      isLoading: true,
      currentPage: 1,
      itemsPerPage: 10,
    };
  },
  created() {
    this.fetchDoctors();
  },
  methods: {
    getFormattedDate(date) {
      return moment(date).fromNow();
    },

    async fetchDoctors() {
      try {
        const response = await api.get("/admin/doctors");
        console.log(response.data.doctors);
        this.allDocs = response.data.doctors.map((doctor) => {
          return {
            ...doctor,
            role: doctor.role.map((role) => role.name),
          };
        });
      } catch (error) {
        console.error(error.message);
      } finally {
        this.isLoading = false;
      }
    },

    async deleteDoctor(doctorId) {
      try {
        await api.delete(`admin/doctors/${doctorId}`);
        this.fetchDoctors();
      } catch (error) {
        console.error(error);
      }
    },
  },
  components: {
  },
};
</script>
