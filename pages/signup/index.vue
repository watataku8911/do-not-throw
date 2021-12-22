<template>
  <section class="sign-up">
    <h2>サインアップ</h2>
    <TextInput
      v-model:modalValue="form.name"
      type="text"
      placeholder="ユーザーネーム"
      name="name"
      :value="form.name"
    />
    <div class="module--spacing--small"></div>
    <TextInput
      v-model:modalValue="form.email"
      type="text"
      placeholder="メールアドレス"
      name="email"
      :value="form.email"
    />
    <div class="module--spacing--small"></div>
    <TextInput
      v-model:modalValue="form.address"
      type="text"
      placeholder="住所"
      name="address"
      :value="form.address"
    />
    <div class="module--spacing--small"></div>
    <div class="passwd-box">
      <div class="passwd-input-zone">
        <TextInput
          v-model:modalValue="form.passwd"
          :type="form.type"
          placeholder="パスワード"
          name="passwd"
          :value="form.passwd"
        />
        <div class="module--spacing--small"></div>
        <TextInput
          v-model:modalValue="form.confirmPasswd"
          :type="form.type"
          placeholder="確認"
          name="confirmPasswd"
          :value="form.confirmPasswd"
        />
      </div>
      <div class="passwd-look-zone" @click="change()">
        <p v-if="form.type == 'text'">
          <img src="../../img/look.svg" width="100" height="50" />
        </p>
        <p v-if="form.type == 'password'">
          <img src="../../img/not-look.svg" width="100" height="50" />
        </p>
      </div>
    </div>
    <div class="module--spacing--large"></div>
    <Button msg="サインアップ" @push="signup" />
    <div class="module--spacing--verySmall"></div>
    <NuxtLink to="/signin">アカウントをお持ちの方はこちらへ。</NuxtLink>
    <div class="module--spacing--verySmall"></div>
    <NuxtLink to="/">HOME</NuxtLink>
  </section>
</template>

<script lang="ts">
import "../../css/common.css";
import { defineComponent, reactive } from "vue";
import TextInput from "../../components/TextInput.vue";
import Button from "../../components/Button.vue";
//import Look from "../../img/look.svg";

type FormData = {
  name: string;
  email: string;
  address: string;
  passwd: string;
  confirmPasswd: string;
  type: string;
};
export default defineComponent({
  components: {
    TextInput,
    Button,
    //Look,
  },
  setup() {
    const form = reactive<FormData>({
      name: "",
      email: "",
      address: "",
      passwd: "",
      confirmPasswd: "",
      type: "password",
    });

    const signup = () => {
      let errFlg = false;

      if (!errFlg) {
        alert("signup");
      }
    };

    const change = () => {
      if (form.type == "password") {
        form.type = "text";
      } else if (form.type == "text") {
        form.type = "password";
      }
    };

    return {
      form,
      signup,
      change,
    };
  },
});
</script>

<style scoped>
.sign-up {
  text-align: center;
  width: 450px;
  background-color: antiquewhite;
}

.passwd-box {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.passwd-input-zone {
  width: 90%;
}
</style>
