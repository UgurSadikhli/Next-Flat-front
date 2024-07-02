// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import propertiesReducer from '../features/propertiesSlice';

export const store = configureStore({
  reducer: {
    properties: propertiesReducer,
  },
});
