<template>
  <section class="product-edit">
    <h1 class="product-edit-title">商品登録ページ</h1>
    <div class="imgContent">
      <ImagePreviewLarge :images="form.images" />
      <div class="module--spacing--small"></div>
      <UploadFile title="商品画像" @fileList="setFileList" />
    </div>
    <div class="module--spacing--small"></div>
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
      type="number"
      placeholder="値段"
      name="product-price"
      :value="form.productPrice"
    />
    <div class="module--spacing--verySmall"></div>
    <TextArea
      v-model="form.productBody"
      name="product-body"
      placeholder="詳細"
      cols="76"
      rows="10"
      :value="form.productBody"
    />
  </section>
</template>

<script lang="ts">
import "../../assets/css/common.css";
import { defineComponent, reactive } from "vue";
import ImagePreviewLarge from "../../components/UIKit/ImagePreviewLarge.vue";
import UploadFile from "../../components/UIKit/UploadFile.vue";
import TextInput from "../../components/UIKit/TextInput.vue";
import TextArea from "../../components/UIKit/TextArea.vue";
import Button from "../../components/UIKit/Button.vue";

type FormData = {
  images: string[];
  productName: string;
  productPrice: string;
  productBody: string;
};
export default defineComponent({
  components: {
    ImagePreviewLarge,
    UploadFile,
    TextInput,
    TextArea,
    Button,
  },
  setup() {
    const form = reactive<FormData>({
      images: [],
      productName: "",
      productPrice: "",
      productBody: "",
    });

    const setFileList = (fileList) => {
      const imgUrl = URL.createObjectURL(fileList[0]);
      form.images.push(imgUrl);
    };

    return {
      form,
      setFileList,
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
