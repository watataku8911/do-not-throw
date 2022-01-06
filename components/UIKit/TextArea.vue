<template>
  <textarea
    class="textarea"
    :placeholder="placeholder"
    :cols="cols"
    :rows="rows"
    :name="name"
    :value="value"
    @input="updateValue"
  >
  </textarea>
</template>

<script>
export default {
  props: {
    placeholder: { type: String, required: true },
    cols: { type: String, required: true },
    rows: { type: String, required: true },
    name: { type: String, required: true },
    value: { type: String, required: true },
  },
  emits: ["update:modalValue"],
  setup(_, context) {
    const updateValue = (e) => {
      context.emit("update:modalValue", e.target.value);
    };
    return { updateValue };
  },
};
</script>

<style scoped>
.textarea {
  width: 100%;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
  font-size: 2vh;
}
</style>
