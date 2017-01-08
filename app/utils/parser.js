import _ from 'lodash';

const parseListDevices = (rawOutput) => {
  const devicesList = _.chain(rawOutput).split('\n').slice(1).value();
  _.remove(devicesList, (eachLine) => {
    return eachLine.trim().length < 1;
  });
  return _.map(devicesList, (eachDeviceString) => {
    const splittedDeviceString = _.split(eachDeviceString, '	');
    return {serial: splittedDeviceString[0], status: splittedDeviceString[1], properties: {}};
  });
};

const parseDeviceProperties = (rawOutput) => {
  const propertiesLines = _.split(rawOutput, '\n');
  const deviceProperties = {};
  _.each(propertiesLines, (eachLine) => {
    const splitOnColon = _.split(eachLine, ':');
    const rawk = splitOnColon[0] || '';
    const rawv = splitOnColon[1] || '';
    const k = rawk.trim().slice(1,-1);
    const v = rawv.trim().slice(1,-1);
    deviceProperties[k] = v;
  });
  return deviceProperties;
};

module.exports = {
  parseListDevices,
  parseDeviceProperties
};
