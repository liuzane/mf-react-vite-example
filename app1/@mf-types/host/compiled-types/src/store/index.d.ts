import type { TypedUseSelectorHook } from 'react-redux';
declare const createStore: () => import("@reduxjs/toolkit").EnhancedStore<{
    dashboardSlice: any;
}, import("redux").UnknownAction, import("@reduxjs/toolkit").Tuple<[import("redux").StoreEnhancer<{
    dispatch: import("redux-thunk").ThunkDispatch<{
        dashboardSlice: any;
    }, undefined, import("redux").UnknownAction>;
}>, import("redux").StoreEnhancer]>>;
declare const store: ReturnType<typeof createStore>;
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppSelector = TypedUseSelectorHook<RootState>;
