<template>
  <div class="product-list">
    <div class="image-zone"></div>
    <h2 class="card-title">{{ title }}</h2>
    <p class="card-text">{{ text }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    // imgPath: {
    //   type: String,
    //   required: true,
    // },
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  setup() {},
});
</script>

<style scoped>
.product-list {
  margin-top: 50px;
  width: 30%;
  height: 380px;
  border: solid 1px black;
}

.image-zone {
  height: 280px;
}
</style>
