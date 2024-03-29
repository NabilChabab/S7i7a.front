<template>
  <div class="min-height-300 bg-primary position-absolute w-100"></div>
  <SideNav :navigationLinks="navigationLinks" :accountLinks="accountLinks" style="z-index: 999" />
  <main class="main-content position-relative border-radius-lg">
    <!-- Navbar -->
    <NavbarComponent />
      <ChatSection/>
    <FooterComponent/>
  </main>
  <!-- <div>
    <h1 v-text="userName"></h1>
    <div class="d-flex justify-content-between">
      <div
        class="users d-flex flex-wrap flex-column gap-5"
        v-if="users && users.length > 0"
      >
        <div v-for="(user, index) in users" :key="index" class="user">
          <a @click="startChat(user)" class="text-dark cursor-pointer">
            <img
              :src="user.profile || require('@/assets/img/avatar.png')"
              class="rounded-circle"
              style="width: 45px; height: 45px; object-fit: cover"
            />
            {{ user.name }}
            <span v-if="unreadMessages[user.id]" class="unread-messages">{{
              unreadMessages[user.id]
            }}</span>
         
          </a>
        </div>
      </div>
      <div v-else class="user">
        <p class="text-dark">You have no online consultations with anyone</p>
      </div>

      <div class="chat-room">
        <div v-if="selectedUser">
          <h2>Chatting with {{ selectedUser.name }}</h2>
          <div v-for="(message, index) in messages" :key="index">
            <p
              :class="{
                'text-red': message.sender_id === authUserId,
                'text-dark': message.sender_id !== authUserId,
              }"
            >
              {{ message.message }}
            </p>
          </div>
          <input v-model="newMessage" placeholder="Type your message..." :disabled="isChatDisabled" />
          <button @click="sendMessage" :disabled="isChatDisabled">Send</button>
        </div>
        <div v-else>
          <img src="@/assets/img/error.png" class="w-25 h-25" />
          <h3>Start chat with someone</h3>
        </div>
      </div>
    </div>
  </div> -->
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
        { url: "/patient/appointment", text: "My Appointments", iconClass: "bx bx-check-double text-info text-sm opacity-10" ,active:"nav-link"},
        { url: "/patient/articles", text: "Articles", iconClass: "bx bxs-notepad text-info text-sm opacity-10" ,active:"nav-link "},
        { url: "/patient/articles", text: "Doctors", iconClass: "bx bxs-notepad text-info text-sm opacity-10" ,active:"nav-link "},
        { url: "/chat", text: "Chat", iconClass: "bx bx-message-rounded-dots text-success text-sm opacity-10" ,active:"nav-link active"},
      ],
      accountLinks : [
        { p_url: "/patient/profile", p_text: "Profile", p_iconClass: "bx bx-user text-success text-sm opacity-10" ,p_active:"nav-link "},

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
