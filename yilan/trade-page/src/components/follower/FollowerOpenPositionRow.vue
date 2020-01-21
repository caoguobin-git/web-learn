<template>
  <a-row class="open-row-container" type="flex" align="middle" @click="closeTrueMarket(openRow.tradeID)">
    <a-col class="follower-open-row-tag" span="2">{{openRow.tradeID}}</a-col>
    <a-col class="follower-open-row-tag" span="2">{{openRow.accountName}}</a-col>
    <a-col class="follower-open-row-tag" span="2">{{openRow.instrument}}</a-col>
    <a-col class="follower-open-row-tag" span="1">{{openRow.amount}}</a-col>
    <a-col class="follower-open-row-tag" span="1" :class="gain">{{(openRow.buySell=='B'?'BUY':'SELL')}}</a-col>
    <a-col class="follower-open-row-tag" span="2">{{(openRow.openRate).toFixed(marketPrecision)}}</a-col>
    <a-col class="follower-open-row-tag" span="2">{{(openRow.close).toFixed(marketPrecision)}}</a-col>
    <a-col class="follower-open-row-tag" span="2" :class="gain">{{(openRow.pl).toFixed(2)}}</a-col>
    <a-col class="follower-open-row-tag" span="2" :class="gain">{{openRow.grossPL}}</a-col>
    <a-col class="follower-open-row-tag" span="2">{{openRow.usedMargin}}</a-col>
    <a-col class="follower-open-row-tag" span="4">{{getLocalTime(openRow.openTime)}}</a-col>
    <a-col class="follower-open-row-tag" span="2">
      <a-button @click="closeTrueMarket" type="danger" size="small">平仓</a-button>
    </a-col>
  </a-row>
</template>

<script>
  export default {
    name: "FollowerOpenPositionRow",
    props: ['openRow', 'marketPrecision'],
    methods: {
      getLocalTime(longTime) {
        // alert(typeof longTime)
        return new Date(longTime).toLocaleString()
      },
      closeTrueMarket() {
        var that = this;
        this.$confirm({
          title: '确定要进行平仓吗?',
          content: '确认对' + that.openRow.tradeID + '进行平仓操作吗？',
          onOk() {
            that.$emit('closeTrueMarket',that.openRow.tradeID)
          },
          onCancel() {
          },
        });

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
  }
</style>
