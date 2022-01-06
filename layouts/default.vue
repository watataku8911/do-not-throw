<template>
  <div>
    <Header />
    <main class="main">
      <slot />
    </main>
    <div class="module--spacing--small"></div>
    <Footer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";

export default defineComponent({
  components: {
    Header,
    Footer,
  },
});
</script>
