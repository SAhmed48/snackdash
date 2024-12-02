import {applyMiddleware, combineReducers, createStore} from '@reduxjs/toolkit';
import {thunk} from 'redux-thunk';
import Reducer from '../Reducer';

const rootReducer = combineReducers({
  Reducer,
});

export const Store = createStore(rootReducer, applyMiddleware(thunk));