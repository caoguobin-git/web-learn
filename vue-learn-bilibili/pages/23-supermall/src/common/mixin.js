import {debounce} from "./commonUtils";

export const itemListenerMixin ={
  data(){
    return{
      imageListener:null
    }
  },
  mounted(){
    let refresh = debounce(this.$refs.scroll.refreshHeight, 500);
    this.imageListener=()=>{
      refresh()
    }
    this.$bus.$on('imageLoaded', this.imageListener)
  }
}
