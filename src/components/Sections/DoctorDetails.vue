<template>
  <PreLoader
    :loading="d_loading"
    :color="loaderColor"
    :size="loaderSize"
  ></PreLoader>
  <section class="py-sm-7 py-5 position-relative">
    <div class="container">
      <div class="row">
        <div class="col-12 mx-auto" v-show="!d_loading">
          <div class="mt-n8 mt-md-n9 text-center">
            <div class="blur-shadow-avatar">
              <img
                :src="doctor.profile"
                class="shadow-xl position-relative z-index-2"
                alt="Avatar"
                style="
                  width: 250px;
                  height: 250px;
                  border-radius: 25px;
                  object-fit: cover;
                "
              />
            </div>
          </div>
          <div class="row py-7">
            <div
              class="col-lg-7 col-md-7 z-index-2 position-relative px-md-2 px-sm-5 mx-auto"
            >
              <div
                class="d-flex justify-content-between align-items-center mb-2"
              >
                <h3 class="mb-0">{{ doctor.name }}</h3>
                <div class="d-block">
                  <a
                    href="#"
                    class="btn"
                    :class="{
                      'btn-primary': !formVisible,
                      'btn-danger': formVisible,
                    }"
                    @click="toggleFormVisibility"
                  >
                    {{ formVisible ? "Cancel choice" : "Consult with me" }}
                  </a>
                </div>
              </div>
              <p class="text-dark">
                Work Time
                <span
                  class="text-danger font-weight-bold"
                  style="font-size: 15px"
                  >9:00 - 17:00</span
                >
              </p>
              <p class="text-dark">
                <span
                  class="text-success font-weight-bold me-3"
                  style="font-size: 15px"
                  >{{ doctor.category }}</span
                >
                <span class="text-success">{{ doctor.price }} DH</span>
              </p>
              <div class="row mb-4">
                <div class="col-auto">
                  <span class="h6 me-1"
                    ><i class="bx bxs-location-plus"></i
                  ></span>
                  <span class="text-dark">{{ doctor.address }}</span>
                </div>
                <div class="col-auto">
                  <span class="h6 me-1"><i class="bx bxs-graduation"></i></span>
                  <span class="text-dark">{{ doctor.qualification }}</span>
                </div>
              </div>
              <p class="text-lg mb-0 text-dark">
                {{ doctor.description }}
                <a href="javascript:;" class="text-primary icon-move-right mt-5"
                  >{{ doctor.email }}
                  <i class="fas fa-arrow-right text-sm ms-1"></i>
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="container booking"
      :style="{ display: formVisible ? 'block' : 'none' }"
    >
      <div class="row mb-5">
        <div class="col-md-8 text-center mb-5 w-100">
          <h3 class="text-dark z-index-1 position-relative">
            Let's Make an Appointment
          </h3>
          <p class="text-dark opacity-8 mb-0">
            There’s nothing I really wanted to do in life that I wasn’t able to
            get good at. That’s my skill.
          </p>
        </div>
      </div>
      <form @submit.prevent="submitAppointment">
        <div class="row pad">
          <div class="col-xl-12 mb-xl-0 mb-5">
            <div class="card bg-transparent shadow-xl">
              <div
                class="overflow-hidden position-relative border-radius-xl"
                :style="{
                  backgroundImage: `url(${require('@/assets/img/curved-images/curved14.jpg')})`,
                }"
              >
                <!-- Content goes here -->

                <span class="mask bg-gradient-dark"></span>
                <div class="card-body position-relative z-index-1 p-3">
                  <i class="fas fa-wifi text-white p-2"></i>
                  <h5 class="text-white mt-4 mb-5 pb-2">
                    4562&nbsp;&nbsp;&nbsp;****&nbsp;&nbsp;&nbsp;****&nbsp;&nbsp;&nbsp;4252
                  </h5>
                  <div class="d-flex">
                    <div class="d-flex">
                      <div class="me-4">
                        <p class="text-white text-sm opacity-8 mb-0">CVC</p>
                        <h6 class="text-white mb-0">112</h6>
                      </div>
                      <div>
                        <p class="text-white text-sm opacity-8 mb-0">Expires</p>
                        <h6 class="text-white mb-0">11/22</h6>
                      </div>
                    </div>
                    <div
                      class="ms-auto w-20 d-flex align-items-end justify-content-end"
                    >
                      <img
                        class="w-60 mt-2"
                        src="@/assets/img/logos/mastercard.png"
                        alt="logo"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <flat-pickr
            v-model="selectedDateTime"
            :config="dateTimeConfig"
            class="form-control bg-white mb-4 mt-5"
            placeholder="Select date and time"
          ></flat-pickr>
          <div class="mb-4 form-control" id="card-element"></div>
          <div class="row mb-4 text-start">
            <div class="col-6">
              <div class="form-check radio-group">
                <input
                  class="form-check-input"
                  type="radio"
                  id="onlineType"
                  value="online"
                  v-model="selectedType"
                />
                <label class="form-check-label" for="onlineType">Online</label>
              </div>
            </div>
            <div class="col-6">
              <div class="form-check radio-group">
                <input
                  class="form-check-input"
                  type="radio"
                  id="localType"
                  value="local"
                  v-model="selectedType"
                />
                <label class="form-check-label" for="localType">Local</label>
              </div>
            </div>
          </div>
          <PreLoader
            :loading="loading"
            :color="loaderColor"
            :size="loaderSize"
            class="mb-4"
          ></PreLoader>

          <button
            type="submit"
            class="btn btn-dark d-flex justify-content-between text-xxl"
          >
            <i class="bx bxs-credit-card" style="font-size: 20px"></i> Pay
            <span class="text-xxl"> {{ doctor.price }} DH </span>
          </button>
        </div>
      </form>
    </div>
  </section>
