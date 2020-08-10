<template>
  <div>
    <img :src="paramInfo.image" alt="">
    <table cellspacing="0">
      <tr v-for="item in paramInfo.infos">
        <td>{{item.key}}</td>
        <td>{{item.value}}</td>
      </tr>
    </table>

    <table class="size-container" cellspacing="0">
      <tr v-for="item in paramInfo.sizes[0]">
        <td>{{item[0]}}</td>
        <td><span v-for="(item1,index) in item" v-if="index!==0">{{item1}}&nbsp;&nbsp;</span></td>
      </tr>
    </table>

  </div>
</template>

<!--image infos size-->

<script>
export default {
  name: "DetailParamsInfo",
  props: {
    paramInfo:{
      type:Object,
      default(){
        return {
          infos:[],
          sizes:[]
        }
      }
    }
  },
  created() {
    console.log(this.paramInfo)
  }
}
</script>

<style scoped>
table{
  width: 100%;
}
td{
  border: 1px solid #eae1e1;
  padding: 3px 0px;
}

table>tr>td:nth-child(1){
  width: 80px;
  text-align: center;
}

table>tr>td:nth-child(2){
  width: calc(100% - 80px);
  text-indent: 1rem;
}

.size-container>tr>td:nth-child(2){
  color: var(--color-high-text);
}
</style>
