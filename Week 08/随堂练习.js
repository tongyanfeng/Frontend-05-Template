// session 3
// 找到 字符 a
function find(str) {
  let aCode = str.indexOf('a')
  return aCode
}

console.log(find('qweertadsdgad'));
// teach
function match(string) {
  for(let c of string) {
    if (c == 'a') return true
  }
  return false
}
match("i am groot")

// session 4
// 找到 字符 a
function findAB(str) {
  let aCode = str.indexOf('ab')
  return aCode > -1
}

console.log(findAB('i ab groot ab'));

// teach
function matchab(string) {
  let foundA = false

  for(let c of string) {
    if (c == 'a') {
      foundA = true
    } else if (foundA && c == 'b') {
      return true
    } else {
      foundA = false
    }
  }
  return false
}

//session 5
function matchaTof(string) {
  let foundA = false
  let foundB = false
  let foundC = false
  let foundD = false
  let foundE = false

  for(let c of string) {
    if (c == 'a') {
      foundA = true
    } else if (foundA && c == 'b') {
      foundB = true
    } else if (foundB && c == 'c') {
      foundC = true
    } else if (foundC && c == 'd') {
      foundD = true
    } else if (foundD && c == 'e') {
      foundE = true
    } else if (foundE && c == 'f') {
      return true
    } else {
      foundA = false
      foundB = false
      foundC = false
      foundD = false
      foundE = false
    }
  }
  return false
}
console.log(matchaTof('abdcdef'));
// teach same

