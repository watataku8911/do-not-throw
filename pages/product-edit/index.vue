<template>
  <section class="product-edit">
    <h1 class="product-edit-title">商品登録ページ</h1>
    <TextInput
      v-model:modalValue="form.productName"
      type="text"
      placeholder="商品名"
      name="product-name"
      :value="form.productName"
    />
    <div class="module--spacing--verySmall"></div>
    <TextInput
      v-model:modalValue="form.productPrice"
      type="text"
      placeholder="商品名"
      name="product-name"
      :value="form.productName"
    />
    <div class="module--spacing--verySmall"></div>
    <TextArea
      v-model="textarea"
      name="body"
      placeholder="詳細"
      cols="76"
      rows="10"
      :value="textarea"
    />
  </section>
</template>

<script lang="ts">
import "../../assets/css/common.css";
import { defineComponent, reactive } from "vue";
import TextInput from "../../components/UIKit/TextInput.vue";
import TextArea from "../../components/UIKit/TextArea.vue";
import Button from "../../components/UIKit/Button.vue";

type FormData = {
  productName: string;
};
export default defineComponent({
  components: {
    TextInput,
    TextArea,
    Button,
  },
  setup() {
    const form = reactive<FormData>({
      productName: "",
    });

    return {
      form,
    };
  },
});
</script>

<style scoped>
.product-edit {
  width: 80%;
  text-align: center;
  margin: auto;
}
</style>
