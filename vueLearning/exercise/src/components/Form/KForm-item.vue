<template>
  <div style="text-align: left">
    <label for="">{{ label }}</label>
    <slot></slot>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: "",
    },
    prop: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      error: "",
    };
  },
};
</script>

<style lang="scss" scoped>
</style>