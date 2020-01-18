<template>
  <div class="follower-closed-row-container" style="width: 100%">
    <div class="follower-closed-row-tag" style="width: 6%">{{closedRow.symbol}}</div><div class="follower-closed-row-tag" style="width: 3%">{{closedRow.amount}}</div><div class="follower-closed-row-tag" style="width: 3%">{{closedRow.side=='s'?'SELL':'BUY'}}</div><div class="follower-closed-row-tag" style="width: 7%">{{closedRow.open}}</div><div class="follower-closed-row-tag" style="width: 7%">{{closedRow.close}}</div><div class="follower-closed-row-tag" :class="gain" style="width: 7%">{{(closedRow.pl).toFixed(2)}}</div><div class="follower-closed-row-tag" :class="gain" style="width: 7%">{{(closedRow.grossPL).toFixed(2)}}</div><div class="follower-closed-row-tag" style="width: 5%">{{closedRow.rolloverInterest}}</div><div class="follower-closed-row-tag" :class="gain" style="width: 7%">{{closedRow.netPL}}</div><div class="follower-closed-row-tag" style="width: 12%">{{getDisplayTime(closedRow.openTime)}}</div><div class="follower-closed-row-tag" style="width: 12%">{{getDisplayTime(closedRow.closeTime)}}</div>

  </div>
</template>

<script>
  export default {
    name: "TraderClosedPositionRow",
    props: ['closedRow', 'marketPrecision'],
    methods:{
      getDisplayTime(data){
        return new Date(data).toLocaleString()
      }
    },
    computed:{
      gain() {
        if (this.closedRow.pl == 0) {
          return '';
        } else {
          return this.closedRow.pl > 0 ? 'isGain' : 'notGain'
        }
      }
    },
    mounted() {

    }
  }
</script>

<style scoped>
  .follower-closed-row-tag{
    display: inline-block;
    font-family: "微软雅黑", sans-serif;
    font-size: 13px;
    text-align: center;
    padding: 2px 3px;
  }
  .follower-closed-row-container{
    padding: 3px 0px;
  }
  .follower-closed-row-container:hover{
    background: whitesmoke;
    cursor:pointer;
  }

  .isGain {
    color: rgba(85,159,132,1);
  }

  .notGain {
    color: rgba(204,73,85,1);
  }
</style>
