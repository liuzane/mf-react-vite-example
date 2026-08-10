// 基础模块
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { message } from 'antd';

// 类型
import type { Slice, AsyncThunk, AsyncThunkConfig } from '@reduxjs/toolkit';

// 数据服务
import DashboardService from '@/services/DashboardService';

interface State {
  order: Record<string, number>;
  product: Record<string, number>;
  user: Record<string, number>;
  role: Record<string, number>;
}

// 订单服务
const dashboardService: DashboardService = new DashboardService();

const initialState: State = {
  order: {
    total: 0,
    pending: 0,
    paid: 0,
    shipped: 0,
    completed: 0,
    cancelled: 0,
  },
  product: {
    total: 0,
    onSale: 0,
    offSale: 0,
    outOfStock: 0,
    lowStock: 0,
  },
  user: {
    total: 0,
    active: 0,
    disabled: 0,
  },
  role: {
    total: 0,
    active: 0,
    inactive: 0,
  },
};

export const queryOrderStatistics: AsyncThunk<Record<string, number>, void, AsyncThunkConfig> = createAsyncThunk(
  'dashboard/queryOrderStatistics',
  async (_, { rejectWithValue }) => {
    try {
      const { code, data, msg } = await dashboardService.queryOrderStatistics();
      if (code === 200) {
        return data!;
      }
      message.error(msg);
      return rejectWithValue(msg);
    } catch (error: unknown) {
      message.error('请求订单统计失败');
      return rejectWithValue((error as Error).message);
    }
  },
);

export const queryProductStatistics: AsyncThunk<Record<string, number>, void, AsyncThunkConfig> = createAsyncThunk(
  'dashboard/queryProductStatistics',
  async (_, { rejectWithValue }) => {
    try {
      const { code, data, msg } = await dashboardService.queryProductStatistics();
      if (code === 200) {
        return data!;
      }
      message.error(msg);
      return rejectWithValue(msg);
    } catch (error: unknown) {
      message.error('请求商品统计失败');
      return rejectWithValue((error as Error).message);
    }
  },
);

export const queryUserStatistics: AsyncThunk<Record<string, number>, void, AsyncThunkConfig> = createAsyncThunk(
  'dashboard/queryUserStatistics',
  async (_, { rejectWithValue }) => {
    try {
      const { code, data, msg } = await dashboardService.queryUserStatistics();
      if (code === 200) {
        return data!;
      }
      message.error(msg);
      return rejectWithValue(msg);
    } catch (error: unknown) {
      message.error('请求用户统计失败');
      return rejectWithValue((error as Error).message);
    }
  },
);

export const queryRoleStatistics: AsyncThunk<Record<string, number>, void, AsyncThunkConfig> = createAsyncThunk(
  'dashboard/queryRoleStatistics',
  async (_, { rejectWithValue }) => {
    try {
      const { code, data, msg } = await dashboardService.queryRoleStatistics();
      if (code === 200) {
        return data!;
      }
      message.error(msg);
      return rejectWithValue(msg);
    } catch (error: unknown) {
      message.error('请求角色统计失败');
      return rejectWithValue((error as Error).message);
    }
  },
);

const dashboardSlice: Slice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 订单统计
      .addCase(queryOrderStatistics.fulfilled, (state, action) => {
        state.order = {
          total: action.payload.total,
          pending: action.payload.pending,
          paid: action.payload.paid,
          shipped: action.payload.shipped,
          completed: action.payload.completed,
          cancelled: action.payload.cancelled,
        };
      })
      // 商品统计
      .addCase(queryProductStatistics.fulfilled, (state, action) => {
        state.product = {
          total: action.payload.total,
          onSale: action.payload.onSale,
          offSale: action.payload.offSale,
          outOfStock: action.payload.outOfStock,
          lowStock: action.payload.lowStock,
        };
      })
      // 用户统计
      .addCase(queryUserStatistics.fulfilled, (state, action) => {
        state.user = {
          total: action.payload.total,
          active: action.payload.active,
          disabled: action.payload.disabled,
        };
      })
      // 角色统计
      .addCase(queryRoleStatistics.fulfilled, (state, action) => {
        state.role = {
          total: action.payload.total,
          active: action.payload.active,
          inactive: action.payload.inactive,
        };
      });
  },
});

export default dashboardSlice.reducer;
