import {
  combineReducers
} from 'redux';

import {
  routerReducer
} from 'react-router-redux';

import sample from './sample';
import devices from './devices';
import filemanager from './filemanager';
import settings from './settings';
import error from './error';


const rootReducer = combineReducers({
  sample,
  routing: routerReducer,
  devices,
  filemanager,
  settings,
  error
});

export default rootReducer;
