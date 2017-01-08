import {DEVICES_UPDATE_DEVICES, DEVICES_SELECT_DEVICE, DEVICES_UPDATE_DEVICE_PROPERTIES} from '../actions/index';
import _ from 'lodash';

export default function updateDevices(state = {}, action) {
  switch (action.type) {
    case DEVICES_UPDATE_DEVICES:
      {
        return Object.assign({}, state, {
          devicesList: action.devices || []
        });
      }
    case DEVICES_SELECT_DEVICE:
      {
        return Object.assign({}, state, {selectedDevice: action.device});
      }
    case DEVICES_UPDATE_DEVICE_PROPERTIES:
      {
        const newState = Object.assign({}, state);
        const device = _.remove(newState.devicesList, {serial: action.serial})[0];
        device.properties = action.properties || {};
        newState.devicesList.push(device);
        return newState;
      }
    default:
      return state;
  }
}
