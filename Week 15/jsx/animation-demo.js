import { Timeline, Animation} from './animation'
import { ease } from './ease'
let tl = new Timeline()
tl.start()


tl.add(new Animation(document.querySelector("#el").style, "transform", 0, 500, 3000, 0, ease, v => `translateX(${v}px)`))
// window.tl = tl

document.querySelector('#pause-btn').addEventListener("click", () => tl.pause())
document.querySelector('#resume-btn').addEventListener("click", () => tl.resume())
// window.animation = new Animation({ set a(v) {console.log(v);}}, "a", 0, 100, 1000, null)