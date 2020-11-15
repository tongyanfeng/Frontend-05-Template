#### 字面值、运行时的类值

#### Atom
##### Grammar 最小元素
1. Literal
2. Variable
3. Keywords
4. Whitespace
5. Line Terminator
###### Runtime
1. Types
2. Execution Context

###### Types 
Number、String、Boolean、Object、Null、
Undefined、Symbol、BigInt

1. Number （IEEE 754 Double Float）
   1个符号位，11个指数位，52个浮点位
    符号位 0 + 、1 - 
  *ps* 0 .toString()

  0.1 + 0.2 为什么不等于0.3 ？ 因为他 number 本身的表达方式，浮点，回损失一定的精度，尾巴会损失一个e，所以，就导致失精

2. String
   1. Cahracter
   2. Code Point
   3. Encoding
    a  =》 97  =》 01100001
  ASCII -- only Engilsh
  Unicode -- 全世界的编码粘到了一起，庞大的编码集
  UCS
  GB 国标
  ISO-8859
  BIG5
  把一个 string 所代表的字节给转换出来
```
  function UTF8_Encoding(string) {
    // return new Buffer()
    var bytes = new Array(); 
    var len,c;
    len = str.length;
    for(var i = 0; i < len; i++){
      c = str.charCodeAt(i);
      if(c >= 0x010000 && c <= 0x10FFFF){
        bytes.push(((c >> 18) & 0x07) | 0xF0);
        bytes.push(((c >> 12) & 0x3F) | 0x80);
        bytes.push(((c >> 6) & 0x3F) | 0x80);
        bytes.push((c & 0x3F) | 0x80);
      }else if(c >= 0x000800 && c <= 0x00FFFF){
        bytes.push(((c >> 12) & 0x0F) | 0xE0);
        bytes.push(((c >> 6) & 0x3F) | 0x80);
        bytes.push((c & 0x3F) | 0x80);
      }else if(c >= 0x000080 && c <= 0x0007FF){
        bytes.push(((c >> 6) & 0x1F) | 0xC0);
        bytes.push((c & 0x3F) | 0x80);
      }else{
        bytes.push(c & 0xFF);
      }
    }
    return bytes;
  }
```
###### Grammer
用正则的形式去匹配 单引号 和 双引号的 字符串写法

反引号 ``
`ab${x}abc${y}abc`

javascript 引擎实际解析

`ab${
}abc${
}abc`

被括起来之外的才是字符串本体，被括起来的是 javascript 语法

3. Boolean 
   1. true、false 都是关键字
4. Null & Undefined
   1. null
   2. undefined
   3. void 0 来代替 undefined，void 后面无论接什么，都会返回 undefiend。一定来代替 undefined，一般写成 undefined ，因为大家都这么写 ^_^
   

5. Object、Symbol
   所有任何一个对象都是唯一的，这与他本身的状态无关
   所以，即使状态完全一致的两个对象，也并不相等
   我们用状态来描述对象
   我们状态的改变即是行为
  1. state、identifier、behavior
  2. class - 归类、分类两个流派
     1. 对于“归类”方法而言，多继承是非常自然的事情
     2. 采用“分类”思想的计算机语言，则是反继承机构，并且会有一个基类Object
  3. Prototype
  4. Exercise 在设计对象的状态和行为时，我们总是遵循“行为改变状态”的原则
class Human {
  hurt(damage) {
    // ...
  }
}

class Dog {
  attack() {

  }
}
  5. javascript 中的 Object
     1. 数据属性 - value、writable、enumerable、configurable - 描述状态
     2. 访问属性 - get、set、enumerable、configurable - 描述行为
  6. Function Object

javascript 标准里面所有具有特殊行为的对象