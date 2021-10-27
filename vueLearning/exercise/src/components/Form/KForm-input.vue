<template>
  <div>
    <input :value="value" @input="onInput" :type="type" v-bind="$attrs" />
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: "text",
    },
    value: {
      type: String,
      default: "",
    },
  },
  methods: {
    onInput(e) {
      this.$emit("input", e.target.value);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>