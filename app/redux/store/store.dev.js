import {createStore, compose, applyMiddleware} from 'redux';
import {hashHistory} from 'react-router';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import createLogger from 'redux-logger';

import rootReducer from '../reducers';
import DevTools from '../../containers/DevTools';
import {routerMiddleware} from 'react-router-redux';

const logger = createLogger();
const routemiddleware = routerMiddleware(hashHistory);

const enhancer = compose(applyMiddleware(thunk, promise, logger, routemiddleware), DevTools.instrument());

let initStore = (initialState) => createStore(rootReducer, initialState, enhancer);

module.exports = {
  initStore
};
