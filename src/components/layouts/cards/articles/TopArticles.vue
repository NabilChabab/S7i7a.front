<template>
  <PreLoader
    :loading="loading"
    :color="loaderColor"
    :size="loaderSize"
  ></PreLoader>
  <div
    class="col-lg-4 col-sm-6"
    v-for="article in articles"
    :key="article.id"
    data-aos="fade-right">
    <div class="card card-blog card-background cursor-pointer">
      <div
        class="full-background"
        :style="{
          backgroundImage: `url(${article.image})`,
        }"
        loading="lazy"
      ></div>
      <div class="card-body">
        <div class="content-left text-start my-auto py-4">
          <h2 class="card-title text-white">{{ article.title }}</h2>
          <p class="card-description text-white">
            {{
              article.content
                ? article.content.trim().split(/\s+/).slice(0, 20).join(" ") +
                  (article.content.trim().split(/\s+/).length > 20
                    ? " ..."
                    : "")
                : "..........."
            }}
          </p>
          <a
            href="javascript:;"
            class="text-sm icon-move-right text-success mt-5 cursor-pointer"
            >Explore more
            <i class="fas fa-arrow-right text-xs ms-1"></i>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/services/api";
import PreLoader from "@/components/icons/PreLoader.vue";
import AOS from "aos";

export default {
  data() {
    return {
      articles: [],
      loading: false,
      loaderColor: "#6437e0",
      loaderSize: "15px",
    };
  },
  created() {
    this.getArticles();
  },
  mounted() {
    AOS.init({
      duration: 1000,
    });
  },
  methods: {
    async getArticles() {
      this.loading = true;
      const response = await api.get("/index");
      this.articles = response.data.articles;
      this.loading = false;
    },
  },
  components: {
    PreLoader,
  },
};
</script>

<style>

</style>

