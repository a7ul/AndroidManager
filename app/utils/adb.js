import childProcess from 'child_process';
import parser from './parser';
import adbUrl from '../bin/24/adb.osx.bin';

console.log('adb binary:', adbUrl);

const executeAdb = (commandsarray = []) => {
  return new Promise((resolve, reject) => {
    if (!(commandsarray instanceof Array)) {
      return reject('commands not an array');
    }
    console.log('command: adb', commandsarray.join(' '));
    childProcess.execFile(adbUrl, commandsarray, (error, stdout, stderr) => {
      if (error) {
        return reject(stderr);
      }
      return resolve(stdout);
    });
  });
};

const executeAdbForDevice = (serial, command) => {
  return executeAdb([
    '-s', serial, ...command
  ]);
};

const listDevices = () => {
  return executeAdb(['devices']).then(parser.parseListDevices);
};

const getDeviceProperties = (serial) => {
  return executeAdbForDevice(serial, ['shell', 'getprop']).then(parser.parseDeviceProperties);
};

module.exports = {
  listDevices,
  getDeviceProperties
};
