<template>
  <div class="table-responsive">
    <table class="table align-items-center">
      <thead>
        <tr>
          <th
            class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
          >
            Category
          </th>
          <th
            class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
          >
            Created_at
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
        <tr v-for="deletedCat in allCategories" :key="deletedCat.id">
          <td>
            <div class="d-flex px-2 py-1">
              <div>
                <img
                  :src="deletedCat.icon"
                  class="avatar avatar-sm me-3"
                  alt="user1"
                />
              </div>
              <div class="d-flex flex-column justify-content-center">
                <h6 class="mb-0 text-sm">{{ deletedCat.name }}</h6>
                <p class="text-xs text-secondary mb-0">test</p>
              </div>
            </div>
          </td>
          <td>
            <p class="text-xs text-secondary mb-0">
              {{ getFormattedDate(deletedCat.created_at) }}
            </p>
          </td>
          <td class="align-middle text-center text-sm">
            <span class="text-secondary text-xs font-weight-bold">{{
              getFormattedDate(deletedCat.deleted_at)
            }}</span>
          </td>

          <td class="align-middle text-center">
            <button
              class="text-success font-weight-bold text-xs"
              data-toggle="tooltip"
              data-original-title="Edit user"
              @click="restoreCategory(deletedCat.id)"
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
  name: "DeletedCategoriesComponent",
  data() {
    return {
      allCategories: {
        patients: [],
        deletedCat: [],
      },
      isLoading: true,
    };
  },
  created() {
    this.getDeletedCategories();
  },
  methods: {
    getFormattedDate(date) {
      return moment(date).fromNow();
    },
    async getDeletedCategories() {
      try {
        const response = await api.get("/admin/categories");
        this.allCategories = response.data.deletedCat;
        this.isLoading = false;
        console.log(this.allCategories);
      } catch (error) {
        console.log(error);
      }
    },
    async restoreCategory(CatId) {
      try {
        await api.put(`admin/categories/${CatId}/restore`);
        this.getDeletedCategories(); 
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
