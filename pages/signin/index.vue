<template>
  <section class="login-box">
    <h2>サインイン</h2>
    <div class="module--spacing--small"></div>
    <TextInput
      v-model:modalValue="form.email"
      type="text"
      placeholder="メールアドレス"
      name="email"
      :value="form.email"
    />
    <div class="module--spacing--verySmall"></div>
    <p>8文字以上の半角英数字で入力して下さい</p>
    <TextInput
      v-model:modalValue="form.passwd"
      type="password"
      placeholder="パスワード"
      name="passwd"
      :value="form.passwd"
    />
    <div class="module--spacing--large"></div>
    <Button msg="ログイン" @push="login" />
    <div class="module--spacing--verySmall"></div>
    <NuxtLink to="/signup">アカウントをお持ちでない方はこちらへ。</NuxtLink>
    <div class="module--spacing--verySmall"></div>
    <NuxtLink to="/">HOME</NuxtLink>
    <p class="err-msg" v-if="form.emptyEmail">
      メールアドレスを入力してください。
    </p>
    <p class="err-msg" v-if="form.validEmail">
      メールアドレスを正しく入力してください。
    </p>
    <p class="err-msg" v-if="form.emptyPasswd">
      パスワードを入力してください。
    </p>
    <p class="err-msg" v-if="form.validPasswd">
      パスワードは8文字以上の半角英数字で入力して下さい
    </p>
  </section>
</template>

<script lang="ts">
import "../../css/common.css";
import { defineComponent, reactive } from "vue";
import TextInput from "../../components/TextInput.vue";
import Button from "../../components/Button.vue";

type FormData = {
  email: string;
  passwd: string;
  emptyEmail: boolean;
  validEmail: boolean;
  emptyPasswd: boolean;
  validPasswd: boolean;
};
export default defineComponent({
  components: {
    TextInput,
    Button,
  },
  setup() {
    const form = reactive<FormData>({
      email: "",
      passwd: "",
      emptyEmail: false,
      validEmail: false,
      emptyPasswd: false,
      validPasswd: false,
    });

    const login = () => {
      let errFlg = false;
      errFlg = validation();
      if (!errFlg) {
        alert("login");
      }
    };

    const validation = (): boolean => {
      const regexp =
        /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;
      const halfWidth = /^([a-zA-Z0-9]{8,})$/;
      let valid = false;

      if (form.email.length == 0) {
        form.emptyEmail = true;
        form.validEmail = false;
        valid = true;
      } else if (!regexp.test(form.email)) {
        form.emptyEmail = false;
        form.validEmail = true;
        valid = true;
      } else {
        form.emptyEmail = false;
        form.validEmail = false;
        valid = false;
      }
      if (form.passwd.length == 0) {
        form.emptyPasswd = true;
        form.validPasswd = false;
        valid = true;
      } else if (!halfWidth.test(form.passwd)) {
        form.emptyPasswd = false;
        form.validPasswd = true;
        valid = true;
      } else {
        form.emptyPasswd = false;
        form.validPasswd = false;
        valid = false;
      }
      return valid;
    };

    return {
      form,
      login,
    };
  },
});
</script>

<style scoped>
.login-box {
  text-align: center;
  width: 450px;
  height: 400px;
  background-color: antiquewhite;
}

.err-msg {
  color: red;
}
</style>
