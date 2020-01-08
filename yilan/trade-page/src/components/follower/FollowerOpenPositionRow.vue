<template>
  <div class="open-row-container">
    <div style="width: 8%;text-align: center">{{openRow.tradeID}}</div>
    <div style="width: 10%;text-align: center">{{openRow.accountName}}</div>
    <div style="width: 5%;text-align: center;font-weight: bold;color: blue">{{openRow.instrument}}</div>
    <div style="width: 8%;text-align: center">{{openRow.amount}}</div>
    <div style="width: 5%;text-align: center" :class="gain">{{(openRow.buySell=='B'?'买':'卖')}}</div>
    <div style="width: 10%;text-align: center">{{openRow.openRate}}</div>
    <div style="width: 10%;text-align: center">{{openRow.close}}</div>
    <div style="width: 8%;text-align: center" >{{(openRow.pl).toFixed(2)}}</div>
    <div style="width: 8%;text-align: center" :class="gain">{{openRow.grossPL}}</div>
    <div style="width: 8%;text-align: center">{{openRow.usedMargin}}</div>
    <div style="width: 15%;text-align: center">{{getLocalTime(openRow.openTime)}}</div>
  </div>
</template>

<script>
  export default {
    name: "FollowerOpenPositionRow",
    props: ['openRow'],
    methods: {
      getLocalTime(longTime) {
        // alert(typeof longTime)
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
    }

  }
</script>

<style scoped>
  .open-row-container {
    width:100%;
    padding: 3px 0px;
  }

  .isGain {
    color: red;
  }

  .notGain {
    color: blue;
  }

  .open-row-container > div {
    display: inline-block;
    font-size: 14px;
  }
</style>
