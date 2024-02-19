import { createApp } from 'vue';
import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import "boxicons/css/boxicons.min.css";
import { createRouter, createWebHistory } from 'vue-router';

import RegisterComponent from '@/components/Auth/RegisterComponent.vue';
import LoginComponent from '@/components/Auth/LoginComponent.vue';
import ResetPasswordComponent from '@/components/Auth/ResetPasswordComponent.vue';
import DashboardComponent from '@/components/admin/DashboardComponent.vue';
import DoctorComponent from '@/components/doctor/DoctorComponent.vue';
import PatientComponent from '@/components/patient/PatientComponent.vue';
import TheWelcomeVue from './components/TheWelcome.vue';

const isAuthenticated = () => {

  return localStorage.getItem('token') !== null;
};

const getUserRole = () => {

  return localStorage.getItem('role');
};

const routes = [
  { path: '/register', component: RegisterComponent },
  { path: '/login', component: LoginComponent, meta: { requiresGuest: true }},
  { path: '/reset-password', component: ResetPasswordComponent },
  { path: '/admin/dashboard', component: DashboardComponent, meta: { requiresAuth: true, roles: ['Admin'] }},
  { path: '/doctor/dashboard', component: DoctorComponent, meta: { requiresAuth: true, roles: ['Doctor'] }},
  { path: '/patient/dashboard', component: PatientComponent, meta: { requiresAuth: true, roles: ['Patient'] }},
  { path: '/', component: TheWelcomeVue},
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const isAuthenticatedd = localStorage.getItem('token') !== null;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const requiresGuest = to.matched.some(record => record.meta.requiresGuest);

  if (requiresGuest && isAuthenticatedd) {
    next(getRedirectRoute());
  } else if (requiresAuth) {
    if (!isAuthenticated()) {
      next('/login');
    } else {
      const userRole = getUserRole();
      if (to.meta.roles && !to.meta.roles.includes(userRole)) {
        next('/unauthorized');
      } else {
        next();
      }
    }
  } else {
    next();
  }
});

function getRedirectRoute() {
  const userRole = getUserRole();
  switch (userRole) {
    case 'Admin':
      return '/admin/dashboard';
    case 'Doctor':
      return '/doctor/dashboard';
    case 'Patient':
      return '/patient/dashboard';
    default:
      return '/';
  }
}


createApp(App).use(router).mount('#app');
