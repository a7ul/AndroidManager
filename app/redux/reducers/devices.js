import {DEVICES_UPDATE_DEVICES} from '../actions/index';

export default function updateDevices(state = {devicesList:[]}, action) {
  switch (action.type) {
    case DEVICES_UPDATE_DEVICES:
      {
        return {devicesList:action.devices || []};
      }
    default:
      return state;
  }
}
