import {
  FILEMANAGER_CHANGE_PATH,
  FILEMANAGER_CHANGE_UI_CONFIG
} from '../actions/index';
import _ from 'lodash';

export default function filemanager(state = {}, action) {
  switch (action.type) {
    case FILEMANAGER_CHANGE_PATH:
      {
        return Object.assign({}, state, {
          currentPath: action.newPath,
          fileList: action.fileList
        });
      }
    case FILEMANAGER_CHANGE_UI_CONFIG:
      {
        return Object.assign({}, state, {
          uiConfig: Object.assign({}, state.uiConfig, action.uiConfig)
        });
      }
    default:
      return state;
  }
}
