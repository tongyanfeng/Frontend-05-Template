let http = require('http');
let https = require('https');
let fs = require('fs')
let unzipper = require('unzipper')
let queryString = require('querystring')

// 2. auth 的路由：允许我们接收 code，用 code + id + secret 换 token
function auth (request, response) {
  let query = queryString.parse(request.url.match(/^\/auth\?([\s\S]+)/)[1])
  // console.log(query);
  getToken(query.code, function(info) {
    response.write(JSON.stringify(info))
    response.write(`<a href='http://localhost:8083/?token=${info.access_token}'>publish</a>`)
    response.end()
  })
}
function getToken(code, callback) {
  let request = https.request({
    hostname: 'github.com',
    path: '/login/oauth/access_token?code='+ code + '&client_id=' + 'Iv1.620db63433128d21' + '&client_secret=' + '58f0cf2d3b84842ac3953ecdc0f025cb05923cfe',
    // path: `/login/oauth/access_token?code=${code}&client_id=${Iv1.620db63433128d21}&client_secret=${58f0cf2d3b84842ac3953ecdc0f025cb05923cfe}`,
    port: 443,
    method: 'POST'
  }, function(response) {
    console.log(response);
    let body = ''
    response.on('data', chunk => {
      console.log(chunk.toString());
      body += (chunk.toString())
    })
    response.on('end', chunk => {
      callback(queryString.parse(body))
    })
  })
  request.end()
}
function getUser(token, callback) {
  let request = https.request({
    hostname: 'api.github.com',
    path: '/user',
    port: 443,
    method: 'GET',
    headers: {
      Authorization: `token ${token}`,
      "User-Agent": "toy-publish-mercury"
    }
  }, function(response) {
    console.log(response);
    let body = ''
    response.on('data', chunk => {
      console.log(chunk.toString());
      body += (chunk.toString())
    })
    response.on('end', chunk => {
      callback(JSON.parse(body))
    })
  })
  request.end()
}

// 4. publish 路由：用 token 获取用户信息，检查权限，接收发布
function publish (request, response) {

  let query = queryString.parse(request.url.match(/^\/publish\?([\s\S]+)/)[1])
  
  getUser(query.token, info => {
    // 这里正常是需要接一个权限系统
    if (info.name === "xxxx") {
      request.pipe(unzipper.Extract({ path: '../server/public/'}))
      request.on('end', function() {
        response.end('success!')
      })
    }
  })

}


http.createServer(function(request, response) {
  if (request.url.match(/^\/auth\?/)) {
    return auth(request, response)
  }
  if (request.url.match(/^\/publish\?/)) {
    return publish(request, response)
  }
}).listen(8082)





// http.createServer(function(request, response) {
//   // let outFile = fs.createWriteStream("../server/public/index.html")
//   // request.pipe(outFile)

//   // let outFile = fs.createWriteStream("../server/public/tmp.zip")
//   request.pipe(unzipper.Extract({ path: '../server/public/'}))
//   // request.on('data', chunk =>{
//   //   console.log(chunk.toString());
//   //   outFile.write(chunk)
//   // })
//   // request.on('end', chunk =>{
//   //   outFile.end()
//   //   response.end("Success")
//   // })
// }).listen(8082)