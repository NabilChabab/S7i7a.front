<template>
  <div class="container-fluid py-4">
    <form @submit.prevent="updateProfileDoctor">
      <input type="hidden" name="_method" value="PATCH" />
      <div class="row">
        <div class="col-md-8">
          <div class="card bg-dark">
            <div class="card-header pb-0 bg-dark">
              <div class="d-flex align-items-center">
                <p class="mb-0 text-white">Edit Profile</p>
                <button class="btn btn-primary btn-sm ms-auto">
                  Save Changes
                </button>
              </div>
            </div>
            <div class="card-body">
              <p class="text-uppercase text-sm">Price Section</p>
              <div class="row">
                <div class="col-md-12">
                  <div class="form-group">
                    <label for="example-text-input" class="form-control-label"
                      >Price ( DH )</label
                    >
                    <input
                      class="form-control text-white bg-secondary border-dark"
                      type="text"
                      placeholder="250.00 DH"
                      v-model="doctor.price"
                    />
                  </div>
                </div>
              </div>
              <p class="text-uppercase text-sm">User Information</p>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="example-text-input" class="form-control-label"
                      >Username</label
                    >
                    <input
                      class="form-control  text-white bg-secondary border-dark"
                      type="text"
                      v-model="doctor.name"
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="example-text-input" class="form-control-label"
                      >Email address</label
                    >
                    <input
                      class="form-control text-white bg-secondary border-dark"
                      type="email"
                      v-model="doctor.email"
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
                      class="form-control text-white bg-secondary border-dark"
                      type="text"
                      v-model="doctor.phone"
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="example-text-input" class="form-control-label"
                      >Address</label
                    >
                    <input
                      class="form-control text-white bg-secondary border-dark"
                      type="text"
                      placeholder="Morocco Casablanca 04 25"
                      v-model="doctor.address"
                    />
                  </div>
                </div>
              </div>
              <hr class="horizontal dark" />
              <p class="text-uppercase text-sm">About me</p>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="example-text-input" class="form-control-label"
                      >Experience</label
                    >
                    <input
                      class="form-control text-white bg-secondary border-dark"
                      type="text"
                      placeholder="Enter Your Experience"
                      v-model="doctor.experience"
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="example-text-input" class="form-control-label"
                      >Qualification</label
                    >
                    <input
                      class="form-control text-white bg-secondary border-dark"
                      type="text"
                      placeholder="Enter Your Qualification"
                      v-model="doctor.qualification"
                    />
                  </div>
                </div>
                <div class="col-md-12">
                  <div
                    class="form-group"
                    :class="{ error: errors.description }"
                  >
                    <label for="example-text-input" class="form-control-label"
                      >Description</label
                    >
                    <input
                      class="form-control text-white bg-secondary border-dark"
                      type="text"
                      placeholder="Enter Your Description"
                      v-model="doctor.description"
                    />
                    <span v-if="errors.description" class="text-danger">{{
                      errors.description
                    }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card card-profile bg-dark">
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
                      :src="previewImage || doctor.profile"
                      class="rounded-circle img-fluid border border-2 border-white"
                    />
                  </a>
                </div>
              </div>
            </div>
            <div
              class="card-header text-center border-0 pt-0 pt-lg-2 pb-4 pb-lg-3 bg-dark"
            >
              <div class="d-flex justify-content-center">
                <label
                  for="input-file"
                  class="btn btn-sm btn-primary float-right mb-0 d-none d-lg-block mt-3"
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
                <h5 class="text-white">
                  {{ doctor.name }}<span class="font-weight-light text-white"></span>
                </h5>
                <div class="h6 font-weight-300 text-white">
                  <i class="ni location_pin mr-2 text-light"></i>{{ doctor.email }}
                </div>
                <div class="h6 mt-4 text-white">
                  <i class="ni business_briefcase-24 mr-2 "></i>Doctor At -
                  S7I7A.ma
                </div>
                <div>
                  <i class="ni education_hat mr-2"></i>{{ doctor.phone }}
                </div>
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
import store from "@/store/index";
export default {
  name: "AdminProfile",

  data() {
    return {
      previewImage: "",
      defaultImage: require("@/assets/img/avatar.png"),
      errorMessage: "",
      profile: null,
      errors: {
        name: "",
        email: "",
        phone: "",
        address: "",
        experience: "",
        qualification: "",
        description: "",
      },
      doctor: {
        name: "",
        email: "",
        phone: "",
        address: "",
        description: "",
        experience: "",
        qualification: "",
        price: "",
      },
    };
  },
  created() {
    this.fetchDoctorInfos();
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

    async fetchDoctorInfos() {
      try {
        const userData = store.getters.getUser;
        const response = await api.get(`/doctor/home/${userData.userId}`);
        this.doctor = response.data.doctor;
        console.log(this.doctor);
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    },
    async updateProfileDoctor() {
      try {
        const formData = new FormData();
        if (this.profile instanceof File) {
          formData.append("profile", this.profile);
        }
        formData.append("name", this.doctor.name);
        formData.append("email", this.doctor.email);
        formData.append("phone", this.doctor.phone);
        formData.append("address", this.doctor.address);
        formData.append("description", this.doctor.description);
        formData.append("experience", this.doctor.experience);
        formData.append("qualification", this.doctor.qualification);
        formData.append("price", this.doctor.price);
        formData.append("_method", "PATCH");

        const response = await api.post(
          `/doctor/home/${this.doctor.id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        this.doctor = response.data.doctor;
        localStorage.setItem("name", this.doctor.name);
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style>
@import "@/assets/css/form-card.css";
</style>
