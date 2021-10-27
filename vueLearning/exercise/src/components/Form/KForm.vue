<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    model: {
      type: Object,
      default: {},
    },
  },
};
</script>

<style lang="scss" scoped>
</style>