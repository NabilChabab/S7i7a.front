import { createApp } from 'vue';
import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.min.css';
/* In your main CSS file or component */
import 'bootstrap';
import "boxicons/css/boxicons.min.css";
import { createRouter, createWebHistory } from 'vue-router';

import RegisterComponent from '@/components/Auth/RegisterComponent.vue';
import LoginComponent from '@/components/Auth/LoginComponent.vue';
import ResetPasswordComponent from '@/components/Auth/ResetPasswordComponent.vue';
import DashboardComponent from '@/components/admin/DashboardComponent.vue';
import DoctorComponent from '@/components/doctor/DoctorComponent.vue';
import PatientComponent from '@/components/patient/PatientComponent.vue';

const routes = [
  { path: '/register', component: RegisterComponent },
  { path: '/login', component: LoginComponent },
  { path: '/reset-password', component: ResetPasswordComponent },
  { path: '/admin/dashboard' , component: DashboardComponent},
  { path: '/doctor/dashboard' , component: DoctorComponent},
  { path: '/home' , component: PatientComponent},
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

createApp(App).use(router).mount('#app');
