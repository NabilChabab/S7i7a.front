<template>
  <div class="container position-sticky z-index-sticky top-0">
    <div class="row">
      <div class="col-12">
        <!-- Navbar -->
        <NavbarDefault :sticky="true" />
        <!-- End Navbar -->
      </div>
    </div>
  </div>
  <main class="main-content mt-0">
    <section>
      <div class="page-header min-vh-100">
        <div class="container">
          <div class="row">
            <div
              class="col-12 d-lg-flex d-none h-100 my-auto pe-0 position-absolute top-0 end-0 text-center justify-content-center flex-column"
            >
              <div
                class="position-relative bg-gradient-primary h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center overflow-hidden"
              >
                <img src="https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" class="mask bg-gradient-primary opacity-3" style="object-fit: cover;"/>

                <h4
                  class="text-white font-weight-bolder position-relative" style="margin-top: 15%;">
                  "Attention is the new currency"
                </h4>
                <p class="text-white position-relative mb-5">
                  The more effortless the writing looks, the more effort the
                  writer actually put into the process.
                </p>
                <ContactSection />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import NavbarDefault from "@/components/layouts/bars/NavbarDefault.vue";
import ContactSection from "@/components/Sections/ContactSection.vue";

export default {
  data() {
    return {
      email: "",
      password: "",
      errors: {},
      forgotPasswordEmail: "",
      forgotPasswordErrors: {},
      loading: false,
      loading_log: false,
    };
  },
  components: {
    NavbarDefault,
    ContactSection,
  },
};
</script>

<style></style>
