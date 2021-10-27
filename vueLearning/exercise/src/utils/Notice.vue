<template>
  <transition name="fade">
    <div class="notice" v-if="flag">
      <p>{{ title }}</p>
      <div>{{ msg }}</div>
    </div>
  </transition>
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
  data() {
    return {
      flag: false,
    };
  },
  methods: {
    show() {
      this.flag = true;
      setTimeout(this.removeModal, this.duration);
    },
    removeModal() {
      console.log(123);
      this.flag = false;
      setTimeout(this.remove, 1000);
    },
  },
};
</script>

<style scoped>
@keyframes showCSS {
  from {
    transform: scale(0.5, 0.3);
  }
  to {
    transform: scale(1, 1);
  }
}
.fade-enter {
  animation: showCSS 0.2s linear;
}
.fade-enter-active {
  animation: showCSS 0.2s linear;
}
@keyframes hideCSS {
  from {
    transform: scale(1, 1);
  }
  to {
    transform: scale(0.5, 0.3);
  }
}
.fade-leave-to {
  animation: hideCSS 0.2s linear;
}
.fade-leave-active {
  animation: hideCSS 0.2s linear;
}
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