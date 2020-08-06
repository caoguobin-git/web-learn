<template>
  <div id="detail">
    <detail-nav-bar/>
  </div>
</template>

<script>
//组件
import DetailNavBar from "./childComps/DetailNavBar";

//网络模块
import {getGoodsDetail} from "../../network/detail";


export default {
  name: "Detail",
  components: {DetailNavBar},
  data(){
    return {
      goodsItem:'',

    }
  },
  methods:{
    getGoods(id){
      getGoodsDetail(id)
      .then(res=>{
        this.goodsItem=res
      })
    },
  },
  created() {
    console.log(this.$route.query.id)
    this.getGoods(this.$route.query.id);
  }
}
</script>

<style scoped>

</style>
