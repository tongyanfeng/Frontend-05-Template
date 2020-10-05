
function sleep(t) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, t)
  })
}
async function* counter() {
  let i = 0 
  while (true) {
    await sleep(100)
    yield i++
  } 
}

(async function () {
  for await(let v of counter()) {
    console.log(v);
  }
})()