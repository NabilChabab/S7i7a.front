<template>
  <nav
    class="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl"
    id="navbarBlur"
    data-scroll="false"
  >
    <div class="container-fluid py-1 px-3">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
          <li class="breadcrumb-item text-sm">
            <a class="opacity-5 text-white" href="javascript:;">Pages</a>
          </li>
          <li
            class="breadcrumb-item text-sm text-white active"
            aria-current="page"
          >
            Dashboard
          </li>
        </ol>
        <h6 class="font-weight-bolder text-white mb-0">Dashboard</h6>
      </nav>
      <div
        class="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4"
        id="navbar"
      >
        <div class="ms-md-auto pe-md-3 d-flex align-items-center">
          <div class="input-group">
            <span class="input-group-text text-body"
              ><i class="fas fa-search" aria-hidden="true"></i
            ></span>
            <input
              type="text"
              class="form-control"
              placeholder="Type here..."
            />
          </div>
        </div>
        <ul class="navbar-nav justify-content-end">
          <li class="nav-item d-flex align-items-center">
            <a
              href="javascript:;"
              class="nav-link text-white font-weight-bold px-0"
            >
              <img
                :src="userProfile"
                alt=""
                style="width: 40px; height: 40px; object-fit: cover"
                class="rounded-circle me-3"
              />
              <span class="d-sm-inline d-none"> {{ userName }}</span>
            </a>
          </li>
          <li class="nav-item d-xl-none ps-3 d-flex align-items-center">
            <a
              class="nav-link text-white p-0 cursor-pointer"
              id="iconNavbarSidenav" @click="toggleSidenav"
            >
              <div class="sidenav-toggler-inner">
                <i class="sidenav-toggler-line bg-white"></i>
                <i class="sidenav-toggler-line bg-white"></i>
                <i class="sidenav-toggler-line bg-white"></i>
              </div>
            </a>
          </li>
          <li class="nav-item px-3 d-flex align-items-center">
            <a
              href="javascript:;"
              class="nav-link text-white p-0"
              id="dropdownMenuButton"
            >
              <i class="fa fa-bell fixed-plugin-button-nav cursor-pointer"></i>
            </a>
     
      
          </li>
          <li class="nav-item dropdown pe-2 d-flex align-items-center">
            <a
              href="javascript:;"
              class="nav-link text-white p-0"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="fa fa-cog cursor-pointer"></i>
            </a>
            <ul
              class="dropdown-menu dropdown-menu-end px-2 py-3 me-sm-n4"
              aria-labelledby="dropdownMenuButton"
            >
              <li class="mb-2">
                <a class="dropdown-item border-radius-md" href="javascript:;">
                  <div class="d-flex py-1">
                    <div class="d-flex flex-column justify-content-center">
                      <h6 class="text-sm font-weight-normal mb-1">
                        <span class="font-weight-bold">profile</span>
                      </h6>
                    </div>
                  </div>
                </a>
              </li>
              <li class="mb-2">
                <a class="dropdown-item border-radius-md" @click="logoutUser">
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
    </div>
  </nav>
</template>

<script>
import api from "@/services/api";
import store from "@/store/index"
export default {
  name: "NavbarComponent",

  data() {
    return {
      user:[],
    };
  },
  created() {
    const userData = store.getters.getUser;
    this.userName = userData.name;
    this.userProfile = userData.profile;
    this.fetchAuthenticate()

  },
  methods: {
    toggleSidenav() {
      console.log("Toggle sidebar clicked");
      this.$emit("toggle-sidenav");
    },
    logoutUser() {
      store.dispatch('logoutUser');
      this.$router.push("/");
    },
    async fetchAuthenticate() {
      try {
        const userId = this.userData.userId;
        const response = await api.get(`/admin/dashboard/${userId}`);
        this.user = response.data.user;
        console.log("the auth user"+this.user);
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style>
/* Add your styles here */
</style>
