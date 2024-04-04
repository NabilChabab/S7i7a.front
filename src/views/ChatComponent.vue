<template>
  <div class="min-height-300 bg-primary position-absolute w-100"></div>
  <SideNav
    :navigationLinks="navigationLinks"
    :accountLinks="accountLinks"
    style="z-index: 999"
  />
  <main class="main-content position-relative border-radius-lg">
    <NavbarComponent />
    <ChatSection />
    <FooterComponent />
  </main>
</template>

<script>
import SideNav from "@/components/layouts/bars/Aside.vue";
import NavbarComponent from "@/components/layouts/bars/Navbar.vue";
import FooterComponent from "@/components/layouts/footer/FooterComponent.vue";
import ChatSection from "@/components/Sections/ChatSection.vue";
import store from "@/store/index"

export default {
  data() {
    return {
      navigationLinks: [],
      accountLinks: []
    };
  },
  computed: {
    authRole() {
      const userData = store.getters.getUser
      return userData.role
    },
  },
  created() {
    if (this.authRole === "Patient") {
      this.navigationLinks = [
        {
          url: "/patient/appointment",
          text: "My Appointments",
          iconClass: "bx bx-check-double text-info text-sm opacity-10",
          active: "nav-link",
        },
        {
          url: "/articles",
          text: "Articles",
          iconClass: "bx bxs-notepad text-info text-sm opacity-10",
          active: "nav-link ",
        },
        {
          url: "/doctors",
          text: "Doctors",
          iconClass: "bx bxs-notepad text-info text-sm opacity-10",
          active: "nav-link ",
        },
        {
          url: "/chat",
          text: "Chat",
          iconClass:
            "bx bx-message-rounded-dots text-success text-sm opacity-10",
          active: "nav-link active",
        },
      ];
      this.accountLinks = [
        {
          p_url: "/patient/profile",
          p_text: "Profile",
          p_iconClass: "bx bx-user text-success text-sm opacity-10",
          p_active: "nav-link ",
        },
      ];
    } else {
      this.navigationLinks = [
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
          active: "nav-link ",
        },
        {
          url: "/doctor/appointments",
          text: "Appointments",
          iconClass: "bx bx-check-double text-info text-sm opacity-10",
          active: "nav-link ",
        },
        {
          url: "/chat",
          text: "Chat",
          iconClass:
            "bx bx-message-rounded-dots text-success text-sm opacity-10",
          active: "nav-link active",
        },
      ];
      this.accountLinks = [
        {
          p_url: "/doctor/profile",
          p_text: "Profile",
          p_iconClass: "bx bx-user text-success text-sm opacity-10",
          p_active: "nav-link ",
        },
      ];
    }
  },
  components: {
    SideNav,
    NavbarComponent,
    FooterComponent,
    ChatSection,
  },
};
</script>


<style scoped></style>
