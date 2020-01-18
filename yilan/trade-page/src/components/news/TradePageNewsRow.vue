<template>
    <div style="width: 100%;height: 60px;margin-top: 3px;border-bottom: 1px solid silver">
        <div class="news-content-col" style="width: 20%">
          <div style="text-align: center;height: 30px;line-height: 30px;position: relative;top:5px;font-weight: bolder;font-size: 14px">{{news.country}}</div>
          <div style="text-align: center;height: 30px;line-height: 30px;"><span v-html="getStar(news.important)"></span></div>
        </div>
        <div class="news-content-col"  style="width: 40%">2</div>
        <div class="news-content-col"  style="width: 28%">3</div>
    </div>
</template>

<script>
    export default {
        name: "TradePageNewsRow",
      props:['news'],
      methods:{
        getStar: function (val) {
          let result = '<div style="width: 60px;height: 12px;position: relative" class="star-container">';

          switch (val) {
            case 1:
              result += '<i class="star-active" style="height:12px;width: 20%"></i>';
              break;
            case 2:
              result += '<i class="star-active" style="height:12px;width: 40%"></i>';
              break;
            case 3:
              result += '<i class="star-active" style="height:12px;width: 60%"></i>';
              break;
            case 4:
              result += '<i class="star-important" style="height:12px;width: 80%"></i>';
              break;
            case 5:
              result += '<i class="star-important" style="height:12px;width: 100%"></i>';
              break;
            default:
              result += '<i class="star-active" style="height:12px;width: 20%"></i>';
          }
          result += '</div>';
          return result;
        }
      }
    }
</script>

<style scoped>
.news-content-col{
  display: inline-grid;
  height: 100%;
}

.news-content-col>p{
  height: 50%;
}


>>> .star-container {
  width: 60px;
  height: 12px;
  background: url("../../assets/star.png");
  position: relative;
  top: 5px;
  left: 30px;
}

>>> .star-active {
  position: absolute;
  top: 0;
  left: 0;
  background: url("../../assets/star-active.png") 0 0 no-repeat;
  height: 12px;
}

>>> .star-important {
  position: absolute;
  top: 0;
  left: 0;
  background: url("../../assets/star-important.png") 0 0 no-repeat;
  height: 12px;
}

>>> .news-display-country{
  font-weight: bolder;
}
</style>
