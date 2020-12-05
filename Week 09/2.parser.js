// 加入状态机

const EOF = Symbol("EOF") // EOF: end of file

function data(c) {

}

modeul.exports.parseHTML = function parseHTML(html) {
  console.log(html);
  let state = data
  for (let c of data) {
    state = state(c)
  }
   state = state(EOF)
}