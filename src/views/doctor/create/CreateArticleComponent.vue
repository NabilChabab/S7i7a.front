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
          <form enctype="multipart/form-data" @submit.prevent="addArticle">
            <div class="card mb-4 bg-dark">
              <div
                class="card-header pb-0 d-flex justify-content-between align-items-center bg-dark"
              >
                <h6 class="text-white">Add New Article</h6>
                <button class="btn btn-primary" type="submit">
                  Add Article
                </button>
              </div>
              <div class="card-body px-0 pt-0 pb-2">
                <div class="table-responsive p-0">
                  <div class="cards">
                    <img
                      :src="previewImage || defaultImage"
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
                  <div class="form-outline mb-4">
                    <label for="">Title</label>
                    <input
                      type="text"
                      class="form-control text-white bg-secondary border-dark fullname"
                      placeholder="Company Name"
                      v-model="title"
                    />
                  </div>
                  <div class="form-outline mb-4">
                    <label for="">Content</label>
                    <textarea
                      class="form-control text-white bg-secondary border-dark fullname"
                      placeholder="Description"
                      v-model="content"
                    />
                    <p class="fname-error text-danger"></p>
                  </div>
                  <div class="form-outline mb-4">
                    <label for="">Category Name</label>
                    <select
                      class="form-control text-white bg-secondary border-dark fullname"
                      v-model="category_id"
                    >
                    <option value="" disabled selected>Select a category</option>
                      <option
                        v-for="category in categories"
                        :key="category.id"
                        :value="category.id"
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
                      class="form-control text-white bg-secondary border-dark "
                      multiple
                      v-model="tag_id"
                    >
                    <option value="" disabled selected>Select a category</option>
                      <option v-for="tag in tags" :key="tag.id" :value="tag">
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
import { required } from 'vuelidate/lib/validators';
import NavbarComponent from "@/components/layouts/bars/Navbar.vue";
import SideNav from "@/components/layouts/bars/Aside.vue";
import FooterComponent from "@/components/layouts/footer/FooterComponent.vue";
import api from "@/services/api";
import $ from "jquery";
import 'select2';
import store from "@/store/index";
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
      image: null,
      title: "",
      content: "",
      category_id: "",
      password: "",
      errors: [],
      categories: [],
      tag_id: [],
      tags: [],
    };
  },
  validations: {
    title: { required }
  },
  created() {
    this.fetchCategories();
    
  },

  mounted() {
    $(document).ready(function() {
      $('#tagsSelect').select2();
    });
  },

  methods: {
    authUser() {
      const userData = store.getters.getUser;
      return userData.userId;
    },
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
    async addArticle() {
      try {
        const formData = new FormData();
        formData.append("title", this.title);
        formData.append("content", this.content);
        formData.append("category_id", this.category_id);

        this.tag_id.forEach((tag) => {
          formData.append("tags[]", tag.id);
        });
        if (this.image) {
          formData.append("image", this.image);
        }

        const response = await api.post("/doctor/articles", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(response.data);

        this.$router.push("/doctor/articles");
      } catch (error) {
        console.log(error);
      }
    },
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

#tagsSelect{
  background-color: rgb(231, 231, 231);
  border: none;
}


</style>
