<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link v-if="isLogin" to="/admin">Admin</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "app",
  computed: {
    ...mapState("user", ["isLogin"]),
  },
  created() {
    console.log(this.$router.history.current, "=====");
    console.log(this.$route, "=====");
    // console.log(Object.prototype.isPrototypeOf(1), "=====");
    // console.log(Object.getPrototypeOf(1) === Number.prototype, "=====");
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
