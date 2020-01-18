<template>
  <div>
    <div>
      <div class="trader-table-content-tag" style="width: 8%">18654852</div><div class="trader-table-content-tag" style="width: 10%">100152245</div><div class="trader-table-content-tag" style="width: 8%">EUR/USD</div><div class="trader-table-content-tag" style="width: 5%">3000</div><div class="trader-table-content-tag" style="width: 5%">SELL</div><div class="trader-table-content-tag" style="width: 8%">1.5625</div><div class="trader-table-content-tag" style="width: 8%">1.5632</div><div class="trader-table-content-tag" style="width: 10%">5.23</div><div class="trader-table-content-tag" style="width: 10%">5.23</div><div class="trader-table-content-tag" style="width: 5%">16</div><div class="trader-table-content-tag" style="width: 10%">2020/1/16 14:32</div><div @click="toggleShow" class="trader-table-content-tag"
           style="width: 8%;color: rgba(97,162,227,1);cursor:pointer">{{showFollowerMsg}}
      </div>
      <div v-if="showFollowers">
        <FollowerPositionRow></FollowerPositionRow>
        <FollowerPositionRow></FollowerPositionRow>
        <FollowerPositionRow></FollowerPositionRow>
        <FollowerPositionRow></FollowerPositionRow>
        <FollowerPositionRow></FollowerPositionRow>
      </div>
    </div>

  </div>
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
    computed:{
      showFollowerMsg(){
        return this.showFollowers?'收起跟单':'查看跟单'
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
    display: inline-grid;
    height: 42px;
    font-size: 14px;
    border-left: 2px solid transparent;
    line-height: 42px;
    border-bottom: 1px solid silver;
  }
</style>
