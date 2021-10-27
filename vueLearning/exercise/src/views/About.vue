<template>
  <div>
    <p>about page</p>
    <child2 @cgg="goHome" :gg="sex"></child2>
    <child1></child1>
    <button @click="sex = 'female'">修改sex</button>
    <button @click="goHome">父组件派发子组件事件</button>
  </div>
</template>

<script>
export default {
  name: "about",
  provide() {
    return { foo: "foo" };
  },
  beforeRouteEnter() {},
  beforeRouteLeave() {},
  data() {
    return {
      sex: "male",
    };
  },
  beforeCreate() {
    console.log("父组件beforeCreate");
  },
  created() {
    console.log("父组件created");
  },
  beforeMount() {
    console.log("父组件beforeMount");
  },
  mounted() {
    console.log("父组件mounted");
  },
  beforeUpdate() {
    console.log("父组件beforeUpdate");
  },
  updated() {
    console.log("父组件updated");
  },
  components: {
    child1: () => import("../components/child1"),
    child2: () => import("../components/child2"),
  },
  methods: {
    goHome() {
      this.$children[1].eat();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>