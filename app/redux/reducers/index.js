import {combineReducers} from 'redux';
import sample from './sample';
import devices from './devices';
import {routerReducer} from 'react-router-redux';

const rootReducer = combineReducers({sample, routing: routerReducer, devices});

export default rootReducer;
