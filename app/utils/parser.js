import _ from 'lodash';

const listDevices = (rawOutput) => {
  // const lines = rawOutput.split('\n');
  const devicesList = _.chain(rawOutput).split('\n').slice(1).value();
  _.remove(devicesList, (eachLine) => {
    return eachLine.trim().length < 1;
  });
  return _.map(devicesList, (eachDeviceString) => {
    const splittedDeviceString = _.split(eachDeviceString, '	');
    return {name: splittedDeviceString[0], status: splittedDeviceString[1]};
  });
};

module.exports = {
  listDevices
};
