<script setup>
import { defineProps, onMounted, onUnmounted } from "vue";
import HeaderLayout from "@/components/layouts/bars/HeaderComponent.vue";
import NavbarDefault from "@/components/layouts/bars/NavbarDefault.vue";
import AllArticles from "@/components/Sections/AllArticles.vue";
import DefaultFooter from "@/components/layouts/footer/FooterDefault.vue";

defineProps({
  headerImageUrl: {
    type: String,
    default:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
});

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
    <HeaderLayout :imageUrl="headerImageUrl" />
    <div class="card card-body blur shadow-blur mx-3 mx-md-4 mt-n6">
      <AllArticles />
    </div>
    <DefaultFooter />
  </div>
</template>

<style>
.page-header {
  max-width: 100%;
}
</style>
