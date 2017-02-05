import {
  ERROR_MESSAGE,
  ERROR_DRAWER_TOGGLE,
  ERROR_SNACKBAR_TOGGLE
} from '../actions/index';

export default function error(state = {}, action) {
  switch (action.type) {
    case ERROR_MESSAGE:
      {
        const existingErrorList = state.errorList;
        return Object.assign({}, state, {
          errorList: []
        });
      }
    case ERROR_SNACKBAR_TOGGLE:
      {
        return Object.assign({}, state, {
          payload: action.payload
        });
      }
    case ERROR_DRAWER_TOGGLE:
      {
        return Object.assign({}, state, {
          payload: action.payload
        });
      }
    default:
      return Object.assign({}, state);
  }
}