</template>
<script>
import api from "@/services/api";
import FlatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import PreLoader from "@/components/icons/PreLoader.vue";
import { loadStripe } from "@stripe/stripe-js";
import { useToast } from "vue-toast-notification";

export default {
  data() {
    return {
      doctor: {
        id: "",
        name: "",
        email: "",
        phone: "",
        address: "",
        experience: "",
        description: "",
        profile: "",
        qualification: "",
        price: "",
      },
      loading: false,
      d_loading: false,
      showCardElement: false,
      loaderColor: "#6437e0",
      loaderSize: "10px",
      formVisible: false,
      selectedType: "local",
      stripe: null,
      elements: null,
      cardElement: null,
      stripePromise: null,
      selectedDateTime: "",
      clientSecret: "",
      dateTimeConfig: {
        enableTime: true,
        altFormat: "F j, Y h:i K",
        dateFormat: "Y-m-d H:i",
        minDate: "today",
        maxDate: new Date().fp_incr(365),
        disable: [
          function (date) {
            return date.getDay() === 0 || date.getDay() === 6;
          },
        ],
        minTime: "09:00",
        maxTime: "17:00",
      },
    };
  },
  created() {
    const docId = this.$route.params.id;
    this.fetchDoctorById(docId);
    this.initializeStripe();
  },

  methods: {
    toggleCardElement() {
      this.showCardElement = !this.showCardElement;
    },

    async setupElements() {
      try {
        this.elements = this.stripe.elements();

        const style = {
          base: {
            fontSize: "16px",
            fontFamily: '"Open Sans", sans-serif',
          },
        };

        const paymentElement = this.elements.create("card", { style });
        paymentElement.mount("#card-element");

        document.getElementById("card-element").style.opacity = "0";

        setTimeout(() => {
          document.getElementById("card-element").style.opacity = "1";
        }, 500);

        this.cardElement = paymentElement;
      } catch (error) {
        console.error("Error setting up elements:", error);
      }
    },

    toggleFormVisibility() {
      const token = localStorage.getItem("token");
      if (!token) {
        this.$router.push("/login");
      } else {
        this.formVisible = !this.formVisible;
      }
    },
    async fetchDoctorById(docId) {
      this.d_loading = true;
      const response = await api.get(`/doctor-details/${docId}`);
      this.doctor = response.data.doctor;
      this.d_loading = false;
    },
    async initializeStripe() {
      try {
        this.stripe = await loadStripe(
          "pk_test_51OqEzbGfXVD9rRVHSlS9h9t4L9Pg5fhmoj28lUWK2ymkZtlEVJfHSHxNC5ZU20fmP57OUUDPvq5XPsWaXzt0czh700hJY54TiR"
        );
        console.log("Stripe initialized successfully:", this.stripe);

        // Create an instance of Elements.
        const elements = this.stripe.elements();

        // Create an instance of the card Element.
        this.cardElement = elements.create("card");

        // Add an instance of the card Element into the `card-element` <div>.
        this.cardElement.mount("#card-element");
      } catch (error) {
        console.error("Error initializing Stripe:", error);
      }
    },

    async submitAppointment() {
      this.loading = true;
      if (this.cardElement.empty) {
        useToast().error("Please fill the card element", {
          position: "bottom",
        });
        this.loading = false;
        return;
      }
      const selectedDate = this.selectedDateTime.split(" ")[0];
      const selectedTime = this.selectedDateTime.split(" ")[1];

      try {
        const response = await api.post("/patient/appointment", {
          doctor_id: this.doctor.id,
          appointment_date: selectedDate,
          appointment_hour: selectedTime,
          type: this.selectedType,
          price: this.doctor.price,
        });

        this.clientSecret = response.data.clientSecret;
        this.loading = false;
        useToast().success("Appointment created successfully", {
          position: "bottom",
        });
      } catch (error) {
        this.loading = false;
        useToast().error(error.response.data.error, {
          position: "bottom",
        });
      }
    },
  },
  components: {
    FlatPickr,
    PreLoader,
  },
};
</script>

<style>
.radio-group label {
  min-width: 100px;
  min-height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: 10px;
  border: 1px solid rgb(94, 114, 228);
}

.radio-group input:checked + .form-check-label {
  background-color: rgb(94, 114, 228);
  color: white;
  font-weight: 600;
}

.radio-group input {
  display: none;
}
.booking {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.pad {
  padding: 0px 30%;
}
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s;
}

.slide-enter,
.slide-leave-to {
  transform: translateX(100%);
}

#card-element input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  font-size: 16px;
}

#card-element input:focus {
  outline: none;
  border-color: #007bff; /* Change color when focused */
}
</style>
