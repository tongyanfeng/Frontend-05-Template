#### 简单语句
ExpressionStatement 表达式语句
EmptyStatement 空语句
DebuggerStatement debugger 关键字
ThrowStatement 抛出一个异常
ContinueStatement 循环语句
BreakStatement 循环语句
ReturnStatement 

复合语句
BlockStatement
IfStatement
SwitchStatement
IterationStatement
WidthStatement
LableStatement
TryStatement try catch finally

block
    [[type]]: normal
    [[value]]:
    [[target]]:

Iteration
while\do while\for(;;)\for(in)\for(of)\for await(of)
    var\const,let\in

标签、循环、break、continue
LabelledStatement
IterationStatement
ContinueStatement
BreakStatement
SwitchStatement
    [[type]]: break continue
    [[value]]: --
    [[target]]: label

try 
    [[type]]: return
    [[value]]: --
    [[target]]: label