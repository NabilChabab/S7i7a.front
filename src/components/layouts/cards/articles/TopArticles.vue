<script setup>
import { defineProps } from "vue";
defineProps({
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  action: {
    type: Object,
    route: String,
    color: String,
    label: String,
    default: () => ({
      route: "javascript:;",
      color: "success",
      label: "Read more",
    }),
  },
});
</script>
<template>
  <div class="col-lg-3 col-sm-6" v-for="article in articles" :key="article.id">
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
          <a class="text-dark font-weight-bold">{{
            article.title
          }}</a>
        </h5>
        <p>
          {{ article.content }}
        </p>
        <a
          class="text-sm icon-move-right text-primary"
          >Explore more
          <i class="fas fa-arrow-right text-xs ms-1"></i>
        </a>
      </div>
    </div>
  </div>
</template>


<script>
import api from '@/services/api'


export default {
    data() {
        return {
            articles: []
        }
    },
    created() {
        this.getArticles()
    },
    methods: {
        async getArticles() {
            const response = await api.get('/index')
            this.articles = response.data.articles
        }
    }
}

</script>
