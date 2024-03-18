<template>
  <div class="container position-sticky z-index-sticky top-0">
    <div class="row">
      <div class="col-12">
        <!-- Navbar -->
        <NavbarDefault :sticky="true" />
        <!-- End Navbar -->
      </div>
    </div>
  </div>
  <main class="main-content mt-0">
    <section>
      <div class="page-header min-vh-100">
        <div class="container">
          <div class="row">
            <div
              class="col-xl-4 col-lg-5 col-md-7 d-flex flex-column mx-lg-0 mx-auto"
            >
              <div class="card card-plain">
                <div class="card-header pb-0 text-start">
                  <h4 class="font-weight-bolder">Sign In</h4>
                  <p class="mb-0">Enter your email and password to sign in</p>
                </div>
                <div class="card-body">
                  <form role="form" @submit.prevent="loginUser">
                    <div
                      class="mb-3 form-outline"
                      :class="{ error: errors.email }"
                    >
                      <input
                        type="email"
                        class="form-control form-control-lg"
                        placeholder="Email"
                        aria-label="Email"
                        aria-describedby="emailHelp"
                        v-model="email"
                      />
                      <span v-if="errors.email" class="text-danger">{{
                        errors.email
                      }}</span>
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
                    <div
                      class="d-flex align-items-center justify-content-between"
                    >
                      <div class="form-check form-switch">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="rememberMe"
                        />
                        <label class="form-check-label" for="rememberMe"
                          >Remember me</label
                        >
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
              </div>
            </div>
            <div
              class="col-6 d-lg-flex d-none h-100 my-auto pe-0 position-absolute top-0 end-0 text-center justify-content-center flex-column"
            >
              <div
                class="position-relative bg-gradient-primary h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center overflow-hidden"
              >
                <span class="mask bg-gradient-primary opacity-6"></span>

                <h4
                  class="mt-5 text-white font-weight-bolder position-relative"
                >
                  "Attention is the new currency"
                </h4>
                <p class="text-white position-relative">
                  The more effortless the writing looks, the more effort the
                  writer actually put into the process.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
  <div
    class="modal fade"
    id="forgotPasswordModal"
    tabindex="-1"
    aria-labelledby="forgotPasswordModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content bg-glass">
        <div class="modal-header">
          <h5 class="modal-title" id="forgotPasswordModalLabel">
            Forgot Password
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="sendResetLink">
            <div
              class="mb-3 form-outline"
              :class="{ error: errors.forgotPasswordEmail }"
            >
              <input
                type="email"
                class="form-control form-control-lg"
                placeholder="Email"
                aria-label="Email"
                aria-describedby="emailHelp"
                v-model="forgotPasswordEmail"
              />
              <span class="text-danger">{{ forgotPasswordErrors.email }}</span>
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
                Send Reset Link
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/services/api";
import Swal from "sweetalert2";
import NavbarDefault from "@/components/layouts/bars/NavbarDefault.vue";


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
        this.loading_log = true
        const response = await api.post("/login", {
          email: this.email,
          password: this.password,
        });
        console.log(response.data);
        const {
          message,
          redirect,
          token,
          role,
          name,
          userId,
          profile,
          email,
          phone,
        } = response.data;
        if (
          [
            "Admin login successful",
            "Doctor login successful",
            "Patient login successful",
          ].includes(message)
        ) {
          localStorage.setItem("token", token);
          localStorage.setItem("role", role);
          localStorage.setItem("name", name);
          localStorage.setItem("email", email);
          localStorage.setItem("phone", phone);
          localStorage.setItem("userId", userId);
          localStorage.setItem("profile", profile);
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Welcome " + response.data.role,
            timer: 1500,
            customClass: {
              popup: "popup", // Define your custom class here
            },
          });
          this.loading_log = false
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
          this.loading_log = false
        } else {
          alert("Error occurred while logging in.");
        }
      }
    },
    async sendResetLink() {
      try {
        this.loading = true;
        const response = await api.post("/forgot-password", {
          email: this.forgotPasswordEmail,
        });
        this.forgotPasswordErrors.email = "";
        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Password reset link sent successfully! Check Your Email",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to send password reset link",
          });
        }
      } catch (error) {
        console.error("Error sending reset link:", error);
        this.loading = false;
        if (
          error.response &&
          error.response.status === 422 &&
          error.response.data.errors
        ) {
          this.forgotPasswordErrors.email = error.response.data.errors.email[0];
        } else {
          alert("Error occurred while sending password reset link");
        }
      } finally {
        // Set loading to false after request completes
        this.loading = false;
      }
    },
  },
  components: {
    NavbarDefault,
  },
};
</script>

<style></style>
