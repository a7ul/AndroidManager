export const SAMPLE_ACTION = 'SAMPLE_ACTION';
export const DEVICES_UPDATE_DEVICES = 'DEVICES_UPDATE_DEVICES';
export const DEVICES_SELECT_DEVICE = 'DEVICES_SELECT_DEVICE';
export const DEVICES_UPDATE_DEVICE_PROPERTIES = 'DEVICES_UPDATE_DEVICE_PROPERTIES';

//DEVICES_ACTION_CREATORS
export function updateDevices(devices) {
  return {
    type: DEVICES_UPDATE_DEVICES,
    devices: devices || []
  };
}
export function selectDevice(deviceSerial) {
  return {type: DEVICES_SELECT_DEVICE, device: deviceSerial};
}
export function updateDeviceProperties(serial, properties = {}) {
  return {type: DEVICES_UPDATE_DEVICE_PROPERTIES, serial, properties};
}

export function sampleAction(payload) {
  return {
    type: SAMPLE_ACTION,
    payload: payload || 'Yo!'
  };
}
