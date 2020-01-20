<template>
  <a-row class="trader-open-info-row">
    <a-col span="24">
      <a-row style="width: 100%"><a-col :span="2">
        <div class="trader-table-content-tag">18654852</div>
      </a-col>
        <a-col :span="2">
          <div class="trader-table-content-tag">100152245</div>
        </a-col>
        <a-col :span="2">
          <div class="trader-table-content-tag">EUR/USD</div>
        </a-col>
        <a-col :span="1">
          <div class="trader-table-content-tag">3000</div>
        </a-col>
        <a-col :span="1">
          <div class="trader-table-content-tag">SELL</div>
        </a-col>
        <a-col :span="2">
          <div class="trader-table-content-tag">1.5625</div>
        </a-col>
        <a-col :span="2">
          <div class="trader-table-content-tag">1.5632</div>
        </a-col>
        <a-col :span="2">
          <div class="trader-table-content-tag">5.23</div>
        </a-col>
        <a-col :span="2">
          <div class="trader-table-content-tag">5.23</div>
        </a-col>
        <a-col :span="2">
          <div class="trader-table-content-tag">16</div>
        </a-col>
        <a-col :span="4">
          <div class="trader-table-content-tag">2020/1/16 14:32</div>
        </a-col>
        <a-col :span="2" @click="toggleShow" class="trader-table-content-tag"
               style="color: rgba(97,162,227,1);cursor:pointer">{{showFollowerMsg}}
        </a-col>
      </a-row>
      <a-row v-if="showFollowers" style="width: 100%">
        <a-col span="24">
          <FollowerPositionRow></FollowerPositionRow>
          <FollowerPositionRow></FollowerPositionRow>
          <FollowerPositionRow></FollowerPositionRow>
        </a-col>
      </a-row>
    </a-col>
  </a-row>

</template>

<script>
  import FollowerPositionRow from "./FollowerPositionRow";

  export default {
    name: "TraderInfoRow",
    components: {FollowerPositionRow},
    data() {
      return {
        showFollowers: false
      }
    },
    computed: {
      showFollowerMsg() {
        return this.showFollowers ? '收起跟单' : '查看跟单'
      }
    },
    methods: {
      toggleShow() {
        this.showFollowers = !this.showFollowers;
      }
    }
  }
</script>

<style scoped>
  .trader-table-content-tag {
    text-align: center;
    height: 42px;
    font-size: 14px;
    line-height: 42px;
  }

  .trader-open-info-row {
    width: 1200px;
    border-bottom: 1px solid silver;
    cursor: default;
  }
  .trader-open-info-row:hover{
    background: rgba(230, 230, 230, 0.62);
  }
</style>
