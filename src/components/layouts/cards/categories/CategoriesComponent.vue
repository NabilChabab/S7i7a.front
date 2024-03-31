<template>

<PreLoader :loading="loading" :color="loaderColor" :size="loaderSize"></PreLoader>
  <div class="col-lg-3 col-md-4 mt-3" v-for="category in categories" :key="category.id" data-aos="fade-up">
    <router-link :to="{name : 'doctor-byCategory' , params : { id : category.id } }"
      class="iconbox cursor-pointer"
      :class="[color.background]">
      <img :src="category.icon" alt=""/>
        <h3 :class="`text-${color.text}`"><a href="">{{ category.name }}</a></h3>
    </router-link>
  </div>
</template>

<script>
import api from "@/services/api";
import AOS from 'aos';
import PreLoader from '@/components/icons/PreLoader.vue'

export default {
  data() {
    return {
      categories: [],
      loading: false, 
      loaderColor: '#6437e0', 
      loaderSize: '15px', 
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
  mounted() {
    AOS.init({
      duration: 1000,
    });
  },
  created() {
    this.fetchCategories();
  },
  methods: {
    async fetchCategories() {
      this.loading = true; // Set loading to true before fetching
      try {
        const response = await api.get("/index");
        this.categories = response.data.categories;
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
      this.loading = false; // Set loading back to false after fetching
    },
  },
  components: {
    PreLoader,
  },
};
</script>

<style>

.iconbox{
  width: 100%;
  height: 70px;
  display: flex;
  background-color: rgba(238, 238, 238, 0.829);
  justify-content: start;
  align-items: center;
  gap: 20px;
  border-radius: 5px;
  padding-left: 10px;
  transition: all .4s ease-in-out;
}

.iconbox:hover{
  background-color: rgba(107, 78, 240, 0.829);
  color: white;
}

.iconbox img{
  width: 45px;
  height: 45px;
}

.iconbox h3{
  font-size:18px
}
</style>
