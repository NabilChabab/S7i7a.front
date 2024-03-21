<template>
  <div class="table-responsive">
    <table class="table align-items-center">
      <thead>
        <tr>
          <th
            class="text-start text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
          >
            Article
          </th>
          <th
            class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
          >
            Content
          </th>
          <th
            class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
          >
            CreatedBy
          </th>
          <th
            class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
          >
            Status
          </th>
          <th
            class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
          >
            Created_at
          </th>
        </tr>
      </thead>

      <div v-if="isLoading">Loading...</div>
      <tbody v-else>
        <tr v-for="article in allArticles" :key="article.id">
          <td class="text-start">
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
                <h6 class="mb-0 text-sm">{{ article.title }}</h6>
                <p class="text-xs text-secondary mb-0">
                  {{ article.category }}
                </p>
              </div>
            </div>
          </td>
          <td>
            <p class="text-xs text-secondary mb-0">{{ article.content.trim().split(/\s+/).slice(0, 5).join(" ") +
                (article.content.trim().split(/\s+/).length > 5
                  ? " ..."
                  : "")}}</p>
          </td>
          <td>
            <p class="text-xs text-secondary mb-0">{{ article.createdBy }}</p>
          </td>
          <td
            class="align-middle text-center text-sm"
            @click="onStatusClick($event)"
          >
            <span
              :class="`badge badge-sm ${
                article.status === 'pending'
                  ? 'bg-gradient-warning'
                  : article.status === 'accepted'
                  ? 'bg-gradient-success'
                  : 'bg-gradient-danger'
              } cursor-pointer`"
              data-bs-toggle="modal"
              data-bs-target="#statusUpdateModal"
              :data-bs-status="article.status"
              :data-bs-article="article.id"
            >
              {{ article.status }}
            </span>
          </td>

          <td class="align-middle text-center">
            <span class="text-secondary text-xs font-weight-bold">{{
              getFormattedDate(article.created_at)
            }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div
    class="modal fade"
    id="statusUpdateModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="statusUpdateModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="statusUpdateModalLabel">
            Update Article Status
          </h5>
        </div>
        <div class="modal-body">
          <!-- Form for updating status -->
          <form @submit.prevent="updateStatus">
            <div class="form-group">
              <input type="hidden" name="_method" value="PATCH" />
              <input type="hidden" v-model="articleId" />
              <label for="statusSelect">Select Status</label>
              <select
                class="form-control"
                id="statusSelect"
                v-model="clickedStatus"
              >
                <option value="pending">Pending</option>
                <option value="accepted">Accepted</option>
                <option value="refused">Rejected</option>
              </select>
            </div>
            <button type="submit" class="btn btn-primary">Save Changes</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/services/api";
import moment from "moment";
import "moment-timezone";
import Swal from "sweetalert2";

export default {
  name: "AllArticlesComponent",
  data() {
    return {
      allArticles: [],
      isLoading: true,
      clickedStatus: "",
      articleId: "",
    };
  },
  created() {
    this.fetchArticles();
  },
  methods: {
    onStatusClick(event) {
      const clickedTd = event.target;
      const clickedStatus = clickedTd.dataset.bsStatus;
      const articleId = clickedTd.dataset.bsArticle;
      this.clickedStatus = clickedStatus;
      this.articleId = articleId;
    },
    getFormattedDate(date) {
      return moment(date).fromNow();
    },
    async fetchArticles() {
      try {
        const response = await api.get("admin/article/");
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
    async updateStatus() {
      try {
        const formData = new FormData();
        formData.append("status", this.clickedStatus);
        formData.append("_method", "PATCH");
        await api.post(`/admin/article/${this.articleId}`, formData);
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Article status updated successfully",
          timer: 1500,
        });
        await this.fetchArticles();
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "An error occurred while updating article status",
        });
      }
    },
    async deleteArticles(id) {
      try {
        await api.delete(`/doctor/articles/${id}`);
        this.fetchArticles();
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Article deleted successfully",
          timer: 1500,
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
