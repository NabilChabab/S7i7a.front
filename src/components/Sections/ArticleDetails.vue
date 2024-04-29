<template>
  <PreLoader
    :loading="d_loading"
    :color="loaderColor"
    :size="loaderSize"
  ></PreLoader>
  <section class="py-sm-7 py-5 position-relative">
    <div class="container">
      <div class="row">
        <div class="col-12 mx-auto" v-show="!d_loading">
          <div class="mt-n8 mt-md-n9 text-center">
            <div class="blur-shadow-avatar">
              <img
                :src="article.image"
                class="shadow-xl position-relative z-index-2"
                alt="Avatar"
                style="
                  width: 900px;
                  height: 500px;
                  border-radius: 10px;
                  object-fit: cover;
                "
              />
            </div>
          </div>
          <div class="row py-7">
            <div
              class="col-lg-7 col-md-7 z-index-2 position-relative px-md-2 px-sm-5 mx-auto"
            >
              <div
                class="d-flex justify-content-between align-items-center mb-2"
              >
                <h3 class="mb-0">{{ article.title }}</h3>
                <div class="d-block">
                  <a
                    href="#"
                    class="btn btn-primary">
                    View Creator
                  </a>
                </div>
              </div>
              <p class="text-dark">
                Created By
                <span
                  class="text-danger font-weight-bold"
                  style="font-size: 15px"
                  >{{ article.createdBy }}</span
                >
              </p>
              <p class="text-dark">
                <span
                  class="text-success font-weight-bold me-3"
                  style="font-size: 15px"
                  >{{ article.category }}</span
                >
=              </p>
              <p class="text-lg mb-0 text-dark">
                {{ article.content }}
               
              </p>
              <p class="text-dark font-weight-bold mt-3">#Tags</p>
              <span v-for="(tag , index) in article.tags" :key="index" class="text-primary font-weight-bold">
                <span v-if="index !== 0">  , </span>
                #{{ tag }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import api from "@/services/api";
import PreLoader from "@/components/icons/PreLoader.vue";

export default {
  data() {
    return {
      article: {
        id: "",
        title: "",
        content: "",
        category: "",
        createdBy: "",
        tags: [],
        image: "",
      },
      loading: false,
      d_loading: false,
      showCardElement: false,
      loaderColor: "#6437e0",
      loaderSize: "10px",
    };
  },
  created() {
    const articleId = this.$route.params.id;
    this.fetchArticleById(articleId);
  },

  methods: {

    async fetchArticleById(articleId) {
      this.d_loading = true;
      const response = await api.get(`/article-details/${articleId}`);
      this.article = response.data.article
     
      this.d_loading = false;
    },

  },
  components: {
    PreLoader,
  },
};
</script>

<style>
.radio-group label {
  min-width: 100px;
  min-height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: 10px;
  border: 1px solid rgb(94, 114, 228);
}

.radio-group input:checked + .form-check-label {
  background-color: rgb(94, 114, 228);
  color: white;
  font-weight: 600;
}

.radio-group input {
  display: none;
}
.booking {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.pad {
  padding: 0px 30%;
}
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s;
}

.slide-enter,
.slide-leave-to {
  transform: translateX(100%);
}

#card-element input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  font-size: 16px;
}

#card-element input:focus {
  outline: none;
  border-color: #007bff; /* Change color when focused */
}
</style>
