**** 语言按语法分类
1. 非形式语言
   1. 中英文
2. 形式语言（乔姆斯基谱系）
   0. 0型 无限制文法
   1. 1型 上下文相关文法
   2. 2型 上下文无关文法
   3. 3型 正则文法


**** 产生式（BNF）
1. 用尖括号括起来的名称来表示语法结构名
2. 语法结构粉刺基础结构和需要用其他语法结构定义的复合结构
   1. 基础结构称终结符 Terminal Symbol
   2. 复合结构称非终结符 Nonterminal Symbol 
3. 引号和中间的字符表示终结符
4. 可以有括号
5. *表示重复多次
6. |表示或
7. +表示至少一次

<MultiplicativeExpression>::=<Number>|
                <MultiplicativeExpression>"*"<Number>|
                <MultiplicativeExpression>"/"<Number>|

<AddtiveExpression>::=<MultiplicativeExpression> | <AddtiveExpression>"+"<MultiplicativeExpression> |
<AddtiveExpression>"-"<MultiplicativeExpression>|

<BracketsExpression>::=<Number>|"("<AddtiveExpression>")"|


<MultiplicativeExpression>::=<Number>|
                <MultiplicativeExpression>"*"<BracketsExpression>|
                <MultiplicativeExpression>"/"<BracketsExpression>|