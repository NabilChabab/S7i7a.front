import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store/index.js'


import RegisterComponent from '@/views/Auth/RegisterComponent.vue';
import LoginComponent from '@/views/Auth/LoginComponent.vue';
import ResetPasswordComponent from '@/views/Auth/ResetPasswordComponent.vue';
import TheWelcomeVue from '@/views/TheWelcome.vue';
import DoctorDetails from '@/views/DoctorDetails.vue';
import ArticleDetails from '@/views/ArticleDetails.vue';
import ChatComponent from '@/views/ChatComponent.vue';
import ContactSection from '@/views/ContactComponent.vue';

//Admin
import DashboardComponent from '@/views/admin/DashboardComponent.vue';
import DoctorsComponent from '@/views/admin/DoctorsComponent.vue';
import CreateDoctorsComponent from '@/views/admin/create/CreateDoctorComponent.vue';
import UpdateDoctorsComponent from '@/views/admin/update/UpdateDoctorComponent.vue';
import PatientsComponent from '@/views/admin/PatientsComponent.vue';
import ProfileComponent from '@/views/admin/ProfileComponent.vue';
import CategoryComponent from '@/views/admin/CategoryComponent.vue';
import AdminArticles from '@/views/admin/ArticlesComponent.vue';
import AppointmentsComponent from '@/views/admin/AppointmentComponent.vue';
import PrescriptionComponents from '@/views/admin/PrescriptionComponent.vue';



//Doctor
import DoctorComponent from '@/views/doctor/DashboardComponent.vue';
import ArticlesComponent from '@/views/doctor/ArticlesComponent.vue';
import PrescriptionComponent from '@/views/doctor/PrescriptionComponent.vue';
import PrescriptionDetails from '@/views/doctor/PrescriptionDetails.vue';
import AppointmentComponent from '@/views/doctor/AppointmentComponent.vue';
import CreateArticleComponent from '@/views/doctor/create/CreateArticleComponent.vue';
import UpdateArticleComponent from '@/views/doctor/update/UpdateArticleComponent.vue';
import ProfileDoctor from '@/views/doctor/ProfileComponent.vue';


//Patients
import PatientComponent from '@/views/patient/PatientComponent.vue';
import PatientProfile from '@/views/patient/ProfileComponent.vue';
import AllDoctorsComponent from '@/views/patient/DoctorsComponent.vue';
import DoctorsByCategory from '@/views/patient/DoctorsByCategory.vue';
import AllArticlesComponent from '@/views/patient/ArticlesComponent.vue';
import PrescriptionComponentss from '@/views/patient/PrescriptionComponent.vue';


//unauthorized

import ErrorComponent from '@/views/error/ErrorComponent.vue';




const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return token !== null;
};

const getUserRole = () => {
  const user = store.state.user;
  return user ? user.role : null;
};

const routes = [
  //Guest user
  { path: '/', component: TheWelcomeVue},
  { path: '/register', component: RegisterComponent },
  { path: '/login', component: LoginComponent, meta: { requiresGuest: true }},
  { path: '/reset-password', component: ResetPasswordComponent },
  { path: '/doctor-details/:id', name: 'doctor-details',  component: DoctorDetails },
  { path: '/doctor-category/:id', name: 'doctor-byCategory',  component: DoctorsByCategory },
  { path: '/chat',  component: ChatComponent , meta: { requiresAuth: true } },
  { path: '/contact',  component: ContactSection , meta: { requiresAuth: true } },
  { path: '/doctors',  component: AllDoctorsComponent , meta: { requiresAuth: true } },
  { path: '/articles',  component: AllArticlesComponent , meta: { requiresAuth: true } },
  { path: '/article-details/:id', name: 'article-details',  component: ArticleDetails },
  { path: '/prescriptions/pdf/:id', name: 'show-prescription' , component: PrescriptionDetails, meta: { requiresAuth: true}},


  //Admin
  { path: '/admin/dashboard', component: DashboardComponent, meta: { requiresAuth: true, roles: ['Admin'] }},
  { path: '/admin/doctors', component: DoctorsComponent, meta: { requiresAuth: true, roles: ['Admin'] }},
  { path: '/admin/doctors/create', component: CreateDoctorsComponent, meta: { requiresAuth: true, roles: ['Admin'] }},
  { path: '/admin/doctors/edit/:id', name: 'edit_doctor' , component: UpdateDoctorsComponent, meta: { requiresAuth: true, roles: ['Admin'] }},
  { path: '/admin/patients', component: PatientsComponent, meta: { requiresAuth: true, roles: ['Admin'] }},
  { path: '/admin/categories', component: CategoryComponent, meta: { requiresAuth: true, roles: ['Admin'] }},
  { path: '/admin/profile', component: ProfileComponent, meta: { requiresAuth: true, roles: ['Admin'] }},
  { path: '/admin/articles', component: AdminArticles, meta: { requiresAuth: true, roles: ['Admin'] }},
  { path: '/admin/appointments', component: AppointmentsComponent, meta: { requiresAuth: true, roles: ['Admin'] }},
  { path: '/admin/prescriptions', component: PrescriptionComponents, meta: { requiresAuth: true, roles: ['Admin'] }},

  //Doctor
  { path: '/doctor/dashboard', component: DoctorComponent, meta: { requiresAuth: true, roles: ['Doctor'] }},
  { path: '/doctor/articles', component: ArticlesComponent, meta: { requiresAuth: true, roles: ['Doctor'] }},
  { path: '/doctor/appointments', component: AppointmentComponent, meta: { requiresAuth: true, roles: ['Doctor'] }},
  { path: '/doctor/prescriptions', component: PrescriptionComponent, meta: { requiresAuth: true, roles: ['Doctor'] }},
  { path: '/doctor/articles/create', component: CreateArticleComponent, meta: { requiresAuth: true, roles: ['Doctor'] }},
  { path: '/doctor/articles/edit/:id', name: 'edit_article' , component: UpdateArticleComponent, meta: { requiresAuth: true, roles: ['Doctor'] }},
  { path: '/doctor/profile', component: ProfileDoctor, meta: { requiresAuth: true, roles: ['Doctor'] }},
  //Patients
  { path: '/patient/appointment', component: PatientComponent, meta: { requiresAuth: true, roles: ['Patient'] }},
  { path: '/patient/profile', component: PatientProfile, meta: { requiresAuth: true, roles: ['Patient'] }},
  { path: '/patient/prescriptions', component: PrescriptionComponentss, meta: { requiresAuth: true, roles: ['Patient'] }},



  //unauthorized
  { path: '/unauthorized', component: ErrorComponent},

];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem('token');
  const isAuthenticate = token !== null;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const requiresGuest = to.matched.some(record => record.meta.requiresGuest);

  if (requiresGuest && isAuthenticate) {
    next(getRedirectRoute());
  } else if (requiresAuth) {
    if (!isAuthenticated()) {
      next('/login');
    } else {
      await store.dispatch('fetchUserData');
      const userRole = getUserRole();
      if (!userRole || (to.meta.roles && !to.meta.roles.includes(userRole))) {
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



export default router;
