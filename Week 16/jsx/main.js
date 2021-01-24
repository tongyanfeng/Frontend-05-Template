import { createElement } from './framework'
import { Carousel } from './carousel'
import { Timeline, Animation} from './animation'
import {Button} from './Button'
import {List} from './List'
let d = [
  {
    img: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimage.biaobaiju.com%2Fuploads%2F20190624%2F14%2F1561356377-VgnumPGEHU.jpg&refer=http%3A%2F%2Fimage.biaobaiju.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1612847775&t=40efc4fcbd7fe799ae5ffc4b2f805614',
    url: 'https://time.geekbang.org',
    title: 1
  },
  {
    img: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.58cdn.com.cn%2Fzhuanzh%2Fn_v2850b843dc4d1496482ba5ea79ff3c6a2.jpg&refer=http%3A%2F%2Fpic1.58cdn.com.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1612847775&t=df4a8257cac167ec5428a49b8b2b0bac',
    url: 'https://time.geekbang.org',
    title: 2
  },
  {
    img: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic2.zhimg.com%2Fv2-4dc17e02e469a32d60b79a535277001c_1440w.jpg&refer=http%3A%2F%2Fpic2.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1612847775&t=712286c1becf2109ba02d762a5bc9491',
    url: 'https://time.geekbang.org',
    title: 3
  },
  {
    img: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F9%2F53605fc6be05e.jpg&refer=http%3A%2F%2Fpic1.win4000.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1612847775&t=a81b2abddb22391526b48e8cb06f50b7',
    url: 'https://time.geekbang.org',
    title: 4
  }
]

// let a = <Carousel src={d} />
// let a = <Button>
//   content
// </Button>
let a = <List data={d}>
{
  (record) => 
    <div>
      <img src={record.img} />
      <a href={record.url}>{record.title}</a>
    </div>
}
</List>
a.mountTo(document.body)
