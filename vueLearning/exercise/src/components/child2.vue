<template>
  <div>
    <p>子组件2</p>
    <p>{{ $attrs.gg }}</p>
    <p>{{ foo }}</p>
  </div>
</template>

<script>
export default {
  name: "child2",
  inject: ["foo"],
  beforeCreate() {
    console.log("子组件2beforeCreate");
  },
  created() {
    console.log("子组件2created");
  },
  beforeMount() {
    console.log("子组件2beforeMount");
  },
  beforeUpdate() {
    console.log("子组件2beforeUpdate");
  },
  updated() {
    console.log("子组件2updated");
  },
  mounted() {
    console.log("子组件2mounted");
    // this.$bus.$emit("event-from-child2", "组件2的消息*****");
    // this.$parent.$emit("event-from-child2", "组件2的消息*****");
  },
};
</script>

<style lang="scss" scoped>
</style>