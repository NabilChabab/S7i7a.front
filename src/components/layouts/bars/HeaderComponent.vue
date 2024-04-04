
<template>
  <header class="bg-gradient-dark">
    <div
      class="page-header min-vh-75"
      :style="{ backgroundImage: `url(${image})` }"
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
            <router-link
              :to="{ path: '/register' }"
              class="btn bg-white text-dark"
            >
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

<script>
import Typed from "typed.js";
export default {
  props: {
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
  },

  mounted() {
    document.body.classList.add("about-us");
    document.body.classList.add("bg-gray-200");

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
  },
  onMounted() {
    document.body.classList.remove("about-us");
    document.body.classList.remove("bg-gray-200");
  },
};
</script>
