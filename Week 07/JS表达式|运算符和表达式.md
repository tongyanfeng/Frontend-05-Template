Atom
1. 语法树跟运算符优先级的关系
2. 运算符左值和右值的区别


Gammar
1. Grammar Tree vs Priority
   1. + -
   2. * /
   3. ()

  1.1 Member Expressions
    Member 运算 a.b,a[b],foo`string`,super.b,super['b'], new Target, new Foo()
    New new Foo
  1.2 Reference
    Object\Key
    delete\assign
  1.3 Call Expressions
    Call foo()\super(),foo()['b'],foo().b,foo()`abc`
  ps: 语法结构所能表达的内容是要多于运算符优先级所能表达的。
2. Left hand side & Right hand side
  2.1 Left Handside & Right Handside 
    left handside 怎么来的，就是通过能不能放到等号左边的语义来决定
  2.2 Right handside Expressions 优先级逐级降低
    Update a++, a--, --a, ++a
    Unary delete a.b\void foo()\ typeof a\ +a \ -a\ ~a\ !a\ await a
      ps: void 运算符，之前有提到过，就是无论后面接什么，就是返回 undefined
    Exponental ** 表示乘方 js 唯一一个右结合的运算符
    Multiplicative * / %
    Additive + -    加号有两种，一种是数字加，一种是字符串加
    Shift << >> >>>
    Relationship < > <= >= instanceof in 
    Equality == != === !==
    Bitwise & ^ | 
    Logical && || 会存在一个短路原则
    Conditional  ? : 唯一一个三位运算符 也存在短路逻辑
Runtime
1. Type Convertion
2. Reference