<template>
  <div>
    <head-top>投诉建议</head-top>
    <div class="feedbackBox">
      <textarea placeholder="请描述你的问题" v-model="content" maxlength="200"></textarea>
    </div>
    <div class="publicBut">
      <button @click="submit">提交</button>
    </div>
  </div>
</template>
<script>
import { getFeedback } from "@/api/user";
export default {
  data() {
    return {
      content: ""
    };
  },
  methods: {
    submit() {
      if (this.content == "") {
        this.prompt("请描述你的问题");
      } else {
        getFeedback(this.content).then(data => {
          if (data.code == 200) {
            this.prompt("提交成功，感谢您的建议，我们会尽快完善！");
            this.$router.push('/');
          } else {
            this.prompt(data.msg);
          }
        });
      }
    }
  },
  mounted() {
    document.title = "问题反馈";
  }
};
</script>
<style lang="scss" scoped>
@import "src/style/mixin";
.feedbackBox {
  padding: rem(40);
  background-color: #fff;
  margin-top: rem(20);
  textarea {
    border: 1px solid #eee;
    min-width: 100%;
    max-width: 100%;
    padding: rem(20);
    min-height: rem(300);
    overflow: hidden;
  }
}
</style>
