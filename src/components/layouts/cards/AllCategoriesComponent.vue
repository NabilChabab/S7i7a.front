<template>
  <div class="col-lg-6 mb-lg-0 mb-4">
    <div class="card">
      <div class="card-header pb-0 p-3 mb-3">
        <div class="d-flex justify-content-between align-items-center">
          <h6 class="mb-2">Latest Patients</h6>
          <a
            href="#"
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#addCatModal"
            >Add Category</a
          >
        </div>
      </div>

      <div
        class="modal fade"
        id="addCatModal"
        tabindex="-1"
        aria-labelledby="forgotPasswordModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content bg-glass">
            <div class="modal-header">
              <h5 class="modal-title" id="forgotPasswordModalLabel">
                Add a new Category
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="addCategory">
                <div class="cards">
                  <img
                    :src="previewImage || defaultImage"
                    id="image"
                    alt="Preview Image"
                  />
                  <label for="input-file">Category Icon</label>
                  <p class="fname-error text-danger">{{ errorMessage }}</p>
                  <input
                    type="file"
                    accept="image/jpg, image/png, image/jpeg"
                    name="icon"
                    style="background-color: transparent"
                    id="input-file"
                    @change="handleImageChange"
                  />
                </div>
                <div class="mb-3 form-outline">
                  <input
                    type="text"
                    class="form-control form-control-lg"
                    placeholder="Category Name"
                    aria-describedby="emailHelp"
                    v-model="name"
                  />
                  <span class="text-danger"></span>
                </div>

                <div v-if="loading" class="text-center">
                  <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                </div>
                <div class="text-center">
                  <button
                    type="submit"
                    class="btn btn-lg btn-primary btn-lg w-100 mt-3 mb-3"
                    :disabled="loading"
                  >
                    Create New
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

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
                Updated_at
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
            <tr v-for="categories in allCategories" :key="categories.id">
              <td>
                <div class="d-flex px-2 py-1">
                  <div>
                    <img
                      :src="categories.icon"
                      class="avatar avatar-sm me-3"
                      alt="user1"
                    />
                  </div>
                  <div class="d-flex flex-column justify-content-center">
                    <h6 class="mb-0 text-sm">{{ categories.name }}</h6>
                    <p class="text-xs text-secondary mb-0">test</p>
                  </div>
                </div>
              </td>
              <td>
                <p class="text-xs text-secondary mb-0">
                  {{ getFormattedDate(categories.created_at) }}
                </p>
              </td>
              <td class="align-middle text-center text-sm">
                <span class="text-secondary text-xs font-weight-bold">{{
                  getFormattedDate(categories.updated_at)
                }}</span>
              </td>

              <td class="align-middle text-center">
                <a
                  class="text-primary font-weight-bold text-xs me-4"
                  style="
                    background-color: transparent;
                    border: none;
                    cursor: pointer;
                  "
                  data-bs-toggle="modal"
                  data-bs-target="#updateCatModal"
                  @click="populateUpdateModal(categories)"
                >
                  Edit
                </a>
                <button
                  class="text-danger font-weight-bold text-xs"
                  data-toggle="tooltip"
                  data-original-title="Edit user"
                  @click="deleteCategory(categories.id)"
                  style="
                    background-color: transparent;
                    border: none;
                    cursor: pointer;
                  "
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div
          class="modal fade"
          id="updateCatModal"
          tabindex="-1"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content bg-glass">
              <div class="modal-header">
                <h5 class="modal-title" id="forgotPasswordModalLabel">
                  Update Category
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <form @submit.prevent="updateCategory">
                  <div class="cards">
                    <img
                      :src="previewImage || defaultImage"
                      id="image"
                      alt="Preview Image"
                    />
                    <label for="input-file">Category Icon</label>
                    <p class="fname-error text-danger">{{ errorMessage }}</p>
                    <input
                      type="file"
                      accept="image/jpg, image/png, image/jpeg"
                      name="icon"
                      style="background-color: transparent"
                      id="input-file"
                      @change="handleImageChange"
                    />
                  </div>
                  <div class="mb-3 form-outline">
                    <input
                      type="text"
                      class="form-control form-control-lg"
                      placeholder="Category Name"
                      aria-describedby="emailHelp"
                      v-model="selectedCategory.name"
                    />
                    <span class="text-danger"></span>
                  </div>

                  <input type="hidden" name="_method" value="PATCH" />

                  <div v-if="loading" class="text-center">
                    <div class="spinner-border" role="status">
                      <span class="visually-hidden">Loading...</span>
                    </div>
                  </div>
                  <div class="text-center">
                    <button
                      type="submit"
                      class="btn btn-lg btn-primary btn-lg w-100 mt-3 mb-3"
                      :disabled="loading"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/services/api";
import Swal from "sweetalert2";
import moment from "moment";
import "moment-timezone";

export default {
  name: "AllCategoriesComponent",
  data() {
    return {
      allCategories: [],
      isLoading: true,
      previewImage: "",
      defaultImage: require("@/assets/img/avatar.png"),
      errorMessage: "",
      icon: null,
      selectedCategory: {},
    };
  },

  created() {
    this.getCategories();
  },

  methods: {
    populateUpdateModal(category) {
      this.selectedCategory = Object.assign({}, category);
      this.previewImage = category.icon;
      this.errorMessage = "";
    },
    async updateCategory() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token not found in local storage");
        }
        
        const response = await fetch(
          "http://127.0.0.1:8000/api/admin/categories/" +
            this.selectedCategory.id,
          {
            method: "PATCH",
            body: JSON.stringify(this.selectedCategory),
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update category");
        }

        const responseData = await response.json();

        this.loading = false;
        console.log(responseData);

        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Category Updated successfully!",
        });
      } catch (error) {
        console.error("Error updating category:", error);
        this.loading = false;

        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to update Category",
        });
      }
    },

    getFormattedDate(date) {
      return moment(date).fromNow();
    },
    async getCategories() {
      try {
        const response = await api.get("/admin/categories");
        this.allCategories = response.data.categories;
        console.log(response.data);
        this.isLoading = false;
      } catch (error) {
        console.log(error);
      }
    },

    async addCategory() {
      try {
        const formData = new FormData();
        formData.append("name", this.name);
        formData.append("icon", this.icon);

        const response = await api.post("/admin/categories", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        this.allCategories.push(response.data.category);
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Category Added successfully!",
        });
        this.$router.push("/admin/categories");
      } catch (error) {
        this.errorMessage = error.response.data.message;
      }
    },

    async deleteCategory(categoryId) {
      try {
        await api.delete(`admin/categories/${categoryId}`);
        this.getCategories();
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Category deleted successfully!",
        });
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to delete Category",
        });
      }
    },
    handleImageChange(event) {
      this.icon = event.target.files[0]; // Store the selected file
      if (this.icon) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.previewImage = e.target.result;
        };
        reader.readAsDataURL(this.icon);
      } else {
        this.previewImage = ""; // Clear preview if no file selected
      }
    },
  },
};
</script>

<style>
#image {
  width: 150px;
  height: 150px;
  object-fit: cover;
}
</style>
