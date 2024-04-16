<template>
  <div class="card-body">
    <form role="form" @submit.prevent="loginUser">
      <div class="mb-3 form-outline" :class="{ error: errors.email }">
        <input
          type="email"
          class="form-control form-control-lg"
          placeholder="Email"
          aria-label="Email"
          aria-describedby="emailHelp"
          v-model="email"
        />
        <span v-if="errors.email" class="text-danger">{{ errors.email }}</span>
      </div>
      <div class="mb-3" :class="{ error: errors.password }">
        <input
          type="password"
          class="form-control form-control-lg"
          placeholder="Password"
          aria-label="Password"
          v-model="password"
        />
        <span v-if="errors.password" class="text-danger">{{
          errors.password
        }}</span>
      </div>
      <div class="d-flex align-items-center justify-content-between">
        <div class="form-check form-switch">
          <input class="form-check-input" type="checkbox" id="rememberMe" />
          <label class="form-check-label" for="rememberMe">Remember me</label>
        </div>
        <router-link
          to="#forgotPasswordModal"
          class="btn btn-link text-dark mt-3"
          data-bs-toggle="modal"
          data-bs-target="#forgotPasswordModal"
          >Forgot Password?</router-link
        >
      </div>
      <div v-if="loading_log" class="text-center">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      <div class="text-center">
        <button
          type="submit"
          class="btn btn-lg btn-primary btn-lg w-100 mt-4 mb-0"
          :disabled="loading_log"
        >
          Sign in
        </button>
      </div>
    </form>
  </div>
  <div class="card-footer text-center pt-0 px-lg-2 px-1">
    <p class="mb-4 text-sm mx-auto">
      Don't have an account?
      <router-link
        :to="{ path: '/register' }"
        class="text-dark text-gradient font-weight-bold"
        >Sign up</router-link
      >
    </p>
  </div>
</template>

<script>
import api from "@/services/api";
import Swal from "sweetalert2";
import store from "@/store/index";
export default {
  data() {
    return {
      email: "",
      password: "",
      errors: {},
      forgotPasswordEmail: "",
      forgotPasswordErrors: {},
      loading: false,
      loading_log: false,
    };
  },
  methods: {
    async loginUser() {
      try {
        this.loading_log = true;
        const response = await api.post("/login", {
          email: this.email,
          password: this.password,
        });
        console.log(response.data);
        const { message, redirect, token, ...userData } = response.data;
        localStorage.setItem('userId' , userData.userId)
        localStorage.setItem('doc' , userData.doc)
        localStorage.setItem('role' , userData.role)
        if (
          [
            "Admin login successful",
            "Doctor login successful",
            "Patient login successful",
          ].includes(message)
        ) {
          store.dispatch("loginUser", { token, user: userData });
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Welcome " + response.data.role,
            timer: 1500,
            customClass: {
              popup: "popup",
            },
          });
          this.loading_log = false;
          this.$router.push(redirect);
        } else {
          alert("Unknown role.");
        }
      } catch (error) {
        console.error(error);
        if (
          error.response &&
          error.response.status === 422 &&
          error.response.data.errors
        ) {
          const { message, errors: responseErrors } = error.response.data;
          this.errors.message = message;
          for (const key in responseErrors) {
            this.errors[key] = responseErrors[key][0];
          }
          this.loading_log = false;
        } else {
          alert("Error occurred while logging in.");
        }
      }
    },
  },
};
</script>
