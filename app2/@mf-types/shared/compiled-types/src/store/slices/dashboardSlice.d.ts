import type { AsyncThunk, AsyncThunkConfig } from '@reduxjs/toolkit';
export declare const queryOrderStatistics: AsyncThunk<Record<string, number>, void, AsyncThunkConfig>;
export declare const queryProductStatistics: AsyncThunk<Record<string, number>, void, AsyncThunkConfig>;
export declare const queryUserStatistics: AsyncThunk<Record<string, number>, void, AsyncThunkConfig>;
export declare const queryRoleStatistics: AsyncThunk<Record<string, number>, void, AsyncThunkConfig>;
declare const _default: import("redux").Reducer<any>;
export default _default;
