import {FILEMANAGER_CHANGE_PATH} from '../actions/index';
import _ from 'lodash';

export default function filemanager(state = {}, action) {
  switch (action.type) {
    case FILEMANAGER_CHANGE_PATH:
      {
        return Object.assign({}, state, {
          currentPath: action.newPath
        });
      }
    default:
      return state;
  }
}
