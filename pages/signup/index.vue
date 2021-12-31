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
    <div class="module--spacing--verySmall"></div>
    <p>※数字のみ</p>
    <div class="module--spacing--verySmall"></div>
    <TextInput
      v-model:modalValue="form.postcode"
      type="text"
      placeholder="郵便番号"
      name="postcode"
      :value="form.postcode"
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
    <Button
      msg="住所を検索する"
      @push="searchAdress()"
      v-show="form.searchNow"
    />
    <Loading v-show="!form.searchNow" />
    <div class="module--spacing--small"></div>
    <div class="imgContent">
      <ImagePreviewSmall :imageUrl="form.imageUrl" />
      <div class="module--spacing--largeSmall"></div>
      <UploadFile title="アイコン" @fileList="setFileList" />
    </div>

    <p>※8文字以上の半角英数字で入力して下さい</p>
    <div class="module--spacing--verySmall"></div>
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
          <img src="../../assets/img/look.svg" width="100" height="50" />
        </p>
        <p v-if="form.type == 'password'">
          <img src="../../assets/img/not-look.svg" width="100" height="50" />
        </p>
      </div>
    </div>
    <div class="module--spacing--large"></div>
    <Button msg="サインアップ" @push="signup" />
    <div class="module--spacing--verySmall"></div>
    <NuxtLink to="/signin">アカウントをお持ちの方はこちらへ。</NuxtLink>
    <div class="module--spacing--verySmall"></div>
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
        <li class="err-msg" v-if="form.emptyPostcode">
          郵便番号を入力してください。
        </li>
        <li class="err-msg" v-if="form.emptyAddress">
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
import "../../assets/css/common.css";
import axios from "axios";
import { defineComponent, reactive } from "vue";
import TextInput from "../../components/UIKit/TextInput.vue";
import Button from "../../components/UIKit/Button.vue";
import ImagePreviewSmall from "../../components/UIKit/ImagePreviewSmall.vue";
import UploadFile from "../../components/UIKit/UploadFile.vue";
import Loading from "../../components/UIKit/Loading.vue";
//import Look from "../../img/look.svg";
type Resp = {
  config: object;
  data: Data;
  headers: RespHeaders;
  request: object;
  status: number;
  statusText: string;
};
type RespHeaders = {
  cacheControl: string;
  contentLength: string;
  contentType: string;
};
type Data = {
  message: string;
  results: Array<Results>;
  status: number;
};
type Results = {
  address1: string;
  address2: string;
  address3: string;
  kana1: string;
  kana2: string;
  kana3: string;
  prefcode: string;
  zipcode: string;
};
type FormData = {
  name: string;
  email: string;
  address: string;
  postcode: string;
  imageUrl: string;
  passwd: string;
  confirmPasswd: string;
  type: string;
  emptyName: boolean;
  emptyEmail: boolean;
  validEmail: boolean;
  emptyPostcode: boolean;
  emptyAddress: boolean;
  emptyPasswd: boolean;
  validPasswd: boolean;
  matchPasswd: boolean;
  searchNow: boolean;
};
export default defineComponent({
  components: {
    TextInput,
    Button,
    ImagePreviewSmall,
    UploadFile,
    Loading,
    //Look,
  },
  setup() {
    const form = reactive<FormData>({
      name: "",
      email: "",
      address: "",
      postcode: "",
      imageUrl: "",
      passwd: "",
      confirmPasswd: "",
      type: "password",
      emptyName: false,
      emptyEmail: false,
      validEmail: false,
      emptyPostcode: false,
      emptyAddress: false,
      emptyPasswd: false,
      validPasswd: false,
      matchPasswd: false,
      searchNow: true,
    });

    const signup = () => {
      let errFlg = false;
      errFlg = validation();
      if (!errFlg) {
        alert("signup");
      }
    };

    const searchAdress = () => {
      if (form.postcode.length == 0) {
        alert("郵便番号入力なし");
      } else {
        dataFetch()
          .then((addressData: Resp) => {
            if (addressData.data.results == null) {
              alert(addressData.data.message);
              form.searchNow = true;
            } else {
              const address1 = addressData.data.results[0].address1;
              const address2 = addressData.data.results[0].address2;
              const address3 = addressData.data.results[0].address3;

              form.address = address1 + address2 + address3;
              form.searchNow = true;
            }
          })
          .catch((err) => console.error(err));
      }
    };

    const dataFetch = (): Promise<Resp | null> => {
      const endPoint = "https://zipcloud.ibsnet.co.jp/api/search";
      return new Promise((resolve, reject) => {
        axios
          .get(endPoint + "?zipcode=" + Number(form.postcode))
          .then((resp: Resp) => resolve(resp))
          .catch(() => reject(null));
      });
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

      if (form.postcode.length == 0) {
        form.emptyPostcode = true;
        valid = true;
      } else {
        form.emptyPostcode = false;
      }

      if (form.address.length == 0) {
        form.emptyAddress = true;
        valid = true;
      } else {
        form.emptyAddress = false;
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
      searchAdress,
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
  top: 50vh;
  right: 5vh;
  border: solid, 3px, orange;
}

.err-msg {
  color: red;
}
</style>
