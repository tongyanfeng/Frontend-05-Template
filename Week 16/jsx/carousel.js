import { Component, STATE, ATTRIBUTE} from './framework.js'
import {enableGesture} from './gesture.js'
import {Timeline, Animation} from "./animation.js"
import {ease} from './ease.js'

export {STATE, ATTRIBUTE} from './framework.js'

export class Carousel extends Component {
  constructor() {
    super();
  }
  render() {
    this.root = document.createElement("div")
    this.root.classList.add('carousel')
    for (let record of this[ATTRIBUTE].src) {
      let child = document.createElement("div")
      child.style.backgroundImage = `url('${record.img}')`
      this.root.appendChild(child)
    }

    enableGesture(this.root)
    let timeline = new Timeline()
    timeline.start()
 
    let handler = null

    let children = this.root.children

    this[ATTRIBUTE].posiiton = 0
    let t = 0

    let ax = 0

    this.root.addEventListener("start", event => {
      timeline.pause()
      clearInterval(handler)
      if (Date.now() - t < 1500) {
        let progress = (Date.now() - t) / 1500
        ax = ease(progress) * 500 - 500
      } else {
        ax = 0
      }
      // ax = ease(progress) * 500 - 500
    })

    this.root.addEventListener("tap", event => {
      this.triggerEvent("click", {
        position: this[STATE].posiiton,
        data: this[ATTRIBUTE].src[this[STATE].posiiton]
      })
    })

    this.root.addEventListener("pan", event => {
      let x = event.clientX - event.startX - ax
      let current = this[ATTRIBUTE].posiiton - ((x - x % 500) / 500)

      for (let offset of [-2, -1, 0, 1, 2]) {
        let pos = current + offset
        pos = ( pos % children.length + children.length ) % children.length
        
        children[pos].style.transition = "none"
        children[pos].style.transform = `translateX(${- pos * 500 + offset * 500 + x % 500}px)`
      }
    })

    this.root.addEventListener("end", event => {
      timeline.reset()
      timeline.start()
      handler = setInterval(nextPicture, 3000)

      let x = event.clientX - event.startX - ax
      let current = this[ATTRIBUTE].posiiton - ((x - x % 500) / 500)
      let direction = Math.round((x % 500) / 500)

      if(event.isFlick) {
        if (event.velocity < 0) {
          direction = Math.cell((x % 500) / 500)
        } else {
          direction = Math.floor((x % 500) / 500)
        }
      }

      for (let offset of [-2, -1, 0, 1, 2]) {
        let pos = current + offset
        pos = ( pos % children.length + children.length ) % children.length
        
        children[pos].style.transition = "none"

        timeline.add(new Animation(children[pos].style, "transform",
              - pos * 500 + offset * 500 + x % 500,
              - pos * 500 + offset * 500 + direction * 500,
              500, 0, ease, v => `translateX(${v}px)`))

      }

      this[ATTRIBUTE].posiiton = this[ATTRIBUTE].posiiton - ((x - x % 500) / 500) - direction
      this[ATTRIBUTE].posiiton = (posiiton % children.length + children.length ) % children.length

      this.triggerEvent("change", {position: this[ATTRIBUTE].posiiton})

    })
    let nextPicture = () => {
      let children = this.root.children
      let nextPosition = (this[ATTRIBUTE].posiiton + 1) % children.length
      // ++current
      let current = children[this[ATTRIBUTE].posiiton]
      let next  = children[nextPosition]

      t = Date.now()

      timeline.add(new Animation(current.style, "transform", - this[ATTRIBUTE].posiiton * 500, -500 - this[ATTRIBUTE].posiiton * 500, 500, 0, ease, v => `translateX(${v}px)`))
      timeline.add(new Animation(next.style, "transform", 500 - nextPosition * 500, - nextPosition * 500, 500, 0, ease, v => `translateX(${v}px)`))
      
      this[ATTRIBUTE].posiiton = nextPosition

      this.triggerEvent("change", {position: this[ATTRIBUTE].posiiton})
    }
    handler = setInterval(nextPicture, 3000)
    return this.root
  }

}
