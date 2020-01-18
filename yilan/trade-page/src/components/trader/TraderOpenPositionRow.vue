<template>
  <div class="open-row-container" >
    <div class="follower-open-row-tag" style="width: 8%;text-align: center;font-weight: bold;color: rgba(97,162,227,1)">
      {{openRow.symbol}}
    </div><div class="follower-open-row-tag" style="width: 5%;text-align: center">{{openRow.amount}}</div><div class="follower-open-row-tag" style="width: 5%;text-align: center" :class="gain">
      {{(openRow.side=='B'?'BUY':'SELL')}}
    </div><div class="follower-open-row-tag" style="width: 10%;text-align: center">
      {{(openRow.open).toFixed(marketPrecision)}}
    </div><div class="follower-open-row-tag" style="width: 10%;text-align: center">
      {{(openRow.close).toFixed(marketPrecision)}}
    </div><div class="follower-open-row-tag" style="width: 8%;text-align: center" :class="gain">{{(openRow.pl).toFixed(2)}}</div><div class="follower-open-row-tag" style="width: 8%;text-align: center" :class="gain">{{openRow.grossPL}}</div><div class="follower-open-row-tag" style="width: 15%;text-align: center">{{getLocalTime(openRow.openTime)}}</div>
  </div>
</template>

<script>
  export default {
    name: "TraderOpenPositionRow",
    props: ['openRow','marketPrecision'],
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
