var LF = require('console-winston-syslog').LoggerFactory;
var console = (new LF('Other')).logger;

var path = require('path');
var express = require('express')

var app = express()
app.use(express.static(path.join(__dirname, '../browser/public/')));

var server = app.listen(3333, function () {
  var host = server.address().address
  var port = server.address().port
  console.notice('Example app listening at http://%s:%s', host, port)
})