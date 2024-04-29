<template>
  <PreLoader
    :loading="loading"
    :color="loaderColor"
    :size="loaderSize"
    style=""
    :class="{ loading: loading }"
  />
  <div class="bg-gray-200" v-show="!loading">
    <div class="container position-sticky z-index-sticky top-0">
      <div class="row">
        <div class="col-12">
          <NavbarDefault :sticky="true" />
        </div>
      </div>
    </div>
    <HeaderLayout :image="imageUrl" />
    <div class="card card-body blur shadow-blur mx-3 mx-md-4 mt-n6">
      <PresentationCounter />
      <BuiltByDevelopers />

      <div class="container mt-5 mb-5">
        <div class="row mb-5">
          <div class="col-md-8 text-center mb-5 mt-5 w-100">
            <h3 class="text-dark z-index-1 position-relative">
              Our Categories
            </h3>
            <p class="text-dark opacity-8 mb-0">
              There’s nothing I really wanted to do in life that I wasn’t able
              to get good at. That’s my skill.
            </p>
          </div>
        </div>
        <div class="row">
          <Categories
            class="p-4"
            :color="{ text: 'dark', background: '' }"
            description="Check the possible ways of working with our product and the necessary files"
          />
        </div>
      </div>
      <TopDoctors />
      <Posts />
      <div id="about" class="mt-5">
        <div class="row mb-5">
          <div class="col-md-8 text-center mb-5 mt-5 w-100">
            <h3 class="text-dark z-index-1 position-relative">
              About Informations
            </h3>
            <p class="text-dark opacity-8 mb-0">
              There’s nothing I really wanted to do in life that I wasn’t able
              to get good at. That’s my skill.
            </p>
          </div>
        </div>
        <Information />
      </div>
      <div id="about" class="mt-5">
        <div class="row mb-5">
          <div class="col-md-8 text-center mb-5 mt-5 w-100">
            <h3 class="text-dark z-index-1 position-relative">
              Frequenty Asked Questions
            </h3>
            <p class="text-dark opacity-8 mb-0">
              There’s nothing I really wanted to do in life that I wasn’t able
              to get good at. That’s my skill.
            </p>
          </div>
        </div>
        <FAQ />
      </div>
    </div>
    <DefaultFooter />
  </div>
</template>

<script>
import HeaderLayout from "@/components/layouts/bars/HeaderComponent.vue";
import NavbarDefault from "@/components/layouts/bars/NavbarDefault.vue";
import PresentationCounter from "@/components/Sections/PresentationCounter.vue";
import BuiltByDevelopers from "@/components/layouts/cards/categories/CategoryCard.vue";
import Categories from "@/components/layouts/cards/categories/CategoriesComponent.vue";
import TopDoctors from "@/components/Sections/TopDoctors.vue";
import Posts from "@/components/Sections/TopArticles.vue";
import DefaultFooter from "@/components/layouts/footer/FooterDefault.vue";
import Information from "@/components/Sections/AboutSection.vue";
import FAQ from "@/components/Sections/FAQSection.vue";

import PreLoader from "@/components/icons/PreLoader.vue";

export default {
  data() {
    return {
      imageUrl:
        "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      loading: true,
    };
  },
  created() {
    if(window.location.reload){
      setTimeout(() => {
      this.loading = false;
    }, 3000);
    }
  },
  mounted() {
    document.body.classList.add("presentation-page");
    document.body.classList.add("bg-gray-200");
  },
  beforeUnmount() {
    document.body.classList.remove("presentation-page");
    document.body.classList.remove("bg-gray-200");
  },
  components: {
    HeaderLayout,
    NavbarDefault,
    PresentationCounter,
    BuiltByDevelopers,
    Categories,
    TopDoctors,
    Posts,
    DefaultFooter,
    PreLoader,
    Information,
    FAQ,
  },
};
</script>

<style>
.page-header {
  max-width: 100%;
}

.loading {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
