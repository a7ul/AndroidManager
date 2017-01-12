export const SAMPLE_ACTION = 'SAMPLE_ACTION';
export const DEVICES_UPDATE_DEVICES = 'DEVICES_UPDATE_DEVICES';
export const DEVICES_SELECT_DEVICE = 'DEVICES_SELECT_DEVICE';
export const DEVICES_UPDATE_DEVICE_PROPERTIES = 'DEVICES_UPDATE_DEVICE_PROPERTIES';
export const FILEMANAGER_CHANGE_PATH = 'FILEMANAGER_CHANGE_PATH';
export const FILEMANAGER_CHANGE_UI_CONFIG = 'FILEMANAGER_CHANGE_UI_CONFIG';

//DEVICES_ACTION_CREATORS
export function updateDevices(devices) {
  return {
    type: DEVICES_UPDATE_DEVICES,
    devices: devices || []
  };
}
export function selectDevice(deviceSerial, device) {
  return {
    type: DEVICES_SELECT_DEVICE,
    deviceSerial,
    device
  };
}
export function updateDeviceProperties(serial, properties = {}) {
  return {
    type: DEVICES_UPDATE_DEVICE_PROPERTIES,
    serial,
    properties
  };
}

//FILE_MANAGER_ACTIONS
export function changeFileManagerPath(newPath = '/', fileList = []) {
  return {
    type: FILEMANAGER_CHANGE_PATH,
    newPath,
    fileList
  };
}
export function changeFileManagerUiConfig(uiConfig) {
  return {
    type: FILEMANAGER_CHANGE_UI_CONFIG,
    uiConfig
  };
};
//SAMPLE_ACTION_CREATORS
export function sampleAction(payload) {
  return {
    type: SAMPLE_ACTION,
    payload: payload || 'Yo!'
  };
}
