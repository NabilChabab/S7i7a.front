<template>
  <div class="min-height-300 bg-primary position-absolute w-100"></div>
  <SideNav
    :navigationLinks="navigationLinks"
    :accountLinks="accountLinks"
    style="z-index: 999"
  />
  <main class="main-content position-relative border-radius-lg">
    <!-- Navbar -->
    <NavbarComponent />
    <!-- End Navbar -->
    <div class="container-fluid py-4">
      <div class="row">
        <div class="col-12">
          <form enctype="multipart/form-data" @submit.prevent="updateArticle">
            <div class="card mb-4 bg-dark">
              <div
                class="card-header pb-0 d-flex justify-content-between align-items-center bg-dark"
              >
                <h6 class="text-white">Update Article</h6>
                <button class="btn btn-primary" type="submit">
                  Save Changes
                </button>
              </div>
              <div class="card-body px-0 pt-0 pb-2">
                <div class="table-responsive p-0">
                  <div class="cards">
                    <img
                      v-if="previewImage || article.image"
                      :src="previewImage || article.image"
                      class="img"
                      alt="Preview Image"
                    />
                    <label for="input-file" class="text-white">Upload image</label>
                    <p class="fname-error text-danger">{{ errorMessage }}</p>
                    <input
                      type="file"
                      accept="image/jpg, image/png, image/jpeg"
                      name="image"
                      style="background-color: transparent"
                      id="input-file"
                      @change="handleImageChange"
                    />
                  </div>
                  <input type="hidden" name="_method" value="PATCH">
                  <div class="form-outline mb-4">
                    <label for="">Title</label>
                    <input
                      type="text"
                      id="fullname"
                      class="form-control text-white bg-secondary border-dark fullname"
                      placeholder="Company Name"
                      name="title"
                      v-model="article.title"
                    />
                    <p class="fname-error text-danger"></p>
                  </div>
                  <div class="form-outline mb-4">
                    <label for="">Content</label>
                    <textarea
                      class="form-control text-white bg-secondary border-dark fullname"
                      placeholder="Description"
                      name="content"
                      v-model="article.content"
                    />
                    <p class="fname-error text-danger"></p>
                  </div>
                  <div class="form-outline mb-4">
                    <label for="">Category Name</label>
                    <select
                      id="categorySelect"
                      class="form-control text-white bg-secondary border-dark fullname"
                      name="category"
                      v-model="selectedCategory"
                    >
                      <option :selected="article.category">
                        {{ article.category }}
                      </option>
                      <option
                        v-for="category in categories"
                        :key="category.id"
                        :value="category.id"
                        :selected="category.id === article.category"
                      >
                        {{ category.name }}
                      </option>
                    </select>
                    <p class="fname-error text-danger"></p>
                  </div>
                  <div class="form-outline mb-4 d-flex flex-column">
                    <label for="tagsSelect">Tags Name</label>
                    <select
                      id="tagsSelect"
                      class="form-control text-dark "
                      name="tags"
                      multiple
                      v-model="selectedTags"
                    >
                      <option
                        v-for="tag in tags"
                        :key="tag"
                        :value="tag.id"
                        :selected="selectedTags"
                      >
                        {{ tag.name }}
                      </option>
                    </select>

                    <p class="fname-error text-danger"></p>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <FooterComponent />
    </div>
  </main>
</template>

<script>
import Swal from "sweetalert2";
import NavbarComponent from "@/components/layouts/bars/Navbar.vue";
import SideNav from "@/components/layouts/bars/Aside.vue";
import FooterComponent from "@/components/layouts/footer/FooterComponent.vue";
import api from "@/services/api";
import $ from "jquery";
import 'select2';
export default {
  data() {
    return {
      navigationLinks: [
        {
          url: "/doctor/dashboard",
          text: "Dashboard",
          iconClass: "bx bx-home-alt text-primary text-sm opacity-10",
          active: "nav-link",
        },
        {
          url: "/doctor/articles",
          text: "Articles",
          iconClass: "bx bxs-notepad text-info text-sm opacity-10",
          active: "nav-link active",
        },
        {
          url: "/doctor/appointments",
          text: "Appointments",
          iconClass: "bx bx-check-double text-info text-sm opacity-10",
          active: "nav-link",
        },
        { url: "/doctor/prescriptions", text: "Prescriptions", iconClass: "bx bxs-file-pdf text-danger text-sm opacity-10" ,active:"nav-link "},

        {
          url: "/doctor/chat",
          text: "Chat",
          iconClass:
            "bx bx-message-rounded-dots text-success text-sm opacity-10",
          active: "nav-link ",
        },
      ],
      accountLinks: [
        {
          p_url: "/admin/profile",
          p_text: "Profile",
          p_iconClass: "bx bx-user text-success text-sm opacity-10",
          p_active: "nav-link ",
        },
      ],
      previewImage: "",
      defaultImage: "https://www.bootdey.com/image/800x350/87CEFA/000000",
      errorMessage: "",
      errors: [],
      article: [
        {
          title: "",
          content: "",
          image: "",
          category: "",
        },
      ],
      tags: [],
      selectedCategory: "", 
      categories: [],
      selectedTags:[]
    };
  },
  created() {
    const articleId = this.$route.params.id;
    this.fetchArticle(articleId);
    this.fetchCategories();
  },
  mounted() {
    $(document).ready(function() {
      $('#tagsSelect').select2();
    });
  },
  methods: {
    handleImageChange(event) {
      this.image = event.target.files[0];
      if (this.image) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.previewImage = e.target.result;
        };
        reader.readAsDataURL(this.image);
      } else {
        this.previewImage = ""; 
      }
    },
    async fetchCategories() {
      const response = await api.get("/doctor/articles");
      this.categories = response.data.categories;
      this.tags = response.data.tags;
      console.log(this.categories);
    },
    async fetchArticle(articleId) {
      try {
        const response = await api.get(`/doctor/articles/${articleId}`);
        this.article = response.data.article;
        this.selectedTags = this.article.tags;
        this.selectedCategory = this.article.category;
      } catch (error) {
        console.error("Error fetching article:", error);
      }
    },
    async updateArticle(){
        const formData = new FormData();
        formData.append("title", this.article.title);
        formData.append("content", this.article.content);
        formData.append("category", this.selectedCategory);
        formData.append("tags", this.selectedTags);
        formData.append("_method", "PATCH");
        if(this.image instanceof File){
            formData.append("image", this.image);
        }
        try {
          const response = await api.post(`/doctor/articles/${this.article.id}`, formData , {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          this.article = response.data.article;
          this.selectedTags = this.article.tags;
          this.selectedCategory = this.article.category;
          Swal.fire({
          icon: "success",
          title: "Success",
          text: "Doctor Updated Successfully",
          timer: 1500
        });
        this.$router.push('/doctor/articles')
        } catch (error) {
          console.error("Error updating article:", error);
        }
    }
  },
  components: {
    NavbarComponent,
    SideNav,
    FooterComponent,
  },
};
</script>

<style>
.cards .img {
  width: 700px;
  height: 350px;
  border-radius: 10px;
}
.selected-tag {
  display: inline-block;
  margin: 5px;
  padding: 5px 10px;
  background-color: rgba(1, 3, 91, 0.9);
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
}

.select2 {
  width: 700px;
  border: none;
  margin-bottom: 2%;
  border-radius: 15px;
}
</style>
