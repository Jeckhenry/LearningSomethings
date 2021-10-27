<template>
  <div class="about">
    <h1>12312</h1>

    <KForm :model="user" ref="form" :rules="rules">
      <KForm-item label="用户名" prop="name">
        <KForm-input v-model="user.name"></KForm-input>
      </KForm-item>
    </KForm>
    <button @click="openModal">触发NOTICE</button>
  </div>
</template>

<script>
import KForm from "../components/Form/KForm";
import KFormItem from "../components/Form/KForm-item";
import KFormInput from "../components/Form/KForm-input";
import Notice from "../components/Notice/Notice";
export default {
  name: "FormLearning",
  components: {
    KForm,
    KFormItem,
    KFormInput,
  },
  data() {
    return {
      user: {
        name: "",
        pwd: "",
      },
      rules: {
        name: [{ required: true, message: "请输入用户名" }],
        pwd: [{ required: true, message: "请输入密码" }],
      },
    };
  },
  methods: {
    openModal() {
      //   const notice = this.$create(Notice, {
      //     title: "测试弹窗",
      //     msg: "测试内容",
      //     duration: 2000,
      //   });
      //   const notice = this.$create({
      // title: "测试弹窗",
      // msg: "测试内容",
      // duration: 2000,
      //   });
      const notice = this.$notice({
        title: "测试弹窗",
        msg: "测试内容",
        duration: 2000,
      });
      notice.show();
    },
  },
};
</script>
