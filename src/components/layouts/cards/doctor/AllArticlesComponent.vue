<template>
  <div class="table-responsive">
    <table class="table align-items-center">
      <thead>
        <tr>
          <th
            class="text-uppercase text-light text-xxs font-weight-bolder opacity-7"
          >
            Article
          </th>
          <th
            class="text-uppercase text-light text-xxs font-weight-bolder opacity-7 ps-2"
          >
            Content
          </th>
          <th
            class="text-uppercase text-light text-xxs font-weight-bolder opacity-7"
          >
            CreatedBy
          </th>
          <th
            class="text-center text-uppercase text-light text-xxs font-weight-bolder opacity-7"
          >
            Status
          </th>
          <th
            class="text-center text-uppercase text-light text-xxs font-weight-bolder opacity-7"
          >
            Created_at
          </th>
          <th
            class="text-center text-uppercase text-light text-xxs font-weight-bolder opacity-7"
          >
            Actions
          </th>
        </tr>
      </thead>

      <div v-if="isLoading">Loading...</div>
      <tbody v-else>
        <tr v-for="article in allArticles" :key="article.id">
          <td>
            <div class="d-flex px-2 py-1">
              <div>
                <img
                  :src="article.image"
                  class="avatar avatar-sm me-3"
                  style="object-fit: cover"
                  alt="user1"
                />
              </div>
              <div class="d-flex flex-column justify-content-center">
                <h6 class="mb-0 text-sm text-white">{{ article.title }}</h6>
                <p class="text-xs text-light mb-0">
                  {{ article.category }}
                </p>
              </div>
            </div>
          </td>
          <td>
            <p class="text-xs text-light mb-0">
              {{
                article.content.trim().split(/\s+/).slice(0, 5).join(" ") +
                (article.content.trim().split(/\s+/).length > 5 ? " ..." : "")
              }}
            </p>
          </td>
          <td>
            <p class="text-xs text-light mb-0">{{ article.createdBy }}</p>
          </td>
          <td class="align-middle text-center text-sm">
            <span
              :class="`badge badge-sm ${
                article.status === 'pending'
                  ? 'bg-gradient-warning'
                  : article.status === 'accepted'
                  ? 'bg-gradient-success'
                  : 'bg-gradient-danger'
              }`"
              >{{ article.status }}</span
            >
          </td>
          <td class="align-middle text-center">
            <span class="text-light text-xs font-weight-bold">{{
              getFormattedDate(article.created_at)
            }}</span>
          </td>
          <td class="align-middle text-center">
            <router-link
              :to="{ name: 'edit_article', params: { id: article.id } }"
              class="text-primary font-weight-bold text-xs me-3"
              data-toggle="tooltip"
              data-original-title="Edit user"
            >
              Edit
            </router-link>
            <button
              class="text-danger font-weight-bold text-xs"
              data-toggle="tooltip"
              data-original-title="Edit user"
              @click="deleteArticles(article.id)"
              style="background-color: transparent; border: none"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import api from "@/services/api";
import moment from "moment";
import "moment-timezone";
export default {
  name: "AllArticlesComponent",
  data() {
    return {
      allArticles: [],
      isLoading: true,
    };
  },
  created() {
    this.fetchArticles();
  },
  methods: {
    getFormattedDate(date) {
      return moment(date).fromNow();
    },
    async fetchArticles() {
      try {
        const response = await api.get("doctor/articles/");
        this.allArticles = response.data.articles.map((article) => {
          return {
            ...article,
            tags: article.tags.map((tag) => tag.name),
          };
        });
        console.log(response.data.articles);
        this.isLoading = false;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteArticles(id) {
      try {
        await api.delete(`/doctor/articles/${id}`);
        this.fetchArticles();
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
