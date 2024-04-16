<template>
  <PreLoader
    :loading="loading"
    :color="loaderColor"
    :size="loaderSize"
  ></PreLoader>
  <div
    class="filter d-flex justify-content-between align-items-center gap-5 mb-5 mt-5"
    v-if="loading == false"
  >
    <div class="message-box mb-3">
      <input
        type="text"
        class="message-input"
        v-model="searchQuery"
        placeholder="Search"
      />
      <i class="bx bx-search text-primary me-3"></i>
    </div>
    <div class="message-box mb-3">
      <select v-model="catQuery" class="message-input">
        <option value="" disabled selected>Select a category</option>
        <option
          v-for="category in categories"
          :key="category.id"
          :value="category.name"
        >
          {{ category.name }}
        </option>
      </select>
    </div>
  </div>

  <div
    class="col-lg-6 col-12 mt-5"
    v-for="doctor in filteredDoctors"
    :key="doctor.id"
    data-aos="fade-left"
  >
    <div class="card card-profile">
      <div class="row">
        <div class="col-lg-4 col-md-6 col-12 mt-n5">
          <a>
            <div class="p-3 pe-md-0" data-aos="fade-down">
              <img
                class="w-100 border-radius-md shadow-lg"
                style="height: 170px; object-fit: cover"
                :src="doctor.profile"
              />
            </div>
          </a>
        </div>
        <div class="col-lg-8 col-md-6 col-12 my-auto">
          <div class="card-body ps-lg-0">
            <h5 class="mb-0">Dr {{ doctor.name }}</h5>
            <h6 class="text-success" v-for="role in doctor.role" :key="role.id">
              {{ doctor.category }}
            </h6>
            <p class="mb-0">
              {{
                doctor.description
                  ? doctor.description
                      .trim()
                      .split(/\s+/)
                      .slice(0, 5)
                      .join(" ") +
                    (doctor.description.trim().split(/\s+/).length > 5
                      ? " ..."
                      : "")
                  : "..........."
              }}
            </p>

            <router-link
              :to="{ name: 'doctor-details', params: { id: doctor.id } }"
              class="cursor-pointer text-sm icon-move-right text-primary font-weight-bold"
              >explore more
              <i class="fas fa-arrow-right text-xs ms-1"></i>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/services/api";
import PreLoader from "@/components/icons/PreLoader.vue";
import AOS from "aos";

export default {
  data() {
    return {
      topDoctors: [],
      categories: [],
      selectedDateTime: null,
      loading: false,
      loaderColor: "#6437e0",
      loaderSize: "15px",
      searchQuery: "",
      catQuery: "",
    };
  },
  created() {
    this.getDoctors();
  },
  computed: {
    filteredDoctors() {
      return this.topDoctors.filter(
        (doctor) =>
          doctor.name.toLowerCase().includes(this.searchQuery.toLowerCase()) &&
          (this.catQuery === "" ||
            doctor.category.toLowerCase().includes(this.catQuery.toLowerCase()))
      );
    },
  },
  mounted() {
    AOS.init({
      duration: 1000,
    });
  },
  methods: {
    async getDoctors() {
      this.loading = true;
      const response = await api.get("/index");
      this.categories = response.data.all_categories;
      this.topDoctors = response.data.all_doctors.map((doctor) => {
        return {
          ...doctor,
          role: doctor.role.map((role) => role.name),
        };
      });
      this.loading = false;
    },
  },
  components: {
    PreLoader,
  },
};
</script>

<style>
.docs {
  margin: 0;
}
/* Style for icons in the message box */
.box i {
  font-size: 30px;
  cursor: pointer;
}

.message-box {
  display: flex;
  align-items: center;
  border-radius: 25px;
  padding: 5px;
  margin: 0;
  width: 400px;
  box-shadow: 0px 5px 5px rgba(63, 63, 63, 0.103);
  border: 1px solid rgb(157, 175, 255);
}

.message-input {
  border: none;
  outline: none;
  font-size: 16px;
  padding: 5px;
  width: 100%;
}

/* Style for send button */
.message-submit {
  background-color: transparent; /* Set button color */
  color: rgb(77, 88, 247); /* Set button text color */
  border: none; /* Remove default border */
  padding: 10px 15px; /* Add padding */
  border-radius: 5px; /* Add rounded corners */
  cursor: pointer; /* Set cursor to pointer on hover */
}
</style>
