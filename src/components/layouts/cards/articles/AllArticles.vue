<template>
  <PreLoader
    :loading="loading"
    :color="loaderColor"
    :size="loaderSize"
  ></PreLoader>

    <div
      class="col-lg-3 col-sm-6"
      v-for="article in articles"
      :key="article.id"
      data-aos="fade-right"
    >
      <div class="card card-plain">
        <div class="card-header p-0 position-relative">
          <a class="d-block blur-shadow-image">
            <img
              :src="article.image"
              class="img-fluid shadow border-radius-lg"
              loading="lazy"
              style="width: 100%; height: 200px; object-fit: cover"
            />
          </a>
        </div>
        <div class="card-body px-0">
          <h5>
            <a class="text-dark font-weight-bold">{{ article.title }}</a>
          </h5>
          <p>
            {{
              article.content
                ? article.content.trim().split(/\s+/).slice(0, 5).join(" ") +
                  (article.content.trim().split(/\s+/).length > 5 ? " ..." : "")
                : "..........."
            }}
          </p>
          <a class="text-sm icon-move-right text-primary"
            >Explore more
            <i class="fas fa-arrow-right text-xs ms-1"></i>
          </a>
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
      this.articles = response.data.all_articles;
      console.log(this.articles);
      this.loading = false;
    },
  },
  components: {
    PreLoader,
  },
};
</script>

<style>
.docs {
  margin: 0;
}
</style>
