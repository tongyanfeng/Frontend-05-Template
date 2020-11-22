Type Convertion
a + b
"false" == false 最复杂的类型转换
a[o] = 1

##### Unboxing 拆箱转换 
是指我们把一个 object 转成一个普通的类型
1. ToPremitive
2. toString vs valueOf
3. Symbol.toPrimitive
   
1.1 对象上会有三份方法影响到 toPremitive 的过程
```javascript
var o = {
  toString() { return "2" }
  valueOf() { return 1 }
  [Symbol.toPrimitive]() { return 3}
}
```
ps: 当存在最后一种的时候，前两种都会被忽略。

``` javascript
console.log("x" + o)
```
加法 + 在运算的时候，就算有字符串的时候，都会优先调用 valueOf 这个方法，返回 1
如果没有 valueOf 的方法，就会去执行 toString。

``` javascript
var x = {}
x[o] = 1
```
o 作为属性名时候，他会优先去调用 toString 方法，返回 

##### Boxing 装箱转换
``` javascript
 // Number
 new Number(1) // 1
 // String
 new String("a") // a
 // Boolean
 new Boolean(true) // true
 // Symbol
 new Object(Symbol("a") // Symbol("a") 不可以直接 new Symbol，会报错
```
我们使用 Member 也就是，使用点或者是方括号去访问属性的时候，如果访问到的属性得到的
是一个基础类型，会自动调用这个装箱的过程，不需要再去调用构造器

##### Exercise
1. StringToNumber：能解析4种进制类型的String 来转换成 Number
2. NumberToString 传一个进制，来指定要转换成几进制的字符串

```javascript
// 二进制 以 0 开头，或者是 0b，数字非 0 即 1
// 八进制 以 0 开头，数值会在 0～7之间
// 十进制
// 十六进制 以 0 开头，0x
StringToNumber(string, num = 10) {
  return parseInt(string, num) || 'type error'
}

NumberToString(number, num = '') {
  return number.toString(num) || 'change error'
}
```