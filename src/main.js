import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router/route';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import "boxicons/css/boxicons.min.css";
import './assets/css/argon-dashboard.css';
import './assets/js/argon-dashboard.js';

//user
import "./assets/user/css/nucleo-icons.css";
import "./assets/user/css/nucleo-svg.css";

import 'aos/dist/aos.css';

// import materialKit from "material-kit";


//necesary



createApp(App).use(router).mount('#app');
