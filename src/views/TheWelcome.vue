<script setup>
import { onMounted, onUnmounted } from "vue";
import HeaderLayout from "@/components/layouts/bars/HeaderComponent.vue";
import NavbarDefault from "@/components/layouts/bars/NavbarDefault.vue";
import PresentationCounter from "@/components/Sections/PresentationCounter.vue";
import BuiltByDevelopers from "@/components/layouts/cards/categories/CategoryCard.vue";
import Categories from "@/components/layouts/cards/categories/CategoriesComponent.vue";
import TopDoctors from "@/components/Sections/TopDoctors.vue";
import Posts from "@/components/Sections/TopArticles.vue";


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
  <div class="bg-gray-200">
    <div class="container position-sticky z-index-sticky top-0">
    <div class="row">
      <div class="col-12">
        <NavbarDefault :sticky="true" />
      </div>
    </div>
  </div>
  <HeaderLayout/>
  <div class="card card-body blur shadow-blur mx-3 mx-md-4 mt-n6">
    <PresentationCounter/>
    <BuiltByDevelopers />
   
    <div class="container mt-5 mb-5">
      <div class="row mb-5">
        <div class="col-md-8 text-center mb-5 mt-5 w-100">
          <h3 class="text-dark z-index-1 position-relative">
            Our Categories
          </h3>
          <p class="text-dark opacity-8 mb-0">
            There’s nothing I really wanted to do in life that I wasn’t able to
            get good at. That’s my skill.
          </p>
        </div>
      </div>
      <div class="row">
          <Categories
            class="p-4"
            :color="{ text: 'dark', background: '' }"
            description="Check the possible ways of working with our product and the necessary files"/>
      </div>
    </div>
    <TopDoctors />
    <Posts />
  </div>
  </div>
</template>

<style>
.page-header {
  max-width: 100%;
}
</style>
