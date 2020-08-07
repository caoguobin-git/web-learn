[TOC]

# 介绍

## better-scroll 是什么

better-scroll 是一款重点解决移动端（已支持 PC）各种滚动场景需求的插件。它的核心是借鉴的 [iscroll](https://github.com/cubiq/iscroll) 的实现，它的 API 设计基本兼容 iscroll，在 iscroll 的基础上又扩展了一些 feature 以及做了一些性能优化。

better-scroll 是基于原生 JS 实现的，不依赖任何框架。它编译后的代码大小是 63kb，压缩后是 35kb，gzip 后仅有 9kb，是一款非常轻量的 JS lib。

## 起步

学习使用 better-scroll 最好的方式是看它的 demo 代码，我们把代码都放在了 [example](https://github.com/ustbhuangyi/better-scroll/tree/master/example) 目录。由于目前最适合移动端开发的前端 mvvm 框架是 [Vue](https://github.com/vuejs/vue)，并且 better-scroll 可以很好的和 Vue 配合使用的，所以 demo 我都用 Vue 进行了重写。

better-scroll 最常见的应用场景是列表滚动，我们来看一下它的 html 结构

```html
<div class="wrapper">
  <ul class="content">
    <li>...</li>
    <li>...</li>
    ...
  </ul>
  <!-- 这里可以放一些其它的 DOM，但不会影响滚动 -->
</div>
```

上面的代码中 better-scroll 是作用在外层 wrapper 容器上的，滚动的部分是 content 元素。这里要注意的是，better-scroll 只处理容器（wrapper）的第一个子元素（content）的滚动，其它的元素都会被忽略。

最简单的初始化代码如下：

```js
import BScroll from 'better-scroll'
let wrapper = document.querySelector('.wrapper')
let scroll = new BScroll(wrapper)
```

better-scroll 提供了一个类，实例化的第一个参数是一个原生的 DOM 对象。当然，如果传递的是一个字符串，better-scroll 内部会尝试调用 querySelector 去获取这个 DOM 对象，所以初始化代码也可以是这样：

```js
import BScroll from 'better-scroll'
let scroll = new BScroll('.wrapper')
```

## 滚动原理

很多人已经用过 better-scroll，我收到反馈最多的问题是：

> better-scroll 初始化了， 但是没法滚动。

不能滚动是现象，我们得搞清楚这其中的根本原因。在这之前，我们先来看一下浏览器的滚动原理： 浏览器的滚动条大家都会遇到，当页面内容的高度超过视口高度的时候，会出现纵向滚动条；当页面内容的宽度超过视口宽度的时候，会出现横向滚动条。也就是当我们的视口展示不下内容的时候，会通过滚动条的方式让用户滚动屏幕看到剩余的内容。

better-scroll 也是一样的原理，我们可以用一张图更直观的感受一下：

![布局](pic\betterscroll\scroll-4.png)

绿色部分为 wrapper，也就是父容器，它会有**固定的高度**。黄色部分为 content，它是父容器的**第一个子元素**，它的高度会随着内容的大小而撑高。那么，当 content 的高度不超过父容器的高度，是不能滚动的，而它一旦超过了父容器的高度，我们就可以滚动内容区了，这就是 better-scroll 的滚动原理。

## better-scroll 在 MVVM 框架的应用

我之前写过一篇[当 better-scroll 遇见 Vue](https://zhuanlan.zhihu.com/p/27407024)，也希望大家投稿，分享一下 better-scroll 在其它框架下的使用心得。

一款超赞的基于 Vue 实现的组件库 [cube-ui](https://github.com/didi/cube-ui/)。

## better-scroll 在实战项目中的运用

如果你想学习 better-scroll 在实战项目中的运用，也可以去学习我的 2 门实战课程。

[Vue.js 高仿外卖饿了么实战课程](https://coding.imooc.com/class/74.html)

[项目演示地址](http://ustbhuangyi.com/sell/)

![二维码](E:\web\notes\pic\betterscroll\qr)

[Vue.js 音乐 App 高级实战课程](http://coding.imooc.com/class/107.html)

[项目演示地址](http://ustbhuangyi.com/music/)

![二维码](E:\web\notes\pic\betterscroll\qr)

# 安装

## NPM

better-scroll 托管在 Npm 上，执行如下命令安装：

```
npm install better-scroll --save
```

接下来就可以在代码中引入了，[webpack](https://webpack.js.org/) 等构建工具都支持从 node_modules 里引入代码：

```js
import BScroll from 'better-scroll'
```

如果是 ES5 的语法，如下：

```js
var BScroll = require('better-scroll')
```

## script 加载

better-scroll 也支持直接用 script 加载的方式，加载后会在 window 上挂载一个 BScroll 的对象。 

你可以直接用：`https://unpkg.com/better-scroll/dist/bscroll.min.js` 这个地址。也可以把 dist 目录下的文件拷贝出去发布到自己的 cdn 服务器。

# 选项 / 基础

better-scroll 支持很多参数配置，可以在初始化的时候传入第二个参数，比如：

```js
let scroll = new BScroll('.wrapper',{
    scrollY: true,
    click: true
})
```

这样就实现了一个纵向可点击的滚动效果。better-scroll 支持的参数非常多，可以修改它们去实现更多的  feature。通常你可以不改这些参数（列出不建议修改的参数），better-scroll 已经为你实现了最佳效果，接下来我们来列举  better-scroll 支持的参数。

## startX

- 类型：Number,
- 默认值：0
- 作用：横轴方向初始化位置。

## startY

- 类型：Number,
- 默认值：0
- 作用：纵轴方向初始化位置，见 [Demo](https://ustbhuangyi.github.io/better-scroll/#/examples/vertical-scroll) 。

## scrollX

- 类型：Boolean
- 默认值: false
- 作用：当设置为 true 的时候，可以开启横向滚动。
- 备注：当设置 [eventPassthrough](https://ustbhuangyi.github.io/better-scroll/doc/zh-hans/options.html#eventpassthrough) 为 'horizontal' 的时候，该配置无效。

## scrollY

- 类型：Boolean
- 默认值：true
- 作用：当设置为 true 的时候，可以开启纵向滚动。
- 备注：当设置 [eventPassthrough](https://ustbhuangyi.github.io/better-scroll/doc/zh-hans/options.html#eventpassthrough) 为 'vertical' 的时候，该配置无效。

## freeScroll

- 类型：Boolean
- 默认值：false
- 作用：有些场景我们需要支持横向和纵向同时滚动，而不仅限制在某个方向，这个时候我们只要设置 `freeScroll` 为 true 即可。
- 备注：当设置 [eventPassthrough](https://ustbhuangyi.github.io/better-scroll/doc/zh-hans/options.html#eventpassthrough) 不为空的时候，该配置无效。

## directionLockThreshold

- 类型：Number
- 默认值：5（不建议修改）
- 作用：当我们需要锁定只滚动一个方向的时候，我们在**初始滚动**的时候根据横轴和纵轴滚动的绝对值做差，当差值大于 `directionLockThreshold` 的时候来决定滚动锁定的方向。
- 备注：当设置 [eventPassthrough](https://ustbhuangyi.github.io/better-scroll/doc/zh-hans/options.html#eventpassthrough) 的时候，`directionLockThreshold` 设置无效，始终为 0。

## eventPassthrough

- 类型： String
- 默认值：''
- 可选值：'vertical'、'horizontal'
- 作用：有时候我们使用 better-scroll 在某个方向模拟滚动的时候，希望在另一个方向保留原生的滚动（比如轮播图，我们希望横向模拟横向滚动，而纵向的滚动还是保留原生滚动，我们可以设置 `eventPassthrough` 为 vertical；相应的，如果我们希望保留横向的原生滚动，可以设置`eventPassthrough`为 horizontal）。
- 备注：`eventPassthrough` 的设置会导致其它一些选项配置无效，需要小心使用它。

## click

- 类型：Boolean
- 默认值：false
- 作用：better-scroll 默认会阻止浏览器的原生 click 事件。当设置为 true，better-scroll 会派发一个 click 事件，我们会给派发的 event 参数加一个私有属性 `_constructed`，值为 true。

## dblclick(v1.12.0+)

- 类型：Boolean | Object

- 默认值：false

- 作用：派发双击点击事件。当配置成 true 的时候，默认 2 次点击的延时为 300 ms，如果配置成对象可以修改 

  ```
  delay
  ```

  。

  ```js
  dblclick: {
    delay: 300
  }
  ```

## tap

- 类型：Boolean | String
- 默认值：false
- 作用：因为 better-scroll 会阻止原生的 click 事件，我们可以设置 tap 为 true，它会在区域被点击的时候派发一个 tap 事件，你可以像监听原生事件那样去监听它，如 `element.addEventListener('tap', doSomething, false);`。如果 tap 设置为字符串, 那么这个字符串就作为自定义事件名称。如 `tap: 'myCustomTapEvent'`。

## bounce

- 类型：Boolean | Object

- 默认值：true

- 作用：当滚动超过边缘的时候会有一小段回弹动画。设置为 true 则开启动画。

  ```js
  bounce: {
    top: true,
    bottom: true,
    left: true,
    right: true
  }
  ```

  自 1.10.0 版本以后，

  ```
  bounce
  ```

   可以支持关闭某些边的回弹效果，可以设置对应边的 

  ```
  key
  ```

   为 false 即可。

## bounceTime

- 类型：Number
- 默认值：800（单位ms，不建议修改）
- 作用：设置回弹动画的动画时长。

## momentum

- 类型：Boolean
- 默认值：true
- 作用：当快速在屏幕上滑动一段距离的时候，会根据滑动的距离和时间计算出动量，并生成滚动动画。设置为 true 则开启动画。

## momentumLimitTime

- 类型：Number
- 默认值：300（单位ms，不建议修改）
- 作用：只有在屏幕上快速滑动的时间小于 `momentumLimitTime`，才能开启 momentum 动画。

## momentumLimitDistance

- 类型：Number
- 默认值：15（单位px，不建议修改）
- 作用：只有在屏幕上快速滑动的距离大于 `momentumLimitDistance`，才能开启 momentum 动画。

## swipeTime

- 类型：Number
- 默认值：2500（单位ms，不建议修改）
- 作用：设置 momentum 动画的动画时长。

## swipeBounceTime

- 类型：Number
- 默认值：500（单位ms，不建议修改）
- 作用：设置当运行 momentum 动画时，超过边缘后的回弹整个动画时间。

## deceleration

- 类型：Number
- 默认值：0.0015（不建议修改）
- 作用：表示 momentum 动画的减速度。

## flickLimitTime

- 类型：Number
- 默认值：200（单位ms，不建议修改）
- 作用：有的时候我们要捕获用户的轻拂动作（短时间滑动一个较短的距离）。只有用户在屏幕上滑动的时间小于 `flickLimitTime` ，才算一次轻拂。

## flickLimitDistance

- 类型：Number
- 默认值：100（单位px，不建议修改）
- 作用：只有用户在屏幕上滑动的距离小于 `flickLimitDistance` ，才算一次轻拂。

## resizePolling

- 类型：Number
- 默认值：60（单位ms，不建议修改)
- 作用：当窗口的尺寸改变的时候，需要对 better-scroll 做重新计算，为了优化性能，我们对重新计算做了延时。60ms 是一个比较合理的值。

## probeType

- 类型：Number
- 默认值：0
- 可选值：1、2、3
- 作用：有时候我们需要知道滚动的位置。当 probeType 为 1 的时候，会非实时（屏幕滑动超过一定时间后）派发[scroll 事件](https://ustbhuangyi.github.io/better-scroll/doc/zh-hans/events.html#scroll)；当 probeType 为 2 的时候，会在屏幕滑动的过程中实时的派发 scroll 事件；当 probeType 为 3  的时候，不仅在屏幕滑动的过程中，而且在 momentum 滚动动画运行过程中实时派发 scroll 事件。如果没有设置该值，其默认值为  0，即不派发 scroll 事件。

## preventDefault

- 类型：Boolean
- 默认值：true
- 作用：当事件派发后是否阻止浏览器默认行为。这个值应该设为 true，除非你真的知道你在做什么，通常你可能用到的是 [preventDefaultException](https://ustbhuangyi.github.io/better-scroll/doc/zh-hans/options.html#preventdefaultexception)。

## preventDefaultException

- 类型：Object
- 默认值：`{ tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/}`
- 作用：better-scroll 的实现会阻止原生的滚动，这样也同时阻止了一些原生组件的默认行为。这个时候我们不能对这些元素做 preventDefault，所以我们可以配置 preventDefaultException。默认值 `{tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/}`表示标签名为 input、textarea、button、select 这些元素的默认行为都不会被阻止。
- 备注：这是一个非常有用的配置，它的 key 是 DOM 元素的属性值，value 可以是一个正则表达式。比如我们想配一个 class 名称为 test 的元素，那么配置规则为 `{className:/(^|\s)test(\s|$)/}`。

## HWCompositing

- 类型：Boolean
- 默认值：true（不建议修改）
- 作用：是否开启硬件加速，开启它会在 scroller 上添加 `translateZ(0)` 来开启硬件加速从而提升动画性能，有很好的滚动效果。
- 备注：只有支持硬件加速的浏览器开启才有效果。

## useTransition

- 类型：Boolean
- 默认值：true（不建议修改）
- 作用：是否使用 CSS3 transition 动画。如果设置为 false，则使用 requestAnimationFrame 做动画。
- 备注：只有支持 CSS3 的浏览器开启才有效果。

## useTransform

- 类型：Boolean
- 默认值：true（不建议修改）
- 作用：是否使用 CSS3 transform 做位移。如果设置为 false, 则设置元素的 `top/left` (这种情况需要 scroller 是绝对定位的)。
- 备注：只有支持 CSS3 的浏览器开启才有效果。

## bindToWrapper

- 类型：Boolean
- 默认值：false
- 作用：move 事件通常会绑定到 document 上而不是滚动的容器上，当移动的过程中光标或手指离开滚动的容器滚动仍然会继续，这通常是期望的。当然你也可以把 move 事件绑定到滚动的容器上，`bindToWrapper` 设置为 true 即可，这样一旦移动的过程中光标或手指离开滚动的容器，滚动会立刻停止。

## disableMouse

- 类型：Boolean
- 默认值：根据当前浏览器环境计算而来（不建议修改）
- 作用：当在移动端环境（支持 touch 事件），disableMouse 会计算为 true，这样就不会监听鼠标相关的事件，而在 PC 环境，disableMouse 会计算为 false，就会监听鼠标相关事件，不建议修改该属性，除非你知道你在做什么。

## disableTouch

- 类型：Boolean
- 默认值：根据当前浏览器环境计算而来（不建议修改）
- 作用：当在移动端环境（支持 touch 事件），disableTouch 会计算为 false，这样会监听 touch 相关的事件，而在 PC 环境，disableTouch 会计算为 true，就不会监听 touch 相关事件。不建议修改该属性，除非你知道你在做什么。

## observeDOM(v1.5.3+)

- 类型：Boolean
- 默认值：true
- 作用：会检测 scroller 内部 DOM 变化，自动调用 refresh  方法重新计算来保证滚动的正确性。它会额外增加一些性能开销，如果你能明确地知道 scroller 内部 DOM 的变化时机并手动调用  refresh 重新计算，你可以把该选项设置为 false。

## autoBlur(v1.7.0+)

- 类型：Boolean
- 默认值：true
- 作用：在滚动之前会让当前激活的元素（input、textarea）自动失去焦点。

## stopPropagation(v1.9.0+)

- 类型：Boolean
- 默认值：false
- 作用：是否阻止事件冒泡。多用在嵌套 scroll 的场景。



# 选项 / 高级

better-scroll 还支持一些高级配置，来实现一些特殊的 feature。

## wheel

- 类型：Boolean | Object

- 默认值：false

- 作用：这个配置是为了做 Picker 组件用的，默认为 false，如果开启则需要配置一个 Object。

  ```js
  wheel:{
    selectedIndex: 0,
    rotate: 25,
    adjustTime: 400,
    wheelWrapperClass: 'wheel-scroll',
    wheelItemClass: 'wheel-item',
    wheelDisabledItemClass: 'wheel-disabled-item' // version 1.15.0 支持
  }
  ```

- 备注：这是一个高级的配置，一般场景不需要配置，具体应用场景可见 [Picker Demo](https://ustbhuangyi.github.io/better-scroll/#/examples/picker/zh) 。想了解更多的细节可以去看 example 中的 [picker](https://github.com/ustbhuangyi/better-scroll/blob/master/example/components/picker/picker.vue) 组件的代码。

  **注意**：

  1.如果配置为 Object 的时候，`wheelWrapperClass` 和 `wheelItemClass` 必须对应于你的实例 `better-scroll` 的 `wrapper` 类名和 `wrapper` 内的子类名。二者的默认值是 "`wheel-scroll`"/"`wheel-item`"，如果你不配置或者配置的名称和你对应DOM节点的类名不一致的话会导致一个问题：滚动起来的时候点击一下终止滚动并不会触发 `scrollEnd` 事件，进而影响诸如城市选择器联动数据的这种组件的结果。

  2.`wheelDisabledItemClass` 是用于配置禁止选中某选项的样式类名。better-scroll 实例上的属性 `selectedIndex` 是表示当前选中项的索引，如果你配置的选项都是禁止选中的状态，那么 `selectedIndex` 一直保持为 -1。我们是参照 [Web select 标签](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/select) 的交互实现的。

## snap

- 类型：Boolean | Object

- 默认值：false

- 作用：这个配置是为了做 Slide 组件用的，默认为 false，如果开启则需要配置一个 Object，例如：

  ```js
  snap: {
   loop: false,
   threshold: 0.1,
   stepX: 100,
   stepY: 100,
   easing: {
     style: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
     fn: function(t) {
       return t * (2 - t)
     }
   }
  }
  ```

  注意：

  ```
  loop
  ```

   为 true 是为了支持循环轮播，但只有一个元素的时候，

  ```
  loop
  ```

   为 true 是无效的，也并不会 clone 节点。

  ```
  threshold
  ```

   表示可滚动到下一个的阈值，

  ```
  easing
  ```

   表示滚动的缓动函数。

- 备注：这是一个高级的配置，一般场景不需要配置，具体应用场景可见 [Slide Demo](https://ustbhuangyi.github.io/better-scroll/#/examples/slide/en) 。想了解更多的细节可以去看 example 中的 [slide](https://github.com/ustbhuangyi/better-scroll/blob/master/example/components/slide/slide.vue) 组件的代码。

## scrollbar

- 类型：Boolean | Object

- 默认值：false

- 作用：这个配置可以开启滚动条，默认为 false。当设置为 true 或者是一个 Object 的时候，都会开启滚动条，例如：

  ```js
  scrollbar: {
   fade: true,
   interactive: false // 1.8.0 新增
  }
  ```

  ```
  fade
  ```

   为 true 表示当滚动停止的时候滚动条是否需要渐隐，

  ```
  interactive
  ```

   表示滚动条是否可以交互。 见 

  Demo

   。了解更多的细节可以去看 example 中的 

  scroll

   组件代码。

## pullDownRefresh

- 类型：Boolean | Object

- 默认值：false

- 作用：这个配置用于做下拉刷新功能，默认为 false。当设置为 true 或者是一个 Object 的时候，可以开启下拉刷新，例如：

  ```js
  pullDownRefresh: {
    threshold: 50,
    stop: 20
  }
  ```

  可以配置顶部下拉的距离（

  ```
  threshold
  ```

  ） 来决定刷新时机以及回弹停留的距离（

  ```
  stop
  ```

  ）。当下拉刷新数据加载完毕后，需要执行 

  `finishPullDown`

   方法。见 

  Demo

   。 了解更多的细节可以去看 example 中的 

  scroll

   组件代码。

## pullUpLoad

- 类型：Boolean | Object

- 默认值：false

- 作用：这个配置用于做上拉加载功能，默认为 false。当设置为 true 或者是一个 Object 的时候，可以开启上拉加载，例如：

  ```js
  pullUpLoad: {
    threshold: 50
  }
  ```

  可以配置离（

  ```
  threshold
  ```

  ）来决定开始加载的时机。当上拉加载数据加载完毕后，需要执行 

  `finishPullUp`

   方法。见 

  Demo

   。 了解更多的细节可以去看 example 中的 

  scroll

   组件代码。

## mouseWheel(v1.8.0+)

- 类型：Boolean | Object

- 默认值：false

- 作用：这个配置用于 PC 端的鼠标滚轮，默认为 false，。当设置为 true 或者是一个 Object 的时候，可以开启鼠标滚轮，例如：

  ```js
  mouseWheel: {
   speed: 20,
   invert: false,
   easeTime: 300
  }
  ```

  ```
  speed
  ```

   表示鼠标滚轮滚动的速度，

  ```
  invert
  ```

   为 true 表示滚轮滚动和时机滚动方向相反，

  ```
  easeTime
  ```

   表示滚动动画的缓动时长，见

  Demo

  。

## zoom(v1.11.0+)

- 类型：Boolean | Object

- 默认值：false

- 作用：这个配置用于对滚动内容的缩放，默认为 false。当设置为 true 或者是一个 Object 的时候，可以开启缩放，例如：

  ```js
  zoom: {
   start: 1,
   min: 1,
   max: 4
  }
  ```

  ```
  start
  ```

   表示开始的缩放比例，

  ```
  min
  ```

   表示最小缩放比例，

  ```
  max
  ```

   表示最大缩放比例。

## infinity(v1.12.0+)

- 类型：Boolean | Object

- 默认值：false

- 作用：该配置的使用场景是长列表滚动或者是无限滚动，默认为 false。如果开启需要配置成一个对象，实现 3 个函数，例如：

  ```js
  infinity: {
    fetch(count) {
       // 获取大于 count 数量的数据，该函数是异步的，它需要返回一个 Promise。
       // 成功获取数据后，你需要 resolve 数据数组（也可以 resolve 一个 Promise）。
       // 数组的每一个元素是列表数据，在 render 方法执行的时候会传递这个数据渲染。
       // 如果没有数据的时候，你可以 resolve(false)，来告诉无限滚动列表已经没有更多数据了。
    }
    render(item, div) {
       // 渲染每一个元素节点，item 是数据，div 是包裹元素节点的容器。
       // 该函数需要返回渲染后的 DOM 节点。
    },
    createTombstone() {
      // 返回一个墓碑 DOM 节点。
    }
  }
  ```

  具体的示例代码可以

  参考这里

  ，对应的演示 

  demo

  。 infinity 的实现参考了

  这篇文章

  ，并在此基础上加入了滚动结束的能力。 注意：除非你有大量的数据渲染需求，否则使用普通的滚动即可。



# 方法 / 通用

better-scroll 提供了很多灵活的 API，当我们基于 better-scroll 去实现一些 feature 的时候，会用到这些 API，了解他们会有助于开发更加复杂的需求。

## refresh()

- 参数：无
- 返回值：无  
- 作用：重新计算 better-scroll，当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常。

## scrollTo(x, y, time, easing)

- 参数：
  - {Number} x 横轴坐标（单位 px）
  - {Number} y 纵轴坐标（单位 px）
  - {Number} time 滚动动画执行的时长（单位 ms）
  - {Object} easing 缓动函数，一般不建议修改，如果想修改，参考源码中的 ease.js 里的写法
- 返回值：无  
- 作用：滚动到指定的位置，见 [Demo](https://ustbhuangyi.github.io/better-scroll/#/examples/vertical-scroll/zh) 。  

## scrollBy(x, y, time, easing)

- 参数：
  - {Number} x 横轴距离（单位 px）
  - {Number} y 纵轴距离（单位 px）
  - {Number} time 滚动动画执行的时长（单位 ms）
  - {Object} easing 缓动函数，一般不建议修改，如果想修改，参考源码中的 ease.js 里的写法
- 返回值：无  
- 作用：相对于当前位置偏移滚动 x,y 的距离。

## scrollToElement(el, time, offsetX, offsetY, easing)

- 参数：
  - {DOM | String} el 滚动到的目标元素, 如果是字符串，则内部会尝试调用 querySelector 转换成 DOM 对象。
  - {Number} time 滚动动画执行的时长（单位 ms）
  - {Number | Boolean} offsetX 相对于目标元素的横轴偏移量，如果设置为 true，则滚到目标元素的中心位置
  - {Number | Boolean} offsetY 相对于目标元素的纵轴偏移量，如果设置为 true，则滚到目标元素的中心位置
  - {Object} easing 缓动函数，一般不建议修改，如果想修改，参考源码中的 ease.js 里的写法
- 返回值：无  
- 作用：滚动到指定的目标元素。

## stop()

- 参数：无
- 返回值：无
- 作用：立即停止当前运行的滚动动画。

## enable()

- 参数：无
- 返回值：无
- 作用：启用 better-scroll, 默认 开启。

## disable()

- 参数：无
- 返回值：无
- 作用：禁用 better-scroll，DOM 事件（如 touchstart、touchmove、touchend）的回调函数不再响应。

## destroy()

- 参数：无
- 返回值：无
- 作用：销毁 better-scroll，解绑事件。

## on(type, fn, context)

- 参数：

  - {String} type 事件名
  - {Function} fn 回调函数
  - {context} 函数执行的上下文环境，默认是 this

- 返回值：无

- 作用：监听当前实例上的[自定义事件](https://ustbhuangyi.github.io/better-scroll/doc/zh-hans/events.html)。如：scroll, scrollEnd, pullingUp, pullingDown等。

- 示例：

  ```javascript
  import BScroll from 'better-scroll'
  let scroll = new BScroll('.wrapper')
  function onScroll(pos) {
    console.log(`Now position is x: ${pos.x}, y: ${pos.y}`)
  }
  scroll.on('scroll', onScroll)
  ```

## once(type, fn, context)

- 参数：
  - {String} type 事件名
  - {Function} fn 回调函数
  - {context} 函数执行的上下文环境，默认是 this
- 返回值：无
- 作用：监听一个自定义事件，但是只触发一次，在第一次触发之后移除监听器。

## off(type, fn)

- 参数：

  - {String} type 事件名
  - {Function} fn 回调函数

- 返回值：无

- 作用：移除自定义事件监听器。只会移除这个回调的监听器。

- 示例：

  ```javascript
  import BScroll from 'better-scroll'
  let scroll = new BScroll('.wrapper', {
    pullUpLoad: true
  })
  function onPullingUp() {
    console.log('pullingup success!')
  }
  scroll.on('pullingUp', onPullingUp) // 添加pullingup事件回调onPullingUp
  ...
  scroll.off('pullingUp', onPullingUp) // 移除pullingup事件回调onPullingUp
  ...
  ```



# 方法 / 定制

better-scroll 还提供了一些定制的方法，专门用来实现某一个 feature 所用。

## goToPage(x, y, time, easing)

- 参数
  - {Number} x 横轴的页数
  - {Number} y 纵轴的页数
  - {Number} time 动画执行的时间
  - {Object} easing 缓动函数，一般不建议修改，如果想修改，参考源码中的 ease.js 里的写法
- 返回值：无
- 作用：当我们做 slide 组件的时候，slide 通常会分成多个页面。调用此方法可以滚动到指定的页面。

## next(time, easing)

- 参数：
  - {Number} time 动画执行的时间
  - {Object} easing 缓动函数，一般不建议修改，如果想修改，参考源码中的 ease.js 里的写法
- 返回值：无
- 作用：滚动到下一个页面

## prev(time, easing)

- 参数：
  - {Number} time 动画执行的时间
  - {Object} easing 缓动函数，一般不建议修改，如果想修改，参考源码中的 ease.js 里的写法
- 返回值：无
- 作用：滚动到上一个页面

## getCurrentPage()

- 参数：无
- 返回值：{Object} `{ x: posX, y: posY,pageX: x, pageY: y}` 其中，x 和 y 表示偏移的坐标值，pageX 和 pageY 表示横轴方向和纵轴方向的页面数。
- 作用：获取当前页面的信息。

## wheelTo(index)

- 参数：
  - {Number} index 索引值
- 返回值：无
- 作用：当我们做 picker 组件的时候，调用该方法可以滚动到索引对应的位置。

## getSelectedIndex()

- 参数：无
- 返回值：{Number} 当前选中的索引值。
- 作用：获取当前选中的索引值。

## finishPullDown()

- 参数：无
- 返回值：无
- 作用：当下拉刷新数据加载完毕后，需要调用此方法告诉 better-scroll 数据已加载。

## openPullDown(config) (v1.9.0+)

- 参数：
  - {Object} config，参考 `pullDownRefresh` 的配置，默认为 true。
- 返回值：无
- 作用：动态开启下拉刷新功能。

## closePullDown() (v1.9.0+)

- 参数：无
- 返回值：无
- 作用：动态关闭下拉刷新功能。

## autoPullDownRefresh() (v1.14.0)

- 参数：无
- 返回值：无
- 作用：自动触发下拉刷新。

## finishPullUp()

- 参数：无
- 返回值：无
- 作用：当上拉加载数据加载完毕后，需要调用此方法告诉 better-scroll 数据已加载。

## openPullUp(config) (v1.9.0+)

- 参数：
  - {Object} config，参考 `pullUpLoad` 的配置，默认为 true。
- 返回值：无
- 作用：动态开启上拉加载功能。

## closePullUp() (v1.9.0+)

- 参数：无
- 返回值：无
- 作用：动态关闭上拉加载功能。

## zoomTo(scale, x, y) (v1.12.0+)

- 参数:
  - `{Number} scale`, 缩放大小.
  - `{Number} x`, 缩放原点的横坐标, 相对于整个文档的左边距。
  - `{Number} y`, 缩放原点的纵坐标, 相对于整个文档的上边距。
- 返回值: 无
- 作用: 将滚动体缩放到指定的大小。



# 事件

better-scroll 除了提供了丰富的 API 调用，还提供了一些事件，方便和外部做交互。你可以利用他们实现一些更高级的 feature。

## beforeScrollStart

- 参数：无
- 触发时机：滚动开始之前。

## scrollStart

- 参数：无
- 触发时机：滚动开始时。

## scroll

- 参数：{Object} {x, y} 滚动的实时坐标
- 触发时机：滚动过程中，具体时机取决于选项中的 [probeType](https://ustbhuangyi.github.io/better-scroll/doc/zh-hans/options.html#probetype)。

## scrollCancel

- 参数：无
- 触发时机：滚动被取消。

## scrollEnd

- 参数：{Object} {x, y} 滚动结束的位置坐标
- 触发时机：滚动结束。

## touchEnd

- 参数：{Object} {x, y} 位置坐标
- 触发时机：鼠标/手指离开。

## flick

- 参数：无
- 触发时机：轻拂时。

## refresh

- 参数: 无
- 触发时机：refresh 方法调用完成后。

## destroy

- 参数：无
- 触发时机：destroy 方法调用完成后。

## pullingDown

- 参数：无
- 触发时机：在一次下拉刷新的动作后，这个时机一般用来去后端请求数据。

## pullingUp

- 参数：无
- 触发时机：在一次上拉加载的动作后，这个时机一般用来去后端请求数据。

## zoomStart

- 参数：无
- 触发时机：缩放开始时。

## zoomEnd

- 参数：无
- 触发时机：缩放结束后。



# 属性

有时候我们想基于 better-scroll 做一些扩展，需要对 better-scroll 的一些属性有所了解，下面介绍几个常用属性。

## x

- 类型：Number
- 作用：scroll 横轴坐标。

## y

- 类型：Number
- 作用：scroll 纵轴坐标。

## maxScrollX

- 类型：Number
- 作用：scroll 最大横向滚动位置。
- 备注：scroll 横向滚动的位置区间是 0 - maxScrollX，并且 maxScrollX 是负值。

## maxScrollY

- 类型：Number
- 作用：scroll 最大纵向滚动位置。
- 备注：scroll 纵向滚动的位置区间是 0 - maxScrollY，并且 maxScrollY 是负值。

## movingDirectionX

- 类型：Number
- 作用：判断 scroll 滑动过程中的方向（左右）。
- 备注：-1 表示从左向右滑，1 表示从右向左滑，0 表示没有滑动。

## movingDirectionY

- 类型：Number
- 作用：判断 scroll 滑动过程中的方向（上下）。
- 备注：-1 表示从上往下滑，1 表示从下往上滑，0 表示没有滑动。  

## directionX

- 类型：Number
- 作用：判断 scroll 滑动结束后相对于开始滑动位置的方向（左右）。
- 备注：-1 表示从左向右滑，1 表示从右向左滑，0 表示没有滑动。

## directionY

- 类型：Number
- 作用：判断 scroll 滑动结束后相对于开始滑动位置的方向（上下）。
- 备注：-1 表示从上往下滑，1 表示从下往上滑，0 表示没有滑动。

## enabled

- 类型：Boolean,
- 作用：判断当前 scroll 是否处于启用状态。

## isInTransition

- 类型：Boolean,
- 作用：判断当前 scroll 是否处于滚动动画过程中。
- 备注：当开启 CSS3 Transition 动画时判断该值。

## isAnimating

- 类型：Boolean,
- 作用：判断当前 scroll 是否处于滚动动画过程中。
- 备注：当开启 JS Animation 动画时判断该值。