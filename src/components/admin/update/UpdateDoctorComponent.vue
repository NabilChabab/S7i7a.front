<template>
  <div class="min-height-300 bg-primary position-absolute w-100"></div>
  <SideNav :links="navigationLinks" style="z-index: 999" />
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
                      :src="previewImage || doctor.profile"
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
                      v-model="doctor.name"
                      value="{{ doctor.name }}"
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
          active: "nav-link",
        },
        {
          url: "/admin/doctors",
          text: "Doctors",
          iconClass:
            "bx bx-plus-medical calendar-grid-58 text-warning text-sm opacity-10",
          active: "nav-link active",
        },
        {
          url: "/doctors",
          text: "Patients",
          iconClass: "bx bx-user text-success text-sm opacity-10",
          active: "nav-link ",
        },
        {
          url: "/doctors",
          text: "Appointments",
          iconClass: "bx bx-check-double text-info text-sm opacity-10",
          active: "nav-link ",
        },
        {
          url: "/doctors",
          text: "Articles",
          iconClass: "bx bxs-notepad text-info text-sm opacity-10",
          active: "nav-link ",
        },
        {
          url: "/doctors",
          text: "Payments",
          iconClass: "bx bxs-credit-card text-danger text-sm opacity-10",
          active: "nav-link ",
        },
      ],
      previewImage: "",
      defaultImage: require("@/assets/img/team-1.jpg"),
      errorMessage: "",
      profile: null,
      name: "",
      email: "",
      phone: "",
      cin: "",
      password: "",
      errors: [],
      doctor: null,
    };
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
        this.previewImage = ""; // Clear preview if no file selected
      }
    },
    async addDoctor() {
      try {
        const formData = new FormData();
        formData.append("name", this.name);
        formData.append("email", this.email);
        formData.append("phone", this.phone);
        formData.append("CIN", this.cin);
        formData.append("password", this.password);

        // Ensure profile is included only if a file is selected
        if (this.profile) {
          formData.append("profile", this.profile);
        }

        const response = await api.post("admin/doctors", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        console.log(response.data);

        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Doctor Created Successfully",
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
    async fetchDoctor(doctorId) {
      try {
        const response = await api.get(`/admin/doctors/${doctorId}`);
        this.doctor = response.data;
      } catch (error) {
        console.error(error.message);
        // Handle the error appropriately, e.g., display an error message or redirect
      }
    },
  },
  created() {
    const doctorId = this.$route.params.id; // Assuming the ID is passed as a route parameter
    this.fetchDoctor(doctorId);
  },
  components: {
    NavbarComponent,
    SideNav,
    FooterComponent,
  },
};
</script>

<style>
.cards {
  width: 100%;
  border: none;
  background-color: transparent;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.cards img {
  width: 250px;
  height: 250px;
  border-radius: 30px;
  object-fit: cover;
}

.cards label {
  margin-top: 30px;
  text-align: center;
  height: 40px;
  cursor: pointer;
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 2%;
}

.cards input {
  display: none;
}

.table-responsive {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.form-outline .fullname {
  background-color: rgb(231, 231, 231);
  border: none;
  width: 700px;
  padding: 15px;
  color: black;
}

.form-outline textarea {
  background-color: rgb(231, 231, 231);
  border: none;
  width: 700px;
  padding: 15px;
}
</style>
