<template>

<div class="container">
    <div class="col-lg-6 mb-lg-0 position-relative mt-5">
      <div
        id="radius-shape-1"
        class="position-absolute rounded-circle shadow-5-strong"
      ></div>
      <div id="radius-shape-2" class="position-absolute shadow-5-strong"></div>

      <div class="card1 bg-glass">
        <div class="card-body px-4 py-5 px-md-5">
          <div class="form-outline mb-4" :class="{ error: errors.email }">
            <input
              type="hidden"
              id="email"
              class="form-control p-2"
              placeholder="Email"
              aria-describedby="emailHelp"
              v-model="email"
            />
            <span v-if="errors.email" class="text-danger d-none">{{
              errors.email
            }}</span>
          </div>

          <div class="form-outline mb-4">
            <input
              type="password"
              id="password"
              class="form-control p-2"
              placeholder="New Password"
              name="password"
              v-model="password"
            />
            <span v-if="errors.password" class="text-danger">{{
              errors.password
            }}</span>
          </div>
          <div class="form-outline mb-4">
            <input
              type="password"
              id="confirmPassword"
              class="form-control p-2"
              placeholder="Confirm Password"
              name="confirmPassword"
              v-model="confirmPassword"
            />
            <span v-if="errors.confirmPassword" class="text-danger">{{
              errors.confirmPassword
            }}</span>
          </div>
          <button
            type="submit"
            class="btn btn-dark btn-block mb-4 col-12 p-2"
            @click="resetPassword"
          >
            Reset Password
          </button>

          <span class="d-flex justify-content-center gap-2"
            >Create a new account
            <router-link :to="{ path: 'register' }">Register</router-link></span
          >

          <!-- Register buttons -->
          <div class="text-center">
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
  </div>
</template>

<script>
import api from "@/services/api";
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
      token: "",
      errors: {}
    };
  },
  mounted() {
    this.email = this.$route.query.email || "";
    this.token = this.$route.query.token || "";
  },
  methods: {
    async resetPassword() {
      try {
        const response = await api.post("/reset-password", {
          email: this.email,
          password: this.password,
          password_confirmation: this.confirmPassword,
          token: this.token,
        });
        if (response.status === 200) {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Password reset link sent successfully! Check Your Email',
          });
          this.$router.push('/login');
        } else {
          alert("Failed to reset password");
        }
      } catch (error) {
        console.error(error);
        if (error.response && error.response.status === 422 && error.response.data.errors) {
          const { message, errors: responseErrors } = error.response.data;
          this.errors.message = message; // Assign the message directly
          for (const key in responseErrors) {
            this.errors[key] = responseErrors[key][0]; // Assign each error to corresponding key
          }
        } else {
          alert("Error occurred while resetting password.");
        }
      }
    },
  },
};
</script>
