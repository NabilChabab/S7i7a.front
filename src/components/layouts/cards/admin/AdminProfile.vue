<template>
  <div class="container-fluid py-4">
    <form @submit.prevent="updateProfileAdmin">
      <input type="hidden" name="_method" value="PATCH">
      <div class="row">
        <div class="col-md-8">
          <div class="card">
            <div class="card-header pb-0">
              <div class="d-flex align-items-center">
                <p class="mb-0">Edit Profile</p>
                <button class="btn btn-primary btn-sm ms-auto">
                  Save Changes
                </button>
              </div>
            </div>
            <div class="card-body">
              <p class="text-uppercase text-sm">User Information</p>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="example-text-input" class="form-control-label"
                      >Username</label
                    >
                    <input
                      class="form-control"
                      type="text"
                      v-model="user.name"
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="example-text-input" class="form-control-label"
                      >Email address</label
                    >
                    <input
                      class="form-control"
                      type="email"
                      v-model="user.email"
                    />
                  </div>
                </div>
              </div>
              <hr class="horizontal dark" />
              <p class="text-uppercase text-sm">Contact Information</p>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="example-text-input" class="form-control-label"
                      >Phone Number</label
                    >
                    <input
                      class="form-control"
                      type="text"
                      v-model="user.phone"
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="example-text-input" class="form-control-label"
                      >Address</label
                    >
                    <input
                      class="form-control"
                      type="text"
                      value="Morocco Casablanca 04 25"
                    />
                  </div>
                </div>
              </div>
              <hr class="horizontal dark" />
              <p class="text-uppercase text-sm">About me</p>
              <div class="row">
                <div class="col-md-12">
                  <div class="form-group">
                    <label for="example-text-input" class="form-control-label"
                      >About me</label
                    >
                    <input
                      class="form-control"
                      type="text"
                      value="A beautiful Dashboard for Bootstrap 5. It is Free and Open Source."
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card card-profile">
            <img
              src="@/assets/img/bg-profile.jpg"
              alt="Image placeholder"
              class="card-img-top"
            />
            <div class="row justify-content-center">
              <div class="col-4 col-lg-4 order-lg-2">
                <div class="mt-n4 mt-lg-n6 mb-4 mb-lg-0">
                  <a href="javascript:;">
                    <img
                      style="width: 150px; height: 150px; object-fit: cover"
                      :src="previewImage || user.profile"
                      class="rounded-circle img-fluid border border-2 border-white"
                    />
                  </a>
                </div>
              </div>
            </div>
            <div
              class="card-header text-center border-0 pt-0 pt-lg-2 pb-4 pb-lg-3"
            >
              <div class="d-flex justify-content-center">
                <label
                  for="input-file"
                  class="btn btn-sm btn-dark float-right mb-0 d-none d-lg-block mt-3"
                  style="cursor: pointer"
                  >Upload image</label
                >
                <p class="fname-error text-danger">{{ errorMessage }}</p>
                <input
                  type="file"
                  accept="image/jpg, image/png, image/jpeg"
                  name="profile"
                  style="background-color: transparent; display: none"
                  id="input-file"
                  @change="handleImageChange"
                />
              </div>
            </div>
            <div class="card-body pt-0">
              <div class="text-center mt-4">
                <h5>{{ user.name }}<span class="font-weight-light"></span></h5>
                <div class="h6 font-weight-300">
                  <i class="ni location_pin mr-2"></i>{{ user.email }}
                </div>
                <div class="h6 mt-4">
                  <i class="ni business_briefcase-24 mr-2"></i>Admin - S7I7A.ma
                </div>
                <div><i class="ni education_hat mr-2"></i>{{ user.phone }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import api from "@/services/api.js";
import Swal from "sweetalert2";
import store from "@/store/index"
export default {
  name: "AdminProfile",

  data() {
    return {
      previewImage: "",
      defaultImage: require("@/assets/img/avatar.png"),
      errorMessage: "",
      profile: null,
      user: {
        name: "",
        email: "",
        phone: "",
        address: "",
        aboutMe: "",
      },
    };
  },
  created() {
    this.fetchAdminInfos();
  },

  methods: {
    handleImageChange(event) {
      this.profile = event.target.files[0];
      if (this.profile) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.previewImage = e.target.result;
        };
        reader.readAsDataURL(this.profile);
      } else {
        this.previewImage = "";
      }
    },

    async fetchAdminInfos() {
      try {
        const userData = store.getters.getUser;
        const response = await api.get(`/admin/dashboard/${userData.userId}`);
        this.user = response.data.user;
        console.log(this.user);
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    },
    async updateProfileAdmin() {
      if (this.isLoading) return;

      this.isLoading = true;
      this.errorMessage = "";

      try {
        const formData = new FormData();
        formData.append("name", this.user.name);
        formData.append("email", this.user.email);
        formData.append("phone", this.user.phone);
        formData.append("_method", "PATCH");
        if (this.profile instanceof File) {
          formData.append("profile", this.profile);
        }

        const response = await api.post(
      `/admin/profile/${this.user.id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
        this.user = response.data.user;
        localStorage.setItem("name", this.user.name)
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Profile Updated Successfully",
          timer: 1500
        });
        this.$router.push("/admin/profile");
      } catch (error) {
        console.error("Error updating user:", error);
        if (error.response) {
          this.errorMessage =
            error.response.data.message ||
            "An error occurred while updating the user.";
        } else {
          this.errorMessage = "An error occurred while updating the user.";
        }
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style>
@import "@/assets/css/form-card.css";
</style>
