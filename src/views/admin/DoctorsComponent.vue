<template>
  <div class="min-height-300 bg-primary position-absolute w-100"></div>
  <SideNav
    :navigationLinks="navigationLinks"
    :accountLinks="accountLinks"
    style="z-index: 999"
  />

  <main class="main-content position-relative border-radius-lg">
    <!-- Navbar -->
    <NavbarComponent />
    <!-- End Navbar -->
    <div class="container-fluid py-4">
      <div class="row mt-4">
        <div class="col-lg-12 mb-lg-0 mb-4 ">
          <div class="card bg-dark text-white">
            <div class="card-header pb-0 p-3 mb-3 bg-dark text-white">
              <div class="d-flex justify-content-between align-items-center">
                <h6 class="mb-2 text-white">Latest Doctors</h6>
                <router-link
                  class="btn btn-primary"
                  :to="{ path: '/admin/doctors/create' }"
                  >Add a Doctor</router-link
                >
              </div>
            </div>
            <AllDoctorsComponent />
          </div>
        </div>
      </div>
      <FooterComponent />
    </div>
  </main>
</template>

<script>
import NavbarComponent from "@/components/layouts/bars/Navbar.vue";
import SideNav from "@/components/layouts/bars/Aside.vue";
import AllDoctorsComponent from "@/components/layouts/cards/admin/AllDoctorsComponent.vue";

import FooterComponent from "@/components/layouts/footer/FooterComponent.vue";
export default {
  data() {
    return {
      navigationLinks: [
        {
          url: "/admin/dashboard",
          text: "Dashboard",
          iconClass: "bx bx-home-alt text-primary text-sm opacity-10",
          active: "nav-link ",
        },
        {
          url: "/admin/doctors",
          text: "Doctors",
          iconClass:
            "bx bx-plus-medical calendar-grid-58 text-warning text-sm opacity-10",
          active: "nav-link active",
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
        { url: "/admin/categories", text: "Categories", iconClass: "bx bxs-category-alt text-success text-sm opacity-10" ,active:"nav-link "},

        {
          url: "/admin/articles",
          text: "Articles",
          iconClass: "bx bxs-notepad text-info text-sm opacity-10",
          active: "nav-link ",
        },

        { url: "/admin/prescriptions", text: "Prescriptions", iconClass: "bx bxs-file-pdf text-danger text-sm opacity-10" ,active:"nav-link "},

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
    };
  },
  computed: {
    allLinks() {
      return this.navigationLinks.concat(this.accountLinks);
    }

  },
  components: {
    NavbarComponent,
    SideNav,
    FooterComponent,
    AllDoctorsComponent,
  },
};
</script>

<style></style>
