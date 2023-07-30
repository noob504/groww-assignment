import { combineReducers } from '@reduxjs/toolkit';
import photoReducer from './reducers/photoSlice.js';
import userReducer from './reducers/userSlice.js';

const rootReducer = combineReducers({
  photos: photoReducer,
  user: userReducer,
});

export default rootReducer;
