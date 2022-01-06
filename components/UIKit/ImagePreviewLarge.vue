<template>
  <div class="imagePreview">
    <img v-for="(imageUrl, index) in images" :key="index" :src="imageUrl" alt />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    images: {
      type: Array,
      required: true,
    },
  },
});
</script>
<style scoped>
@media screen and (min-width: 1026px) {
  .imagePreview {
    display: flex;
    height: 200px;
    background: rgb(240, 240, 240);
    overflow: hidden;
    background-position: center center;
    background-size: cover;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 20px;
    position: relative;
  }

  .imagePreview img {
    height: 200px;
    width: 100%;
  }
}

@media screen and (min-width: 482px) and (max-width: 1025px) {
  .imagePreview {
    display: flex;
    height: 100px;
    background: rgb(240, 240, 240);
    overflow: hidden;
    background-position: center center;
    background-size: cover;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 20px;
    position: relative;
  }

  .imagePreview img {
    height: 100px;
    width: 100%;
  }
}

@media screen and (max-width: 481px) {
  .imagePreview {
    display: flex;
    height: 50px;
    background: rgb(240, 240, 240);
    overflow: hidden;
    background-position: center center;
    background-size: cover;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 20px;
    position: relative;
  }

  .imagePreview img {
    height: 50px;
    width: 100%;
  }
}
</style>
