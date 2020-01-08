<template>
  <div class="follower-closed-row-container" style="width: 100%">
    <div class="follower-closed-row-tag" style="width: 7%">{{closedRow.tradeID}}</div>
    <div class="follower-closed-row-tag" style="width: 7%">{{closedRow.accountName}}</div>
    <div class="follower-closed-row-tag" style="width: 6%">{{closedRow.instrument}}</div>
    <div class="follower-closed-row-tag" style="width: 3%">{{closedRow.amount}}</div>
    <div class="follower-closed-row-tag" style="width: 3%">{{closedRow.buySell}}</div>
    <div class="follower-closed-row-tag" style="width: 7%">{{closedRow.openRate}}</div>
    <div class="follower-closed-row-tag" style="width: 7%">{{closedRow.closeRate}}</div>
    <div class="follower-closed-row-tag" style="width: 7%">{{(closedRow.pl).toFixed(2)}}</div>
    <div class="follower-closed-row-tag" style="width: 7%">{{(closedRow.grossPL).toFixed(2)}}</div>
    <div class="follower-closed-row-tag" style="width: 5%">{{closedRow.rolloverInterest}}</div>
    <div class="follower-closed-row-tag" style="width: 7%">{{closedRow.netPL}}</div>
    <div class="follower-closed-row-tag" style="width: 14%">{{getDisplayTime(closedRow.openTime)}}</div>
    <div class="follower-closed-row-tag" style="width: 14%">{{getDisplayTime(closedRow.closeTime)}}</div>

  </div>
</template>

<script>
  export default {
    name: "FollowerClosedPositionRow",
    props: ['closedRow'],
    methods:{
      getDisplayTime(data){
        var date=new Date(data);
        var a = '';
        a+=(date.getMonth()+1)+'/';
        a+=date.getDate()+'/';
        a+=date.getFullYear()+' ';
        a+=(date.getHours()<10?('0'+date.getHours()):(date.getHours()))+':';
        a+=(date.getMinutes()<10?('0'+date.getMinutes()):(date.getMinutes()));
        return a;
      }
    }
  }
</script>

<style scoped>
  .follower-closed-row-tag{
    text-align: center;
  }
  .follower-closed-row-container{
    height: 30px;
  }
.follower-closed-row-container>div{
  display: inline-block;
}
</style>
