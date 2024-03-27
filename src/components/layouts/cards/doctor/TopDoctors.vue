<template>
  <PreLoader :loading="loading" :color="loaderColor" :size="loaderSize"></PreLoader>
  <div
    class="col-lg-6 col-12 mt-5"
    v-for="doctor in topDoctors"
    :key="doctor.id" data-aos="fade-left">
    <div class="card card-profile" >
      <div class="row">
        <div class="col-lg-4 col-md-6 col-12 mt-n5">
          <a>
            <div class="p-3 pe-md-0" data-aos="fade-down">
              <img
                class="w-100 border-radius-md shadow-lg" style="height:170px;object-fit: cover;"
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
                doctor.description ? doctor.description.trim().split(/\s+/).slice(0, 5).join(" ") +
                (doctor.description.trim().split(/\s+/).length > 5
                  ? " ..."
                  : "") : "..........."
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
import PreLoader from '@/components/icons/PreLoader.vue'
import AOS from 'aos';


export default {
  data() {
    return {
      topDoctors: [],
      loading: false,
      loaderColor: '#6437e0', 
      loaderSize: '15px', 
    };
  },
  created() {
    this.getDoctors();
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
      this.topDoctors = response.data.doctors.map((doctor) => {
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
