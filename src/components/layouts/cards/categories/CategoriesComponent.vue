<template>
  <div v-if="loading" class="text-center mt-4 text-primary" >
    <div class="spinner-border" role="status" style="width: 3rem; height: 3rem;">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
  <div class="col-lg-4" v-for="category in categories" :key="category.id">
    <div
      class="info-horizontal border-radius-xl d-flex flex-column text-center align-items-center justify-content-center d-md-flex"
      :class="[color.background]"
    >
      <img :src="category.icon" alt="" class="icon h-100 w-25 mb-3 mt-2" />
      <div class="ps-0 ps-md-3 mt-3 mt-md-0">
        <h5 :class="`text-${color.text} text-center`">{{ category.name }}</h5>
        <p :class="`text-${color.text} text-center`">{{ description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/services/api";
export default {
  data() {
    return {
      categories: [],
      loading:false
    };
  },
  props: {
    color: {
      type: Object,
      default() {
        return {
          text: "",
          background: "bg-gray-100",
        };
      },
    },
    description: {
      type: String,
      required: true,
    },
  },
  created() {
    this.fetchCategories();
  },
  methods: {
    async fetchCategories() {
      this.loading = true;
      const response = await api.get("/index");
      this.categories = response.data.categories;
      this.loading = false;
    },
  },
};
</script>
