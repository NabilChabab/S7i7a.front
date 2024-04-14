<template>
  <section class="py-7">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-6">
          <div class="row justify-content-start">
            <DefaultInfoCard
              color="dark"
              icon="bx bx-user text-primary"
              title="Fully integrated"
              description="We get insulted by others, lose trust for those We get back
                  freezes"
                  data-aos="fade-right"
            />
            <DefaultInfoCard
              color="dark"
              icon="bx bxs-credit-card text-primary"
              title="Payments functionality"
              description="We get insulted by others, lose trust for those We get back
                  freezes"
                  data-aos="fade-left"
            />
          </div>
          <div class="row justify-content-start mt-4">
            <DefaultInfoCard
              color="dark"
              icon="bx bx-mobile text-primary"
              title="Prebuilt components"
              description="We get insulted by others, lose trust for those We get back
                  freezes"
                  data-aos="fade-right"
            />
            <DefaultInfoCard
              color="dark"
              icon="bx bx-dna text-primary"
              title="Improved platform"
              description="We get insulted by others, lose trust for those We get back
                  freezes"
                  data-aos="fade-left"
            />
          </div>
        </div>
        <div class="col-lg-4 ms-auto mt-lg-0 mt-6">
          <CenteredBlogCard
            image="https://images.unsplash.com/photo-1544717302-de2939b7ef71?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            title="Get insights on Search"
            description="Website visitors today demand a frictionless user expericence — especially when using search. Because of the hight standards."
            data-aos="fade-right"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import DefaultInfoCard from "@/components/layouts/cards/patient/DefaultInfoCard.vue";
import CenteredBlogCard from "@/components/layouts/cards/patient/CenteredBlogCard.vue";
import AOS from "aos";

export default {

  mounted(){
    AOS.init({
      duration: 1000,
    });
  },
  components: {
    DefaultInfoCard,
    CenteredBlogCard,
  },
}
</script>
