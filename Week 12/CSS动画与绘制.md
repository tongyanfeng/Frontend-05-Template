#### 7.CSS动画与绘制|动画
css 控制表现，主要有三种内容，第一类，控制元素的位置和尺寸的信息；第二类就是控制绘制和最后实际渲染出来的信息；第三类就是有一些交互与动画的信息。

1. Animation
   1. @keyframes定义
   2. animation: 使用 

```html
<style>
  @keyframes mykf
  {
    from {background; red;}
    to {background: yellow;}
  }
  div {
    animation: mykf 5s infinite;
  }
</style>
<div style="width: 100px;height: 100px;">

</div>
```

属性：
animation-name 时间曲线
animation-duration 动画的时长
animation-timing-function 动画的时间曲线
animation-delay 动画开始前的延迟
animation-iteration-count 动画的播放次数
animation-direction 动画的方向

@keyframes 可以使用百分比，也可以使用 from to

2 Transition
属性：
transition-property 要变换的属性
transition-duration 变换的时长
transition-timing-function 时间曲线
transition-delay 延迟
 
* timing-function
  来自于一个三次贝塞尔曲线，所有的都与这个相关。（cubic-bezier.com）

#### 8.CSS动画与绘制|颜色
我们看到的大部分的光，都是混合光

非常重要的颜色表示法：HSL与HSV
H色相
S纯度
L亮度
V明度

#### 9.CSS动画与绘制|绘制
1. 绘制
   1. 几何图形
      1. border
      2. box-shadow
      3. border-radius
   2. 文字
      1. font
      2. text-decoration
   3. 位图
      1. background-image

在浏览器的绘制中呢，是会依赖与一些图形库，例如在手机上，是依赖 Skia，在 windows依赖GDI，而更底下，是使用我们的Shader去绘制的。
应用技巧

data uri + svg


