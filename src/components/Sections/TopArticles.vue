<script setup>
// example components
import TopArticles from "@/components/layouts/cards/articles/TopArticles.vue";


</script>
<template>
  <section class="py-3">
    <div class="container">
      <div class="row mb-5 mt-5">
        <div class="col-lg-6 text-center w-100 mb-5">
          <h3 class="mb-2">Check my latest blogposts</h3>
          <p class="text-dark">Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam quasi ipsa magni consequatur, est animi et?</p>
        </div>
      </div>
      <div class="row">
          <TopArticles/>
        
      </div>
    </div>
  </section>
</template>
