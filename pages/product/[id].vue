<template>
  <section class="product">
    <h1 class="product-title">{{ params.id }}の商品詳細ページ</h1>
    <div class="module--spacing--veryLarge"></div>
    <swiper
      :slides-per-view="3"
      :space-between="50"
      :allowTouchMove="true"
      :loop="true"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
    >
      <!-- <swiper-slide>Slide 1</swiper-slide>
      <swiper-slide>Slide 2</swiper-slide>
      <swiper-slide>Slide 3</swiper-slide> -->
      <swiper-slide>Slide 4</swiper-slide>
      zs
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </swiper>
    <div class="module--spacing--small"></div>
    <div class="product-price">¥2000</div>
    <div class="product-body">
      <p class="product-text">
        商品説明です。商品説明です。商品説明です。商品説明です。商品説明です。商品説明です。商品説明です。商品説明です。
        商品説明です。商品説明です。商品説明です。商品説明です。商品説明です。商品説明です。商品説明です。商品説明です。
        商品説明です。商品説明です。商品説明です。商品説明です。商品説明です。商品説明です。商品説明です。商品説明です。商品説明です。
        商品説明です。商品説明です。商品説明です。商品説明です。商品説明です。商品説明です。
        商品説明です。商品説明です。商品説明です。商品説明です。商品説明です。商品説明です。商品説明です。
      </p>
    </div>
    <Button msg="購入する" @push="buy()" />
  </section>
</template>

<script lang="ts">
import "../../assets/css/common.css";
import { defineComponent } from "vue";

import Button from "../../components/UIKit/Button.vue";

import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";

export default defineComponent({
  components: {
    Button,
    Swiper,
    SwiperSlide,
  },
  setup() {
    const { params } = useRoute();

    const onSwiper = (swiper) => {
      console.log(swiper);
    };
    const onSlideChange = () => {
      console.log("slide change");
    };

    const buy = () => {
      alert("購入したぜ！！");
    };

    return {
      params,
      buy,
      onSwiper,
      onSlideChange,
    };
  },
});
</script>

<style scoped>
.product-title {
  text-align: center;
}

.product-image-box {
  width: 650px;
  height: 350px;
  margin: auto;
}

.product-price {
  font-size: 3em;
  font-weight: bold;
  text-align: center;
}

.product-body {
  width: 70%;
  margin: auto;
  height: 400px;
  border: solid 1px black;
  overflow: auto;
}
</style>
