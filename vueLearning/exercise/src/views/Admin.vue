<template>
  <div class="about">
    <h1>This is an admin000 page</h1>
    <p>name: {{ name.a }}</p>
    <p>{{ $data.$kk }}</p>
    <button @click="changeName">修改name</button>
    <child1 :user="name" :kk="$data.$kk"></child1>
  </div>
</template>

<script>
export default {
  //   provide() {
  //     return {
  //       username: this.name,
  //     };
  //   },
  data() {
    return {
      name: {
        a: "lixx",
      },
      $kk: "ooll",
    };
  },
  name: "admin",
  components: {
    child1: () => import("./coms/child1"),
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
    this.$bus.$on("mmm", (msg) => {
      console.log(msg, "==[][][][]");
    });
  },
  methods: {
    changeName() {
      this.name.a += "gyl";
      this.$data.$kk += "asd";
    },
  },
  beforeUpdate() {
    console.log("父组件beforeUpdate");
  },
  updated() {
    console.log("父组件updated");
  },
};
</script>
