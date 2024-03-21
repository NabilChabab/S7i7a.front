<script setup>
// example components
import HeaderDetails from "@/components/layouts/bars/HeaderDetails.vue";
import NavbarDefault from "@/components/layouts/bars/NavbarDefault.vue";
// sections
import DoctorDetails from "@/components/Sections/DoctorDetails.vue";
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
    <HeaderDetails>
      <div
        class="page-header min-height-400"
        :style="{
          backgroundImage: `url(https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
        }"
        loading="lazy"
      >
        <span class="mask bg-gradient-dark opacity-8"></span>
      </div>
    </HeaderDetails>
    <div class="card card-body blur shadow-blur mx-3 mx-md-4 mt-n6 mb-4">
      <DoctorDetails/>
    </div>
  </div>
</template>
