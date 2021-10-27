<template>
  <div style="color: green">
    <p @click="emitFunc">这是child1</p>
    {{ user }}
    <p>{{ kk }}</p>
    <!-- inject: {{ dd }} -->
    <child2></child2>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      default: {},
    },
    kk: {
      type: String,
      default: "",
    },
  },
  //   inject: {
  //     nname: {
  //       from: "username",
  //     },
  //   },
  //   data() {
  //     return {
  //       dd: this.nname,
  //     };
  //   },
  components: {
    child2: () => import("./child2"),
  },
  beforeCreate() {
    console.log("子1组件beforeCreate");
  },
  created() {
    console.log("子1组件created");
  },
  beforeMount() {
    console.log("子1组件beforeMount");
  },
  mounted() {
    console.log("子1组件mounted");
  },
  beforeUpdate() {
    console.log("子1组件beforeUpdate");
  },
  updated() {
    console.log("子1组件updated");
  },
  methods: {
    emitFunc() {
      //   this.$bus.$emit("mmm", "child1");
      this.user.a = ";;;";
    },
  },
};
</script>

<style lang="scss" scoped>
</style>