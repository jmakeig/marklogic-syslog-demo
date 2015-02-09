var util = require('./util.sjs');
var console = util.console;
 
// Make sure you’ve set the appropriate system log level in the MarkLogic Group setting
console.error('%d is a number', 55);
console.notice('%s is a string', 'Notice');
console.info('%s is a %s', 'asdf', typeof 'asdf'); 
console.log(util.inspect(util, { showHidden: true, depth: null }));
