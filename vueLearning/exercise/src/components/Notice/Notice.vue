<template>
  <div class="notice">
    <p>{{ title }}</p>
    <div>{{ msg }}</div>
  </div>
</template>

<script>
export default {
  name: "Notice",
  props: {
    title: {
      type: String,
      default: "",
    },
    msg: {
      type: String,
      default: "",
    },
    duration: {
      type: Number,
      default: 1000,
    },
  },
  methods: {
    show() {
      setTimeout(this.removeModal, this.duration);
    },
    removeModal() {
      console.log(123);
      this.remove();
    },
  },
};
</script>

<style scoped>
.notice {
  position: fixed;
  border: 1px solid red;
  top: 0;
  left: 0;
  right: 0;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  z-index: 1111;
  font-size: 24px;
  background: #fff;
}
</style>