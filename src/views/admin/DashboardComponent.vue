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
        <div class="col-lg-7 mb-lg-0 mb-4">
          <div class="card">
            <div class="card-header pb-0 p-3">
              <div class="d-flex justify-content-between">
                <h6 class="mb-2">Sales by Country</h6>
              </div>
            </div>
            <canvas id="myChart" width="400" height="300"></canvas>
          </div>
        </div>
        <div class="col-lg-5">
          <div class="card">
            <div class="card-header pb-0 p-3">
              <h6 class="mb-0">Categories</h6>
            </div>
            <div class="card-body p-3">
              <canvas id="myChart" width="400" height="300"></canvas>
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
import Chart from "chart.js/auto"

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
    };
  },
  mounted() {
    var ctx = document.getElementById("myChart").getContext("2d");
    const myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Users", "Reservations", "Events" ,  "Reservations", "Events"],
        datasets: [
          {
            label: "Counts",
            data: [20, 20, 10 , 30 , 10],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        animation: {
          duration: 3000, // Animation duration in milliseconds
          easing: "easeInOutQuart", // Easing function for animation
        },
      },
    });
    myChart;
  },
  computed: {
    allLinks() {
      return this.navigationLinks.concat(this.accountLinks);
    },
  },
  methods: {
    toggleSidebar() {
      console.log('clickedsssssssssss')
      this.showSidebar = !this.showSidebar;
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
