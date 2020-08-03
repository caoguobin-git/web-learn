# LayUI笔记

## 一、引言

### 1.1 介绍

> 官网：https://www.layui.com
>
> 在官网的首页，可以很方便的下载LayUI

> LayUI是一款经典模块化前端UI框架，只需要定义简单的HTML、CSS、JS即可实现很复杂的前端效果。
>
> 使得前端页面的制作变得更加简单

## 二、环境搭建

### 2.1 下载

> 官网即可完成下载。

### 2.2 导入依赖

> * 下载的LayUI压缩包解压缩后，将其中的layui目录导入项目中。
> * 将layui目录放到项目的webapp目录下
> * 在JSP中导入layui依赖

~~~jsp
<!-- 示例代码 -->
<link rel="stylesheet" href="layui/css/layui.css">
<script src="layui/layui.js"></script>
~~~

## 三、页面元素

### 3.1 布局

> 响应式格栅布局，每行分12等分。

~~~html
<!-- 示例代码 -->
<!-- layui-container居中显示有固定尺寸；layui-fluid占满行宽 -->
<!-- <div class = "layui-container"> -->
<div class="layui-fluid">
    <div class="layui-row">
        <div class="layui-col-md9 layui-col-lg6 layui-bg-orange">
            你的内容9/12
        </div>
        <div class="layui-col-md3 layui-col-lg6 layui-bg-gray">
            你的内容3/12
        </div>

        <%-- 移动设备、平板、桌面端的不同展现 --%>
        <div class="layui-col-xs6 layui-col-sm6 layui-col-md4 layui-col-lg3">
            移动6/12  |  平板6/12  |  桌面4/12
        </div>
        <div class="layui-col-xs6 layui-col-sm6 layui-col-md4 layui-col-lg3">
            移动6/12  |  平板6/12  |  桌面4/12
        </div>
        <div class="layui-col-xs4 layui-col-sm12 layui-col-md4 layui-col-lg3">
            移动4/12  |  平板12/12  |  桌面4/12
        </div>
        <div class="layui-col-xs4 layui-col-sm7 layui-col-md8 layui-col-lg3">
            移动4/12  |  平板7/12  |  桌面8/12
        </div>
        <div class="layui-col-xs4 layui-col-sm5 layui-col-md4 layui-col-lg3">
            移动4/12  |  平板5/12  |  桌面4/12
        </div>
    </div>
</div>
~~~

