import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import {hashHistory} from 'react-router';

import {routerMiddleware} from 'react-router-redux';
const routemiddleware = routerMiddleware(hashHistory);

const enhancer = compose(applyMiddleware(thunk, routemiddleware));

let initStore = (initialState) => createStore(rootReducer, initialState, enhancer);

module.exports = {
  initStore
};
