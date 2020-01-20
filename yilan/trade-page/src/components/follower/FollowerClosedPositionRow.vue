<template>
  <a-row :gutter="2" type="flex" align="middle" class="follower-closed-row-container" style="width: 100%">
    <a-col :span="2" ><div class="follower-closed-row-tag" style="font-weight: bolder" >{{closedRow.tradeID}}</div></a-col>
    <a-col :span="2" ><div class="follower-closed-row-tag">{{closedRow.accountName}}</div></a-col>
    <a-col :span="2" ><div class="follower-closed-row-tag" style="font-weight: bolder">{{closedRow.instrument}}</div></a-col>
    <a-col :span="1" ><div class="follower-closed-row-tag" >{{closedRow.amount}}</div></a-col>
    <a-col :span="1" ><div class="follower-closed-row-tag" >{{closedRow.buySell}}</div></a-col>
    <a-col :span="1" ><div class="follower-closed-row-tag" >{{closedRow.openRate}}</div></a-col>
    <a-col :span="1" ><div class="follower-closed-row-tag" >{{closedRow.closeRate}}</div></a-col>
    <a-col :span="2" :class="gain" ><div class="follower-closed-row-tag">{{(closedRow.pl).toFixed(2)}}</div></a-col>
    <a-col :span="2" :class="gain" ><div class="follower-closed-row-tag">{{(closedRow.grossPL).toFixed(2)}}</div></a-col>
    <a-col :span="2" ><div class="follower-closed-row-tag">{{closedRow.rolloverInterest}}</div></a-col>
    <a-col :span="2" ><div class="follower-closed-row-tag">{{closedRow.netPL}}</div></a-col>
    <a-col :span="3" ><div class="follower-closed-row-tag">{{getDisplayTime(closedRow.openTime)}}</div></a-col>
    <a-col :span="3" ><div class="follower-closed-row-tag">{{getDisplayTime(closedRow.closeTime)}}</div></a-col>
  </a-row>
</template>

<script>
  export default {
    name: "FollowerClosedPositionRow",
    props: ['closedRow'],
    methods: {
      getDisplayTime(data) {
        return new Date(data).toLocaleString()
      }
    },
    computed: {
      gain() {
        if (this.closedRow.pl == 0) {
          return '';
        } else {
          return this.closedRow.pl > 0 ? 'isGain' : 'notGain'
        }
      }
    }
  }
</script>

<style scoped>
  .follower-closed-row-tag {
    font-family: "微软雅黑", sans-serif;
    font-size: 13px;
    text-align: center;
    padding: 2px 0px;

  }

  .follower-closed-row-container {
    padding: 3px 0px;
  }

  .follower-closed-row-container:hover {
    background: whitesmoke;
    cursor: pointer;
  }

  .isGain {
    color: rgba(85, 159, 132, 1);
  }

  .notGain {
    color: rgba(204, 73, 85, 1);
  }
</style>
