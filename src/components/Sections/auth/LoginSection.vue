<template>
  <div class="card-body">
    <form role="form" @submit.prevent="loginUser">
      <div class="mb-3 form-outline" :class="{ error: errors.email }">
        <input
          type="email"
          class="form-control form-control-lg bg-secondary border-dark text-white"
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
          class="form-control form-control-lg bg-secondary border-dark text-white"
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
          <label class="form-check-label text-light" for="rememberMe">Remember me</label>
        </div>
        <router-link
          to="#forgotPasswordModal"
          class="btn btn-link text-white mt-3"
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
        class="text-primary font-weight-bold"
        >Sign up</router-link
      >
    </p>
  </div>
</template>

<script>
import api from "@/services/api";
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
        const { message, redirect, token, ...userData } = response.data;
        localStorage.setItem("userId", userData.userId);
        localStorage.setItem("doc", userData.doc);
        localStorage.setItem("role", userData.role);
        if (
          [
            "Admin login successful",
            "Doctor login successful",
            "Patient login successful",
          ].includes(message)
        ) {
          store.dispatch("loginUser", { token, user: userData });
          this.$router.push(redirect);
        } else {
          alert("Unknown role.");
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.loading_log = false;
      }
    },
  },
};
</script>
