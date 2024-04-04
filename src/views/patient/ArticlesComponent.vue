<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import HeaderLayout from "@/components/layouts/bars/HeaderComponent.vue";
import NavbarDefault from "@/components/layouts/bars/NavbarDefault.vue";
import AllArticles from "@/components/Sections/AllArticles.vue";
import DefaultFooter from "@/components/layouts/footer/FooterDefault.vue";

const imageUrl = ref('https://images.pexels.com/photos/4031904/pexels-photo-4031904.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');
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
    <HeaderLayout :image="imageUrl" />
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
