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
        { url: "/patient/prescriptions", text: "Prescriptions", iconClass: "bx bxs-file-pdf text-danger text-sm opacity-10" ,active:"nav-link "},

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
    } else if(this.authRole === "Doctor") {
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
        { url: "/doctor/prescriptions", text: "Prescriptions", iconClass: "bx bxs-file-pdf text-danger text-sm opacity-10" ,active:"nav-link "},
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
    }else{
      this.navigationLinks = [
        {
          url: "/admin/dashboard",
          text: "Dashboard",
          iconClass: "bx bx-home-alt text-primary text-sm opacity-10",
          active: "nav-link",
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
        { url: "/admin/prescriptions", text: "Prescriptions", iconClass: "bx bxs-file-pdf text-danger text-sm opacity-10" ,active:"nav-link "},

      ]
      this.accountLinks = [
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
          p_active: "nav-link active",
        },
      ]
        
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
