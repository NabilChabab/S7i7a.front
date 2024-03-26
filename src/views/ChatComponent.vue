<template>
  <div>
    <div v-for="(user, index) in users" :key="index">
      <a @click="startChat(user)" class="text-dark cursor-pointer">{{ user.name }}</a>
    </div>

    <div v-if="selectedUser">
      <h2>Chatting with {{ selectedUser.name }}</h2>
      <div v-for="(message, index) in messages" :key="index">
        <p :class="{ 'text-dark': message.sender_id !== authUserId, 'text-danger': message.sender_id === authUserId}">
          {{ message.message }}
        </p>
      </div>

      <input v-model="newMessage" placeholder="Type your message..." />
      <button @click="sendMessage">Send</button>
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
    };
  },
  created() {
    const role = localStorage.getItem("role");
    if (role === "Patient") {
      this.fetchDoctors();
    } else if (role === "Doctor") {
      this.fetchPatients();
    }

    // Call fetchMessages after users are fetched (assuming you want messages for the first user)
    if (this.users.length > 0) {
      this.selectedUser = this.users[0]; // Select the first user
      this.fetchMessages();
    }

    window.Echo.channel(process.env.VUE_APP_BROADCAST_CHANNEL || "chat").listen(
      "MessageSent",
      (data) => {
        this.messages.push(data.message);
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

<style>
  .text-red {
    color: red;
  }
</style>
