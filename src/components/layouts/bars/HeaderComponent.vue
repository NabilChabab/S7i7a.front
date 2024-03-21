<script setup>
import { defineProps  , onMounted , onUnmounted} from "vue";
// import bg0 from "@/assets/img/bg9.jpeg";

defineProps({
  image: {
    type: String,
    default: "",
  },
  title: {
    type: [String, Object],
    default: "",
    text: String,
    variant: {
      validator(value) {
        return ["h1", "h2", "h3", "h4", "h5", "h6"].includes(value);
      },
    },
    class: {
      type: String,
      default: "",
    },
  },
  description: {
    type: [String, Object],
    default: "",
    text: String,
    class: String,
  },
  mask: {
    type: String,
    default: "mask bg-gradient-success opacity-4",
  },
  center: {
    type: Boolean,
    default: false,
  },
  minHeight: {
    type: String,
    default: " min-vh-75",
  },
  fullWidth: {
    type: Boolean,
    default: false,
  },
});
import Typed from "typed.js";


const body = document.getElementsByTagName("body")[0];
onMounted(() => {
  body.classList.add("about-us");
  body.classList.add("bg-gray-200");

  if (document.getElementById("typed")) {
    // eslint-disable-next-line no-unused-vars
    var typed = new Typed("#typed", {
      stringsElement: "#typed-strings",
      typeSpeed: 90,
      backSpeed: 90,
      backDelay: 200,
      startDelay: 500,
      loop: true,
    });
  }
});

onUnmounted(() => {
  body.classList.remove("about-us");
  body.classList.remove("bg-gray-200");
});
</script>
<template>
 <header class="bg-gradient-dark">
    <div
      class="page-header min-vh-75"
      :style="{ backgroundImage: `url(https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)` }"
    >
      <span class="mask bg-gradient-dark opacity-6"></span>
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-8 text-center mx-auto my-auto">
            <h1 class="text-white">
              Work with an amazing <span class="text-white" id="typed"></span>
            </h1>
            <div id="typed-strings">
              <h1>team</h1>
              <h1>design</h1>
              <h1>tool</h1>
            </div>
            <p class="lead mb-4 text-white opacity-8">
              We’re constantly trying to express ourselves and actualize our
              dreams. If you have the opportunity to play this game
            </p>
            <router-link :to="{path:'/register'}"  class="btn bg-white text-dark">
              Create Account
            </router-link>
            <h6 class="text-white mb-2 mt-5">Find us on</h6>
            <div class="d-flex justify-content-center">
              <a href="javascript:;"
                ><i class="fab fa-facebook text-lg text-white me-4"></i
              ></a>
              <a href="javascript:;"
                ><i class="fab fa-instagram text-lg text-white me-4"></i
              ></a>
              <a href="javascript:;"
                ><i class="fab fa-twitter text-lg text-white me-4"></i
              ></a>
              <a href="javascript:;"
                ><i class="fab fa-google-plus text-lg text-white"></i
              ></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
