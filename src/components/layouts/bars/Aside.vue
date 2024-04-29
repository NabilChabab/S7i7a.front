<template>
  <aside class="sidenav bg-dark navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-4" id="sidenav-main">
    <div class="sidenav-header">
      <i class="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav"></i>
      <a class="navbar-brand m-0" href="/">
        <img src="@/assets/img/icons/logo/medical-check.png" class="navbar-brand-img h-100" alt="main_logo">
        <span class="ms-1 font-weight-bold text-white">S7I7A.ma</span>
      </a>
    </div>
    <hr class="horizontal dark mt-0">
    <div class="collapse navbar-collapse w-auto" id="sidenav-collapse-main">
      <ul class="navbar-nav">
        <li v-for="(link, index) in navigationLinks" :key="index" class="nav-item">
          <router-link :to="link.url" :class="link.active">
            <div class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
              <i :class="link.iconClass"></i>
            </div>
            <span class="nav-link-text ms-1 text-white">{{ link.text }}</span>
          </router-link>
        </li>
        <li class="nav-item mt-3">
          <h6 class="ps-4 ms-2 text-uppercase text-xs font-weight-bolder opacity-6 text-white">Account pages</h6>
        </li>
        <li v-for="(link, index) in accountLinks" :key="'account-' + index" class="nav-item">
          <router-link :to="link.p_url" :class="link.p_active">
            <div class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
              <i :class="link.p_iconClass"></i>
            </div>
            <span class="nav-link-text ms-1 text-white">{{ link.p_text }}</span>
          </router-link>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script>
export default {
  name: "SideNav",
  props: {
    navigationLinks: {
      type: Array,
      default: () => []
    },
    accountLinks: {
      type: Array,
      default: () => []
    },
    showAside: {
      type: Boolean,
      required: true
    }
  }
};
</script>

<style>
/* Add your styles here */
</style>
