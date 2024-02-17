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
              name="password"
              v-model="password"
            />
            <span v-if="errors.password" class="text-danger">{{
              errors.password
            }}</span>
          </div>

          <div class="div">
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                name="remember"
                id="remember"
              />

              <label class="form-check-label text-dark" for="remember">
                Remember me
              </label>
            </div>
            <router-link
              to="#forgotPasswordModal"
              class="btn btn-link text-primary"
              data-bs-toggle="modal"
              data-bs-target="#forgotPasswordModal"
              >Forgot Password?</router-link
            >
          </div>
          <button
            type="submit"
            class="btn btn-dark btn-block mb-4 col-12 p-2"
            @click="loginUser"
          >
            Login
          </button>

          <span class="d-flex justify-content-center gap-2"
            >Dont have an account
            <router-link :to="{ path: 'register' }">Register</router-link></span
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
          <form @submit.prevent="sendResetLink">
            <div class="modal-body">
              <div class="form-group">
                <input
                  type="email"
                  id="forgotPasswordEmail"
                  class="form-control p-2"
                  placeholder="Email"
                  aria-describedby="emailHelp"
                  v-model="forgotPasswordEmail"
                />
              </div>

              <span class="text-danger">{{ forgotPasswordErrors.email }}</span>
              <div v-if="loading" class="text-center">
                <div class="spinner-border" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>
            </div>
            <div>
              <button
                type="submit"
                class="btn btn-dark mb-4 col-12 reset"
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

export default {
  data() {
    return {
      email: "",
      password: "",
      errors: {},
      forgotPasswordEmail: "",
      forgotPasswordErrors: {},
      loading: false,
    };
  },
  methods: {
    async loginUser() {
      try {
        const response = await api.post("/login", {
          email: this.email,
          password: this.password,
        });
        console.log(response.data);
        const { message, redirect, token } = response.data;
        if (
          [
            "Admin login successful",
            "Doctor login successful",
            "Patient login successful",
          ].includes(message)
        ) {
          localStorage.setItem("token", token);
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Welcome " + response.data.role,
          });
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
};
</script>

<style>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10% 0px;
}
.bg-glass {
  background-color: hsla(0, 0%, 100%, 0.788) !important;
  backdrop-filter: saturate(200%) blur(25px);
}

.div {
  display: flex;
  justify-content: space-between;
  align-items: center;
  vertical-align: middle;
  margin-bottom: 20px;
}

.error input {
  border: 3px solid red;
}

.success input {
  border: 3px solid green;
}

form {
  padding: 20px;
}

form a {
  text-decoration: none;
}

.card {
  width: 100%;
  border: none;
  background-color: transparent;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card img {
  width: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin: auto;
}

.card label {
  margin-top: 30px;
  text-align: center;
  height: 40px;
  cursor: pointer;
  font-weight: bold;
  margin-bottom: 20px;
}

.card input {
  display: none;
}
body {
  height: 100vh;
}
#app {
  width: 100%;
  height: 100vh;
  background-position: center;
  background-size: cover;
  object-fit: cover;
}

.reset {
  width: 200px;
  padding: 10px;
  border-radius: 15px;
  margin-left: 26%;
}
.spinner-border {
  margin-top: 20px;
  width: 3rem;
  height: 3rem;
  color: rgb(0, 0, 0);
}
</style>
