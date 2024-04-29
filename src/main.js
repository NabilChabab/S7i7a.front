import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router/router";
import store from "@/store/index" ;
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "boxicons/css/boxicons.min.css";
import "@/assets/css/argon-dashboard.css";
import "@/assets/js/argon-dashboard.js";
import "vue-spinner/src/PulseLoader.vue";
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';

//user
import "@/assets/user/css/nucleo-icons.css";
import "@/assets/user/css/nucleo-svg.css";

import "aos/dist/aos.css";

import VueStripeElementsPlus from "vue-stripe-elements-plus";

import Echo from "laravel-echo";
import Pusher from "pusher-js";

window.Pusher = Pusher;

window.Echo = new Echo({
  broadcaster: "pusher",
  key: process.env.VUE_APP_PUSHER_APP_KEY,
  cluster: process.env.VUE_APP_PUSHER_APP_CLUSTER,
  wsHost: window.location.hostname,
  wsPort: 6001,
  forceTLS: false,
  disableStats: true,
  enabledTransports: ["ws", "wss"],
});

createApp(App)
  .use(router)
  .use(store)
  .use(ToastPlugin)
  .use(VueStripeElementsPlus, {
    publishableKey: 'YOUR_STRIPE_PUBLISHABLE_KEY'
  })
  .mount("#app");
