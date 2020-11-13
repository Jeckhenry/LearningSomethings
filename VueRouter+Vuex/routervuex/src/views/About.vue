<template>
  <div class="about">
    <h1>This is an about page</h1>

    <div class="testHalf">
      <div>测试</div>
    </div>

    <router-view></router-view>
  </div>
</template>

<style>
.about {
  width: 100%;
}
.testHalf {
  position: relative;
  width: 100%;
  height: 0;
  background: red;
  padding-bottom: 50%;
}
.testHalf div {
  position: absolute;
  z-index: 100;
  top: 0;
  left: 0;
  padding: 10px;
}
</style>
