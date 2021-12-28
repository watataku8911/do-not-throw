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

    <div class="module--spacing--veryLarge"></div>
    <div class="history">
      <h1>履歴</h1>
    </div>
  </section>
</template>

<script lang="ts">
import "../../assets/css/common.css";
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    const { params } = useRoute();

    return { params };
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
</style>
