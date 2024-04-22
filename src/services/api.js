import axios from "axios";
import { useToast } from "vue-toast-notification";
import router from "@/router/router";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});

api.interceptors.request.use((config) => {
  const authToken = localStorage.getItem("token");
  if (authToken) {
    config.headers["Authorization"] = `Bearer ${authToken}`;
  }

  const csrfToken = document.head.querySelector('meta[name="csrf-token"]');
  if (csrfToken) {
    config.headers["X-CSRF-TOKEN"] = csrfToken.content;
  }

  return config;
});

api.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      if (response.data && response.data.message) {
        useToast().success(response.data.message, {
          position: "bottom",
        });
      }
    } else if (response.status === 201) {
      if (response.data && response.data.message) {
        useToast().success(response.data.message, {
          position: "bottom",
        });
      }
    } else if (response.status === 204) {
      if (response.data && response.data.message) {
        useToast().warning(response.data.message, {
          position: "bottom",
        });
      }
    }
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 422) {
      const { errors } = error.response.data;
      if (errors) {
        Object.values(errors).forEach((errorMessages) => {
          errorMessages.forEach((errorMessage) => {
            useToast().error(errorMessage, {
              position: "bottom",
            });
          });
        });
      }
    } else {
      useToast().error("An error occurred", {
        position: "bottom",
      });
    }

    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      router.push("/login");
    }
    return Promise.reject(error);
  }
);

export default api;
