<template>
  <div class="follower-closed-main-container">
    <a-row :gutter="2" class="follower-closed-title-container">
      <a-col :span="2" ><div class="follower-closed-title-tag" >成交单据</div></a-col>
      <a-col :span="2" ><div class="follower-closed-title-tag" >账号</div></a-col>
      <a-col :span="2" ><div class="follower-closed-title-tag" >商品组合</div></a-col>
      <a-col :span="1" ><div class="follower-closed-title-tag" >数量</div></a-col>
      <a-col :span="1" ><div class="follower-closed-title-tag" >卖/买</div></a-col>
      <a-col :span="1" ><div class="follower-closed-title-tag" >开市价</div></a-col>
      <a-col :span="1" ><div class="follower-closed-title-tag" >关闭</div></a-col>
      <a-col :span="2" ><div class="follower-closed-title-tag" >盈/亏</div></a-col>
      <a-col :span="2" ><div class="follower-closed-title-tag" >总盈/亏</div></a-col>
      <a-col :span="2" ><div class="follower-closed-title-tag" >过夜利息</div></a-col>
      <a-col :span="2" ><div class="follower-closed-title-tag" >净盈/亏</div></a-col>
      <a-col :span="3" ><div class="follower-closed-title-tag" >开仓时间</div></a-col>
      <a-col :span="3" ><div class="follower-closed-title-tag" >平仓时间</div></a-col>
    </a-row>
    <div class="follower-closed-container" style="width: 1500px">
      <FollowerClosedPositionRow v-for="item in closedSort" :key="item.tradeID"
                                 :closedRow="item"></FollowerClosedPositionRow>
    </div>
  </div>
</template>

<script>
  import FollowerClosedPositionRow from "./FollowerClosedPositionRow";

  export default {
    name: "FollowerClosedPositions",
    components: {FollowerClosedPositionRow},
    props: ['datas'],
    computed: {
      closedSort() {
        return this.datas;
      }
    }
  }
</script>

<style scoped>
  .follower-closed-main-container {
    height: 95%;
    width: 100%;
    margin: auto;
    overflow: hidden;
  }

  .follower-closed-main-container:hover {
    overflow: scroll;
  }

  .follower-closed-title-tag {
    font-weight: bold;
    font-size: 14px;
    text-align: center;
    background: rgba(246, 249, 252, 1);
    padding: 6px 3px;
  }

  .follower-closed-title-container {
    width: 1500px;
    border-top: 1px solid rgba(112, 189, 199, 1);
  }


</style>
