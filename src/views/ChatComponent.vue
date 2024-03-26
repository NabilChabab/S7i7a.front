<template>
  <div>
    <h1>{{ userName }}</h1>
    <div class="d-flex justify-content-between">
      <div class="users d-flex flex-wrap flex-column gap-5">
        <div v-for="(user, index) in users" :key="index" class="user">
          <a @click="startChat(user)" class="text-dark cursor-pointer">
            <img :src="user.profile || require('@/assets/img/avatar.png')" class="rounded-circle" style="width: 45px; height: 45px; object-fit: cover;"> {{ user.name }}
            <span v-if="unreadMessages[user.id]" class="unread-messages">{{ unreadMessages[user.id] }}</span>
          </a>
        </div>
      </div>
      <div class="chat-room">
        <div v-if="selectedUser">
          <h2>Chatting with {{ selectedUser.name }}</h2>
          <div v-for="(message, index) in messages" :key="index">
            <p :class="{ 'text-red': message.sender_id === authUserId, 'text-dark': message.sender_id !== authUserId }">
              {{ message.message }}
            </p>
          </div>
          <input v-model="newMessage" placeholder="Type your message..." />
          <button @click="sendMessage">Send</button>
        </div>
        <div v-else>
          <img src="@/assets/img/error.png" class="w-25 h-25">
          <h3>Start chat with someone</h3>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/services/api";

export default {
  data() {
    return {
      users: [],
      selectedUser: null,
      messages: [],
      newMessage: "",
      userName: localStorage.getItem('name'),
      unreadMessages: JSON.parse(localStorage.getItem('unreadMessages')) || {}, // Retrieve unread messages from local storage
    };
  },
  created() {
    const role = localStorage.getItem("role");
    if (role === "Patient") {
      this.fetchDoctors();
    } else if (role === "Doctor") {
      this.fetchPatients();
    }

    if (this.users.length > 0) {
      this.selectedUser = this.users[0]; 
      this.fetchMessages();
    }

    window.Echo.channel(process.env.VUE_APP_BROADCAST_CHANNEL || "chat").listen(
      "MessageSent",
      (data) => {
        this.messages.push(data.message);
        // Increment unread message count if the message is not from the current user
        if (data.message.sender_id !== this.authUserId) {
          this.unreadMessages[data.message.sender_id] = (this.unreadMessages[data.message.sender_id] || 0) + 1;
          // Update local storage
          localStorage.setItem('unreadMessages', JSON.stringify(this.unreadMessages));
        }
      }
    );
  },
  computed: {
    authUserId() {
      return localStorage.getItem("userId");
    },
  },
  methods: {
    async fetchDoctors() {
      try {
        const response = await api.get("/patient/doctors");
        this.users = response.data.doctors;
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    },
    async fetchPatients() {
      try {
        const response = await api.get("/users");
        this.users = response.data.patients;
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    },
    startChat(user) {
      this.selectedUser = user;
      this.fetchMessages();
      // Reset unread message count when the user clicks on the user to view the messages
      this.unreadMessages[user.id] = 0;
      // Update local storage
      localStorage.setItem('unreadMessages', JSON.stringify(this.unreadMessages));
    },
    async fetchMessages() {
      try {
        let userId;
        const role = localStorage.getItem("role");
        if (role === "Doctor") {
          userId = this.selectedUser.id;
        } else {
          userId = this.selectedUser.user_id;
        }

        const response = await api.get(`/messages/${userId}`);
        this.messages = response.data.messages;
        console.log(this.messages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    },

    async sendMessage() {
      try {
        let senderId;
        let receiverId;
        const role = localStorage.getItem("role");

        if (role === "Doctor") {
          const docId = localStorage.getItem("doc");
          senderId = docId;
          receiverId = this.selectedUser.id;
        } else {
          senderId = this.authUserId;
          receiverId = this.selectedUser.user_id;
        }

        await api.post("/messages", {
          message: this.newMessage,
          receiver_id: receiverId,
          sender_id: senderId,
        });

        this.newMessage = "";

        this.fetchMessages();
      } catch (error) {
        console.error("Error sending message:", error);
      }
    },
  },
};
</script>

<style scoped>
  .text-red {
    color: red;
  }
  .unread-messages {
    color: red;
    font-weight: bold;
    margin-left: 5px;
  }
</style>
