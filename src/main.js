import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router/route";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "boxicons/css/boxicons.min.css";
import "./assets/css/argon-dashboard.css";
import "./assets/js/argon-dashboard.js";
import "vue-spinner/src/PulseLoader.vue";

//user
import "./assets/user/css/nucleo-icons.css";
import "./assets/user/css/nucleo-svg.css";

import "aos/dist/aos.css";

// Import Laravel Echo and Pusher libraries
import Echo from "laravel-echo";
import Pusher from "pusher-js";

// Configure Laravel Echo
window.Pusher = Pusher;

window.Echo = new Echo({
  broadcaster: "pusher",
  key: process.env.VUE_APP_PUSHER_APP_KEY,
  cluster: process.env.VUE_APP_PUSHER_APP_CLUSTER, // Use your environment variable
  wsHost: window.location.hostname,
  wsPort: 6001, // WebSocket port
  forceTLS: false, // Change to true if your WebSocket server uses HTTPS
  disableStats: true, // Optional: Disable stats
  enabledTransports: ["ws", "wss"], // Optional: Enable only WebSocket and Secure WebSocket
});



// Create and mount the Vue app
createApp(App).use(router).mount("#app");
