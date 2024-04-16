<template>
  <div class="min-height-300 bg-primary position-absolute w-100"></div>
  <SideNav :navigationLinks="navigationLinks" :accountLinks="accountLinks" style="z-index: 999" />
  <main class="main-content position-relative border-radius-lg">
    <!-- Navbar -->
    <NavbarComponent />
    <!-- End Navbar -->
    <div class="container-fluid py-4">
      <div class="row">
        <div class="col-12">
          <form @submit.prevent="addDoctor" enctype="multipart/form-data">
            <div class="card mb-4">
              <div
                class="card-header pb-0 d-flex justify-content-between align-items-center"
              >
                <h6>Add New Doctors</h6>
                <button class="btn btn-primary" type="submit">
                  Add Doctor
                </button>
              </div>
              <div class="card-body px-0 pt-0 pb-2">
                <div class="table-responsive p-0">
                  <div class="cards">
                    <img
                      :src="previewImage || defaultImage"
                      id="image"
                      alt="Preview Image"
                    />
                    <label for="input-file">Upload image</label>
                    <p class="fname-error text-danger">{{ errorMessage }}</p>
                    <input
                      type="file"
                      accept="image/jpg, image/png, image/jpeg"
                      name="profile"
                      style="background-color: transparent"
                      id="input-file"
                      @change="handleImageChange"
                    />
                  </div>
                  <div class="form-outline mb-4">
                    <label for="">FullName</label>
                    <input
                      type="text"
                      id="fullname"
                      class="form-control text-dark fullname"
                      placeholder="Company Name"
                      name="name"
                      v-model="name"
                    />
                    <p class="fname-error text-danger"></p>
                  </div>
                  <div class="form-outline mb-4">
                    <label for="">Email</label>
                    <input
                      type="email"
                      id="fullname"
                      class="form-control text-dark fullname"
                      placeholder="Company Name"
                      name="name"
                      v-model="email"
                    />
                    <p class="fname-error text-danger"></p>
                  </div>
                  <div class="form-outline mb-4">
                    <label for="">Phone Number</label>
                    <input
                      type="text"
                      id="fullname"
                      class="form-control text-dark fullname"
                      placeholder="Phone Number"
                      name="name"
                      v-model="phone"
                    />
                    <p class="fname-error text-danger"></p>
                  </div>

                  <div class="form-outline mb-4">
                    <label for="">CIN</label>
                    <input
                      type="text"
                      id="fullname"
                      class="form-control text-dark fullname"
                      placeholder="CIN"
                      name="name"
                      v-model="cin"
                    />
                    <p class="fname-error text-danger"></p>
                  </div>
                  <div class="form-outline mb-4">
                    <label for="">Category Name</label>
                    <select
                      class="form-control text-dark fullname"
                      name="category"
                      v-model="category_id">
                      <option value="" disabled selected>Select a category</option>
                      <option
                        v-for="category in categories"
                        :key="category.id"
                        :value="category.id"
                      >
                        {{ category.name }}
                      </option>
                    </select>
                    <p class="fname-error text-danger"></p>
                  </div>
                  <div class="form-outline mb-4">
                    <label for="">Password</label>
                    <input
                      type="password"
                      id="fullname"
                      class="form-control text-dark fullname"
                      placeholder="Password"
                      name="name"
                      v-model="password"
                    />
                    <p class="fname-error text-danger"></p>
                  </div>
                  <div class="form-outline mb-4">
                    <label for="">confirmPassword</label>
                    <input
                      type="password"
                      id="fullname"
                      class="form-control text-dark fullname"
                      placeholder="Confirm Password"
                      name="name"
                    />
                    <p class="fname-error text-danger"></p>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <FooterComponent />
    </div>
  </main>
</template>

<script>
import NavbarComponent from "@/components/layouts/bars/Navbar.vue";
import SideNav from "@/components/layouts/bars/Aside.vue";
import FooterComponent from "@/components/layouts/footer/FooterComponent.vue";
import api from "@/services/api";
import Swal from "sweetalert2";
export default {
  data() {
    return {
      navigationLinks: [
        {
          url: "/admin/dashboard",
          text: "Dashboard",
          iconClass: "bx bx-home-alt text-primary text-sm opacity-10",
          active: "nav-link ",
        },
        {
          url: "/admin/doctors",
          text: "Doctors",
          iconClass:
            "bx bx-plus-medical calendar-grid-58 text-warning text-sm opacity-10",
          active: "nav-link active",
        },
        {
          url: "/admin/patients",
          text: "Patients",
          iconClass: "bx bx-user text-success text-sm opacity-10",
          active: "nav-link ",
        },
        {
          url: "/admin/appointments",
          text: "Appointments",
          iconClass: "bx bx-check-double text-info text-sm opacity-10",
          active: "nav-link ",
        },
        {
          url: "/admin/articles",
          text: "Articles",
          iconClass: "bx bxs-notepad text-info text-sm opacity-10",
          active: "nav-link ",
        },
        {
          url: "/admin/payments",
          text: "Payments",
          iconClass: "bx bxs-credit-card text-danger text-sm opacity-10",
          active: "nav-link ",
        },
      ],
      accountLinks: [
        {
          p_url: "/admin/profile",
          p_text: "Profile",
          p_iconClass: "bx bx-user text-success text-sm opacity-10",
          p_active: "nav-link ",
        },
      ],
      previewImage: "",
      defaultImage: require("@/assets/img/avatar.png"),
      errorMessage: "",
      profile: null,
      name: "",
      email: "",
      phone: "",
      cin: "",
      password: "",
      errors: [],
      categories:[]
    };
  },
  created() {
    this.fetchCategories();
  },
  methods: {
    handleImageChange(event) {
      this.profile = event.target.files[0]; // Store the selected file
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
    async fetchCategories() {
      const response = await api.get("/admin/doctors");
      this.categories = response.data.categories;
      console.log(this.categories);
    },
    async addDoctor() {
      try {
        const formData = new FormData();
        formData.append("name", this.name);
        formData.append("email", this.email);
        formData.append("phone", this.phone);
        formData.append("CIN", this.cin);
        formData.append("category_id", this.category_id);
        formData.append("password", this.password);
        

        // Ensure profile is included only if a file is selected
        if (this.profile) {
          formData.append("profile", this.profile);
        }

        const response = await api.post("admin/doctors", formData);

        console.log(response.data);

        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Doctor Created Successfully",
          timer: 1500
        });

        this.$router.push("/admin/doctors");
      } catch (error) {
        console.error(error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.errors
        ) {
          this.errors = error.response.data.errors;
        } else {
          alert("Error occurred while registering user.");
        }
      }
    },
  },
  components: {
    NavbarComponent,
    SideNav,
    FooterComponent,
  },
};
</script>

<style>
@import '@/assets/css/form-card.css';
</style>
