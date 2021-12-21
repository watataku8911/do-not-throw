<template>
  <section class="sign-up">
    <h2>サインアップ</h2>
  </section>
</template>

<script lang="ts">
import "../../css/common.css";
import { defineComponent, reactive } from "vue";
import TextInput from "../../components/TextInput.vue";
import Button from "../../components/Button.vue";

type FormData = {
  name: string;
  email: string;
  address: string;
  passwd: string;
  confirmPasswd: string;
};
export default defineComponent({
  components: {
    TextInput,
    Button,
  },
  setup() {
    const form = reactive<FormData>({
      name: "",
      email: "",
      address: "",
      passwd: "",
      confirmPasswd: "",
    });

    return {
      form,
    };
  },
});
</script>

<style scoped>
.sign-up {
  text-align: center;
  width: 450px;
}
</style>
