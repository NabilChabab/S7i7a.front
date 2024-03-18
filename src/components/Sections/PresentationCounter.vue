<script setup>
import DefaultCounterCard from "@/components/layouts/cards/DefaultCounterCard.vue";
</script>

<template>
  <section class="pt-3 pb-4" id="count-stats">
    <div class="container">
      <div class="row">
        <div class="col-lg-9 z-index-2 border-radius-xl mx-auto py-3">
          <div class="row">
            <div class="col-md-4 position-relative">
              <DefaultCounterCard
                color="primary"
                title="Total Doctors"
                description="From buttons, to inputs, navbars, alerts or cards, you are
                  covered"
                :count="350"
                suffix="+"
                :duration="3000"
                divider="vertical"
              />
            </div>
            <div class="col-md-4 position-relative">
              <DefaultCounterCard
              color="primary"
                title="Total Patients"
                description="Mix the sections, change the colors and unleash your
                  creativity"
                :count="250"
                suffix="+"
                :duration="3000"
                divider="vertical"
              />
            </div>
            <div class="col-md-4">
              <DefaultCounterCard
              color="primary"
                title="Happy Patients"
                description="Save 3-4 weeks of work when you use our pre-made pages for
                  your website"
                :count="210"
                suffix="+"
                :duration="3000"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
