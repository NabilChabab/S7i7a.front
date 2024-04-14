<template>
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

  },
};
</script>