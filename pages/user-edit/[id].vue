<template>
  <section class="sign-up">
    <h2>ユーザー編集</h2>
    <TextInput
      v-model:modalValue="form.name"
      type="text"
      placeholder="ユーザーネーム"
      name="name"
      :value="form.name"
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

    <div class="module--spacing--large"></div>
    <Button msg="ユーザー情報を編集" @push="signup" v-show="form.updtateNow" />
    <Loading v-show="!form.updtateNow" />
    <div class="module--spacing--verySmall"></div>
    <p @click="back()">戻る</p>
    <div class="err-box">
      <ul>
        <li class="err-msg" v-if="form.emptyName">
          ユーザーネームを入力してください。
        </li>
        <li class="err-msg" v-if="form.emptyPostcode">
          郵便番号を入力してください。
        </li>
        <li class="err-msg" v-if="form.emptyAddress">
          住所を入力してください。
        </li>
      </ul>
    </div>
  </section>
</template>

<script lang="ts">
import "../../assets/css/common.css";
import {
  listenAuthState,
  getUserData,
  updateUserData,
} from "../../functions/user";
import axios from "axios";
import { defineComponent, reactive } from "vue";
import TextInput from "../../components/UIKit/TextInput.vue";
import Button from "../../components/UIKit/Button.vue";
import ImagePreviewSmall from "../../components/UIKit/ImagePreviewSmall.vue";
import UploadFile from "../../components/UIKit/UploadFile.vue";
import Loading from "../../components/UIKit/Loading.vue";
import { Axios } from "axios";
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
  address: string;
  postcode: string;
  fileList: BlobPart[] | null;
  imageUrl: string;
  emptyName: boolean;
  emptyPostcode: boolean;
  emptyAddress: boolean;
  searchNow: boolean;
  updtateNow: boolean;
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
      address: "",
      postcode: "",
      fileList: null,
      imageUrl: "",
      emptyName: false,
      emptyPostcode: false,
      emptyAddress: false,
      searchNow: true,
      updtateNow: true,
    });

    if (!listenAuthState()) {
      const uid = window.location.pathname.split("/user-edit/")[1];
      getUserData(uid)
        .then((result) => {
          form.name = result.userName;
          form.postcode = String(result.postcode);
          form.address = result.address;
          form.imageUrl = result.photoURL;
        })
        .catch(() => {
          throw new Error("ユーザーデータが取得できません。");
        });
    } else {
      const router = useRouter();
      router.push("/signin");
    }

    const signup = () => {
      const uid = window.location.pathname.split("/user-edit/")[1];
      form.updtateNow = false;
      let errFlg = false;
      errFlg = validation();
      if (!errFlg) {
        updateUserData(
          form.name,
          Number(form.postcode),
          form.address,
          form.imageUrl,
          form.fileList,
          uid
        )
          .then(() => {
            const router = useRouter();
            router.push("/mypage/" + uid);
          })
          .catch(() => {
            alert("ユーザー情報を編集できませんでした。");
            form.updtateNow = true;
          });
      }
    };

    const searchAdress = () => {
      form.searchNow = false;
      if (form.postcode.length == 0) {
        alert("郵便番号入力なし");
        form.searchNow = true;
      } else {
        dataFetch()
          .then((addressData: any) => {
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

    const dataFetch = (): Promise<any | null> => {
      const endPoint = "https://zipcloud.ibsnet.co.jp/api/search";
      return new Promise((resolve, reject) => {
        axios
          .get(endPoint + "?zipcode=" + Number(form.postcode))
          .then((resp) => resolve(resp))
          .catch(() => reject(null));
      });
    };

    const validation = (): boolean => {
      let valid = false;

      if (form.name.length == 0) {
        form.emptyName = true;
        valid = true;
      } else {
        form.emptyName = false;
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
      return valid;
    };

    const setFileList = (fileList: BlobPart[]) => {
      form.fileList = fileList;

      const imgUrl = URL.createObjectURL(fileList[0]);
      form.imageUrl = imgUrl;
    };

    const back = () => {
      const uid = window.location.pathname.split("/user-edit/")[1];
      const router = useRouter();
      router.push("/mypage/" + uid);
    };

    return {
      form,
      signup,
      searchAdress,
      setFileList,
      back,
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
