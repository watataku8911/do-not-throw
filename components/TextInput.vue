<template>
  <input
    class="text-input"
    :type="type"
    :placeholder="placeholder"
    :name="name"
    :value="value"
    @input="updateValue"
  />
</template>

<script>
export default {
  props: {
    type: { type: String, required: true },
    placeholder: { type: String, required: true },
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
.text-input {
  width: 100%;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
  font-size: 3vh;
}
</style>
