import childProcess from 'child_process';
import parser from './parser';
import adbUrl from '../bin/24/adb.osx.bin';

console.log('adb binary:', adbUrl);

const executeAdb = (commandsarray) => {
  return new Promise((resolve, reject) => {
    if (!(commandsarray instanceof Array)) {
      return reject('commands not an array');
    }
    console.log('command: adb', commandsarray.join(' '));
    childProcess.execFile(adbUrl, commandsarray, (error, stdout, stderr) => {
      resolve({
        error,
        stdout,
        stderr
      });
    });
  });
};

const executeAdbForDevice = (serial, command) => {
  return executeAdb([
    '-s', serial, ...command
  ]);
};
const handleErrors = (output) => {
  if (output.error) {
    throw (output);
  }
  return output.stdout;
};

const ignoreErrors = (output) => {
  console.log(output.error);
  return output.stdout;
};

const listDevices = () => {
  console.log(executeAdb);
  return executeAdb(['devices']).then(handleErrors).then(parser.parseListDevices);
};

const getDeviceProperties = (serial) => {
  return executeAdbForDevice(serial, ['shell', 'getprop']).then(handleErrors).then(parser.parseDeviceProperties);
};

const getFileList = (serial, root = '/') => {
  return executeAdbForDevice(serial, ['shell', 'ls', '-1', '-la', root]).then(ignoreErrors).then(parser.parseFileList);
};

module.exports = {
  listDevices,
  getDeviceProperties,
  getFileList,
  executeAdb
};
