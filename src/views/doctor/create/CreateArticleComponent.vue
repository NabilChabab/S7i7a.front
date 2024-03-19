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
            <div class="card mb-4">
              <div
                class="card-header pb-0 d-flex justify-content-between align-items-center"
              >
                <h6>Add New Doctors</h6>
                <button class="btn btn-primary" type="submit">
                  Add Doctor
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
                    <label for="input-file">Upload image</label>
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
                      id="fullname"
                      class="form-control text-dark fullname"
                      placeholder="Company Name"
                      name="title"
                      v-model="title"
                    />
                    <p class="fname-error text-danger"></p>
                  </div>
                  <div class="form-outline mb-4">
                    <label for="">Content</label>
                    <textarea
                      class="form-control text-dark fullname"
                      placeholder="Description"
                      name="content"
                      v-model="content"
                    />
                    <p class="fname-error text-danger"></p>
                  </div>
                  <div class="form-outline mb-4">
                    <label for="">Category Name</label>
                    <select
                      class="form-control text-dark fullname"
                      name="category"
                      v-model="category_id"
                    >
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
                  <div class="form-outline mb-4">
                    <label for="tagsSelect">Tags Name</label>
                    <select
                      id="tagsSelect"
                      class="form-control text-dark fullname"
                      name="tags"
                      multiple
                      v-model="tag_id"
                    >
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
import Swal from "sweetalert2";
import NavbarComponent from "@/components/layouts/bars/Navbar.vue";
import SideNav from "@/components/layouts/bars/Aside.vue";
import FooterComponent from "@/components/layouts/footer/FooterComponent.vue";
import api from "@/services/api";
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
  created() {
    this.fetchCategories();
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
        this.previewImage = ""; // Clear preview if no file selected
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
    const createdBy = localStorage.getItem("userId");
    const formData = new FormData();
    formData.append("title", this.title);
    formData.append("content", this.content);
    formData.append("category_id", this.category_id);

    // Append the array of tag IDs directly
    this.tag_id.forEach((tag) => {
      formData.append("tags[]", tag.id); // Use "tags[]" to indicate an array
    });

    formData.append("createdBy", createdBy);

    if (this.image) {
      formData.append("image", this.image);
    }

    const response = await api.post("/doctor/articles", formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Set Content-Type header
      },
    });
    console.log(response.data);

    Swal.fire({
      icon: "success",
      title: "Success",
      text: "Doctor Created Successfully",
      timer: 1500,
    });

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
