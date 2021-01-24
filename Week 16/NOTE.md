学习笔记
#### children的设计
##### 内容型children
  所有内容往里面塞，都显示出来
##### 模板型children
  放进children 里面的，不是真正的children，是一个模板。在jsx的机制里面是由区分的，在其他的机制里面可能是不区分的。
jsx 的模板型 children 是通过在children 里面放一个函数的形式去实现的。普通的children，直接写