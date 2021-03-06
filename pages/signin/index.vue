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
    <p>※8文字以上の半角英数字で入力して下さい</p>
    <div class="passwd-box">
      <div class="passwd-input-zone">
        <TextInput
          v-model:modalValue="form.passwd"
          :type="form.type"
          placeholder="パスワード"
          name="passwd"
          :value="form.passwd"
        />
      </div>
      <div class="passwd-look-zone" @click="change()">
        <p v-if="form.type == 'text'">
          <img src="../../assets/img/look.svg" width="100" height="50" />
        </p>
        <p v-if="form.type == 'password'">
          <img src="../../assets/img/not-look.svg" width="100" height="50" />
        </p>
      </div>
    </div>
    <div class="module--spacing--large"></div>
    <Button msg="ログイン" @push="login" v-show="form.signinNow" />
    <Loading v-show="!form.signinNow" />
    <div class="module--spacing--verySmall"></div>
    <NuxtLink to="/signup">アカウントをお持ちでない方はこちらへ。</NuxtLink>
    <div class="module--spacing--verySmall"></div>
    <p @click="guestUser()">Guestユーザーでログイン</p>
    <div class="module--spacing--veryLarge"></div>
    <div class="err-box">
      <ul>
        <li class="err-msg" v-if="form.emptyEmail">
          メールアドレスを入力してください。
        </li>
        <li class="err-msg" v-if="form.validEmail">
          メールアドレスを正しく入力してください。
        </li>
        <li class="err-msg" v-if="form.emptyPasswd">
          パスワードを入力してください。
        </li>
        <li class="err-msg" v-if="form.validPasswd">
          パスワードは8文字以上の半角英数字で入力して下さい
        </li>
      </ul>
    </div>
  </section>
</template>

<script lang="ts">
import "../../assets/css/common.css";
import { defineComponent, reactive } from "vue";
import TextInput from "../../components/UIKit/TextInput.vue";
import Button from "../../components/UIKit/Button.vue";
import Loading from "../../components/UIKit/Loading.vue";
import { signIn } from "../../functions/user";

type UserData = {
  additionalUserInfo: object;
  credential: null;
  operationType: String;
  user: User;
};
type User = {
  uid: string;
  email: string;
  phoneNumber: number;
  displayName: string;
};
type FormData = {
  email: string;
  passwd: string;
  type: string;
  emptyEmail: boolean;
  validEmail: boolean;
  emptyPasswd: boolean;
  validPasswd: boolean;
  signinNow: boolean;
};
export default defineComponent({
  components: {
    TextInput,
    Button,
    Loading,
  },
  setup() {
    const form = reactive<FormData>({
      email: "",
      passwd: "",
      type: "password",
      emptyEmail: false,
      validEmail: false,
      emptyPasswd: false,
      validPasswd: false,
      signinNow: true,
    });

    const change = () => {
      if (form.type == "password") {
        form.type = "text";
      } else if (form.type == "text") {
        form.type = "password";
      }
    };

    const login = () => {
      form.signinNow = false;
      let errFlg = false;
      errFlg = validation();
      if (!errFlg) {
        signIn(form.email, form.passwd)
          .then((uid) => {
            const router = useRouter();
            router.push("/mypage/" + uid);
          })
          .catch(() => {
            alert("異常が見つかりました");
            form.signinNow = true;
          });
      } else {
        form.signinNow = true;
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
      }
      return valid;
    };

    const guestUser = () => {
      form.email = "guest.user@example.com";
      form.passwd = "passW0rd";
    };

    return {
      form,
      change,
      login,
      guestUser,
    };
  },
});
</script>

<style scoped>
.login-box {
  text-align: center;
  width: 550px;
  background-color: antiquewhite;
  margin: auto;
}

.passwd-box {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.passwd-input-zone {
  width: 95%;
}

.passwd-look-zone {
  padding-top: 3px;
}

.err-box {
  position: absolute;
  top: 15vh;
  right: 5vh;
  border: solid, 3px, orange;
}

.err-msg {
  color: red;
}
</style>
