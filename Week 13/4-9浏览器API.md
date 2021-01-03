#### 1. 浏览器API|DOM API
分成了4个部分
traversal系列 API（这部分是废的，可以去访问DOM树所有的节点的一个自动的迭代工具）、 节点部分、事件部分、Range API（强大，理解复杂）

都继承来自于 Node 的类
1. Element 元素的节点、开始标签、结束标签
   1. HTMLElement
   2. SVGElement
2. Document 根节点
3. CharacterData 文本节点，注释节点，还有前面讲过的 PorcessingInstaucrion、CDATA
4. DocumentFragment 文档片段，他没有办法挂到任何一个 DOM 树上，但是也继承了 Node 节点，也可以执行挂在 DOM 树上的操作，只不过挂的时候，会把自己所有的子节点，都塞到上面去
5. DOCTYPE

##### 导航类操作
节点导航
1. parentNode
2. childrenNodes
3. firstChild
4. lastChild
5. nextSibling
6. previousSibling
元素导航
7. parentElement
8. children
9.  firstElementChild
10. lastElementChild
11. nextElementSibling
12. previousElementSibling

##### 修改操作
appendChild 
insertBeofre(没有 insertAfter，是根据最小化Api原则，假设我们有10个自节点，insertBefore 可以插10个位置，appendChild 就可以插第11个位置，所以这两个API足够我们把节点插到任何一个位置)
removeChild（我们只能在这个元素的父元素节点上，一处这个元素。）
replaceChild

##### 高级操作
1. compareDocumentPosition 是一个用于比较两个节点中关系的函数
2. contains 检查一个节点是否包含另一个节点的函数
3. isEqualNode 检查两个节点是否完全相同
4. isSameNode 检查两个节点是否是相同一个节点，实际在 JavaScript 中可以用 “===”
5. cloneNode 负值一个节点，如果传入参数 true，则会连同子元素做深拷贝

#### 2. 浏览器API|事件 API
1. addEventListener(/事件类型/, /listener/, /[, options]/)

Event: 冒泡与捕获
先捕获，再冒泡，addEventListaner 默认的事件行为是 冒泡
eg.
``` html
<div id="a" style="width: 100%; height: 300px; background: lighrblue;">
  <div id="b" style="width: 100%;height: 200px;background: pink;">
  </div>
</div>

<script>

var a = document.getElementById('a')
var b = document.getElementById('b')
a.addEventListener("click", function() {console.log("a") })
b.addEventListener("click", function() {console.log("b") })
// b
// a

a.addEventListener("click", function() {console.log("a1") }, true)
b.addEventListener("click", function() {console.log("b1") }, true)
// a1
// b
// b1
// a
b.addEventListener("click", function() {console.log("b3") })
// a1
// b
// b1
// b3
// a
</script>
```

#### 3. 浏览器API|Range API
一个问题
把一个元素有所的自元素逆序
·1     ·5
·2     ·4
·3     ·3
·4     ·2
·5     ·1
4次插入操作，有两个考点
Dom 的 collection 是一个 living collection，就是操作的时候，取出来的 childNodes，取出来的集合会跟着变化。
元素的这些子元素，在 insert 的时候，是不需要先把他从原来的位置挪掉的。

```html
<div id="a">
  <span>1</span>
  <p>2</p>
  <a>3</a>
  <div>4</div>
</div>

<script>
  let element = document.getElementById("a")

  // eg1
  // function reverseChildren(element) {
  //   let children = Array.prototype.slice.call(element.childNodes)

  //   for (let child of children) {
  //     element.removeChild(child)
  //   }

  //   children.reserve()

  //   for (let child of children) {
  //     element.appendChild(child)
  //   }
  // }

  // eg2
  // function reverseChildren(element) {
  //   let  l = element.childNodes.length

  //   while(l-- > 0) {
  //     element.appendChildren(element.childNodes[l])
  //   }
  // }

  // eg3
  reverseChildren(element)
</script>
```
Range API
1. range.setStartBefore
2. range.setEndBefore
3. range.setStartAfter
4. range.setEndAfter
5. range.selectNode
6. range.selectNodeContents

