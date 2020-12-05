// 加入状态机

const EOF = Symbol("EOF") // EOF: end of file

function data(c) {
  if (c == "<") {
    return tagOpen // 标签开始
  } else if(c == EOF) {
    return
  } else {
    return data
  }
}

function tagOpen(c) {
  if (c == '/') {
    return endTagOpen
  } else if (c.match(/^[a-zA-Z]&/)) {
    return tagName(c)
  } else {
    return
  }
}

function endTagOpen(c) {
  if (c.match(/^[a-zA-Z]&/)) {
    return tagName
  } else if (c == ">") {
    // 报错
  } else if (c == EOF) {
    // 报错
  } else {

  }
}
function tagName(c) {
  if(c.match(/^[\t\n\f ]&/)) { // 其中存在空格，eg. <html props 空格之后接属性的状态
    return beforeAttributeName
  } else if (c == '/') {
    return selfClosingStartTag // 后面接了正斜杠 <html/> 那么就是一个自封闭标签 
  } else if (c.match(/^[a-zA-Z]&/)) {
    return tagName
  } else if (c == '>') { // 普通的一个开始标签
    return data
  } else {
    return tagName
  }
}

function beforeAttributeName(c) {
  if(c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName
  } else if(c == ">") {
    return data
  } else if (c == "=") {
    return beforeAttributeName
  } else {
    return beforeAttributeName
  }
}
// 在这之前已经分析到了 / 这个字符，那么后面只有接 > 才是有效字符，其他都报错
function selfClosingStartTag(C) {
  if (c == ">") {
    currentToken.isSelfClosing = true
    return data
  } else if (c == 'EOF') {

  } else {

  }
}

modeul.exports.parseHTML = function parseHTML(html) {
  console.log(html);
  let state = data
  for (let c of data) {
    state = state(c)
  }
   state = state(EOF)
}

// next：如何在状态机的流程里面，在适当的位置插入我们的计算，求出我们想要的 token？