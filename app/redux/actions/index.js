export const SAMPLE_ACTION = 'SAMPLE_ACTION';
export const DEVICES_UPDATE_DEVICES = 'DEVICES_UPDATE_DEVICES';

export function updateDevices(devices) {
  return {
    type: DEVICES_UPDATE_DEVICES,
    devices: devices || []
  };
}

export function sampleAction(payload) {
  return {
    type: SAMPLE_ACTION,
    payload: payload || 'Yo!'
  };
}
