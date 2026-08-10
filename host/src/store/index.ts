// 基础模块
import { configureStore } from '@reduxjs/toolkit';

// Slices
import dashboardSlice from './slices/dashboardSlice';

// 类型
import type { TypedUseSelectorHook } from 'react-redux';

const createStore = () =>
  configureStore({
    reducer: {
      dashboardSlice,
    },
  });

const store: ReturnType<typeof createStore> = createStore();

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppSelector = TypedUseSelectorHook<RootState>;
