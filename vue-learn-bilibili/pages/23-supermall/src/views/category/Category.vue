<template>
  <div class="wrapper" ref="wrapper">
    <ul class="content">
      <button @click="btnClick">按钮</button>
      <li>test 1</li>
      <li>test 2</li>
      <li>test 3</li>
      <li>test 4</li>
      <li>test 5</li>
      <li>test 6</li>
      <li>test 7</li>
      <li>test 8</li>
      <li>test 9</li>
      <li>test 10</li>
      <li>test 11</li>
      <li>test 12</li>
      <li>test 13</li>
      <li>test 14</li>
      <li>test 15</li>
      <li>test 16</li>
      <li>test 17</li>
      <li>test 18</li>
      <li>test 19</li>
      <li>test 20</li>
      <li>test 21</li>
      <li>test 22</li>
      <li>test 23</li>
      <li>test 24</li>
      <li>test 25</li>
      <li>test 26</li>
      <li>test 27</li>
      <li>test 28</li>
      <li>test 29</li>
      <li>test 30</li>
      <li>test 31</li>
      <li>test 32</li>
      <li>test 33</li>
      <li>test 34</li>
      <li>test 35</li>
      <li>test 36</li>
      <li>test 37</li>
      <li>test 38</li>
      <li>test 39</li>
      <li>test 40</li>
      <li>test 41</li>
      <li>test 42</li>
      <li>test 43</li>
      <li>test 44</li>
      <li>test 45</li>
      <li>test 46</li>
      <li>test 47</li>
      <li>test 48</li>
      <li>test 49</li>
      <li>test 50</li>
    </ul>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: "Category",
  data() {
    return {
      scroll: null
    }
  },
  methods:{
    btnClick(){
      console.log('hello')
    }
  },
  mounted() {
    this.scroll = new BScroll('.wrapper', {
      //设置监听类型,
      // 0:不监听，
      // 1：不见听，
      // 2：在手指滚动的过程中侦测，离开后的惯性滚动不侦测
      // 3：监听所有滚动
      probeType: 3,
      //
      click: false,
      pullUpLoad: true,
      pullDownRefresh:true,
      mouseWheel:true,
    });

    this.scroll.on('scroll',(pos)=>{
      console.log(pos)
    })
    this.scroll.on('pullingUp',()=>{
      console.log('触底了');
      this.scroll.finishPullUp();
    })
  }
}
</script>

<style scoped>
.wrapper {
  height: 200px;
  background: red;
  overflow-y: hidden;
}

</style>
