<template>
  <div class="table-responsive">
    <table class="table align-items-center">
      <thead>
        <tr>
          <th
            class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
          >
            Doctor
          </th>
          <th
            class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
          >
            Qualification
          </th>
          <th
            class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
          >
            Speciality
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
          <tr v-for="doctor in allDocs" :key="doctor.id">
            <td>
              <div class="d-flex px-2 py-1">
                <div>
                  <img
                    :src="doctor.profile"
                    class="avatar avatar-sm me-3"
                    alt="user1"
                  />
                </div>
                <div class="d-flex flex-column justify-content-center">
                  <h6 class="mb-0 text-sm">{{ doctor.name }}</h6>
                  <p class="text-xs text-secondary mb-0">
                    {{ doctor.email }}
                  </p>
                </div>
              </div>
            </td>
            <td>
              <p class="text-xs font-weight-bold mb-0">- - - -  -</p>
              <p class="text-xs text-secondary mb-0">- - - - - - - - - - -</p>
            </td>
            <td class="align-middle text-center text-sm">
              <span class="badge badge-sm bg-gradient-success">Null</span>
            </td>
            <td class="align-middle text-center">
              <span class="text-secondary text-xs font-weight-bold"
                >{{ getFormattedDate(doctor.created_at) }}</span
              >
            </td>
            <td
              class="align-middle text-center"
            >
              <router-link :to="{name : 'edit_doctor', params: { id: doctor.id }}"
                class="text-primary font-weight-bold text-xs me-3"
                data-toggle="tooltip"
                data-original-title="Edit user"
              >
                Edit
              </router-link>
              <button
                class="text-danger font-weight-bold text-xs"
                data-toggle="tooltip"
                data-original-title="Edit user" @click="deleteDoctor(doctor.id)" style="background-color:transparent;border:none">
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
import Swal from "sweetalert2";
import moment from 'moment';
import 'moment-timezone';
export default {
  name: "AllDoctorsComponent",
  data() {
    return {
      allDocs: [],
      isLoading: true
    };
  },
  created(){
    this.fetchDoctors()
  },
  methods: {
    getFormattedDate(date) {
      return moment(date).fromNow(); // Uses relative time formatting
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
        this.isLoading = false
      } catch (error) {
        console.error(error.message);
      }
    },
    async deleteDoctor(doctorId) {
      try {
        await api.delete(`admin/doctors/${doctorId}`);
        this.fetchDoctors()
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Doctor deleted successfully!",
        });
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to delete doctor",
        });
      }
    },

  },
};
</script>
