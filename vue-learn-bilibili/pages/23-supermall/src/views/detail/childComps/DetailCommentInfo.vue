<template>
  <div v-if="Object.keys(commentInfo).length !==0 " class="comment-info">
    <div class="info-header">
      <div>用户评价</div>
      <div style="padding-right: 10px">
        更多 >
        <i class="arrow-right"></i>
      </div>
    </div>

    <div class="userinfo">
      <img style="margin-left: 5px;vertical-align: middle;width: 30px;border-radius: 15px"
           :src="commentInfo.user.avatar" alt="">
      <span style="margin-left: 10px;display: inline-block;vertical-align: middle">{{ commentInfo.user.uname }}</span>
    </div>

    <div style="text-indent: 2rem;font-size: 14px;line-height: 1.5">
      {{ commentInfo.content }}
    </div>
    <div style="display: flex;margin: 5px 0px">
      <div style="font-size: 14px;padding: 0px 5px">{{ commentInfo.created | showDate }}</div>
      <div style="font-size: 14px">{{ commentInfo.style }}</div>
    </div>
    <div style="width: 80%;text-align: center;margin-left: 10%;font-size: 12px">{{ commentInfo.explain }}</div>

    <div>
      <img style="height: 80px" v-for="img in commentInfo.images" :src="img" alt="">
    </div>
    <!--    {{commentInfo}}-->
  </div>
</template>

<script>
import {formatDate} from "common/commonUtils";

export default {
  name: "DetailCommentInfo",
  props: {
    commentInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {},
  filters: {
    showDate(val) {
      //1.将时间戳转成Date对象
      const date = new Date(val * 1000);
      //2.将date进行格式化
      return formatDate(date, 'yyyy-MM-dd')
    }
  }
}
</script>

<style scoped>
.info-header {
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
}

.comment-info {
  margin-bottom: 5px;
  box-shadow: 0 3px 5px #c2bbbb;
  padding: 8px;
}
</style>
