<template>
  <div class="min-height-300 bg-primary position-absolute w-100"></div>
  <SideNav :navigationLinks="navigationLinks" :accountLinks="accountLinks" style="z-index:1000;" />

  <main class="main-content position-relative border-radius-lg">
    <!-- Navbar -->
    <NavbarComponent />
    <!-- End Navbar -->
    <div class="container-fluid py-4">
      <CardsComponent />
      <div class="row mt-4">
        <div class="col-lg-12 mb-lg-0 mb-4">
          <div class="card bg-dark text-white">
            <div class="card-header pb-0 p-3 bg-dark text-white">
              <div class="d-flex justify-content-between">
                <h6 class="mb-2 text-white">Statistic</h6>
              </div>
            </div>
            <div ref="chart" class="text-white"></div>
          </div>
        </div>
      </div>
      <FooterComponent />
    </div>
  </main>
</template>

<script>
import SideNav from '@/components/layouts/bars/Aside.vue';
import NavbarComponent from '@/components/layouts/bars/Navbar.vue';
import CardsComponent from '@/components/layouts/cards/doctor/LatestComponent.vue';
import FooterComponent from '@/components/layouts/footer/FooterComponent.vue';
import ApexCharts from "apexcharts";

export default {
  data() {
    return{

      navigationLinks: [
        { url: "/doctor/dashboard", text: "Dashboard", iconClass: "bx bx-home-alt text-primary text-sm opacity-10" , active:"nav-link active" },
        { url: "/doctor/articles", text: "Articles", iconClass: "bx bxs-notepad text-info text-sm opacity-10" ,active:"nav-link "},
        { url: "/doctor/appointments", text: "Appointments", iconClass: "bx bx-check-double text-info text-sm opacity-10" ,active:"nav-link "},
        { url: "/doctor/prescriptions", text: "Prescriptions", iconClass: "bx bxs-file-pdf text-danger text-sm opacity-10" ,active:"nav-link "},
        { url: "/chat", text: "Chat", iconClass: "bx bx-message-rounded-dots text-success text-sm opacity-10" ,active:"nav-link "},
      ],
      accountLinks : [
        { p_url: "/doctor/profile", p_text: "Profile", p_iconClass: "bx bx-user text-success text-sm opacity-10" ,p_active:"nav-link "},

      ],
      chart: null,
      options: {
        chart: {
          type: "area", // set chart type to 'bar' for column chart
          height: 600,
        },
        plotOptions: {
          bar: {
            horizontal: false,
            borderRadius: 15,
          },
        },
        series: [
          {
            name: "count",
            data: [10, 22, 100, 50, 20, 10, 11 , 20 , 100], // replace with dynamic data
          },
        ],
        xaxis: {
          categories: [
            "Doctors",
            "Patients",
            "Appointments",
            "Categories",
            "Articles",
            "Articles",
            "Articles",
            "Payments",
            "Chat",
          ],
        },
      },
    }
  },
  computed: {
    allLinks() {
      return this.navigationLinks.concat(this.accountLinks);
    }

  },
  mounted() {
    this.chart = new ApexCharts(this.$refs.chart, this.options);
    this.chart.render();
  },
  beforeDestroyed() {
    if (this.chart) {
      this.chart.destroy();
    }
  },
  methods: {

  },
  components: {
    SideNav,
    NavbarComponent,
    CardsComponent,
    FooterComponent,
  },
};
</script>

<style></style>
