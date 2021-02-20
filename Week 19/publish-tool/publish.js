let http = require('http')
let fs = require('fs')
let archiver = require("archiver")
let child_process = require('child_process')
let queryString = require('querystring')

// file.on('data', chunk => {
//   console.log(chunk.toString());
// })
// file.on('end', chunk => {
//   console.log('read finished');
// })

// 1. 打开 https://github.com/login/oauth/authorize
child_process.exec(`open https://github.com/login/oauth/authorize?client_id=Iv1.620db63433128d21`)
 
// 3. 创建 server，接收 token，后点击发布

http.createServer(function(request, response) {
  let query = queryString.parse(request.url.match(/^\/\?([\s\S]+)/)[1])
  publish(query)
}).listen(8083)

function publish(token) {
  let request = http.request({
    hostname: "127.0.0.1",
    port: 8082,
    method: "POST",
    path: "/publish?token=" + token,
    headers: {
      'Content-Type': 'application/octet-stream',
      // "Content-Length": stats.size
    }
  }, response => {
    console.log(response);
  })
  let file = fs.createReadStream("./sample.html")
  
  const archive = archiver('zip', {
    zlib: { level: 9 }
  })
  archive.directory('./sample/', false)
  
  archive.finalize()
  
  archive.pipe(request)
}
/*

*/
// file.pipe(request)

// file.on('end', () => request.end()) 




// fs.stat("./sample.html", (err, stats) => {
//   let request = http.request({
//     hostname: "127.0.0.1",
//     port: 8082,
//     method: "POST",
//     headers: {
//       'Content-Type': 'application/octet-stream',
//       "Content-Length": stats.size
//     }
//   }, response => {
//     console.log(response);
//   })
//   let file = fs.createReadStream("./sample.html")
  
//   file.pipe(request)
  
//   file.on('end', () => request.end()) 
//   // file.on('data', chunk => {
//   //   console.log(chunk.toString());
//   //   request.write(chunk)
//   // })
//   // file.on('end', chunk => {
//   //   console.log('read finished');
//   //   request.end(chunk)
//   // })
  
//   // request.end()
// })
