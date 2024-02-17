<template>
    <form @submit.prevent="registerUser" class="container">
      <div class="col-lg-6 mb-lg-0 position-relative mt-5">
        <div
          id="radius-shape-1"
          class="position-absolute rounded-circle shadow-5-strong"
        ></div>
        <div
          id="radius-shape-2"
          class="position-absolute shadow-5-strong"
        ></div>

        <div class="card1 bg-glass">
          <div class="card-body px-4 py-5 px-md-5">
            <div class="form-outline mb-4">
              <input
                type="text"
                id="name"
                class="form-control p-2"
                placeholder="FullName"
                aria-describedby="emailHelp"
                v-model="name"
              />
              <span v-if="errors.name" class="text-danger">{{
                errors.name
              }}</span>
            </div>

            <div class="form-outline mb-4">
              <input
                type="email"
                id="email"
                class="form-control p-2"
                placeholder="Email"
                aria-describedby="emailHelp"
                v-model="email"
              />
              <span v-if="errors.email" class="text-danger">{{
                errors.email
              }}</span>
            </div>

            <div class="form-outline mb-4">
              <input
                type="password"
                id="password"
                class="form-control p-2"
                placeholder="Password"
                v-model="password"
              />
              <span v-if="errors.password" class="text-danger">{{
                errors.password
              }}</span>
            </div>

            <div class="form-outline mb-4">
              <input
                type="password"
                id="password"
                class="form-control p-2"
                placeholder="Password"
                v-model="confirmPassword"
              />
              <span v-if="errors.confirmPassword" class="text-danger">{{
                errors.confirmPassword
              }}</span>
            </div>

            <div class="mb-3 form-check">
              <input
                type="checkbox"
                class="form-check-input"
                id="terms"
                v-model="acceptTerms"
              />
              <label class="form-check-label" for="terms"
                >I agree to the terms and conditions</label
              >
              <span v-if="errors.acceptTerms" class="text-danger">{{
                errors.acceptTerms
              }}</span>
            </div>

            <button type="submit"
              class="btn btn-dark btn-block mb-4 col-12 p-2">Register</button>

            <span class="d-flex justify-content-center gap-2"
              >Already have an account
              <router-link :to="{ path: 'login' }"
                >Login</router-link
              ></span
            >

            <!-- Register buttons -->
            <div class="text-center mt-4">
              <button type="button" class="btn btn-link btn-floating mx-1">
                <i class="bx bxl-meta"></i>
              </button>

              <button type="button" class="btn btn-link btn-floating mx-1">
                <i class="bx bxl-google"></i>
              </button>

              <button type="button" class="btn btn-link btn-floating mx-1">
                <i class="bx bxl-linkedin"></i>
              </button>

              <button type="button" class="btn btn-link btn-floating mx-1">
                <i class="bx bxl-github"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
</template>

<script>
import api from "@/services/api";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
      errors: {},
    };
  },
  methods: {
    async registerUser() {
      try {
        const response = await api.post("/register", {
          name: this.name,
          email: this.email,
          password: this.password,
          confirmPassword: this.confirmPassword,
          acceptTerms: this.acceptTerms,
        });
        console.log(response.data);
        Swal.fire({
          icon: "success",
          title: "Success",
          text:
            "Your account has been created successfully! Welcome " + this.name,
        });
        this.$router.push("/login");
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
};
</script>

