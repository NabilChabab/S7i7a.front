<template>
  <div class="min-height-300 bg-primary position-absolute w-100"></div>
  <main class="main-content position-relative border-radius-lg">
    <NavbarComponent />
    <div class="container-fluid py-4">
      <div class="row">
        <div class="col-12">
          <form enctype="multipart/form-data" @submit.prevent="addArticle">
            <div class="card mb-4 bg-dark">
              <div
                class="card-header pb-0 d-flex justify-content-between align-items-center bg-dark"
              >
                <h6 class="text-white">Download Prescription</h6>
                <button class="btn btn-primary" type="submit">
                  Download Prescription
                </button>
              </div>
              <div class="card-body px-0 pt-0 pb-2">
                <div class="table-responsive p-0">
                  <PrescriptionDetails />
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
import NavbarComponent from "@/components/layouts/bars/Navbar.vue";
import FooterComponent from "@/components/layouts/footer/FooterComponent.vue";
import PrescriptionDetails from "@/components/layouts/cards/doctor/PrescriptionDetails.vue";

export default {
  data() {
    return {

    };
  },

  components: {
    NavbarComponent,
    FooterComponent,
    PrescriptionDetails,
  },
};
</script>

<style>
.cards .img {
  width: 700px;
  height: 350px;
  border-radius: 10px;
}

#tagsSelect {
  background-color: rgb(231, 231, 231);
  border: none;
}
</style>
