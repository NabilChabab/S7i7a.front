<template>
  <div class="card bg-dark">
    <div class="card-header pb-0 p-3 mb-3 bg-dark">
      <div class="d-flex justify-content-between align-items-center">
        <h6 class="mb-2 text-white">Online Prescriptions</h6>

      </div>
    </div>
    <div class="table-responsive">
      <table class="table align-items-center">
        <thead>
          <tr>
            <th
              class="text-uppercase text-light text-xxs font-weight-bolder opacity-7"
            >
              Patient
            </th>
            <th
              class="text-center text-uppercase text-light text-xxs font-weight-bolder opacity-7"
            >
              Medication
            </th>

            <th
              class="text-center text-uppercase text-light text-xxs font-weight-bolder opacity-7"
            >
              Dosage
            </th>

            <th
              class="text-center text-uppercase text-light text-xxs font-weight-bolder opacity-7"
            >
              Actions
            </th>
          </tr>
        </thead>

        <div v-if="isLoading">Loading...</div>
        <tbody v-else-if="prescriptions">
          <tr v-for="prescription in prescriptions" :key="prescription.id">
            <td>
              <div class="d-flex px-2 py-1">
                <div>
                  <img
                    :src="
                    prescription.patient_img ||
                      require('@/assets/img/avatar.png')
                    "
                    class="avatar avatar-sm me-3"
                    style="object-fit: cover"
                    alt="user1"
                  />
                </div>
                <div class="d-flex flex-column justify-content-center">
                  <h6 class="mb-0 text-sm text-white">{{ prescription.patient }}</h6>
                  <p class="text-xs text-success mb-0">
                    {{ prescription.patient_phone }}
                  </p>
                </div>
              </div>
            </td>
            <td>
              <div class="px-2 py-1 text-center">
                <p class="text-light text-xs">{{ prescription.medication }}</p>
              </div>
            </td>

            <td>
              <div class="px-2 py-1 text-center">
                <p class="text-light text-xs">{{ prescription.dosage }}</p>
              </div>
            </td>

            <td class="align-middle text-center d-flex justify-content-center gap-3 mt-2">
              <button
                class="text-danger font-weight-bold text-xs"
                data-toggle="tooltip"
                data-original-title="Edit user"
                @click="deletePrescription(prescription.id)"
                style="background-color: transparent; border: none"
              >
                Cancel
              </button>
              <router-link :to="{name : 'show-prescription' , params : {id : prescription.id} }">
                <i class='bx bxs-show cursor-pointer text-success'></i>
              </router-link>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <td class="align-middle text-center">
            <p class="text-xs text-danger mb-0 text-center">
              There is no Online Prescriptions You Created
            </p>
          </td>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import api from "@/services/api";
import "moment-timezone";
export default {
  name: "AllArticlesComponent",
  data() {
    return {
      prescriptions: [],
      isLoading: true,
    };
  },
  created() {
    this.fetchPrescriptions();
  },
  methods: {
    async fetchPrescriptions() {
      try {
        const response = await api.get("/patient/prescriptions");
        this.prescriptions = response.data.prescriptions;
        this.isLoading = false;
      } catch (error) {
        console.log(error);
      }
    },
    async deletePrescription(id) {
      try {
        await api.delete(`/patient/prescriptions/${id}`);
        await this.fetchPrescriptions();
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style></style>
