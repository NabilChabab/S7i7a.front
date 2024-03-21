<template>
  <div class="text-center">
    <sync-loader
    :loading="loading"
    :color="color"
    :size="size"
  ></sync-loader>
  </div>
</template>
<script>
import SyncLoader from "vue-spinner/src/SyncLoader.vue";
export default {
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: "#6437e0",
    },
    size: {
      type: String,
      default: "15px",
    },
  },
  components: {
    SyncLoader,
  },
};
</script>
