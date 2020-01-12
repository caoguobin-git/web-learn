<template>
  <div class="open-row-container" @click="closeTrueMarket(openRow.tradeID)" >
    <div class="follower-open-row-tag" style="width: 8%;text-align: center">{{openRow.tradeID}}</div><div class="follower-open-row-tag" style="width: 8%;text-align: center">{{openRow.accountName}}</div><div class="follower-open-row-tag" style="width: 8%;text-align: center;font-weight: bold;color: rgba(97,162,227,1)">{{openRow.instrument}}</div><div class="follower-open-row-tag" style="width: 5%;text-align: center">{{openRow.amount}}</div><div class="follower-open-row-tag" style="width: 5%;text-align: center" :class="gain">{{(openRow.buySell=='B'?'BUY':'SELL')}}</div><div class="follower-open-row-tag" style="width: 10%;text-align: center">{{(openRow.openRate).toFixed(marketPrecision)}}</div><div class="follower-open-row-tag" style="width: 10%;text-align: center">{{(openRow.close).toFixed(marketPrecision)}}</div><div class="follower-open-row-tag" :class="gain" style="width: 8%;text-align: center">{{(openRow.pl).toFixed(2)}}</div><div class="follower-open-row-tag" style="width: 8%;text-align: center" :class="gain">{{openRow.grossPL}}</div><div class="follower-open-row-tag" style="width: 8%;text-align: center">{{openRow.usedMargin}}</div><div class="follower-open-row-tag" style="width: 15%;text-align: center">{{getLocalTime(openRow.openTime)}}</div>
  </div>
</template>

<script>
  export default {
    name: "FollowerOpenPositionRow",
    props: ['openRow','marketPrecision'],
    methods: {
      getLocalTime(longTime) {
        // alert(typeof longTime)
        return new Date(longTime).toLocaleString()
      },
      closeTrueMarket(tradeID){
        if(confirm('确定对'+tradeID+'平仓吗？')){
          this.$emit('closeTrueMarket',tradeID)
        }

      }
    },
    computed: {
      gain() {
        if (this.openRow.pl == 0) {
          return '';
        } else {
          return this.openRow.pl > 0 ? 'isGain' : 'notGain'
        }
      }
    }

  }
</script>

<style scoped>
  .open-row-container {
    width: 100%;
    padding: 3px 0px;

  }
  .open-row-container:hover{
    background: whitesmoke;
    cursor:pointer;
  }

  .isGain {
    color: rgba(204,73,85,1);
  }

  .notGain {
    color: rgba(85,159,132,1);
  }

  .follower-open-row-tag {
    display: inline-block;
    font-family: "微软雅黑", sans-serif;
    font-size: 13px;
    text-align: center;
    padding: 2px 3px;
  }
</style>
