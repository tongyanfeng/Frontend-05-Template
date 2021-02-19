let http = require('http');


http.createServer(function(req, res) {
  console.log(req);
  res.end("hello world!!")
}).listen(8082)