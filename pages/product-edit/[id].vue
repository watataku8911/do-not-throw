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
    <div class="module--spacing--large"></div>
    <Button msg="出品する" @push="listing()" />
    <!-- <Button msg="商品情報を編集する" @push="edit()" /> -->
  </section>
</template>

<script lang="ts">
import "../../assets/css/common.css";
import { defineComponent, reactive } from "vue";
import { productAdd } from "../../functions/product";
import ImagePreviewLarge from "../../components/UIKit/ImagePreviewLarge.vue";
import UploadFile from "../../components/UIKit/UploadFile.vue";
import TextInput from "../../components/UIKit/TextInput.vue";
import TextArea from "../../components/UIKit/TextArea.vue";
import Button from "../../components/UIKit/Button.vue";

type FormData = {
  images: string[];
  fileLists: Array<BlobPart[]> | null;
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
      fileLists: null,
      productName: "",
      productPrice: "",
      productBody: "",
    });

    const uid = window.location.pathname.split("/product-edit/")[1];

    const listing = () => {
      let flg = false;

      if (!flg) {
        productAdd(
          form.fileLists,
          form.productName,
          Number(form.productPrice),
          form.productBody,
          uid
        );
      }
    };

    //  const edit = () => {
    //   let flg = false;

    //   if (!flg) {
    //     productAdd(
    //       form.fileLists,
    //       form.productName,
    //       Number(form.productPrice),
    //       form.productBody,
    //       uid
    //     );
    //   }
    // };

    const setFileList = (fileList: BlobPart[]) => {
      form.fileLists.push(fileList);
      const imgUrl = URL.createObjectURL(fileList[0]);
      form.images.push(imgUrl);
    };

    return {
      form,
      listing,
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
