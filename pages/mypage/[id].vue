<template>
  <section class="mypage">
    <h1 class="mypage-title">{{ userData.uid }}</h1>
    <div class="module--spacing--veryLarge"></div>
    <div class="icon-box">
      <p>
        <img class="icon" :src="userData.photoURL" alt="アイコン" />
      </p>
    </div>
    <div class="user-info">
      <h2 class="user-info-username">{{ userData.userName }}</h2>
      <p class="user-info-email">{{ userData.email }}</p>
    </div>
    <div class="module--spacing--verySmall"></div>
    <Button msg="ユーザー情報を編集する" @push="editUser()" />
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
import { getUserData } from "../../functions/user";
import { defineComponent, onMounted, ref } from "vue";

import Button from "../../components/UIKit/Button.vue";
import ProductList from "../../components/ProductList.vue";
import { DocumentData } from "@firebase/firestore";

export default defineComponent({
  components: {
    Button,
    ProductList,
  },
  setup() {
    const userData = ref<DocumentData>({});

    const editProduct = () => {
      const router = useRouter();
      router.push("/product-edit");
    };

    const editUser = () => {
      const uid = window.location.pathname.split("/mypage/")[1];
      const router = useRouter();
      router.push("/user-edit/" + uid);
    };

    onMounted(() => {
      const uid = window.location.pathname.split("/mypage/")[1];
      const router = useRouter();
      getUserData(uid)
        .then((result) => {
          userData.value = result;
        })
        .catch(() => {
          router.push("/error");
        });
    });

    return { userData, editUser, editProduct };
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
