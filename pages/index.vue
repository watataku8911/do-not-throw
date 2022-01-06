<template>
  <div>
    <section class="main-image">
      <div class="main-image-title-box">
        <h1 class="main-image-title">Don't throw</h1>
      </div>
      <div class="pic_down"></div>
    </section>

    <section class="contents">
      <div class="module--spacing--large"></div>
      <h1 class="product-title">取引一覧</h1>
      <div class="product-contents">
        <ProductList
          title="タイトルです"
          text="テキストですテキストですテキストですテキストですテキストですテキストですテキストです"
          @click="product()"
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
      <div class="module--spacing--small"></div>
      <i class="font-red"
        >※取引を始めるには<NuxtLink to="/signup">サインアップ</NuxtLink
        >してください。</i
      >
      <div class="module--spacing--large"></div>
      <Privacy />
    </section>
    <div class="module--spacing--veryLarge"></div>
    <section class="get-start">
      <NuxtLink to="/signin">アカウントをお持ちの方はこちらへ。</NuxtLink>
      <NuxtLink to="/signup">アカウントをお持ちでない方はこちらへ。</NuxtLink>
    </section>
  </div>
</template>

<script lang="ts">
import "../assets/css/common.css";
import { defineComponent } from "vue";

import ProductList from "../components/ProductList.vue";
import Privacy from "../components/Privacy.vue";

export default defineComponent({
  components: {
    ProductList,
    Privacy,
  },
  setup() {
    const product = () => {
      const router = useRouter();
      router.push("/product/1");
    };

    return {
      product,
    };
  },
});
</script>

<style scoped>
.main-image {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 88vh;
  border-bottom: solid 1px #000;
  background-image: url(../assets/img/main-image.jpeg);
  background-repeat: no-repeat;
  background-size: cover;
  opacity: 0.7;
}

.main-image-title {
  font-family: "Anton", sans-serif;
  font-family: "Lobster", cursive;
  font-size: 4em;
  color: #000;
  border-radius: 20px;
}

.pic_down {
  position: absolute;
  bottom: 10vh;
  text-align: -webkit-center;
  animation-name: picdown;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-timing-function: ease;
  will-change: transform;
}

.pic_down::after {
  content: "";
  display: block;
  width: 40px;
  height: 40px;
  border-top: 8px solid black;
  border-right: 8px solid black;
  transform: rotate(135deg);
}

@keyframes picdown {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(20px);
  }
}

.contents {
  width: 80%;
  margin: auto;
}

.product-title {
  text-align: center;
}

.product-contents {
  display: flex;
  justify-content: space-around;
  flex-flow: row;
  flex-wrap: wrap;
}

.font-red {
  color: red;
  display: block;
  text-align: center;
}

.get-start {
  background-color: #eee;
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 15vh;
}
</style>
