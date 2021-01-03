#### 1.重学HTML|HTML的定义：XML与SGML
HTML呢，有一定的继承关系，主要的源流来自于 XML 和 SGML。
$npsp non-breaking space
会用这个来代替空格，但其实它来代替空格问题很多。在这个词链接之后呢，并不把单词分开，会把两个词连成一个词。在排版的时候会出现分词的问题。

*****
转义
1. quot 双引号
2. amp & 符
3. lt 小于号
4. gt 大于号
这些符号如果直接写在 html 里面，会直接抛错。
***** 

#### 2.重学HTML|HTML标签语义
```html

<html>
  <body>
    <title></title>
  </body>
</html>

语义标签：
<aside></aside>
<title></title>
<article></article>
<main></main>
<hgroup>
<h1></h1>
<h2></h2>
</hgroup>
<br/> <!-- 代表着，一个语义切换的一个念 -->
<abbr></abbr> 表示一个缩写

<!-- 强调标签 -->
<strong> <!-- 表示喝这个词在整个文章中的一个重要性的一个场景，不改变语义 -->
<em></em> <!-- 表示这个词在这个句子里面的重音是什么，存在改变语义的情况 -->
<figure> <!-- 标签组 -->
<figcaption>

<pre>
<samp>
<code>

<footer>
```

#### 3.重学HTML|HTML语法
##### 1. 合法元素
Element: <tagname>...</tagname> 元素
Text: text 文本节点
Comment: <!-- comments --> 注释
DocumentType: <!Doctype html> html5 只有一个
ProcessingInstruction: <?a 1?> 预处理语法
CDATA: <![CDATA[ ]]> 特殊的语法，产生的是文本节点

##### 2. 字符引用
&#161;
&amp;
&lt;
&quot;
