<template>
  <div class="about">
    <p>about page</p>
    <button @click="sex = 'female'">修改sex</button>
    <button @click="ffff">父组件派发子组件事件</button>
    <child2 v-if="ddd" @cgg="goHome" :gg="sex"></child2>
  </div>
</template>

<script>
export default {
  name: "about",
  provide() {
    return { foo: "foo" };
  },
  //   beforeRouteEnter(to, from, next) {
  //     console.log("about----enter");
  //     next();
  //   },
  //   beforeRouteLeave(to, from, next) {
  //     console.log("about----leave");
  //     next();
  //   },
  data() {
    return {
      sex: "male",
      ddd: false,
    };
  },
  beforeCreate() {
    console.log("about组件beforeCreate");
  },
  created() {
    console.log("about组件created");
  },
  beforeMount() {
    console.log("about组件beforeMount");
  },
  mounted() {
    console.log("about组件mounted");
  },
  beforeDestroy() {
    console.log("about组件beforeDestroy");
  },
  destroyed() {
    console.log("about组件destroyed");
  },
  beforeUpdate() {
    console.log("about组件beforeUpdate");
  },
  updated() {
    console.log("about组件updated");
  },
  components: {
    child1: () => import("../components/child1"),
    // child2: () => import("../components/child2"),
    child2: () => import("./coms/child2"),
  },
  methods: {
    goHome() {
      this.$children[1].eat();
    },
    ffff() {
      this.ddd = !this.ddd;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>