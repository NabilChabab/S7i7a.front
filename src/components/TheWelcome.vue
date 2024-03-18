<script setup>
import { onMounted, onUnmounted } from "vue";
import Header from "@/components/layouts/bars/Header.vue";
import NavbarDefault from "@/components/layouts/bars/NavbarDefault.vue";
import PresentationCounter from "./Sections/PresentationCounter.vue";
import BuiltByDevelopers from "@/components/layouts/cards/categories/CategoryCard.vue";
import Categories from "@/components/layouts/cards/categories/CategoriesComponent.vue";

const body = document.getElementsByTagName("body")[0];
onMounted(() => {
  body.classList.add("presentation-page");
  body.classList.add("bg-gray-200");
});
onUnmounted(() => {
  body.classList.remove("presentation-page");
  body.classList.remove("bg-gray-200");
});
</script>

<template>
  <div class="container position-sticky z-index-sticky top-0">
    <div class="row">
      <div class="col-12">
        <NavbarDefault :sticky="true" />
      </div>
    </div>
  </div>
  <Header>
    <div
      class="container-fluid page-header min-vh-75 w-100 bg-gradient-primary"
      loading="lazy"
    >
      <div class="container">
        <div class="row">
          <div class="col-lg-7 text-center mx-auto position-relative">
            <h1
              class="text-white pt-3 mt-n5 me-2"
              :style="{ display: 'inline-block ' }"
            >
              <img
                src="@/assets/img/icons/logo/medical-check.png"
                class="navbar-brand-img h-100 w-15 mb-4"
                alt="main_logo"
              />
              S 7 I 7 A
            </h1>
            <p class="lead text-white px-5 mt-3" :style="{ fontWeight: '500' }">
              Welcome to <span class="">S7I7A.ma</span> - Your Trusted Online
              Medical Consultation Platform
            </p>
          </div>
        </div>
      </div>
    </div>
  </Header>
  <div class="card card-body blur shadow-blur mx-3 mx-md-4 mt-n6">
    <PresentationCounter />
    <BuiltByDevelopers />
    <div class="container">
      <div class="row">
          <Categories
            class="p-4"
            :color="{ text: 'white', background: 'bg-gradient-primary' }"
            :icon="{ component: '@/assets/img/cat-1.png'}"
            title="Getting Started"
            description="Check the possible ways of working with our product and the necessary files"
            :action="{
              route:
                'https://www.creative-tim.com/learning-lab/vue/overview/material-kit/',
              label: { text: 'Let\'s start', color: 'white' },
            }"
          />
      </div>
    </div>
  </div>
</template>

<style>
.page-header {
  max-width: 100%;
}
</style>
