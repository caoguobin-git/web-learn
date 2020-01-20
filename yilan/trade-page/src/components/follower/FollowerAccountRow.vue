<template>
  <a-row style="width: 100%;padding:5px 0px" class="follower-account-row-container">
    <a-col :span="2">
      <div class="follower-account-row-tag">{{account.accountName}}</div>
    </a-col>
    <a-col :span="2">
      <div class="follower-account-row-tag">{{account.balance}}</div>
    </a-col>
    <a-col :span="2">
      <div class="follower-account-row-tag">{{(account.equity).toFixed(2)}}</div>
    </a-col>
    <a-col :span="2">
      <div class="follower-account-row-tag" :class="grossGain">{{(account.grossPL).toFixed(2)}}</div>
    </a-col>
    <a-col :span="2">
      <div class="follower-account-row-tag" :class="dayGain">{{account.dayPL}}</div>
    </a-col>
    <a-col :span="2">
      <div class="follower-account-row-tag">{{(account.usedMargin).toFixed(3)}}</div>
    </a-col>
    <a-col :span="2">
      <div class="follower-account-row-tag">{{account.usableMargin}}</div>
    </a-col>
    <a-col :span="2">
      <div class="follower-account-row-tag">
        <div class="percent-container">
          <div class="inner-display-percent-container">
            <div class="inner-display-percent" :style="useableMarginPer">{{account.usableMarginInPercentage}}%</div>
          </div>
        </div>
      </div>
    </a-col>

    <a-col :span="2">
      <div class="follower-account-row-tag">{{(account.usedMargin3).toFixed(3)}}</div>
    </a-col>
    <a-col :span="2">
      <div class="follower-account-row-tag">{{account.usableMargin}}</div>
    </a-col>
    <a-col :span="2">
      <div class="follower-account-row-tag">
        <div class="percent-container">
          <div class="inner-display-percent-container">
            <div class="inner-display-percent" :style="useableMarginPer">{{account.usableMaintMarginInPercentage}}%
            </div>
          </div>
        </div>
      </div>
    </a-col>
    <a-col :span="2">
      <div class="follower-account-row-tag">N</div>
    </a-col>

  </a-row>
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
    color: rgba(204, 73, 85, 1);
  }

  .notGain {
    color: rgba(85, 159, 132, 1);
  }

  .follower-account-row-container:hover {
    cursor: pointer;
    background: whitesmoke;
  }

  .follower-account-row-tag {
    font-family: "微软雅黑", sans-serif;
    font-size: 13px;
    text-align: center;
    padding: 2px 3px;
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
    /*display: inline-block;*/
    width: 100%;
    margin: auto;
    background: rgba(238, 238, 238, 1);
  }
</style>
