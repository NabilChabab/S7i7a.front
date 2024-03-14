<template>
  <div class="min-height-300 bg-primary position-absolute w-100"></div>
  <SideNav :navigationLinks="navigationLinks" :accountLinks="accountLinks" style="z-index: 999" />

  <main class="main-content position-relative border-radius-lg">
    <NavbarComponent />
    <div class="container-fluid py-4">
      <div class="row">
        <div class="col-12">
          <form @submit.prevent="updateDoctor" enctype="multipart/form-data">
            <input type="hidden" name="_method" value="PATCH" />
            <div class="card mb-4">
              <div
                class="card-header pb-0 d-flex justify-content-between align-items-center"
              >
                <h6>Edit Doctor</h6>
                <button class="btn btn-primary" type="submit">
                  Save Changes
                </button>
              </div>
              <div class="card-body px-0 pt-0 pb-2">
                <div class="table-responsive p-0">
                  <div class="cards">
                    <img
                      v-if="previewImage || doctor.profile"
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
                    <label for="name">Full Name</label>
                    <input
                      v-model="doctor.name"
                      type="text"
                      id="name"
                      class="form-control text-dark fullname"
                      :disabled="isLoading || !doctor"
                    />
                    <p class="fname-error text-danger">
                      {{ errors.name ? errors.name[0] : "" }}
                    </p>
                  </div>
                  <div class="form-outline mb-4">
                    <label for="email">Email</label>
                    <input
                      v-model="doctor.email"
                      type="email"
                      id="email"
                      class="form-control text-dark fullname"
                      :disabled="isLoading"
                    />
                    <p class="fname-error text-danger">
                      {{ errors.email ? errors.email[0] : "" }}
                    </p>
                  </div>
                  <div class="form-outline mb-4">
                    <label for="phone">Phone Number</label>
                    <input
                      v-model="doctor.phone"
                      type="text"
                      id="phone"
                      class="form-control text-dark fullname"
                      placeholder="Phone Number"
                      :disabled="isLoading"
                    />
                    <p class="fname-error text-danger">
                      {{ errors.phone ? errors.phone[0] : "" }}
                    </p>
                  </div>
                  <div class="form-outline mb-4">
                    <label for="cin">CIN</label>
                    <input
                      v-model="doctor.cin"
                      type="text"
                      id="cin"
                      class="form-control text-dark fullname"
                      placeholder="CIN"
                      name="cin"
                      :disabled="isLoading"
                    />
                    <p class="fname-error text-danger">
                      {{ errors.cin ? errors.cin[0] : "" }}
                    </p>
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
      doctor: {
        id: "", // Assuming you have the doctor ID available
        name: "",
        email: "",
        phone: "",
        cin: "",
      },
      previewImage: "",
      defaultImage: require("@/assets/img/team-1.jpg"),
      errors: {},
      isLoading: false, // Added to track loading state
    };
  },
  created() {
    const doctorId = this.$route.params.id;
    this.fetchDoctor(doctorId);
  },
  methods: {
    async fetchDoctor(doctorId) {
      const response = await api.get(`/admin/doctors/${doctorId}`);
      this.doctor = response.data.doctor;
      console.log(this.doctor);
    },
    async updateDoctor() {
      if (this.isLoading) return;

      this.isLoading = true;

      try {
        const formData = new FormData();
        formData.append("name", this.doctor.name);
        formData.append("email", this.doctor.email);
        formData.append("phone", this.doctor.phone);
        formData.append("cin", this.doctor.cin);
        formData.append("_method", "PATCH");
        if (this.profile instanceof File) {
          formData.append("profile", this.profile);
        }

        const response = await api.post(
          `/admin/doctors/${this.doctor.id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        this.doctor = response.data.doctor;
        console.log("Doctor updated successfully!");
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Doctor Updated Successfully",
        });
        this.$router.push("/admin/doctors");
      } catch (error) {
        console.error("Error updating doctor:", error);
        if (error.response) {
          this.errors = error.response.data.errors || {};
        }
      } finally {
        this.isLoading = false;
      }
    },

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
  },
  components: {
    NavbarComponent,
    SideNav,
    FooterComponent,
  },
};
</script>

<style>
@import "@/assets/css/form-card.css";
</style>
