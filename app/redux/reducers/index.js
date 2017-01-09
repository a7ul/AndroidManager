import {combineReducers} from 'redux';
import sample from './sample';
import devices from './devices';
import filemanager from './filemanager';
import {routerReducer} from 'react-router-redux';

const rootReducer = combineReducers({sample, routing: routerReducer, devices, filemanager});

export default rootReducer;
