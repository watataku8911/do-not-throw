<template>
  <label for="corporation_file" class="btn btn-success">
    {{ title }}を設定する
    <input
      type="file"
      class="file_input"
      style="display: none"
      id="corporation_file"
      mulitple="multiple"
      @change="onDrop"
    />
  </label>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  emits: ["fileList"],
  setup(_, context) {
    const onDrop = (e) => {
      const imageFile = e.target.files;
      if (imageFile) {
        context.emit("fileList", imageFile);
      }
    };
    return { onDrop };
  },
});
</script>

<style scoped>
label {
  background-color: #fff;
  padding: 1%;
  width: 40%;
  margin: 0 auto;
  box-shadow: 1px 1px 8px 0px #000;
  display: block;
}
</style>
