<script setup>
// example component
import AllDoctors from "@/components/layouts/cards/doctor/AllDoctors.vue";

</script>

<template>
  <section class="pb-5 position-relative mx-n3 mt-5">
    <div class="container">
      <div class="row mb-5">
        <div class="col-md-8 text-center mb-5 mt-5 w-100">
          <h3 class="text-dark z-index-1 position-relative">
            The Executive Team
          </h3>
          <p class="text-dark opacity-8 mb-0">
            There’s nothing I really wanted to do in life that I wasn’t able to
            get good at. That’s my skill.
          </p>
        </div>
      </div>
      <div class="row docs">
        
          <AllDoctors/>
      </div>
    </div>
  </section>
</template>

<style>
.doc{
  position: relative;
}

.doc::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
  filter: brightness(50%);
  z-index: -1; /* Ensure the pseudo-element is behind other content */
}

section{
    padding: 0px;
}


</style>
