import {
  FILEMANAGER_CHANGE_PATH,
  FILEMANAGER_CHANGE_UI_CONFIG
} from '../actions/index';

export default function filemanager(state = {}, action) {
  switch (action.type) {
    case FILEMANAGER_CHANGE_PATH:
      {
        const parentDir = {
          name: '..',
          time: '',
          type: 'DIRECTORY'
        };
        return Object.assign({}, state, {
          currentPath: action.newPath,
          fileList: [parentDir, ...action.fileList]
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
