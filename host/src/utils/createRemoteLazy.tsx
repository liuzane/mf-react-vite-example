// 基础模块
import { lazy } from 'react';
import { Typography } from 'antd';

// 类型
import type { ComponentType } from 'react';

const { Title, Text } = Typography;

export function createRemoteLazy<T extends ComponentType<unknown>>(importFn: () => Promise<{ default: T }>) {
  return lazy(() =>
    importFn().catch((error) => {
      console.error('Remote module load error:', error);

      // 返回一个错误展示组件
      return {
        default: ((_props: unknown) => (
          <div className="flex flex-col items-center justify-center h-64 gap-4">
            <Title level={3} type="danger">
              页面加载失败
            </Title>
            <Text type="secondary">
              当前页面暂时不可用，请检查网络连接后刷新重试
            </Text>
            <Text type="secondary" className="text-sm">
              错误信息：
              {error.message}
            </Text>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              刷新重试
            </button>
          </div>
        )) as T,
      };
    }),
  );
}
