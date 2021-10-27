<template>
  <div class="home">
    <!-- <p>this is home vue</p>
    <div>登陆状态: {{ isLogin }}</div>
    <div v-if="isLogin">登陆用户: {{ users }}</div>
    <div><button @click="goLogin">登陆</button></div>
    <div v-if="isLogin"><button @click="goLogout">注销</button></div>

    <div class="llll">
      <img src="../assets/logo.png" alt="" />
    </div>
    {{ arr }}
    <input id="asd" type="checkbox" v-model="arr" :value="{ val: 1 }" />
    <label for="asd">选中</label> -->
    {{ ss }}
    <child3 v-model="ss.name"></child3>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState, mapActions } from "vuex";

export default {
  name: "Home",
  components: {
    child3: () => import("@/components/child3.vue"),
  },
  data() {
    return {
      arr: [1],
      val: 1,
      ss: {
        name: "lxx",
      },
    };
  },
  computed: {
    // isLogin() {
    //   return this.$store.state.user.isLogin;
    // },
    ...mapState("user", ["isLogin", "users"]),
  },
  methods: {
    ...mapActions(["user/login", "user/logout"]),
    goLogin() {
      this["user/login"]("admin").then(() => {
        console.log("success");
        // this.$router.addRoutes([
        //   {
        //     path: "/admin",
        //     name: "admin",
        //     component: () => import("../views/Admin.vue"),
        //   },
        // ]);
      });
      //   this.$store.dispatch("user/login", "admin").then(() => {
      //     console.log("success");
      //   });
    },
    goLogout() {
      this.$store.dispatch("user/logout");
    },
  },
};
</script>

<style>
.llll {
  height: 300px;
  width: 400px;
  border: 1px solid black;
  /* display: table-cell;
  vertical-align: middle;
  text-align: center; */
  position: relative;
}
.llll > img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>