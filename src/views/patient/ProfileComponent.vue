<template>
  <div class="min-height-300 bg-primary position-absolute w-100"></div>
  <SideNav :navigationLinks="navigationLinks" :accountLinks="accountLinks" style="z-index: 999" />
  <main class="main-content position-relative border-radius-lg">
    <!-- Navbar -->
    <NavbarComponent />
    <PatientProfile/>
    <FooterComponent/>
  </main>

</template>

<script>
import SideNav from "@/components/layouts/bars/Aside.vue";
import NavbarComponent from "@/components/layouts/bars/Navbar.vue";
import FooterComponent from "@/components/layouts/footer/FooterComponent.vue";
import PatientProfile from "@/components/layouts/cards/patient/PatientProfile.vue"
export default {
  data() {
    return {
      navigationLinks: [
        { url: "/patient/appointment", text: "My Appointments", iconClass: "bx bx-check-double text-info text-sm opacity-10" ,active:"nav-link "},
        { url: "/patient/articles", text: "Articles", iconClass: "bx bxs-notepad text-info text-sm opacity-10" ,active:"nav-link "},
        { url: "/patient/articles", text: "Doctors", iconClass: "bx bxs-notepad text-info text-sm opacity-10" ,active:"nav-link "},
        { url: "/patient/chat", text: "Chat", iconClass: "bx bx-message-rounded-dots text-success text-sm opacity-10" ,active:"nav-link "},
      ],
      accountLinks : [
        { p_url: "/patient/profile", p_text: "Profile", p_iconClass: "bx bx-user text-success text-sm opacity-10" ,p_active:"nav-link active"},

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
    PatientProfile
  },
};
</script>

<style></style>
