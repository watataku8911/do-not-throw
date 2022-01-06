<template>
  <header class="header">
    <div class="logo">
      <h1><NuxtLink to="/">Don't throw</NuxtLink></h1>
    </div>
    <div class="navi">
      <NuxtLink to="/signin" v-if="uid.length == 0">サインイン</NuxtLink>
      <p @click="link()" v-else>マイページ</p>
      <NuxtLink to="/signup" v-if="uid.length == 0">サインアップ</NuxtLink>

      <p @click="signOut()" v-if="uid.length != 0">サインアウト</p>
    </div>
  </header>
</template>

<script lang="ts">
import { listenAuthState, logOut } from "../functions/user";
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const uid = ref("");

    if (listenAuthState()) {
      console.log("ログイン中");
    } else {
      console.log("ログインしていません");
    }

    const link = () => {
      const router = useRouter();
      router.push("/mypage/" + uid);
    };

    const signOut = () => {
      logOut()
        .then(() => console.log("サインアウトしました。"))
        .catch(() => console.log("サインアウトに失敗しました。"));
    };

    return {
      uid,
      link,
      signOut,
    };
  },
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
  color: #37e279;
}
</style>
