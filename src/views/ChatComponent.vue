<template>
  <div>
    <div v-for="(message, index) in messages" :key="index">
      <p class="text-dark">{{ message.message }}</p>
    </div>
    <input v-model="newMessage" placeholder="Type your message..." />
    <button @click="sendMessage">Send</button>
  </div>
</template>

<script>
import api from "@/services/api";

export default {
  data() {
    return {
      messages: [], // Array to store received messages
      newMessage: "", // Variable to store the new message to be sent
    };
  },
  created() {
    // Listen for messages broadcasted from the backend
    window.Echo.channel(process.env.VUE_APP_BROADCAST_CHANNEL || "chat").listen(
      "MessageSent", // Use the correct event name
      (data) => {
        // Push the received message object into the messages array
        this.messages.push(data.message);
      }
    );
  },

  methods: {
    // Function to send a new message
    async sendMessage() {
      try {
        await api.post("/messages", {
          message: this.newMessage,
          user_id: localStorage.getItem("userId"),
        });
   

        // Clear the input field
        this.newMessage = "";
      } catch (error) {
        console.error("Error sending message:", error);
      }
    },
  },
};
</script>
