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
    <div class="imgContent">
      <ImagePreview :imageUrl="form.imageUrl" />
      <div class="module--spacing--largeSmall"></div>
      <UploadFile @fileList="setFileList" />
    </div>
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
    <div class="err-box">
      <ul>
        <li class="err-msg" v-if="form.emptyName">
          ユーザーネームを入力してください。
        </li>
        <li class="err-msg" v-if="form.emptyEmail">
          メールアドレスを入力してください。
        </li>
        <li class="err-msg" v-if="form.validEmail">
          メールアドレスを正しく入力してください。
        </li>
        <li class="err-msg" v-if="form.emptyAdress">
          住所を入力してください。
        </li>
        <li class="err-msg" v-if="form.emptyPasswd">
          パスワードを入力してください。
        </li>
        <li class="err-msg" v-if="form.validPasswd">
          パスワードは8文字以上の半角英数字で入力して下さい
        </li>
        <li class="err-msg" v-if="form.matchPasswd">
          パスワードが一致しません
        </li>
      </ul>
    </div>
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
  fileList: object;
  imageUrl: string;
  passwd: string;
  confirmPasswd: string;
  type: string;
  emptyName: boolean;
  emptyEmail: boolean;
  validEmail: boolean;
  emptyAdress: boolean;
  emptyPasswd: boolean;
  validPasswd: boolean;
  matchPasswd: boolean;
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
      fileList: null,
      imageUrl: "",
      passwd: "",
      confirmPasswd: "",
      type: "password",
      emptyName: false,
      emptyEmail: false,
      validEmail: false,
      emptyAdress: false,
      emptyPasswd: false,
      validPasswd: false,
      matchPasswd: false,
    });

    const signup = () => {
      let errFlg = false;
      errFlg = validation();
      if (!errFlg) {
        alert("signup");
      }
    };

    const validation = (): boolean => {
      const regexp =
        /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;
      const halfWidth = /^([a-zA-Z0-9]{8,})$/;
      let valid = false;

      if (form.name.length == 0) {
        form.emptyName = true;
        valid = true;
      } else {
        form.emptyName = false;
      }

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

      if (form.address.length == 0) {
        form.emptyAdress = true;
        valid = true;
      } else {
        form.emptyAdress = false;
      }

      if (form.passwd.length == 0) {
        form.emptyPasswd = true;
        form.validPasswd = false;
        form.matchPasswd = false;
        valid = true;
      } else if (!halfWidth.test(form.passwd)) {
        form.emptyPasswd = false;
        form.validPasswd = true;
        form.matchPasswd = false;
        valid = true;
      } else if (form.passwd != form.confirmPasswd) {
        form.emptyPasswd = false;
        form.validPasswd = false;
        form.matchPasswd = true;
        valid = true;
      } else {
        form.emptyPasswd = false;
        form.validPasswd = false;
        form.matchPasswd = false;
      }
      return valid;
    };

    const setFileList = (fileList) => {
      form.fileList = fileList;
      const imgUrl = URL.createObjectURL(fileList[0]);
      form.imageUrl = imgUrl;
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
      setFileList,
      change,
    };
  },
});
</script>

<style scoped>
.sign-up {
  text-align: center;
  width: 650px;
  margin: auto;
  background-color: antiquewhite;
}

@media screen and (min-width: 1026px) {
  .imgContent {
    width: 90%;
    max-width: 700px;
    height: 40vh;
    margin: auto;
    margin-bottom: 10px;
    background-color: #ccc;
    padding-top: 5%;
  }
}
@media screen and (min-width: 482px) and (max-width: 1025px) {
  .imgContent {
    width: 90%;
    max-width: 700px;
    height: 20vh;
    margin: auto;
    margin-bottom: 10px;
    background-color: #ccc;
    padding-top: 5%;
  }
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

.err-box {
  position: absolute;
  top: 10vh;
  left: 5vh;
  border: solid, 3px, orange;
}

.err-msg {
  color: red;
}
</style>
