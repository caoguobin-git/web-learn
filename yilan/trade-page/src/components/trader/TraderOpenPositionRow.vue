<template>

  <a-row :gutter="2" class="open-row-container">
    <a-col :span="3"><div  class="follower-open-row-tag" style="font-weight: bolder">{{openRow.symbol}}</div></a-col>
    <a-col :span="2"><div  class="follower-open-row-tag">{{openRow.amount}}</div></a-col>
    <a-col :span="1"><div  class="follower-open-row-tag" :class="gain">{{(openRow.side=='B'?'BUY':'SELL')}}</div></a-col>
    <a-col :span="3"><div  class="follower-open-row-tag">{{(openRow.open).toFixed(marketPrecision)}}</div></a-col>
    <a-col :span="3"><div  class="follower-open-row-tag">{{(openRow.close).toFixed(marketPrecision)}}</div></a-col>
    <a-col :span="3"><div  class="follower-open-row-tag" :class="gain">{{(openRow.pl).toFixed(2)}}</div></a-col>
    <a-col :span="3"><div  class="follower-open-row-tag" :class="gain">{{openRow.grossPL}}</div></a-col>
    <a-col :span="4"><div  class="follower-open-row-tag">{{getLocalTime(openRow.openTime)}}</div></a-col>
  </a-row>
</template>

<script>
  export default {
    name: "TraderOpenPositionRow",
    props: ['openRow', 'marketPrecision'],
    methods: {
      getLocalTime(longTime) {
        return new Date(longTime).toLocaleString()
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
    },
    mounted() {
    }
  }
</script>

<style scoped>
  .open-row-container {
    width: 100%;
    padding: 3px 0px;

  }

  .open-row-container:hover {
    background: whitesmoke;
    cursor: pointer;
  }

  .isGain {
    color: rgba(204, 73, 85, 1);
  }

  .notGain {
    color: rgba(85, 159, 132, 1);
  }

  .follower-open-row-tag {
    font-family: "微软雅黑", sans-serif;
    font-size: 13px;
    text-align: center;
    padding: 2px 3px;
  }
</style>
