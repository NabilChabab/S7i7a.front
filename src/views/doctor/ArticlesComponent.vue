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
        <div class="col-lg-12 mb-lg-0 mb-4">
          <div class="card">
            <div class="card-header pb-0 p-3 mb-3">
              <div class="d-flex justify-content-between align-items-center">
                <h6 class="mb-2">Latest Articles</h6>
                <router-link
                  class="btn btn-primary"
                  :to="{ path: '/doctor/articles/create' }"
                  >Add a new Article</router-link
                >
              </div>
            </div>
            <AllArticlesComponent />
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
import FooterComponent from "@/components/layouts/footer/FooterComponent.vue";

import AllArticlesComponent from "@/components/layouts/cards/doctor/AllArticlesComponent.vue";
export default {
  data() {
    return {
      navigationLinks: [
        {
          url: "/doctor/dashboard",
          text: "Dashboard",
          iconClass: "bx bx-home-alt text-primary text-sm opacity-10",
          active: "nav-link",
        },
        {
          url: "/doctor/articles",
          text: "Articles",
          iconClass: "bx bxs-notepad text-info text-sm opacity-10",
          active: "nav-link active",
        },
        {
          url: "/doctor/appointments",
          text: "Appointments",
          iconClass: "bx bx-check-double text-info text-sm opacity-10",
          active: "nav-link",
        },
        {
          url: "/doctor/chat",
          text: "Chat",
          iconClass:
            "bx bx-message-rounded-dots text-success text-sm opacity-10",
          active: "nav-link ",
        },
      ],
      accountLinks: [
        {
          p_url: "/doctor/profile",
          p_text: "Profile",
          p_iconClass: "bx bx-user text-success text-sm opacity-10",
          p_active: "nav-link ",
        },
      ],
    };
  },
  computed: {
    allLinks() {
      return this.navigationLinks.concat(this.accountLinks);
    },
  },
  methods: {},
  components: {
    SideNav,
    NavbarComponent,
    AllArticlesComponent,
    FooterComponent,
  },
};
</script>

<style></style>
