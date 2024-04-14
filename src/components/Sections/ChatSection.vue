<template>
  <div class="container-fluid py-4">
    <CardsComponent />
    <div class="row mt-4">
      <div class="col-lg-3 mb-lg-0 mb-4">
        <div class="card" v-if="users && users.length > 0" style="height: 80vh">
          <div class="card-header pb-0 p-3">
            <div class="d-flex justify-content-between">
              <h6 class="mb-2">Your consultations</h6>
            </div>
          </div>
          <div class="card-body p-3">
            <div class="message-boxs mb-3">
              <input
                type="text"
                class="message-input"
                v-model="searchQuery"
                placeholder="Search"
              />
              <i class="bx bx-search text-primary me-3"></i>
            </div>
            <ul
              class="list-group"
              v-for="(user, index) in filteredUsers"
              :key="index"
            >
              <li
                class="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg cursor-pointer"
                :class="{ active: user === selectedUser }"
                @click="startChat(user)"
              >
                <div class="d-flex align-items-center">
                  <img
                    :src="user.profile || require('@/assets/img/avatar.png')"
                    class="rounded-circle icon icon-shape icon-sm me-3 bg-gradient-dark shadow text-center"
                    style="width: 45px; height: 45px"
                  />
                  <div
                    class="d-flex flex-column"
                    v-for="(app, index) in appointments[index]"
                    :key="index"
                  >
                    <h6 class="mb-1 text-dark text-sm">{{ user.name }}</h6>
                    <span class="text-xs"
                      >{{ app.appointment_date }} /
                      <span class="font-weight-bold">{{
                        app.appointment_hour
                      }}</span></span
                    >
                  </div>
                </div>

                <div class="d-flex">
                  <div
                    v-for="(status, index) in appointment_status[index]"
                    :key="index"
                    class="mt-2"
                  >
                    <i
                      class="bx bxs-circle text-success"
                      v-if="status.status === 'inProgress'"
                    ></i>
                    <i class="bx bxs-circle text-secondary" v-else></i>
                  </div>
                  <button
                    class="btn btn-link btn-icon-only btn-rounded btn-sm text-dark icon-move-right my-auto"
                  >
                    <span
                      v-if="unreadMessages[user.id]"
                      class="unread-messages"
                      >{{ unreadMessages[user.id] }}</span
                    >
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div v-else class="card">
          <div class="card-header pb-0 p-3">
            <div class="d-flex justify-content-between">
              <h6 class="mb-2">Your consultations</h6>
            </div>
          </div>
          <div class="card-body p-3">
            <ul class="list-group">
              <li
                class="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg"
              >
                <div class="d-flex align-items-center">
                  <div class="d-flex flex-column">
                    <h6 class="mb-1 text-secondary text-sm">
                      You have no online consultations with anyone
                    </h6>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col-lg-9">
        <div class="card" style="height: 80vh">
          <div class="card-header pb-0 p-3" v-if="selectedUser">
            <h6 class="mb-0">Chatting with {{ selectedUser.name }}</h6>
          </div>
          <div class="card-body p-3 chat">
            <div class="message-container">
              <div
                v-for="(message, index) in messages"
                :key="index"
                class="message d-flex gap-3"
              >
                <p
                  class="mb-3"
                  :class="{
                    'align-self-end right bg-primary text-white mb-3':
                      message.sender_id === parseInt(authDocId) ||
                      message.sender_id === parseInt(authUserId),
                  }"
                >
                  {{ message.message }}
                </p>
              </div>
            </div>
            <div
              class="mt-3 d-flex align-items-center justify-content-center gap-3 box"
            >
              <div v-if="isChatDisabled">
                <p class="text-danger text-center" style="width: 1120px">
                  You can't start chatting with your doctor before consultation
                  date
                </p>
              </div>
              <div class="message-boxs" v-else>
                <input
                  type="text"
                  class="message-input"
                  v-model="newMessage"
                  placeholder="Type message..."
                />
                <input
                  type="file"
                  ref="fileInput"
                  accept="application/pdf"
                  @change="handleFileUpload"
                  class="d-none"
                />
                <i
                  class="bx bxs-file-pdf text-primary me-3"
                  @click="openFileInput"
                ></i>
                <i class="bx bxs-microphone text-primary"></i>
                <button class="message-submit" @click="sendMessage">
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CardsComponent from "@/components/layouts/cards/admin/LatestComponent.vue";
import api from "@/services/api";
import store from "@/store/index";

