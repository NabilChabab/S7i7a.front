import { createApp } from 'vue';
import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import "boxicons/css/boxicons.min.css";
import { createRouter, createWebHistory } from 'vue-router';
import './assets/css/argon-dashboard.css';

//user
import "./assets/user/css/nucleo-icons.css";
import "./assets/user/css/nucleo-svg.css";

// import materialKit from "material-kit";


//necesary
import RegisterComponent from '@/components/Auth/RegisterComponent.vue';
import LoginComponent from '@/components/Auth/LoginComponent.vue';
import ResetPasswordComponent from '@/components/Auth/ResetPasswordComponent.vue';
import DashboardComponent from '@/components/admin/DashboardComponent.vue';
import PatientComponent from '@/components/patient/PatientComponent.vue';
import TheWelcomeVue from './components/TheWelcome.vue';

//Admin
import DoctorsComponent from './components/admin/DoctorsComponent.vue';
import CreateDoctorsComponent from './components/admin/create/CreateDoctorComponent.vue';
import UpdateDoctorsComponent from './components/admin/update/UpdateDoctorComponent.vue';
import PatientsComponent from './components/admin/PatientsComponent.vue';
import ProfileComponent from './components/admin/ProfileComponent.vue';
import CategoryComponent from './components/admin/CategoryComponent.vue';


//Doctor
import DoctorComponent from '@/components/doctor/DashboardComponent.vue';
import ArticlesComponent from '@/components/doctor/ArticlesComponent.vue';
import CreateArticleComponent from './components/doctor/create/CreateArticleComponent.vue';
import UpdateArticleComponent from './components/doctor/update/UpdateArticleComponent.vue';

//unauthorized

import ErrorComponent from '@/components/error/ErrorComponent.vue';




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
  { path: '/patient/dashboard', component: PatientComponent, meta: { requiresAuth: true, roles: ['Patient'] }},
  { path: '/', component: TheWelcomeVue},
  { path: '/admin/doctors', component: DoctorsComponent, meta: { requiresAuth: true, roles: ['Admin'] }},
  { path: '/admin/doctors/create', component: CreateDoctorsComponent, meta: { requiresAuth: true, roles: ['Admin'] }},
  { path: '/admin/doctors/edit/:id', name: 'edit_doctor' , component: UpdateDoctorsComponent, meta: { requiresAuth: true, roles: ['Admin'] }},
  { path: '/admin/patients', component: PatientsComponent, meta: { requiresAuth: true, roles: ['Admin'] }},
  { path: '/admin/categories', component: CategoryComponent, meta: { requiresAuth: true, roles: ['Admin'] }},
  { path: '/admin/profile', component: ProfileComponent, meta: { requiresAuth: true, roles: ['Admin'] }},

  //Doctor
  { path: '/doctor/dashboard', component: DoctorComponent, meta: { requiresAuth: true, roles: ['Doctor'] }},
  { path: '/doctor/articles', component: ArticlesComponent, meta: { requiresAuth: true, roles: ['Doctor'] }},
  { path: '/doctor/articles/create', component: CreateArticleComponent, meta: { requiresAuth: true, roles: ['Doctor'] }},
  { path: '/doctor/articles/edit/:id', name: 'edit_article' , component: UpdateArticleComponent, meta: { requiresAuth: true, roles: ['Doctor'] }},


  //unauthorized
  { path: '/unauthorized', component: ErrorComponent},

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
