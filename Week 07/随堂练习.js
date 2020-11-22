// session 2
function StringToNumber(string, num = 10){
  return parseInt(string, num) || 'type error'
}

function NumberToString(number, num = '') {
  return number.toString(num) || 'change error'
}

console.log(NumberToString(100, 2));
