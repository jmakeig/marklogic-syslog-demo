/*
 * Copyright 2015 MarkLogic Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
 
var LF = require('console-winston-syslog').LoggerFactory;
var console = (new LF('Other')).logger;
var browser = (new LF('Other')).logger;
    browser.transports.posixSyslog.level = 'debug';

var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');

var app = express()
app.use(express.static(path.join(__dirname, '../browser/public/')));

app.post('/logger', bodyParser.json({type: 'application/json'}), function(req, res) {
  res.sendStatus(202);
  res.end();
  var msg = req.body;
  // FIXME: How do I differentiate these from the application-level logs?
  browser[msg.level](msg.body);
});

var server = app.listen(3333, function () {
  var host = server.address().address
  var port = server.address().port
  console.notice('Example app listening at http://%s:%s', host, port)
});

