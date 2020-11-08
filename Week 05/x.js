let object = {
  a: 1,
  b: 2
}

let po = reactive(object)

let callbacks = new Map()

let reactivties = new Map()

let usedReacticties = []

function reactive() {
  if (reactivties.has(object)) {
    return reactivties.get(object)
  }

  let proxy = new Proxy(object, {
    set(obj, prop, val) {
      obj[prop] = val
      if(callbacks.get(obj)) {
        if(callbacks.get(obj).get(prop)) {
          for (let callback of callbacks.get(obj).get(prop)) {
            callback()
          }
        }
      }
      // for(let callback of callbacks) {
      //   callback()
      // }
      return obj[prop]
    },
    get(obj, prop) {
      usedReacticties.push([obj, prop])
      if (typeof obj[prop] === "object") {
        return reactive(obj[prop])
      }
      return obj[prop]
    }
  })

  reactivties.set(object, proxy)

  return proxy
}
function effect(callback) {
  // callbacks.push(callback)
  usedReacticties = []
  callback()

  for (let reactivity of usedReacticties) {
    if(!callbacks.has(reactivity[0])) {
      callbacks.set(reactivity[0], new Map())
    }

    if(!callbacks.get(reactivity[0]).has(reactivity[1])) {
      callbacks.get(reactivity[0]).set(reactivity[1], [])
    }

    callbacks.get(reactivity[0]).get(reactivity[1]).push(callback)
  }
}
effect(() => {
  console.log('effect');
})