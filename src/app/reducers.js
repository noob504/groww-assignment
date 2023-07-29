import { combineReducers } from '@reduxjs/toolkit';
import photoReducer from './reducers/photoSlice.js';
import pageReducer from './reducers/pageSlice.js';

const rootReducer = combineReducers({
  photos: photoReducer,
  page: pageReducer,
});

export default rootReducer;