export default {
  data() {
    return {
      users: [],
      appointments: [],
      appointment_status: [],
      pdfFile: null,
      selectedUser: null,
      messages: [],
      newMessage: "",
      searchQuery: "",
      userName: localStorage.getItem("name"),
      unreadMessages: JSON.parse(localStorage.getItem("unreadMessages")) || {}, // Retrieve unread messages from local storage
    };
  },
  created() {
    const role = this.authRole;
    if (role === "Patient" || role === "Admin") {
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
        if (
          data.message.sender_id !== this.authUserId ||
          data.message.sender_id !== this.authDocId
        ) {
          this.unreadMessages[data.message.sender_id] =
            (this.unreadMessages[data.message.sender_id] || 0) + 1;
          localStorage.setItem(
            "unreadMessages",
            JSON.stringify(this.unreadMessages)
          );
        }
      }
    );
  },
  computed: {
    filteredUsers() {
      return this.users.filter((user) =>
        user.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    authRole() {
      const userData = store.getters.getUser;
      return userData.role;
    },
    authUserId() {
      const userData = store.getters.getUser;
      return userData.userId;
    },
    authDocId() {
      const userData = store.getters.getUser;
      return userData.doc ?? '';
    },
    profile() {
      return localStorage.getItem("profile");
    },
    isChatDisabled() {
      if (!this.selectedUser) return true;
      if (!this.selectedUser.appointments) return true;

      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const currentHour = now.getHours();

      const todayAppointment = this.selectedUser.appointments.find(
        (appointment) => {
          const appointmentDate = new Date(appointment.appointment_date);
          const appointmentHour = parseInt(
            appointment.appointment_hour.split(":")[0]
          );
          return (
            appointmentDate.getTime() === today.getTime() &&
            appointmentHour === currentHour
          );
        }
      );

      return !todayAppointment;
    },
  },
  methods: {
    openFileInput() {
      this.$refs.fileInput.click();
    },
    handleFileUpload(event) {
      const files = event.target.files;
      if (files.length > 0) {
        this.pdfFile = files[0];
      }
    },
    async fetchDoctors() {
      try {
        const response = await api.get("/doctors");
        this.users = response.data.doctors;
        this.appointments = response.data.doctors.map((doctor) => {
          return doctor.appointments.map((appointment) => {
            return {
              appointment_date: appointment.appointment_date,
              appointment_hour: appointment.appointment_hour,
            };
          });
        });
        this.appointment_status = response.data.doctors.map((doctor) => {
          return doctor.appointment_status.map((appointment) => {
            return {
              status: appointment.status,
            };
          });
        });
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    },
    async fetchPatients() {
      try {
        const response = await api.get("/users");
        this.users = response.data.patients;
        this.appointments = response.data.patients.map((patient) => {
          return patient.appointments.map((appointment) => {
            return {
              appointment_date: appointment.appointment_date,
              appointment_hour: appointment.appointment_hour,
            };
          });
        });
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    },
    startChat(user) {
      this.selectedUser = user;
      this.fetchMessages();
      this.unreadMessages[user.id] = 0;
      localStorage.setItem(
        "unreadMessages",
        JSON.stringify(this.unreadMessages)
      );
    },
    async fetchMessages() {
      try {
        let userId;
        const role = this.authRole;
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
        const role = this.authRole;

        if (role === "Doctor") {
          const docId = this.authDocId;
          senderId = docId;
          receiverId = this.selectedUser.id;
        } else {
          senderId = this.authUserId;
          receiverId = this.selectedUser.user_id;
        }

        const formData = new FormData();

        if (this.pdfFile) {
          // Append PDF file to FormData
          formData.append("prescription", this.pdfFile);
        } else {
          // Append default text message to FormData
          formData.append("message", this.newMessage);
        }

        // Append sender_id and receiver_id to FormData
        formData.append("receiver_id", receiverId);
        formData.append("sender_id", senderId);

        // Send FormData using a POST request to the backend
        await api.post("/messages", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        this.pdfFile = null;
        this.$refs.fileInput.value = "";
        this.newMessage = ""

        this.fetchMessages();
      } catch (error) {
        console.error("Error sending message:", error);
      }
    },

    isPdfFile(file) {
      return file && file.type === "application/pdf";
    },

    showNotification(message) {
      if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
      } else {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            const notification = new Notification("New Message", {
              body: message,
            });

            notification.onclick = () => {
              console.log("Notification clicked");
            };
          } else {
            console.log("Notification permission denied");
          }
        });
      }
    },
  },
  components: {
    CardsComponent,
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
.message {
  margin-bottom: 10px;
  width: 100%;
}

.message-container {
  overflow-y: scroll;
  height: 65vh;
}
.message-container::-webkit-scrollbar {
  display: none;
}

.message-container {
  scrollbar-width: none;
}

.message-container .right {
  text-align: start;
  right: 10px;
  width: 100%;
  float: right;
  margin-left: 85%;
}

.message p {
  margin: 0;
  padding: 5px 10px;
  border-radius: 10px;
  width: 150px;
  height: auto;
  background-color: #f0f0f0;
}

/* Style for input group */
.input-group {
  margin-top: 20px;
}

/* Style for send button */
.input-group .btn-primary {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

/* Style for chat box */
.chat {
  position: absolute;
  bottom: 0;
}

/* Style for icons in the message box */
.box i {
  font-size: 30px;
  cursor: pointer;
}

/* Style for message input box */
.message-boxs {
  display: flex; /* Arrange elements horizontally */
  align-items: center; /* Vertically align elements */
  border-radius: 25px; /* Add rounded corners */
  padding: 5px;
  box-shadow: 0px 5px 5px rgba(63, 63, 63, 0.103);
  border: 1px solid rgb(157, 175, 255);
}

/* Style for message input */
.message-input {
  border: none; /* Remove default border */
  outline: none; /* Remove default outline */
  font-size: 16px; /* Set font size */
  padding: 5px;
  width: 900px;
}

/* Style for send button */
.message-submit {
  background-color: transparent; /* Set button color */
  color: rgb(77, 88, 247); /* Set button text color */
  border: none; /* Remove default border */
  padding: 10px 15px; /* Add padding */
  border-radius: 5px; /* Add rounded corners */
  cursor: pointer; /* Set cursor to pointer on hover */
}

/* Style to align authenticated user's message to the right */
.align-self-end {
  align-self: flex-end; /* Align message to the end of the container */
}
</style>
