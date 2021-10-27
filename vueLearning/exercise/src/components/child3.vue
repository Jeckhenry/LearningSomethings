<template>
  <div>
    子组件3
    <p>{{ value }}</p>
    <button @click="cc">change</button>
  </div>
</template>

<script>
export default {
  name: "child1",
  props: {
    value: String,
  },
  methods: {
    eat() {
      console.log("孩子1收到");
    },
    cc() {
      this.$emit("input", "lllllll");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>