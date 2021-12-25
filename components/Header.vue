<template>
  <header class="header">
    <div class="logo">
      <h1><NuxtLink to="/">Don't throw</NuxtLink></h1>
    </div>
    <div class="navi">
      <NuxtLink to="/signin">サインイン</NuxtLink>

      <NuxtLink to="/signup">サインアップ</NuxtLink>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {},
});
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 80px;
  box-shadow: 2px 2px 2px 2px #eee;
}

.header h1 a {
  font-family: "Anton", sans-serif;
  font-family: "Lobster", cursive;
  text-decoration: none;
}
</style>
