<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <div>$store.state.count: {{ $store.state.count }}</div>
    <div>$store.getters.doubleCount: {{ $store.getters.doubleCount }}</div>
    <div><button @click="$store.commit('add')">commit mutation</button></div>
    <div><button @click="$store.dispatch('add')">dispatch acation</button></div>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "Home",
};
</script>
