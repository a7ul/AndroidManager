// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
var execFile = require('child_process').execFile;
const adbFile = './bin/adb';
execFile('pwd', [], function(error, stdout, stderr) {
  console.log('ERROR',error,'DEBUGOUT', stdout, 'ERROUT',stderr);
});
