<template>
  <div class="min-height-300 bg-primary position-absolute w-100"></div>
  <SideNav :navigationLinks="navigationLinks" :accountLinks="accountLinks" style="z-index: 999" />
  <main class="main-content position-relative border-radius-lg">
    <!-- Navbar -->
    <NavbarComponent />
    <AdminProfile/>
    <FooterComponent/>
  </main>

</template>

<script>
import SideNav from "@/components/layouts/bars/Aside.vue";
import NavbarComponent from "@/components/layouts/bars/Navbar.vue";
import FooterComponent from "@/components/layouts/footer/FooterComponent.vue";
import AdminProfile from "@/components/layouts/cards/AdminProfile.vue"
export default {
  data() {
    return {
        navigationLinks: [
        { url: "/admin/dashboard", text: "Dashboard", iconClass: "bx bx-home-alt text-primary text-sm opacity-10" , active:"nav-link " },
        { url: "/admin/doctors", text: "Doctors", iconClass: "bx bx-plus-medical calendar-grid-58 text-warning text-sm opacity-10" ,active:"nav-link "},
        { url: "/admin/patients", text: "Patients", iconClass: "bx bx-user text-success text-sm opacity-10" ,active:"nav-link "},
        { url: "/admin/appointments", text: "Appointments", iconClass: "bx bx-check-double text-info text-sm opacity-10" ,active:"nav-link "},
        { url: "/admin/articles", text: "Articles", iconClass: "bx bxs-notepad text-info text-sm opacity-10" ,active:"nav-link "},
        { url: "/admin/payments", text: "Payments", iconClass: "bx bxs-credit-card text-danger text-sm opacity-10" ,active:"nav-link "},
      ],
      accountLinks : [
        { p_url: "/admin/profile", p_text: "Profile", p_iconClass: "bx bx-user text-success text-sm opacity-10" ,p_active:"nav-link active"},

      ],
    };
  },
  computed: {
    allLinks() {
      return this.navigationLinks.concat(this.accountLinks);
    }

  },
  methods: {},
  components: {
    SideNav,
    NavbarComponent,
    FooterComponent,
    AdminProfile
  },
};
</script>

<style></style>
