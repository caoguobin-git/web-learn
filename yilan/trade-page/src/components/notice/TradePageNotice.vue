<template>
  <div id="trade-page-notice-container">

    <div id="trade-page-notice-title">
      近期交易提醒
    </div>
    <!--      <el-table :data="notice" height="86%"  :cell-style="noticeRow" @row-click="sayHello"-->
    <!--                row-key="date" empty-text="暂无提醒" border-->
    <!--                stripe style="width: 95%">-->
    <!--        &lt;!&ndash;        <el-table-column&ndash;&gt;-->
    <!--        &lt;!&ndash;          type="index"&ndash;&gt;-->
    <!--        &lt;!&ndash;          :index="1">&ndash;&gt;-->
    <!--        &lt;!&ndash;        </el-table-column>&ndash;&gt;-->
    <!--        <el-table-column style="font-weight: bold" align="center" prop="currency" label="商品组合"-->
    <!--                         width="80"></el-table-column>-->
    <!--        <el-table-column :index="0" header-align="center" type="extend" show-overflow-tooltip-->
    <!--                         label="交易策略"-->
    <!--                         width="204" prop="notice">-->
    <!--        </el-table-column>-->
    <!--        <el-table-column align="center" prop="time" label="时间"></el-table-column>-->
    <!--      </el-table>-->
    <a-row style="width: 96%;margin: auto;height: 85%;font-size: 12px;font-family: '微软雅黑', sans-serif">
      <a-col span="22" offset="1">
        <a-row :gutter="2" style="font-size: 14px;padding-bottom: 5px">
          <a-col span="3" ><div class="notice-title-tag">货币</div></a-col>
          <a-col span="14" ><div class="notice-title-tag">提醒内容</div></a-col>
          <a-col span="7"><div class="notice-title-tag">时间</div></a-col>
        </a-row>
        <TradePageNoticeRow v-for="notice in noticeDataSort" :key="notice.noticeId" :notice="notice"></TradePageNoticeRow>
      </a-col>
    </a-row>

  </div>
</template>

<script>
  import TradePageNoticeRow from "./TradePageNoticeRow";

  export default {
    name: "TradePageNotice",
    components: {TradePageNoticeRow},
    props: ['noticeData'],
    data() {
      return {}
    },
    methods: {
      sayHello: function (row, column, event) {
        // alert("你好")
        console.log(row.currency)
        // console.log(column)
        // console.log(event)
      }
    },
    computed:{
      noticeDataSort(){
        var a=[];
        for(var i in this.noticeData){
          a.push(this.noticeData[i]);
        }
        a.sort(function (val1,val2) {
          return new Date(val2.modifiedTime).getTime()-new Date(val1.modifiedTime).getTime()
        })
        return a;
      }
    }
  }
</script>

<style scoped>
  #trade-page-notice-container {
    /*height: 500px;*/
    box-sizing: border-box;
    padding-top: 1px;
    margin-top: 5px;
    margin-bottom: 5px;
    border-radius: 6px;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
    background: white;
    overflow: scroll;
  }

  #trade-page-notice-container:hover {
    overflow: scroll;
  }

  #trade-page-notice-title {
    margin: 18px 17px;
    font-size: 18px;
    height: 17px;
    line-height: 17px;
    font-family: "微软雅黑", sans-serif;
    color: rgba(88, 151, 159, 1);
    text-indent: 10px;
    border-left: 2px solid rgba(112, 189, 199, 1);
  }

  .notice-title-tag{
    text-align: center;
    font-weight: bolder;
  }

</style>
