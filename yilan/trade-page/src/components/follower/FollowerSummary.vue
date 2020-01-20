<template>
  <div class="follower-summary-main-container">
    <table cellspacing="0" cellpadding="0" class="follower-summary-container">
      <FollowerSummaryRow v-for="item in datas" :key="item.offerID" :marketPrecision="marketPrecisions[item.instrument]" :summaryRow="item"></FollowerSummaryRow>
    </table>
  </div>
</template>

<script>
    import FollowerSummaryRow from "./FollowerSummaryRow";
    export default {
        name: "FollowerSummary",
      components: {FollowerSummaryRow},
      props:['datas','marketPrecisions']
    }
</script>

<style scoped>

.follower-summary-main-container {
  height: 95%;
  width: 100%;
  margin: auto;
  overflow: hidden;
}

.follower-summary-main-container:hover {
  overflow-y: scroll;
}

  .follower-summary-title-container{
    width: 1400px;

  }
  .follower-summary-container{
    width: 1000px;
    border-top: 1px solid rgba(112,189,199,1);

    border-right: 1px solid rgba(226,227,231,1);
    border-left: 1px solid rgba(226,227,231,1);
    border-bottom: 1px solid rgba(226,227,231,1);
  }
.follower-summary-title-tag{
  display: inline-block;
  font-weight: bold;
  font-size: 14px;
  text-align: center;

  background: rgba(246,249,252,1);
  padding: 6px 3px;
  border-right: 2px solid white;
}

</style>
