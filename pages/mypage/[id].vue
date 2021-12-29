<template>
  <section class="mypage">
    <h1 class="mypage-title">{{ params.id }}のマイページ</h1>
    <div class="module--spacing--veryLarge"></div>
    <div class="icon-box">
      <p>
        <img
          class="icon"
          src="../../assets/img/no-profile.png"
          alt="アイコン"
        />
      </p>
    </div>
    <div class="user-info">
      <h2 class="user-info-username">ゲスト</h2>
      <p class="user-info-email">guest.user@example.com</p>
    </div>
    <div class="module--spacing--verySmall"></div>
    <Button msg="出品する" @push="editProduct()" />
    <div class="module--spacing--veryLarge"></div>
    <div class="history">
      <h1 class="history-title">履歴</h1>
      <div class="history-contents">
        <ProductList
          title="タイトルです"
          text="テキストですテキストですテキストですテキストですテキストですテキストですテキストです"
        />
        <ProductList
          title="タイトルです"
          text="テキストですテキストですテキストですテキストですテキストですテキストですテキストです"
        />
        <ProductList
          title="タイトルです"
          text="テキストですテキストですテキストですテキストですテキストですテキストですテキストです"
        />
        <ProductList
          title="タイトルです"
          text="テキストですテキストですテキストですテキストですテキストですテキストですテキストです"
        />
        <ProductList
          title="タイトルです"
          text="テキストですテキストですテキストですテキストですテキストですテキストですテキストです"
        />
        <ProductList
          title="タイトルです"
          text="テキストですテキストですテキストですテキストですテキストですテキストですテキストです"
        />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import "../../assets/css/common.css";
import { defineComponent } from "vue";

import Button from "../../components/UIKit/Button.vue";
import ProductList from "../../components/ProductList.vue";

export default defineComponent({
  components: {
    Button,
    ProductList,
  },
  setup() {
    const { params } = useRoute();

    const editProduct = () => {
      const router = useRouter();
      router.push("/product-edit");
    };

    return { params, editProduct };
  },
});
</script>

<style scoped>
.mypage {
  text-align: center;
}

.icon {
  width: 250px;
  height: 250px;
  border-radius: 50%;
}

.history {
  width: 85%;
  margin: auto;
  text-align: left;
}

.history-title {
  text-align: center;
}

.history-contents {
  display: flex;
  justify-content: space-around;
  flex-flow: row;
  flex-wrap: wrap;
}
</style>
