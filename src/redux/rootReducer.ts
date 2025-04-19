import { combineReducers } from '@reduxjs/toolkit';
import userDetailsReducer from './userDetailsSlice';

const rootReducer = combineReducers({
  userDetails: userDetailsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
