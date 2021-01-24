export class Dispatcher {
  constructor(element) {
    this.element = element
  }
  dispatch(type, properties) {
    let event = new Event(type)
    for (let name in properties) {
      event[name] = properties[name]
    }
    this.element.dispatchEvent(event)
  }
}
// listen=>recognize=>dispatch

// new Listener(new Recognizer(dispatch))

export class Listener {
  constructor(element, recognizer) {
    let element = document.documentElement
    let isListeningMouse = false

    let contexts = new Map()

    element.addEventListener("mousedown", event => {

      // event.button 01234

      let context = Object.create(null)
      contexts.set("mouse"+ ( 1 << event.button), context)

      recognizer.start(event, context)

      let mousemove = event => {
        let button = 1

        while(button <= event.buttons) {
          if (button & event.buttons) {
            // 这里是由于 中键 和 右键 的属性相反
            // order of buttons & button property is not same
            let key
            if (button === 2) {
              key =4
            }
            if (button === 4) {
              key = 2
            } else {
              key = button
            }

            let context = contexts.get("mouse"+ key)
            recognizer.move(event, context)
            button = button << 1
          }
        }

      }
      let mouseup = event => {
        let context = contexts.get("mouse"+ ( 1 << event.button))
        recognizer.end(event, context)
        contexts.delete("mouse" + (1 << event.button))
        if (event.buttons === 0) {
          document.removeEventListener("mousemove", mousemove)
          document.removeEventListener("mouseup", mouseup)
          isListeningMouse = false
        }
      }
      if (!isListeningMouse) {
        document.addEventListener("mousemove", mousemove)
        document.addEventListener("mouseup", mouseup)
        isListeningMouse = true
      }
    })
    element.addEventListener("touchstart", event => {
      for (let touch of event.changedTouches) {
        let context = Object.create(null)
        contexts.set(touch.identifier, context)
        recognizer.start(touch, context)
      }
    })

    element.addEventListener("touchmove", event => {
      for (let touch of event.changedTouches) {
        contexts.get(touch.identifier, context)
        recognizer.move(touch)
      }
    })

    element.addEventListener("touchend", event => {
      for (let touch of event.changedTouches) {
        contexts.get(touch.identifier, context)
        recognizer.end(touch)
      }
    })

    // 被打断，例如弹窗等，就不会直接执行 end，来执行 cancel
    element.addEventListener("touchcancel", event => {
      for (let touch of event.changedTouches) {
        recognizer.cancel(touch)
      }
    })
  }
}

export class Recognizer {
  constructor(dispatcher) {
    this.dispatcher = dispatcher
  }
  start(point, context) {

    context.startX = point.clientX
    context.startY = point.clientY
    this.dispatcher.dispatch("start", {
      startX: context.startX,
      startY: context.startY
    })

    context.points = [{
      t: Date.now(),
      x: point.clientX,
      y: point.clientY
    }]
    context.isTap = true
    context.isPan = false
    context.isPress = false
  
    context.handler = setTimeout(() => {
      context.isTap = false
      context.isPan = false
      context.isPress = true
      context.handler = null
      console.log("pressStart");
      this.dispatcher.dispatch("press", {})
    }, 500)
  }
  move(point, context) {
    let dx = point.clientX - context.startX
    let dy = point.clientY - context.startY
  
    if (!context.isPan && dx ** 2 + dy ** 2 > 100) {
  
      context.isTap = false
      context.isPan = true
      context.isPress = false
      context.isVertical = Math.abx(dx) < Math.abx(dy)
      console.log("pan start");
      this.dispatcher.dispatch("panStart", {
        startX: context.startX,
        startY: context.startY,
        clientX: point.clientX,
        clientY: point.clientY,
        isVertical: context.isVertical
      })
      clearTimeout(context.handler)
    }
  
    if (context.isPan) {
      console.log("Pan:", dx, dy);
      this.dispatcher.dispatch("Pan", {
        startX: context.startX,
        startY: context.startY,
        clientX: point.clientX,
        clientY: point.clientY,
        isVertical: context.isVertical
      })
    }
  
    context.points = context.points.filter(point => Date.now() - point.t < 500)
  
    context.points.push({
      t: Date.now(),
      x: point.clientX,
      y: point.clientY
    })
  }
  end(point, context) {
    if (context.isTap) {
      this.dispatcher.dispatch("tap", {})
      clearTimeout(context.handler)
    }
  
    if (context.isPress) {
      console.log("pressend");
      this.dispatcher.dispatch("pressend", {})
      clearTimeout(context.handler)
    }
    context.points = context.points.filter(point => Date.now() - point.t < 500)
    
    let d, v
    if (!context.points.length) {
      v = 0
    } else {
      d = Math.sqrt((point.clientX - context.points[0].x) ** 2 + 
      (point.clientY - context.points[0].y) ** 2)
    
      v = d / (Date.now() - context.points[0].t)
    }
    console.log(162,'-------', v);
    if (v > 1.5) {
      console.log("flick");
      this.dispatcher.dispatch("flick", {
        startX: context.startX,
        startY: context.startY,
        clientX: point.clientX,
        clientY: point.clientY,
        isVertical: context.isVertical,
        isFlick: context.isFlick,
        velocity: v
      })
      context.isFlick = true
    } else {
      context.isFlick = false
    }

    if (context.isPan) {
      console.log("pan end");
      this.dispatcher.dispatch("panEnd", {
        startX: context.startX,
        startY: context.startY,
        clientX: point.clientX,
        clientY: point.clientY,
        isVertical: context.isVertical,
        isFlick: context.isFlick,
        velocity: v
      })
    }

    this.dispatcher.dispatch("end", {
      startX: context.startX,
      startY: context.startY,
      clientX: point.clientX,
      clientY: point.clientY,
      isVertical: context.isVertical,
      isFlick: context.isFlick,
      velocity: v
    })
  }
  cancel (point, context) {
    clearTimeout(context.handler)
    this.dispatcher.dispatch("cancel", {})
  }
}

export function enableGesture(element) {
  new Listener(element, new Recognizer(new dispatcher(element)))
}