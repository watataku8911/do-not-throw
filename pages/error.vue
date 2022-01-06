<template>
  <div class="error">
    <h1>エラーが発生しました</h1>
    考えられる理由は以下です。
    <ul>
      <li>インターネットに接続されていません。</li>
      <li>ユーザーが見つからない</li>
    </ul>
    <NuxtLink to="/">TOPへ戻る。</NuxtLink>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {},
});
</script>

<style scoped>
.error {
  height: calc(100vh - 80px);
}
</style>
