<template>
  <div>
    <a-row type="flex" align="middle" class="news-row animated">
      <a-col class="news-row-col-country" :title="news.country" span="5">{{news.country}}<br/>
        <a-rate style="font-size: 13px" :style="{color:starColor}" :value="news.important" disabled></a-rate>
      </a-col>
      <a-col class="new-row-col news-row-col-content" span="11">
        <a-popover>
          <template slot="content">
            <p style="max-width: 300px;white-space: pre-line;word-break: break-all">{{news.content}}</p>
          </template>
          <p>{{news.content}}</p></a-popover>
      </a-col>
      <a-col class="news-row-col-time" span="8">{{news.modifiedTime}}</a-col>
    </a-row>
  </div>
</template>

<script>
  export default {
    name: "TradePageNewsRow",
    props: ['news'],
    methods: {},
    computed: {
      starColor() {
        console.log(this.news.important)
        return this.news.important < 3 ? 'rgba(255,188,0,0.43)' : (this.news.important < 4 ? 'rgb(255,188,0)' : 'rgb(222,78,78)');
      }
    }
  }
</script>

<style scoped>
  .news-row.animated {
    border-bottom: 1px dashed rgba(112,189,199,.5);
    max-height: 60px;
    min-height: 60px;

    text-align: center;
    overflow: hidden;
    cursor: default;
    transition: all .5s ease-out;

    animation: demo .3s ease-in 2;
  }

  @keyframes demo {
    0%{
      background: rgba(112,189,199,1);
    }
    100%{
      background: white;

    }
  }

  >>> .ant-rate-star {
    margin-right: 0;
  }

  /*.news-row:hover {*/
  /*  max-height: 200px;*/
  /*  overflow: hidden;*/
  /*  word-break: normal;*/
  /*  !*height: 40px;*!*/
  /*  white-space: pre-line;*/
  /*}*/

  .news-row-col-country, .news-row-col-content, .news-row-col-time {
    overflow: hidden;
    word-break: break-all;
    height: 100%;
    color: rgba(51,51,51,1);
    font-size: 12px;
  }

  .news-row-col-country {
    line-height: 17px;
    white-space: nowrap;
    font-weight: 800;
    color: rgb(51, 51, 51);
  }

  .new-row-col.news-row-col-content {
    text-align: left;
    height: 40px;
    text-indent: 24px;
    white-space: pre-line;

  }

  .news-row-col-time {

  }
</style>
