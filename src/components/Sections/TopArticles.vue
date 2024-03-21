<script setup>
// example components
import TopArticles from "@/components/layouts/cards/articles/TopArticles.vue";

</script>
<template>
  <section class="py-3">
    <div class="container">
      <div class="row">
        <div class="col-lg-6">
          <h3 class="mb-5">Check my latest blogposts</h3>
        </div>
      </div>
      <div class="row">
          <TopArticles/>
        <div class="col-lg-3 col-md-12 col-12">
          <div class="card card-blog card-background cursor-pointer">
            <div
              class="full-background"
              :style="{ backgroundImage: `url(https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)` }"
              loading="lazy"
            ></div>
            <div class="card-body">
              <div class="content-left text-start my-auto py-4">
                <h2 class="card-title text-white">aya haja</h2>
                <p class="card-description text-white">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit dolores dolorem dolor aspernatur, voluptatibus officiis incidunt!
                </p>
                <a
                  href="javascript:;"
                  class="text-sm icon-move-right text-success"
                  >aya haja
                  <i class="fas fa-arrow-right text-xs ms-1"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
