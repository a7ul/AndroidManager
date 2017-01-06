import { combineReducers } from 'redux';
import sample from './sample';
import {routerReducer} from 'react-router-redux';

const rootReducer = combineReducers({
  sample,
  routing:routerReducer
});

export default rootReducer;
