<template>
  <div class="min-height-300 bg-primary position-absolute w-100"></div>
  <SideNav :navigationLinks="navigationLinks" :accountLinks="accountLinks" style="z-index: 999" />
  <main class="main-content position-relative border-radius-lg">
    <!-- Navbar -->
    <NavbarComponent />
      <ChatSection/>
    <FooterComponent/>
  </main>
 
</template>

<script>
import SideNav from '@/components/layouts/bars/Aside.vue';
import NavbarComponent from '@/components/layouts/bars/Navbar.vue';
import FooterComponent from '@/components/layouts/footer/FooterComponent.vue';
import ChatSection from '@/components/Sections/ChatSection.vue';


export default {
  data() {
    return {
      navigationLinks: [
        
        { url: "/chat", text: "Chat", iconClass: "bx bx-message-rounded-dots text-success text-sm opacity-10" ,active:"nav-link active"},
      ],
      accountLinks : [
        // { p_url: "/patient/profile", p_text: "Profile", p_iconClass: "bx bx-user text-success text-sm opacity-10" ,p_active:"nav-link "},
      
      ],
      
    };
  },
  components: {
    SideNav,
    NavbarComponent,
    FooterComponent,
    ChatSection,
  },
};
</script>

<style scoped>

</style>
