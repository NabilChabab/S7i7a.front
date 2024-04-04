<template>
  <div class="table-responsive">
    <main id="sample">
    <Editor
      api-key="f9ggt3dqixvgwwjjoxp3xio6hgf0r72qnuvll71z6g0sckld"
      :init="{
        toolbar_mode: 'sliding',
        plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount linkchecker',
        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
      }"
      initial-value="Welcome to TinyMCE!"
      
    />
  </main>
  </div>
</template>

<script>
// import api from "@/services/api";
import "moment-timezone";
import Editor from '@tinymce/tinymce-vue'
// import Swal from "sweetalert2";
export default {
  components:{
    Editor
  }
};
</script>
<style scoped>
@media (min-width: 1024px) {
  #sample {
    display: flex;
    flex-direction: column;
    place-items: center;
    width: 100%;
  }
}
</style>