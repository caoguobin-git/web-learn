<template>
  <div class="trader-history-container">
    <div class="block" style="margin:30px 0px 0px 20px;font-size: 14px">

      <a-range-picker v-model="dayFromTo" style="width: 220px"></a-range-picker>
<!--      <el-date-picker-->
<!--        v-model="dayFromTo"-->
<!--        type="daterange"-->
<!--        align="center"-->
<!--        unlink-panels-->
<!--        range-separator="至"-->
<!--        value-format="yyyy;M;d"-->
<!--        start-placeholder="开始日期"-->
<!--        end-placeholder="结束日期"-->
<!--        :picker-options="pickerOptions">-->
<!--      </el-date-picker>-->
      <!--      <div class="trader-history-btn" style= >查询</div>-->
      <a-button :loading="traderHistoryBtnLoading" @click="getTraderHistory" type="primary" size="small"
                 class="trader-history-btn">{{searchText}}
      </a-button>

    </div>
    <div v-html="TraderHistoryData"></div>
  </div>
</template>

<script>
  export default {
    name: "TraderHistoryPositions",
    props: ['TraderHistoryData'],
    data() {
      return {
        dayFromTo: [],
        loading: false

      }
    },
    watch: {
      TraderHistoryData(val, valOld) {
        if (val.indexOf('td') != -1) {
          setTimeout(function () {
            $('.trader-history-container').scrollTop(95);
            console.log('设置高度')
          }, 50)
        }
      }
    },
    computed: {
      traderHistoryBtnLoading() {
        return this.dayFromTo != '' && this.loading && this.TraderHistoryData.indexOf('td') == -1 && this.TraderHistoryData.indexOf('服务器') == -1;
      },
      searchText() {
        return this.traderHistoryBtnLoading ? '查询' : '查询'
      }
    },
    methods: {
      getTraderHistory() {
        if (this.dayFromTo == '' || this.dayFromTo == null) {
          alert('请选择日期');
          return;
        }
        this.loading = true
        var a=this.dayFromTo[0]._d.getFullYear();
        var b =(this.dayFromTo[0]._d.getMonth()+1);
        var c=this.dayFromTo[0]._d.getDate();

        var d=this.dayFromTo[1]._d.getFullYear();
        var e =(this.dayFromTo[1]._d.getMonth()+1);
        var f=this.dayFromTo[1]._d.getDate();
        var res=a+';'+b+';'+c+';'+d+';'+e+';'+f;

        this.$emit('getTraderHistory', res)

      }
    }
  }
</script>

