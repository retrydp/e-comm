import { configureStore } from '@reduxjs/toolkit';
import currentActiveTab from '../store/currentActiveTab';

const store = configureStore({
  reducer: {
    currentActiveTab,
  },
});

export default store;
