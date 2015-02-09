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

/**
 * A wrapper around the console object that sends messages to a remote service.
 * This is EXPERIMENTAL. This is only tested in Safari 8.0.2.
 * There is a lot of hard-coding mostly to get around problems I had try to 
 * apply functions for the console prototype.
 */
function RemoteConsole(console) {
  var proxies = ['info', 'debug', 'error', 'warn', 'log'];
  this.orig = window._console = console;
  if(window.console === console) {
    window.console = this;
  }
  this.log = this.info = function() {
    if('undefined' !== this.orig) {
      RemoteConsole.prototype.info.apply(this, arguments);
    }
    this.send.apply(this, ['info'].concat(Array.prototype.slice.call(arguments)));
  };
  this.debug = function() {
    if('undefined' !== this.orig) {
      RemoteConsole.prototype.debug.apply(this, arguments);
    }
    this.send.apply(this, ['debug'].concat(Array.prototype.slice.call(arguments)));
  };
  this.warn = function() {
    if('undefined' !== this.orig) {
      RemoteConsole.prototype.warn.apply(this, arguments);
    }
    this.send.apply(this, ['warn'].concat(Array.prototype.slice.call(arguments)));
  };
  this.error = function() {
    if('undefined' !== this.orig) {
      RemoteConsole.prototype.error.apply(this, arguments);
    }
    this.send.apply(this, ['error'].concat(Array.prototype.slice.call(arguments)));
  };
};
RemoteConsole.prototype.assert = function() { if('function' === typeof console.assert) { return Function.prototype.bind.call(console.assert, console); } else { return function() {}}}();
RemoteConsole.prototype.clear = function() { if('function' === typeof console.clear) { return Function.prototype.bind.call(console.clear, console); } else { return function() {}}}();
RemoteConsole.prototype.count = function() { if('function' === typeof console.count) { return Function.prototype.bind.call(console.count, console); } else { return function() {}}}();
RemoteConsole.prototype.debug = function() { if('function' === typeof console.debug) { return Function.prototype.bind.call(console.debug, console); } else { return function() {}}}();
RemoteConsole.prototype.dir = function() { if('function' === typeof console.dir) { return Function.prototype.bind.call(console.dir, console); } else { return function() {}}}();
RemoteConsole.prototype.dirxml = function() { if('function' === typeof console.dirxml) { return Function.prototype.bind.call(console.dirxml, console); } else { return function() {}}}();
RemoteConsole.prototype.error = function() { if('function' === typeof console.error) { return Function.prototype.bind.call(console.error, console); } else { return function() {}}}();
RemoteConsole.prototype.group = function() { if('function' === typeof console.group) { return Function.prototype.bind.call(console.group, console); } else { return function() {}}}();
RemoteConsole.prototype.groupCollapsed = function() { if('function' === typeof console.groupCollapsed) { return Function.prototype.bind.call(console.groupCollapsed, console); } else { return function() {}}}();
RemoteConsole.prototype.groupEnd = function() { if('function' === typeof console.groupEnd) { return Function.prototype.bind.call(console.groupEnd, console); } else { return function() {}}}();
RemoteConsole.prototype.info = function() { if('function' === typeof console.info) { return Function.prototype.bind.call(console.info, console); } else { return function() {}}}();
RemoteConsole.prototype.log = function() { if('function' === typeof console.log) { return Function.prototype.bind.call(console.log, console); } else { return function() {}}}();
RemoteConsole.prototype.profile = function() { if('function' === typeof console.profile) { return Function.prototype.bind.call(console.profile, console); } else { return function() {}}}();
RemoteConsole.prototype.profileEnd = function() { if('function' === typeof console.profileEnd) { return Function.prototype.bind.call(console.profileEnd, console); } else { return function() {}}}();
RemoteConsole.prototype.table = function() { if('function' === typeof console.table) { return Function.prototype.bind.call(console.table, console); } else { return function() {}}}();
RemoteConsole.prototype.time = function() { if('function' === typeof console.time) { return Function.prototype.bind.call(console.time, console); } else { return function() {}}}();
RemoteConsole.prototype.timeEnd = function() { if('function' === typeof console.timeEnd) { return Function.prototype.bind.call(console.timeEnd, console); } else { return function() {}}}();
RemoteConsole.prototype.timeStamp = function() { if('function' === typeof console.timeStamp) { return Function.prototype.bind.call(console.timeStamp, console); } else { return function() {}}}();
RemoteConsole.prototype.trace = function() { if('function' === typeof console.trace) { return Function.prototype.bind.call(console.trace, console); } else { return function() {}}}();
RemoteConsole.prototype.warn = function() { if('function' === typeof console.warn) { return Function.prototype.bind.call(console.warn, console); } else { return function() {}}}();

// Set and forget. Intentionally no callback.
RemoteConsole.prototype.send = function(level, body) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if(XMLHttpRequest.DONE === this.readyState) {}
  }
  xhr.open('POST', '/logger', true);
  xhr.setRequestHeader('Content-type', 'application/json');
  xhr.send(
    JSON.stringify({
      'level': level,
      'body': Array.prototype.slice.call(arguments, 1).join(' ')
    })
  );  
};

