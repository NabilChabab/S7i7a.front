<template>
  <div class="min-height-300 bg-primary position-absolute w-100"></div>
  <SideNav
    :navigationLinks="navigationLinks"
    :accountLinks="accountLinks"
    style="z-index: 1000"
    :showAside="showSidebar"
  />
  <main class="main-content position-relative border-radius-lg">
    <!-- Navbar -->
    <NavbarComponent @toggle-aside="toggleSidebar" />
    <!-- End Navbar -->
    <div class="container-fluid py-4">
      <CardsComponent />
      <div class="row mt-4">
        <div class="col-lg-6 mb-lg-0 mb-4">
          <div class="card">
            <div class="card-header pb-0 p-3">
              <div class="d-flex justify-content-between">
                <h6 class="mb-2">Sales by Country</h6>
              </div>
            </div>
            <div ref="chart"></div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="card">
            <div class="card-header pb-0 p-3">
              <h6 class="mb-0">Categories</h6>
            </div>
            <div class="card-body p-3">
              <div ref="chart2"></div>
            </div>
          </div>
        </div>
      </div>
      <FooterComponent />
    </div>
  </main>
</template>

<script>
import SideNav from "@/components/layouts/bars/Aside.vue";
import NavbarComponent from "@/components/layouts/bars/Navbar.vue";
import CardsComponent from "@/components/layouts/cards/admin/LatestComponent.vue";

import FooterComponent from "@/components/layouts/footer/FooterComponent.vue";
import ApexCharts from "apexcharts";

import api from "@/services/api";

export default {
  data() {
    return {
      navigationLinks: [
        {
          url: "/admin/dashboard",
          text: "Dashboard",
          iconClass: "bx bx-home-alt text-primary text-sm opacity-10",
          active: "nav-link active",
        },
        {
          url: "/admin/doctors",
          text: "Doctors",
          iconClass:
            "bx bx-plus-medical calendar-grid-58 text-warning text-sm opacity-10",
          active: "nav-link ",
        },
        {
          url: "/admin/patients",
          text: "Patients",
          iconClass: "bx bx-user text-success text-sm opacity-10",
          active: "nav-link ",
        },
        {
          url: "/admin/appointments",
          text: "Appointments",
          iconClass: "bx bx-check-double text-info text-sm opacity-10",
          active: "nav-link ",
        },
        {
          url: "/admin/categories",
          text: "Categories",
          iconClass: "bx bxs-category-alt text-success text-sm opacity-10",
          active: "nav-link ",
        },
        {
          url: "/admin/articles",
          text: "Articles",
          iconClass: "bx bxs-notepad text-info text-sm opacity-10",
          active: "nav-link ",
        },
        {
          url: "/admin/payments",
          text: "Payments",
          iconClass: "bx bxs-credit-card text-danger text-sm opacity-10",
          active: "nav-link ",
        },
      ],
      accountLinks: [
        {
          p_url: "/admin/profile",
          p_text: "Profile",
          p_iconClass: "bx bx-user text-success text-sm opacity-10",
          p_active: "nav-link ",
        },
        {
          p_url: "/chat",
          p_text: "Chat",
          p_iconClass: "bx bx-message text-success text-sm opacity-10",
          p_active: "nav-link ",
        },
      ],
      showSidebar: true,
      chart: null,
      chart2: null,
      options2: {
        // name the chart options as 'options2'
        chart: {
          type: "area", // set chart type to 'line' for line chart
          height: 350,
        },
        series: [
          {
            name: "count",
            data: [10, 22, 30, 40, 50], // replace with dynamic data
          },
        ],
        xaxis: {
          categories: ["Jan", "Feb", "Mar", "Apr", "May"], // replace with dynamic categories
        },
      },
      options: {
        chart: {
          type: "bar", // set chart type to 'bar' for column chart
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
            data: [10, 22, 100, 50, 20, 10, 11], // replace with dynamic data
          },
        ],
        xaxis: {
          categories: [
            "Doctors",
            "Patients",
            "Appointments",
            "Categories",
            "Articles",
            "Payments",
            "Chat",
          ],
        },
      },
    };
  },
  mounted() {
    this.fetchData();
    this.chart = new ApexCharts(this.$refs.chart, this.options);
    this.chart.render();

    this.chart2 = new ApexCharts(this.$refs.chart2, this.options2); // use 'chart2' and 'options2' here
    this.chart2.render();
  },
  beforeDestroyed() {
    if (this.chart) {
      this.chart.destroy();
    }
    if (this.chart2) {
      this.chart2.destroy();
    }
  },
  computed: {
    allLinks() {
      return this.navigationLinks.concat(this.accountLinks);
    },
  },
  methods: {
    toggleSidebar() {
      console.log("clickedsssssssssss");
      this.showSidebar = !this.showSidebar;
    },
    async fetchData() {
      try {
        const response = await api.get("/admin/counts");
        console.log(response.data);

        const doctors = response.data.doctors;
        const patients = response.data.patients;
        const mostReservedDoctor =
          response.data.most_reserved_doctor.appointments_count;
        const mostReservedTime = response.data.most_reserved_time.total;
        const doctorWithMostArticles =
          response.data.doctor_with_most_articles.articles_count;
        const doctorWithMostCategories =
          response.data.doctor_with_most_categories.category_count;

        this.options.series[0].data = [
          doctors,
          patients,
          mostReservedDoctor,
          mostReservedTime,
          doctorWithMostArticles,
          doctorWithMostCategories,
        ];
        this.options.xaxis.categories = [
          "Doctors",
          "Patients",
          "Most Reserved Doctor",
          "Most Reserved Time",
          "Doctor with Most Articles",
          "Doctor with Most Categories",
        ];

        if (this.chart) {
          this.chart.updateOptions(this.options);
        }
      } catch (error) {
        console.error(error);
      }
    },
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
