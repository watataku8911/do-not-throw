<template>
  <button class="button" @click="push">
    {{ msg }}
  </button>
</template>

<script>
export default {
  props: {
    msg: {
      type: String,
      required: true,
    },
  },
  emits: ["push"],
  setup(_, context) {
    const push = () => {
      context.emit("push");
    };

    return { push };
  },
};
</script>

<style scoped>
.button {
  border-radius: 10px;
  padding: 1.5%;
  font-size: 1em;
  background-color: #71ff71;
  color: #111;
  border-style: none;
  box-shadow: 3px 3px 3px 3px #ddd;
}

.button:hover {
  box-shadow: 0px 0px 0px 0px #ddd;
}

.button:disabled {
  box-shadow: 0px 0px 0px 0px #ddd;
  background: #efefef;
  opacity: 0.8;
}
</style>
