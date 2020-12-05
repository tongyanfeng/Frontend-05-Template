// 加入状态机

const EOF = Symbol("EOF") // EOF: end of file
let currentToken = null

function emit(token) {
  console.log(token);
  if(token.tyoe === "text") {
    return
  }
  let top = stack[stack.length -1]

  if (token.type == 'startTag') {
    let element = {
      type: 'element',
      children: [],
      attributes: []
    }

    element.tagName = token.tagName

    for(let p in token) {
      if (p != "type" && p != "tagName") {
        element.attributes.push({
          name: p,
          value: token[p]
        })
      }
    }

    top.children.push(element)
    element.parent = top

    if (!token.isSelfClosing) {
      stack.push(element)
    }
    currentTextNode = null

  } else if (token.type == 'endTag') {
    if (top.tagName != token.tagName) {
      throw new Error("Tag start end doesn't match!")
    } else {
      stack.pop()
    }
    currentTextNode = null
  }
}

function data(c) {
  if (c == "<") {
    return tagOpen // 标签开始
  } else if(c == EOF) {
    emit({
      type: 'EOF'
    })
    return
  } else {
    emit({
      type: 'text',
      content: c
    })
    return data
  }
}

function tagOpen(c) {
  if (c == '/') {
    return endTagOpen
  } else if (c.match(/^[a-zA-Z]&/)) {
    currentToken = {
      type: 'startTag',
      tagName: ''
    }
    return tagName(c)
  } else {
    return
  }
}

function endTagOpen(c) {
  if (c.match(/^[a-zA-Z]&/)) {
    currentToken = {
      type: 'endTag',
      tagName: ''
    }
    return tagName(c)
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
    currentToken.tagName += c
    return selfClosingStartTag // 后面接了正斜杠 <html/> 那么就是一个自封闭标签 
  } else if (c.match(/^[a-zA-Z]&/)) {
    return tagName
  } else if (c == '>') { // 普通的一个开始标签
    emit(currentToken)
    return data
  } else {
    return tagName
  }
}

function beforeAttributeName(c) {
  if(c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName
  } else if(c == "/" || c == ">" || c == EOF) {
    return afterAttributeName(c)
  } else if (c == "=") {
    // return beforeAttributeName

  } else {
    // return beforeAttributeName
    currentAttribute = {
      name: "",
      value: ""
    }
    return attributeName(c)
  }
}

function attributeName(c) {
  if (c.match(/^[\t\n\f ]$/) || c == '/' || c == ">" || c == EOF) {
    return afterAttributeName(c)
  } else if (c == "=") {
    return beforeAttributeValue;
  } else if (c == "\u0000") {

  } else if (c == "\"" || c == "'" || c == "<") {

  } else {
    currentAttribute.name += c
    return attributeName
  }
}

function beforeAttributeValue(c) {
  if (c.match(/^[\t\n\f ]$/) || c == '/' || c == '>' || c == EOF) {
    return beforeAttributeValue
  } else if (c == "\"") {
    return doubleQuoteAttributeValue
  } else if (c == "\'") {
    return singleQuoteAttributeValue
  } else if (c == ">") {

  } else {
    return UnquotedAttributeValue(c)
  }
}
function doubleQuoteAttributeValue(c) {
  if (c == "\"") {
    currentToken[currentAttribute.name] = currentAttribute.value
    return afterQuotedAttributeValue
  } else if (c == "\u0000") {

  } else if (c == EOF) {

  } else {
    currentAttribute.value += c
    return doubleQuoteAttributeValue
  }
}

function singleQuoteAttributeValue(c) {
  if (c =="\'") {
    currentToken[currentAttribute.name] = currentAttribute.value
    return
  } else if(c == "\u0000") {

  } else if (c ==EOF) {

  } else {
    currentAttribute.value += c
    return doubleQuoteAttributeValue
  }
}
function afterQuotedAttributeValue(c) {
  if(c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName
  } else if (c == "/") {
    return selfClosingStartTag
  } else if (c == ">") {
    currentToken[currentAttribute.name] = currentAttribute.value
    emit(currentToken)
    return data
  } else if(c == EOF) {

  } else {
    currentAttribute.value += c
    return doubleQuoteAttributeValue
  }
}
function UnquotedAttributeValue(c) {
  if(c.match(/^[\t\n\f ]$/)) {
    currentToken[currentAttribute.name] = currentAttribute.value
    return beforeAttributeName
  } else if (c == "/") {
    currentToken[currentAttribute.name] = currentAttribute.value
  } else if (c == ">") {
    currentToken[currentAttribute.name] = currentAttribute.value
    emit(currentToken)
    return data
  } else if(c == "\u0000") {

  } else if (c == "\"" || c == "'" || c == "<" || c == "=" || c == "`") {

  } else if (c == EOF) {

  } else {
    currentAttribute.value += c
    return UnquotedAttributeValue
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

// next：接下来处理属性