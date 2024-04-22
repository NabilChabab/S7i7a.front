<template>
  <nav
    class="navbar navbar-expand-lg blur border-radius-lg top-0 z-index-3 shadow position-absolute mt-4 py-2 start-0 end-0 mx-4"
  >
    <div class="container-fluid">
      <router-link
        class="navbar-brand font-weight-bolder ms-lg-0 ms-3"
        :to="{ path: '/' }"
      >
        <img
          src="@/assets/img/icons/logo/medical-check.png"
          class="navbar-brand-img mb-1"
          alt="main_logo"
          style="width: 22px; height: 22px"
        />
        S7I7A.ma
      </router-link>
      <button
        class="navbar-toggler shadow-none ms-2"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navigation"
        aria-controls="navigation"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon mt-2">
          <span class="navbar-toggler-bar bar1"></span>
          <span class="navbar-toggler-bar bar2"></span>
          <span class="navbar-toggler-bar bar3"></span>
        </span>
      </button>
      <div class="collapse navbar-collapse" id="navigation" v-if="user.role">
        <ul class="navbar-nav mx-auto">
          <li class="nav-item" v-if="user.role === 'Patient'">
            <router-link
              class="nav-link me-2"
              :to="{ path: '/patient/appointment' }"
            >
              My Dashboard
            </router-link>
          </li>
          <li class="nav-item" v-if="user.role === 'Doctor'">
            <router-link
              class="nav-link me-2"
              :to="{ path: '/doctor/dashboard' }"
            >
              My Dashboard
            </router-link>
          </li>
          <li class="nav-item" v-if="user.role === 'Admin'">
            <router-link
              class="nav-link me-2"
              :to="{ path: '/admin/dashboard' }"
            >
              My Dashboard
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              :class="{ 'text-primary font-weight-bold': isActive('/doctors') }"
              class="nav-link me-2"
              :to="{ path: '/doctors' }"
            >
              Doctors
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link me-2"
              :to="{ path: '/articles' }"
              :class="{
                'text-primary font-weight-bold': isActive('/articles'),
              }"
            >
              Advices
            </router-link>
          </li>

          <li class="nav-item">
            <a href="#about"
              class="nav-link me-2"
              :class="{ 'text-primary font-weight-bold': isActive('/about') }"
            >
              About us
            </a>
          </li>

          <li class="nav-item">
            <router-link :to="{ path: '/contact' }"
              class="nav-link me-2 cursor-pointer"
              :class="{ 'text-primary font-weight-bold': isActive('/contact') }"
            >
              Contact us
            </router-link>
          </li>
        </ul>
        <ul class="navbar-nav d-lg-block d-none">
          <li class="nav-item d-flex justify-content-center align-items-center">
            <router-link :to="{ path: '/' }" class="nav-link text-center"
              ><img
                :src="user.profile || require('@/assets/img/avatar.png')"
                alt=""
                style="width: 35px; height: 35px"
                class="rounded-circle me-2"
              />
              {{ user.name }}</router-link
            >
            <a
              href="javascript:;"
              class="nav-link text-white p-0"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="fa fa-cog cursor-pointer text-dark mb-2 ms-3"></i>
            </a>
            <ul
              class="dropdown-menu dropdown-menu-end px-2 py-3 me-sm-n4"
              aria-labelledby="dropdownMenuButton"
            >
              <li
                class="mb-2"
                v-if="
                  user.role === 'Patient' ||
                  user.role === 'Doctor' ||
                  user.role === 'Admin'
                "
              >
                <router-link
                  :to="profilePath"
                  class="dropdown-item border-radius-md"
                >
                  <div class="d-flex py-1">
                    <div class="d-flex flex-column justify-content-center">
                      <h6 class="text-sm font-weight-normal mb-1">
                        <span class="font-weight-bold">Profile</span>
                      </h6>
                    </div>
                  </div>
                </router-link>
              </li>
              <li class="mb-2">
                <a
                  class="dropdown-item border-radius-md cursor-pointer"
                  @click="logoutUser"
                >
                  <div class="d-flex py-1">
                    <div class="d-flex flex-column justify-content-center">
                      <h6 class="text-sm font-weight-normal mb-1">
                        <span class="font-weight-bold">logout</span>
                      </h6>
                    </div>
                  </div>
                </a>
              </li>
              <li class="mb-2">
                <a class="dropdown-item border-radius-md" href="javascript:;">
                  <div class="d-flex py-1">
                    <div class="d-flex flex-column justify-content-center">
                      <h6 class="text-sm font-weight-normal mb-1">
                        <span class="font-weight-bold">Settings</span>
                      </h6>
                    </div>
                  </div>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="collapse navbar-collapse" v-else>
        <ul class="navbar-nav mx-auto">
          <li class="nav-item">
            <router-link class="nav-link me-2" :to="{ path: '/register' }">
              <i class="fas fa-user-circle opacity-6 text-dark me-1"></i>
              Sign Up
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link me-2" :to="{ path: '/login' }">
              <i class="fas fa-key opacity-6 text-dark me-1"></i>
              Sign In
            </router-link>
          </li>
        </ul>
        <ul class="navbar-nav d-lg-block d-none">
          <li class="nav-item">
            <router-link
              :to="{ path: 'register' }"
              class="btn btn-sm mb-0 me-1 btn-primary"
              >Subscribe</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { useRoute } from "vue-router";
import { ref, watch } from "vue";
import { useWindowsWidth } from "@/assets/user/js/useWindowsWidth";
import store from "@/store/index";
export default {
  props: {
    action: {
      type: Object,
      default: () => ({
        route: "https://www.creative-tim.com/product/vue-material-kit",
        color: "bg-gradient-success",
        label: "Free Download",
      }),
    },
    transparent: {
      type: Boolean,
      default: false,
    },
    light: {
      type: Boolean,
      default: false,
    },
    dark: {
      type: Boolean,
      default: false,
    },
    sticky: {
      type: Boolean,
      default: false,
    },
    darkText: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const route = useRoute();
    const type = useWindowsWidth().type;
    const textDark = ref(props.darkText);

    const isActive = (path) => {
      return route.path === path;
    };

    watch(
      () => type.value,
      (newValue) => {
        if (newValue === "mobile") {
          textDark.value = true;
        } else {
          textDark.value = false;
        }
      }
    );

    if (type.value === "mobile") {
      textDark.value = true;
    } else if (type.value === "desktop" && textDark.value == false) {
      textDark.value = false;
    }

    console.log("Current Route:", route.path);

    return {
      textDark,
      route,
      isActive,
    };
  },
  data() {
    return {
      user: {
        role: "",
        name: "",
        profile: "",
        default: require("@/assets/img/avatar.png"),
      },
    };
  },
  computed: {
    profilePath() {
      switch (this.user.role) {
        case "Patient":
          return { path: "/patient/profile" };
        case "Doctor":
          return { path: "/doctor/profile" };
        case "Admin":
          return { path: "/admin/profile" };
        default:
          return {};
      }
    },
  },
  created() {
    this.initializeUser();
  },
  methods: {
    async initializeUser() {
      try {
        await store.dispatch("fetchUserData");
        const userData = store.getters.getUser;
        if (userData) {
          this.user.name = userData.name || "";
          this.user.profile = userData.profile || this.user.profile;
          this.user.role = userData.role || "";
        }
      } catch (error) {
        console.error("Error initializing user data:", error);
      }
    },
    logoutUser() {
      store.dispatch("logoutUser");
      window.location.reload();
    },
  },
};
</script>

<style>
.active {
  font-weight: bold;
}
</style>