<style scoped>

  .trader-history-btn {
    width: 76px;
    margin-left: 10px;
    border: none;
    border: 1px solid rgba(112, 189, 199, 1);
    background: rgba(112, 189, 199, 1);
    box-shadow: 0px 0px 6px rgba(112, 189, 199, 1);
  }

  .trader-history-btn:hover {
    box-shadow: 0px 0px 4px rgba(112, 189, 199, 1), 0px 0px 8px rgba(112, 189, 199, 1);;
  }

  >>> .history-loading {
    animation: my-demo 1s linear infinite;
    overflow: hidden;
    height: 50px;
    line-height: 50px;
    margin-left: 48%;
    margin-top: 8%;
    color: rgba(51, 51, 51, 1);
    font-size: 16px;
    font-weight: bolder;
    font-family: "微软雅黑", sans-serif;
    word-break: break-all;
    white-space: nowrap;
  }

  >>> .history-notice {
    text-align: center;
    color: rgba(51, 51, 51, 1);
    font-size: 16px;
    font-weight: bolder;
    font-family: "微软雅黑", sans-serif;
    margin-top: 8%;
  }

  @keyframes my-demo {
    0% {
      width: 48px;
    }
    100% {
      width: 80px;
    }
  }

  >>> .el-date-editor.el-range-editor.el-input__inner.el-date-editor--daterange {
    width: 368px;
    height: 40px;
  }

  .trader-history-container {
    height: 73%;
    width: 99.5%;
    margin: auto;
    overflow-x: hidden;
    overflow-y: scroll;
    border-top: 1px solid rgba(112, 189, 199, 1);
  }

  .trader-history-container:hover {
    overflow: scroll;
  }

  >>> table.separator_high_separator_cell, >>> td.separator_line_separator_cell, >>> table.pair_set, >>> table.table_caption_user, >>> table.report_caption, >>> table.pair, >>> table.table_caption_firm {
    display: none;
  }

  >>> td.header.stringData.header_text, >>> td.header.dateData.header_text, >>> td.header.numberData.header_text {
    border-left: 1px solid rgba(228, 228, 228, 1);
    border-right: 1px solid rgba(228, 228, 228, 1);
  }

  >>> td.cell_text {
    background: white;
  }

  >>> td.total.total_text {
    background: rgb(239, 242, 245);
  }

  >>> td.caption_text.caption_text_text {
    background: transparent;
    font-size: 15px;

  }

  >>> table.table_note {
    display: none;
  }

  >>> .body {
    BACKGROUND-COLOR: white;
    PADDING-RIGHT: 0px;
    PADDING-LEFT: 0px;
    PADDING-BOTTOM: 0px;
    PADDING-TOP: 0px;
    MARGIN-LEFT: 0px;
    MARGIN-RIGHT: 0px;
    MARGIN-TOP: 0px;
    MARGIN-BOTTOM: 13px
  }

  >>> .report_caption {
    MARGIN-LEFT: 11px;
    MARGIN-RIGHT: 11px
  }

  >>> .report_caption_cell {
    PADDING-RIGHT: 15px;
    PADDING-LEFT: 8px;
    PADDING-BOTTOM: 20px;
    PADDING-TOP: 10px;
    VERTICAL-ALIGN: bottom;
    WIDTH: 100%;
    COLOR: #5e7fa0
  }

  >>> .report_caption_cell_text {
    FONT-SIZE: 30px;
    FONT-FAMILY: Arial Narrow;
    TEXT-ALIGN: left
  }

  >>> .pair {
    MARGIN-LEFT: 11px;
    MARGIN-RIGHT: 11px;
    MARGIN-TOP: 10px
  }

  >>> .pair_set_name {
    COLOR: #003466;
    BACKGROUND: #EBF0F4;
    BORDER-RIGHT: white 0px solid;
    PADDING-RIGHT: 3px;
    BORDER-TOP: white 0px solid;
    PADDING-LEFT: 28px;
    BORDER-LEFT: white 0px solid;
    PADDING-BOTTOM: 7px;
    BORDER-BOTTOM: white 0px solid;
    PADDING-TOP: 6px
  }

  >>> .pair_set_name_text {
    FONT-SIZE: 11px;
    FONT-WEIGHT: bold
  }

  >>> .pair_set_value {
    COLOR: #003466;
    BACKGROUND: #EBF0F4;
    BORDER-RIGHT: white 2px solid;
    PADDING-RIGHT: 28px;
    BORDER-TOP: white 0px solid;
    PADDING-LEFT: 3px;
    BORDER-LEFT: white 0px solid;
    PADDING-BOTTOM: 7px;
    BORDER-BOTTOM: white 0px solid;
    PADDING-TOP: 6px
  }

  >>> .pair_set_value_text {
    FONT-SIZE: 11px
  }

  >>> .pair_name {
    PADDING-TOP: 0px;
    PADDING-LEFT: 10px;
    PADDING-BOTTOM: 10px;
    COLOR: #333333
  }

  >>> .pair_name_text {
    FONT-SIZE: 11px;
    FONT-STYLE: normal;
    FONT-FAMILY: Verdana, Tahoma, Arial;
    FONT-WEIGHT: bold;
    TEXT-ALIGN: right
  }

  .pair_name_text_left {
    FONT-SIZE: 11px;
    FONT-STYLE: normal;
    FONT-FAMILY: Verdana, Tahoma, Arial;
    FONT-WEIGHT: bold;
    TEXT-ALIGN: left
  }

  >>> .pair_value {
    PADDING-TOP: 0px;
    PADDING-LEFT: 0px;
    PADDING-BOTTOM: 10px;
    COLOR: #333333
  }

  >>> .pair_value_text {
    FONT-SIZE: 11px;
    FONT-STYLE: normal;
    FONT-FAMILY: Verdana, Tahoma, Arial;
    FONT-WEIGHT: normal
  }

  >>> .separator_line {
    MARGIN-LEFT: 11px;
    MARGIN-RIGHT: 11px
  }

  >>> .separator_line_separator_cell {
    PADDING-RIGHT: 0px;
    PADDING-LEFT: 0px;
    PADDING-BOTTOM: 0px;
    PADDING-TOP: 0px;
    BACKGROUND: #9fb3cc;
    MARGIN: 0px;
    WIDTH: 652px;
    BORDER-TOP-STYLE: none;
    BORDER-RIGHT-STYLE: none;
    BORDER-LEFT-STYLE: none;
    BORDER-BOTTOM-STYLE: none;
    HEIGHT: 1px
  }

  >>> .separator_low {
    MARGIN-LEFT: 11px;
    MARGIN-RIGHT: 11px;
    HEIGHT: 3px
  }

  >>> .separator_low_separator_cell {
    PADDING-RIGHT: 0px;
    PADDING-LEFT: 0px;
    PADDING-BOTTOM: 0px;
    PADDING-TOP: 0px;
    BACKGROUND: white;
    MARGIN: 0px;
    HEIGHT: 3px
  }

  >>> .separator_high {
    MARGIN-LEFT: 11px;
    MARGIN-RIGHT: 11px;
    HEIGHT: 27px;
    WIDTH: 97%
  }

  >>> .separator_high_separator_cell {
    PADDING-RIGHT: 0px;
    PADDING-LEFT: 0px;
    PADDING-BOTTOM: 0px;
    PADDING-TOP: 0px;
    BACKGROUND: white;
    MARGIN: 0px;
    HEIGHT: 27px
  }

  >>> .caption {
    PADDING-LEFT: 0px;
    PADDING-BOTTOM: 0px;
    MARGIN-LEFT: 0px;
    WIDTH: 100%
  }

  >>> .caption_2 {
    PADDING-LEFT: 0px;
    PADDING-BOTTOM: 0px;
    MARGIN-LEFT: 0px;
    WIDTH: 100%
  }

  >>> .caption_3 {
    PADDING-LEFT: 0px;
    PADDING-BOTTOM: 0px;
    MARGIN-LEFT: 0px;
    WIDTH: 100%
  }

  >>> .caption_text {
    PADDING-LEFT: 12px;
    PADDING-RIGHT: 12px;
    PADDING-TOP: 6px;
    PADDING-BOTTOM: 6px;
    MARGIN: 0px;
    BACKGROUND: #9fb3cc;
    COLOR: #37597e;
    WIDTH: 311px;
    HEIGHT: 20px;
    BORDER-TOP-STYLE: none;
    BORDER-RIGHT-STYLE: none;
    BORDER-LEFT-STYLE: none;
    BORDER-BOTTOM: #9fb3cc 1px solid
  }

  >>> .caption_2_text {
    PADDING-LEFT: 12px;
    PADDING-RIGHT: 12px;
    PADDING-TOP: 6px;
    PADDING-BOTTOM: 6px;
    MARGIN: 0px;
    BACKGROUND: #9fb3cc;
    COLOR: #37597e;
    WIDTH: 311px;
    HEIGHT: 20px;
    BORDER-TOP-STYLE: none;
    BORDER-RIGHT-STYLE: none;
    BORDER-LEFT-STYLE: none;
    BORDER-BOTTOM: #9fb3cc 1px solid
  }

  >>> .caption_3_text {
    PADDING-LEFT: 12px;
    PADDING-RIGHT: 12px;
    PADDING-TOP: 6px;
    PADDING-BOTTOM: 6px;
    MARGIN: 0px;
    BACKGROUND: #9fb3cc;
    COLOR: #37597e;
    WIDTH: 200px;
    HEIGHT: 20px;
    BORDER-TOP-STYLE: none;
    BORDER-RIGHT-STYLE: none;
    BORDER-LEFT-STYLE: none;
    BORDER-BOTTOM: #9fb3cc 1px solid
  }

  >>> .caption_text_text {
    FONT-SIZE: 11px;
    FONT-WEIGHT: bold;
    FONT-STYLE: normal;
    FONT-FAMILY: Verdana, Tahoma, Arial
  }

  >>> .caption_2_text_text {
    FONT-SIZE: 11px;
    FONT-WEIGHT: bold;
    FONT-STYLE: normal;
    FONT-FAMILY: Verdana, Tahoma, Arial
  }

  >>> .caption_3_text_text {
    FONT-SIZE: 11px;
    FONT-WEIGHT: bold;
    FONT-STYLE: normal;
    FONT-FAMILY: Verdana, Tahoma, Arial
  }

  >>> .caption_addition {
    PADDING-LEFT: 0px;
    PADDING-RIGHT: 0px;
    PADDING-TOP: 0px;
    PADDING-BOTTOM: 0px;
    MARGIN: 0px;
    BACKGROUND: white;
    HEIGHT: 20px;
    BORDER-TOP-STYLE: none;
    BORDER-RIGHT-STYLE: none;
    BORDER-LEFT-STYLE: none;
    /*BORDER-BOTTOM: #9fb3cc 1px solid*/
  }

  >>> .caption_2_addition {
    PADDING-LEFT: 0px;
    PADDING-RIGHT: 0px;
    PADDING-TOP: 0px;
    PADDING-BOTTOM: 0px;
    MARGIN: 0px;
    BACKGROUND: white;
    HEIGHT: 20px;
    BORDER-TOP-STYLE: none;
    BORDER-RIGHT-STYLE: none;
    BORDER-LEFT-STYLE: none;
    BORDER-BOTTOM: #9fb3cc 1px solid
  }

  >>> .caption_3_addition {
    PADDING-LEFT: 0px;
    PADDING-RIGHT: 0px;
    PADDING-TOP: 0px;
    PADDING-BOTTOM: 0px;
    MARGIN: 0px;
    BACKGROUND: white;
    HEIGHT: 20px;
    BORDER-TOP-STYLE: none;
    BORDER-RIGHT-STYLE: none;
    BORDER-LEFT-STYLE: none;
    BORDER-BOTTOM: #9fb3cc 1px solid
  }

  >>> .caption_addition_text {

  }

  >>> .caption_2_addition_text {

  }

  >>> .caption_3_addition_text {

  }

  >>> .table_caption_firm {
    MARGIN: 10px
  }

  >>> .table_note {
    MARGIN: 10px
  }

  >>> .caption_firm {
    BORDER-RIGHT: white 1px solid;
    PADDING-RIGHT: 10px;
    BORDER-TOP: white 1px solid;
    PADDING-LEFT: 10px;
    BORDER-LEFT: white 1px solid;
    PADDING-BOTTOM: 6px;
    BORDER-BOTTOM: white 1px solid;
    PADDING-TOP: 6px
  }

  >>> .caption_firm_text {
    FONT-SIZE: 11px;
    FONT-WEIGHT: bold;
    FONT-STYLE: normal;
    FONT-FAMILY: Verdana, Tahoma, Arial
  }

  >>> .table_caption_user {
    MARGIN: 10px
  }

  >>> .caption_user {
    BORDER-RIGHT: white 1px solid;
    PADDING-RIGHT: 10px;
    BORDER-TOP: white 1px solid;
    PADDING-LEFT: 10px;
    BORDER-LEFT: white 1px solid;
    PADDING-BOTTOM: 6px;
    BORDER-BOTTOM: white 1px solid;
    PADDING-TOP: 6px
  }

  >>> .caption_user_text {
    FONT-SIZE: 11px;
    FONT-STYLE: normal;
    FONT-FAMILY: Verdana, Tahoma, Arial
  }

  >>> .pair_set {
    MARGIN-LEFT: 11px;
    MARGIN-RIGHT: 11px;
    FONT-WEIGHT: normal;
    FONT-SIZE: 11px;
    FONT-STYLE: normal;
    FONT-FAMILY: Verdana, Tahoma, Arial;
    border-collapse: collapse;
    padding: 0px
  }

  >>> .table_free {
    MARGIN-LEFT: 11px;
    MARGIN-RIGHT: 11px;
    FONT-WEIGHT: normal;
    FONT-SIZE: 11px;
    FONT-STYLE: normal;
    FONT-FAMILY: Verdana, Tahoma, Arial
  }

  >>> .table_wide {
    WIDTH: 97%;
    MARGIN-LEFT: 11px;
    MARGIN-RIGHT: 11px;
    FONT-WEIGHT: normal;
    FONT-SIZE: 11px;
    FONT-STYLE: normal;
    FONT-FAMILY: Verdana, Tahoma, Arial;
    border-collapse: collapse;
    padding: 0px
  }

  >>> .table_summary {
    WIDTH: 39%
  }

  >>> .cell {
    BORDER-RIGHT: #e4e4e4 1px solid;
    PADDING-RIGHT: 10px;
    BORDER-TOP: #ffffff 1px solid;
    PADDING-LEFT: 10px;
    BORDER-LEFT: #f7f7f7 1px solid;
    PADDING-BOTTOM: 6px;
    BORDER-BOTTOM: #e4e4e4 1px solid;
    PADDING-TOP: 6px;
    BACKGROUND: #f1f1f1;
    COLOR: #333333
  }

  >>> .note {
    PADDING-BOTTOM: 6px;
    PADDING-LEFT: 10px;
    PADDING-RIGHT: 10px
  }

  >>> .cell_text {

  }

  >>> .empty_cell {
    BACKGROUND: #ffffff
  }

  >>> .empty_cell_text {

  }

  >>> .note_text {
    FONT-SIZE: 11px;
    FONT-FAMILY: Verdana, Tahoma, Arial
  }

  >>> .cell_merged_top {
    PADDING-BOTTOM: 0pt;
    BORDER-BOTTOM: 0pt;
    BORDER-BOTTOM-STYLE: none;
    VERTICAL-ALIGN: bottom
  }

  >>> .cell_merged_middle {
    PADDING-BOTTOM: 0pt;
    BORDER-BOTTOM: 0pt;
    BORDER-BOTTOM-STYLE: none;
    BORDER-TOP: 0pt;
    PADDING-TOP: 0pt;
    BORDER-TOP-STYLE: none;
    VERTICAL-ALIGN: middle
  }

  >>> .cell_merged_bottom {
    BORDER-TOP: 0pt;
    PADDING-TOP: 0pt;
    BORDER-TOP-STYLE: none;
    VERTICAL-ALIGN: top
  }

  >>> .row_thead {
    TEXT-ALIGN: left
  }

  >>> .header {
    BORDER-RIGHT: #809bb8 1px solid;
    padding: 5px 12px;
    BORDER-TOP: #a9bfd7 1px solid;
    BORDER-LEFT: #a9bfd7 1px solid;
    BORDER-BOTTOM: #9abcd9 1px solid;
    border: none;
    VERTICAL-ALIGN: top;
    BACKGROUND: rgba(125, 207, 217, 0.64);
    COLOR: #575757;
  }

  >>> .header_text {
    FONT-WEIGHT: bold;
    FONT-SIZE: 12px
  }

  >>> .total {
    PADDING-TOP: 6px;
    PADDING-LEFT: 10px;
    PADDING-BOTTOM: 6px;
    PADDING-RIGHT: 10px;
    BACKGROUND: #e3e2e0;
    COLOR: #333333;
    BORDER-RIGHT-STYLE: none;
    BORDER-LEFT-STYLE: none;
    BORDER-BOTTOM-STYLE: none;
    BORDER-TOP: #ffffff 1px solid
  }

  >>> .total_text {
    FONT-WEIGHT: bold
  }

  >>> .additional_total {
    PADDING-TOP: 6px;
    PADDING-LEFT: 10px;
    PADDING-BOTTOM: 6px;
    PADDING-RIGHT: 10px;
    BACKGROUND: #f1f1f1;
    COLOR: #333333;
    BORDER-RIGHT-STYLE: none;
    BORDER-LEFT-STYLE: none;
    BORDER-BOTTOM-STYLE: none;
    BORDER-TOP: #ffffff 1px solid
  }

  >>> .additional_total_text {
    FONT-WEIGHT: bold
  }

  >>> .stringData {

  }

  >>> .stringDataCenter {

  }

  >>> .numberData {

  }

  >>> .dateData {

  }

  .page {

  }

  .leftAlign {

  }

  .centerAlign {

  }

  .rightAlign {

  }

  .error_text {

  }

  >>> .subheader {
    BORDER-RIGHT: #809bb8 1px solid;
    PADDING-RIGHT: 12px;
    BORDER-TOP: #a9bfd7 1px solid;
    PADDING-TOP: 5px;
    BORDER-LEFT: #a9bfd7 1px solid;
    PADDING-LEFT: 12px;
    BORDER-BOTTOM: #809bb8 1px solid;
    PADDING-BOTTOM: 5px;
    VERTICAL-ALIGN: top;
    BACKGROUND: #9fb3cc;
    COLOR: #37597e
  }

  >>> .header_merged_top {
    padding-bottom: 0px;
    border-bottom-style: none
  }

  >>> .header_merged_bottom {
    padding-top: 0px;
    border-top-style: none
  }

  >>> .header_merged_middle {
    padding-top: 0px;
    border-top-style: none;
    padding-bottom: 0px;
    border-bottom-style: none
  }

  >>> .pair_info {
    MARGIN-LEFT: 11px;
    MARGIN-RIGHT: 11px;
    MARGIN-TOP: 10px
  }

  >>> .pair_info_name {
    BORDER-RIGHT_STYLE: none;
    PADDING-RIGHT: 10px;
    BORDER-TOP: #ffffff 1px solid;
    PADDING-LEFT: 10px;
    BORDER-LEFT: #f7f7f7 1px solid;
    PADDING-BOTTOM: 6px;
    BORDER-BOTTOM: #e4e4e4 1px solid;
    PADDING-TOP: 6px;
    BACKGROUND: #f1f1f1;
    COLOR: #333333
  }

  >>> .pair_info_name_text {
    FONT-SIZE: 11px;
    FONT-STYLE: normal;
    FONT-FAMILY: Verdana, Tahoma, Arial;
    FONT-WEIGHT: bold;
    TEXT-ALIGN: right;
    TEXT-ALIGN: left
  }

  >>> .pair_info_value {
    BORDER-RIGHT: #e4e4e4 1px solid;
    PADDING-RIGHT: 10px;
    BORDER-TOP: #ffffff 1px solid;
    PADDING-LEFT: 10px;
    BORDER-LEFT-STYLE: none;
    PADDING-BOTTOM: 6px;
    BORDER-BOTTOM: #e4e4e4 1px solid;
    PADDING-TOP: 6px;
    BACKGROUND: #f1f1f1;
    COLOR: #333333
  }

  >>> .pair_info_value_text {
    FONT-SIZE: 11px;
    FONT-STYLE: normal;
    FONT-FAMILY: Verdana, Tahoma, Arial;
    FONT-WEIGHT: normal;
    TEXT-ALIGN: right
  }

  >>> .global_report_caption {
    WIDTH: 100%
  }

  >>> .global_report_caption_cell {
    PADDING-RIGHT: 0px;
    PADDING-LEFT: 0px;
    PADDING-BOTTOM: 5px;
    PADDING-TOP: 5px;
    WIDTH: 100%;
    COLOR: blue
  }

  >>> .global_report_caption_cell_text {
    FONT-SIZE: 13px;
    FONT-FAMILY: Arial, Verdana, sans-serif;
    TEXT-ALIGN: center;
    FONT-WEIGHT: bold;
    FONT-STYLE: italic
  }

  >>> .global_pair {

  }

  >>> .global_pair_name {
    PADDING-TOP: 0px;
    PADDING-LEFT: 10px;
    PADDING-BOTTOM: 0px;
    COLOR: blue
  }

  >>> .global_pair_name_text {
    FONT-SIZE: 11px;
    FONT-STYLE: normal;
    FONT-FAMILY: Arial, Verdana, sans-serif;
    FONT-WEIGHT: bold;
    TEXT-ALIGN: right
  }

  >>> .global_pair_value {
    PADDING-TOP: 0px;
    PADDING-LEFT: 0px;
    PADDING-RUGHT: 10px;
    PADDING-BOTTOM: 0px;
    COLOR: blue
  }

  >>> .global_pair_value_text {
    FONT-SIZE: 11px;
    FONT-STYLE: normal;
    FONT-FAMILY: Arial, Verdana, sans-serif;
    FONT-WEIGHT: normal
  }

  >>> .global_parameter_table {
    WIDTH: 100%
  }

  >>> .global_parameter {
    PADDING-TOP: 0px;
    PADDING-LEFT: 10px;
    PADDING-RIGHT: 10px;
    PADDING-BOTTOM: 0px;
    COLOR: blue
  }

  >>> .global_parameter_text {
    FONT-SIZE: 11px;
    FONT-STYLE: normal;
    FONT-FAMILY: Arial, Verdana, sans-serif;
    FONT-WEIGHT: normal;
    TEXT-ALIGN: center
  }

  >>> .global_table_wide {
    WIDTH: 97%;
    MARGIN-LEFT: 4px;
    MARGIN-RIGHT: 4px;
    FONT-WEIGHT: normal;
    FONT-SIZE: 11px;
    FONT-STYLE: normal;
    BORDER-COLLAPSE: collapse;
    FONT-FAMILY: Arial, Verdana, sans-serif
  }

  >>> .global_table_free {
    WIDTH: 39%;
    MARGIN-LEFT: 4px;
    MARGIN-RIGHT: 4px;
    FONT-WEIGHT: normal;
    FONT-SIZE: 11px;
    FONT-STYLE: normal;
    BORDER-COLLAPSE: collapse;
    FONT-FAMILY: Arial, Verdana, sans-serif
  }

  >>> .global_cell {
    BORDER: 2px solid grey
  }

  >>> .global_cell_text {
    FONT-FAMILY: Arial, Verdana, sans-serif;
    FONT-STYLE: normal;
    FONT-SIZE: 11px
  }

  >>> .global_header {
    BORDER: 2px solid grey
  }

  >>> .global_header_blue {
    BORDER: 2px solid grey;
    COLOR: blue
  }

  >>> .global_header_text {
    FONT-FAMILY: Arial, Verdana, sans-serif;
    FONT-STYLE: italic;
    FONT-WEIGHT: bold;
    FONT-SIZE: 13px
  }

  >>> .connection_value {
    COLOR: #37597e
  }

  .page {

  }

  .page-body {

  }

  .page-before {

  }

  .page-after {

  }

  .body {

  }

  .report_caption {

  }

  .report_caption_cell {

  }

  >>> .report_caption_cell_text {
    FONT-SIZE: 30px
  }

  .pair {

  }

  .pair_set {

  }

  .pair_set_name {

  }

  >>> .pair_set_name_text {
    FONT-SIZE: 11px
  }

  .pair_set_value {

  }

  >>> .pair_set_value_text {
    FONT-SIZE: 11px
  }

  .pair_name {

  }

  >>> .pair_name_text {
    FONT-SIZE: 11px
  }

  >>> .pair_name_text_left {
    FONT-SIZE: 11px;
    TEXT-ALIGN: left
  }

  .pair_value {

  }

  >>> .pair_value_text {
    FONT-SIZE: 11px
  }

  .separator_line {

  }

  >>> .separator_line_pdf_long {
    MARGIN-LEFT: 11px;
    MARGIN-RIGHT: 11px
  }

  .separator_line_separator_cell {

  }

  .separator_low {

  }

  .separator_low_separator_cell {

  }

  .separator_high {

  }

  .separator_high_separator_cell {

  }

  .caption {

  }

  .caption_2 {

  }

  .caption_3 {

  }

  .caption_firm {

  }

  .caption_firm_text {

  }

  .caption_user {

  }

  .caption_user_text {

  }

  .caption_text {

  }

  .caption_2_text {

  }

  .caption_3_text {

  }

  >>> .caption_text_text {
    FONT-SIZE: 11px
  }

  >>> .caption_2_text_text {
    FONT-SIZE: 11px
  }

  >>> .caption_3_text_text {
    FONT-SIZE: 11px
  }

  .caption_addition {

  }

  .caption_2_addition {

  }

  .caption_3_addition {

  }

  .caption_addition_text {

  }

  .caption_2_addition_text {

  }

  .caption_3_addition_text {

  }

  .table_free {

  }

  .table_wide {

  }

  .table_summary {

  }

  .table_caption_firm {

  }

  .table_caption_user {

  }

  .table_note {

  }

  .note {

  }

  .cell {

  }

  .cell_text {

  }

  .empty_cell {

  }

  .empty_cell_text {

  }

  .note_text {

  }

  .cell_merged_top {

  }

  .cell_merged_middle {

  }

  .cell_merged_bottom {

  }

  .header {

  }

  .header_text {

  }

  >>> .link {
    COLOR: blue;
    text-decoration: underline
  }

  .total {

  }

  .total_text {

  }

  .additional_total {

  }

  .additional_total_text {

  }

  >>> .stringData {
    TEXT-ALIGN: left
  }

  >>> .stringDataCenter {
    TEXT-ALIGN: center
  }

  >>> .numberData {
    TEXT-ALIGN: right
  }

  >>> .dateData {
    TEXT-ALIGN: right
  }

  >>> .leftAlign {
    TEXT-ALIGN: left
  }

  >>> .centerAlign {
    TEXT-ALIGN: center
  }

  >>> .rightAlign {
    TEXT-ALIGN: right
  }

  >>> .error_header {
    font-family: Tahoma, Verdana, Arial;
    font-size: 13pt;
    font-weight: bold;
    color: black
  }

  >>> .error_page {
    background-color: #F0F0F0
  }

  >>> .error_text {
    font-family: Tahoma, Verdana, Arial;
    font-size: 8pt;
    color: black
  }

  .subheader {

  }

  .header_merged_top {

  }

  .header_merged_bottom {

  }

  .header_merged_middle {

  }

  .pair_info {

  }

  .pair_info_name {

  }

  .pair_info_name_text {
    FONT-SIZE: 11px;
    TEXT-ALIGN: left
  }

  .pair_info_value {

  }

  .pair_info_value_text {
    FONT-SIZE: 11px;
    TEXT-ALIGN: right
  }

  .global_report_caption {

  }

  .global_report_caption_cell {

  }

  .global_report_caption_cell_text {

  }

  .global_pair {

  }

  .global_pair_name {

  }

  .global_pair_value {

  }

  .global_pair_value_text {

  }

  .global_parameter_table {
    WIDTH: 100%
  }

  .global_parameter {
    PADDING-TOP: 0px;
    PADDING-LEFT: 10px;
    PADDING-RIGHT: 10px;
    PADDING-BOTTOM: 0px;
    COLOR: blue
  }

  .global_parameter_text {
    FONT-SIZE: 11px;
    FONT-STYLE: normal;
    FONT-FAMILY: Arial, Verdana, sans-serif;
    FONT-WEIGHT: normal;
    TEXT-ALIGN: center
  }

  .global_parameter_name {
    PADDING-TOP: 0px;
    PADDING-LEFT: 10px;
    PADDING-BOTTOM: 0px;
    COLOR: blue
  }

  .global_parameter_name_text {
    FONT-SIZE: 11px;
    FONT-STYLE: normal;
    FONT-FAMILY: Arial, Verdana, sans-serif;
    FONT-WEIGHT: bold;
    TEXT-ALIGN: left
  }

  .global_parameter_value {
    PADDING-TOP: 0px;
    PADDING-LEFT: 0px;
    PADDING-RIGHT: 0px;
    PADDING-BOTTOM: 0px;
    COLOR: blue
  }

  .global_parameter_value_text {
    FONT-SIZE: 11px;
    FONT-STYLE: normal;
    FONT-FAMILY: Arial, Verdana, sans-serif;
    FONT-WEIGHT: normal;
    TEXT-ALIGN: left
  }

  .global_parameter_table_free {

  }

  .global_cell {

  }

  .global_cell_text {

  }

  .global_header_blue {

  }

  .global_header {

  }

  .global_header_text {

  }

  .connection {

  }

  .connection_name {
    COLOR: black;
    HEIGHT: 20px;
    padding-left: 7px
  }

  .connection_text {
    FONT-SIZE: 11px;
    FONT-WEIGHT: bold;
    FONT-STYLE: normal;
    FONT-FAMILY: Verdana, Tahoma, Arial
  }

  .connection_name2 {
    COLOR: black;
    HEIGHT: 20px;
    padding-left: 20px
  }

  .connection_value {
    HEIGHT: 20px;
    padding-left: 7px
  }

  .even {

  }

  .odd {

  }


</style>
