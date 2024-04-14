<script setup> 
import {defineProps} from "vue"
defineProps({
  icon: {
    type: String,
    default: "",
  },
  image: {
    type: Object,
    component: String,
    class: String,
    default: () => {},
  },
  title: {
    type: [String, Object],
    required: true,
    text: String,
    class: String,
  },
  description: {
    type: [String, Object],
    required: true,
    text: String,
    class: String,
  },
  col: {
    type: String,
    default: "",
  },
});
</script>
<script>
export default {
  inheritAttrs: false,
};
</script>
<template>
  <div :class="`${col ? col : 'col-md-6'}`">
    <div v-bind="$attrs" class="info">
      <i
        :class="icon" style="font-size:28px;"
        ></i
      >
      <img v-if="image" :src="image.component" :class="image.class" />
      <h5
        :class="
          typeof title == 'string' ? 'font-weight-bolder mt-3' : title.class
        "
      >
        {{ typeof title == "string" ? title : title.text }}
      </h5>
      <p :class="typeof description == 'string' ? 'pe-5' : description.class" class="text-dark">
        {{ typeof description == "string" ? description : description.text }}
      </p>
    </div>
  </div>
</template>