```javascript
let fragment = range.extractContents() // 取操作,我们选取的内容，完全从dom树摘下来
range.insertNode(document.createTextNode("aaaa"))
```
let range = new Range()
range.setStart(element, 9)
range.setEnd(element, 4)
let range = document.getSelection().getRangeAt(0)
```html
<div id="a">123<span style="background:pink;">456789</span>123456789</div>

<script>
  let range = new Range()
  range.setStart(document.getElementById("a").childNodes[0], 3)
  range.setEnd(document.getElementById("a").childNodes[2], 3)
</script>
```


```html
<div id="a">
  <span>1</span>
  <p>2</p>
  <a>3</a>
  <div>4</div>
</div>

<script>
  let element = document.getElementById("a")

  function reverseChildren(element) {
    let range = new Range()
    range.selectNodeContents(element)

    let fragment = range.extractContents()

    let l = fragment.childNodes.length

    while(l-- > 0) {
      fragment.appendChild(fragment.childNodes[l])
    }

    element.appendChild(fragment)
  }
  reverseChildren(element)
</script>
```

#### 3. 浏览器API|CSSOM
##### document.styleSheets
``` html
<style title="Hello">
a::before {
  color: red;
  content: "hello"
}
</style>

<link rel="stylesheet" title="x" href="data:text/css,p%7Bcolor:blur%70">
<a> world</a>
```
##### Rules
document.styleSheets[0].cssRules
document.styleSheets[0].insertRule("p {color: pink;}", 0)
document.styleSheets[0].removeRule(0)

Rule
1. CSSStyleRule
2. CSSCharsetRule
3. CSSImportRule
4. CSSMediaRule
5. CSSFontFaceRule
6. CSSPageRule
7. CSSNamespaceRule
8. CSSKeyframesRule
9. CSSKeyframeRule
10. CSSSupportRule

1.CSSStyleRule
  1.1 selectorText String
  1.2 style K—V 结构

getComputedStyle
window.getComputedStyle(elt, pseudoElt)
elt 想要获取的元素
pseudoElt 可选，伪元素

#### 4. 浏览器API|CSSOM View
##### window
1.window.innerHeight,window.innerWidth 浏览器实际上渲染，也就是我们所用的那部分的宽高。
2. window.outerWidth, window.outerHeight
3. window.devicePixelRatio
4. window.screen
   1. window.screen.width
   2. window.screen.height
   3. window.screen.availWidth
   4. window.screen.availHeight

##### window API
1. window.open("about:blank", "blank", "width=100,height=100,left=100,right=100)
2. moveTo(x, y)
3. moveBy(x, y)
4. resizeTo(x, y)
5. resizeBy(x, y)

##### scroll
1. scrollTop
2. scrollLeft
3. scrollWidth
4. scrollHeight
5. scroll(x, y)
6. scrollBy(x, y)
7. scrollIntoView()

window
  scrollX
  scrollY
  scroll(x, y)
  scrollBy(x, y)

##### layout相关API
1. getClientRects()
2. getBoundingClientRect()


#### 4. 浏览器API|其他API
API 来源于四个标准化组织
1. khronos
   1. WebGL
2. ECMA
   1. ECMAScript
3. WHATWG
   1. HTML
4. W3C
   1. webaudio
   2. CG/WG

```js
let names = Object.getOwnPropertyNames(window)
function filterOut(names, props) {
  let set = new Set()
  props.forEach(o => set.add(o))

  return names.filter(e => !set.has(e))
}

{
  let js = new Set()
  let object = []
  object.forEach(o => js.add(o))
  names = names.filter(e => !js.has(e))
}

names = names.filter( e=> {
  try {
    return !(window[e].prototype instanceof Node)
  } catch(err) {
    return true
  }
}).filter( e => e != "Node" )

names = names.filter(e => !e.match(/^on/))

names = names.filter(e => !e.match(/^webkit/))

{
  let names = Object.getOwnPrototypeNames(window)
  let js = new Set()
  let objects = ['BigInt', 'BigInt64Array']
  object.forEach(o => js.add(o))

  names = names.filter(e => !js.has(e))

  names = names.filter(e => {
    try {
      return !(window[e].prototy instanceof Node)
    } catch (err) {
      return true
    }
  }).filter(e => e != "Node")

  let windowprops = new Set()
  objects = ["window"]
  objects.forEach(o => windowprops.add(o))
  names = names.filter(e => !windowprops.has(e))
}
{
  let interfaces = new Set()
  objects = [""]
  objects.forEach(o => interfaces.add(o))

  names = names.filter(e => !interfaces.has(e))
}

names = names.filter(e => e != "Intl")

names = filterOut(names, [""])
//
```