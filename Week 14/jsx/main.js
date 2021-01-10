import { Component, createElement } from './framework'

class Carousel extends Component {
  constructor() {
    // this.root = document.createElement("div")
    super();
    this.attributes = Object.create(null)
  }
  setAttribute(name, value) {
    this.attributes[name] = value
  }
  render() {
    // console.log(this.attributes.src);
    this.root = document.createElement("div")
    this.root.classList.add('carousel')
    for (let record of this.attributes.src) {
      let child = document.createElement("div")
      child.style.backgroundImage = `url('${record}')`
      // child.style.display = "none"
      this.root.appendChild(child)
    }

    let position = 0

    this.root.addEventListener("mousedown", event => { 
      let startX = event.clientX
      //  startY = event.clientY
      let children = this.root.children
      let move = evnt => {
        // event.clientX, event.clientY
        let x = event.clientX - startX
        // let y = event.clientY - startY

        let current = position - ((x - x % 500) / 500)

        for (let offset of [-2, -1, 0, 1, 2]) {
          let pos = current + offset
          pos = ( pos + children.length ) % children.length
          
          children[pos].style.transition = "none"
          children[pos].style.transform = `translateX(${- pos * 500 + offset * 500 + x % 500}px)`
        }

        // for (let child of children) {
        //   child.style.transition = "none"
        //   child.style.transform = `translateX(${- position * 500 + x}px)`
        // }
      }

      let up = event => {
        let x = event.clientX - startX
        position = position - Math.round(x / 500)

        for (let offset of [0, -Math.sign(Math.round(x / 500) - x + 250 * Math.sign(x))]) {
          let pos = position + offset
          pos = ( pos + children.length ) % children.length
          
          children[pos].style.transition = "none"
          children[pos].style.transform = `translateX(${- pos * 500 + offset * 500}px)`
        }

        // for (let child of children) {
        //   child.style.transition = ""
        //   child.style.transform = `translateX(${- position * 500}px)`
        // }


        document.removeEventListener("mousemove", move)
        document.removeEventListener("mouseup", up)
      }

      document.addEventListener("mousemove", move)

      document.addEventListener("mouseup", up)


      // this.root.addEventListener("mousemove", event => {
        
      // })
      // this.root.addEventListener("mouseup", event => {
        
      // })
    })
    // let currentIndex = 0
    // setInterval(() => {
    //   let children = this.root.children
    //   let nextIndex = (currentIndex + 1) % children.length
    //   // ++current
    //   let current = children[currentIndex]
    //   let next  = children[nextIndex]

    //   next.style.transition = "none"
    //   next.style.transform = `translateX(${100 - nextIndex * 100}%)`
      
    //   setTimeout(() => {
    //     next.style.transition = ""
    //     current.style.transform = `translateX(${-100 - currentIndex * 100}%)`
    //     next.style.transform = `translateX(${- nextIndex * 100}%)`
    //     currentIndex = nextIndex
    //   }, 16)
      
    //   // for (let child of children) {
    //   //   child.style.transform = `translateX(-${current * 100}%)`
    //   // }
    // }, 3000)

    return this.root
  }

  mountTo(parent) {
    parent.appendChild(this.render())
  }
}

for (let i of [1, 2, 3]) {
  console.log(i);
}

let d = [
  "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimage.biaobaiju.com%2Fuploads%2F20190624%2F14%2F1561356377-VgnumPGEHU.jpg&refer=http%3A%2F%2Fimage.biaobaiju.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1612847775&t=40efc4fcbd7fe799ae5ffc4b2f805614",
  "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.58cdn.com.cn%2Fzhuanzh%2Fn_v2850b843dc4d1496482ba5ea79ff3c6a2.jpg&refer=http%3A%2F%2Fpic1.58cdn.com.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1612847775&t=df4a8257cac167ec5428a49b8b2b0bac",
  "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic2.zhimg.com%2Fv2-4dc17e02e469a32d60b79a535277001c_1440w.jpg&refer=http%3A%2F%2Fpic2.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1612847775&t=712286c1becf2109ba02d762a5bc9491",
  "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F9%2F53605fc6be05e.jpg&refer=http%3A%2F%2Fpic1.win4000.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1612847775&t=a81b2abddb22391526b48e8cb06f50b7"
]

let a = <Carousel src={d} />
a.mountTo(document.body)
