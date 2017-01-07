import childProcess from 'child_process';
import parser from './parser';
import adbUrl from '../bin/24/adb.osx.bin';

console.log('adb binary:', adbUrl);

const executeAdb = (commandsarray = []) => {
  const commands = (commandsarray instanceof Array)
    ? commandsarray
    : [commandsarray];

  console.log('command: adb', commands.join(' '));
  return new Promise((resolve, reject) => {
    childProcess.execFile(adbUrl, commands, (error, stdout, stderr) => {
      if (error) {
        return reject(stderr);
      }
      return resolve(stdout);
    });
  });
};

const listDevices = () => {
  return executeAdb('devices').then(parser.listDevices);
};

module.exports = {
  listDevices
};
