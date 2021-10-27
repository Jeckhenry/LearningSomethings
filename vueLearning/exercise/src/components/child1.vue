<template>
  <div>子组件1</div>
</template>

<script>
export default {
  name: "child1",
  beforeCreate() {
    console.log("子组件1beforeCreate");
  },
  created() {
    console.log("子组件1created");
  },
  beforeMount() {
    console.log("子组件1beforeMount");
  },
  mounted() {
    console.log("子组件1mounted");
    console.log(this.$root, this.$parent);
    this.$parent.$on("event-from-child2", (msg) => {
      console.log(`组件1中来自子组件2的消息:${msg}`);
    });
  },
  methods: {
    eat() {
      console.log("孩子1收到");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>