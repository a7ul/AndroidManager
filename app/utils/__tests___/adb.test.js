import _ from 'lodash';

jest.mock('../../bin/24/adb.osx.bin');
jest.mock('child_process', () => {
  return {
    execFile: jest.fn((file, command, cb) => {
      cb();
    })
  };
});

import adb from '../adb';
describe('Adb utils', () => {
  const childProcessMock = require('child_process');
  it('executeAdb: runs adb commands in a shell', () => {
    return adb.executeAdb(['successfulcommand']).then((out) => {
      expect(_.keys(out)).toEqual(['error', 'stdout', 'stderr']);
      return expect(childProcessMock.execFile).toBeCalled();
    });
  });
  it('executeAdb: returns error if  adb commands in not an array', () => {
    return adb.executeAdb('notanarray').catch(err => {
      return expect(err).toMatch('commands not an array');
    });
  });
});
