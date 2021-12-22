<template>
  <div style="color: yellow">
    这是child2123
    <p>child2inject: {{ dd }}</p>
    <child3></child3>
  </div>
</template>

<script>
export default {
  //   inject: {
  //     nname: {
  //       from: "username",
  //     },
  //   },
  data() {
    return {
      dd: this.nname,
    };
  },
  components: {
    child3: () => import("./child3"),
  },
  beforeCreate() {
    console.log("子12组件beforeCreate");
  },
  created() {
    console.log("子12组件created");
    setTimeout(() => {
      this.dd += "ppp";
    }, 3000);
  },
  beforeMount() {
    console.log("子12组件beforeMount");
  },
  mounted() {
    console.log("子12组件mounted");
  },
  beforeDestroy() {
    console.log("子12组件组件beforeDestroy");
  },
  destroyed() {
    console.log("子12组件组件destroyed");
  },
};
</script>

<style lang="scss" scoped>
</style>