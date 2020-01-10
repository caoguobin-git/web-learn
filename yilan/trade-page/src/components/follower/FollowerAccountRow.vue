<template>
  <div style="width: 100%" class="follower-account-row-container">
    <div class="follower-account-row-tag" style="width: 8%">{{account.accountName}}</div><div class="follower-account-row-tag" style="width: 7%">{{account.balance}}</div><div class="follower-account-row-tag" style="width: 6%">{{(account.equity).toFixed(2)}}</div><div class="follower-account-row-tag" :class="grossGain" style="width: 4%">{{(account.grossPL).toFixed(2)}}</div><div class="follower-account-row-tag" :class="dayGain" style="width: 5%">{{account.dayPL}}</div><div class="follower-account-row-tag" style="width: 7%">{{(account.usedMargin).toFixed(3)}}</div><div class="follower-account-row-tag" style="width: 7%">{{account.usableMargin}}</div><div class="follower-account-row-tag " style="width: 12%">
      <div class="percent-container">
        <div class="inner-display-percent-container">
          <div class="inner-display-percent" :style="useableMarginPer">{{account.usableMarginInPercentage}}%</div>
        </div>
      </div></div><div class="follower-account-row-tag" style="width: 7%">{{(account.usedMargin3).toFixed(3)}}</div><div class="follower-account-row-tag" style="width: 7%">{{account.usableMargin}}</div><div class="follower-account-row-tag" style="width: 12%"><div class="percent-container"><div class="inner-display-percent-container"><div class="inner-display-percent" :style="useableMarginPer">{{account.usableMaintMarginInPercentage}}%</div></div>
      </div></div><div class="follower-account-row-tag" style="width: 5%">N</div>
  </div>
</template>

<script>
  export default {
    name: "FollowerAccountRow",
    props: ['account'],
    computed: {
      dayGain() {
        if (this.account.dayPL == 0) {
          return '';
        } else {
          return this.account.dayPL > 0 ? 'isGain' : 'notGain'
        }
      },
      grossGain() {
        if (this.account.grossPL == 0) {
          return '';
        } else {
          return this.account.grossPL > 0 ? 'isGain' : 'notGain'
        }
      },
      useableMarginPer() {
        var color = '';
        var percent = '';
        if (this.account.usableMarginInPercentage > 67) {
          color = 'rgba(85,159,132,1)'
        } else if (this.account.usableMarginInPercentage > 33) {
          color = 'rgba(255,159,76,1)'
        } else {
          color = 'rgba(204,73,85,1)'
        }
        percent = (this.account.usableMarginInPercentage) + '%';
        return {
          width: percent,
          background: color
        }
      }
    }

  }
</script>

<style scoped>

  .isGain {
    color: rgba(204,73,85,1);
  }

  .notGain {
    color: rgba(85,159,132,1);
  }

  .follower-account-row-container:hover{
    cursor: pointer;
    background: whitesmoke;
  }
  .follower-account-row-tag {
    display: inline-block;
    font-family: "微软雅黑", sans-serif;
    font-size: 13px;
    text-align: center;
    padding: 2px 3px;
    border-right: 2px solid transparent;
  }

  .percent-container {
    width: 100%;
    height: 100%;
    text-align: left;
  }

  .inner-display-percent {
    display: inline-block;
    text-align: center;
    color: white;

  }

  .inner-display-percent-container {
    display: inline-block;
    width: 80%;
    margin-left: 10%;
    background: rgba(238,238,238,1);
  }
</style>
