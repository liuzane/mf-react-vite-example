// 基础模块
import { useEffect, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Typography, Spin } from 'antd';

// 类型
import type { JSX } from 'react';
import type { Location } from 'react-router-dom';

// 布局组件
import { AppLayout } from '@/layout';

// 工具函数
import { createRemoteLazy } from '@/utils/createRemoteLazy';

// 枚举
const { AppNameEnum } = await import('shared/enums');

const { Title } = Typography;

// 页面
const Home: React.FC = createRemoteLazy(() => import('@/pages/Home'));
const Order: React.FC = createRemoteLazy(() => import('app1/Order'));
const Product: React.FC = createRemoteLazy(() => import('app1/Product'));
const User: React.FC = createRemoteLazy(() => import('app2/User'));
const Role: React.FC = createRemoteLazy(() => import('app2/Role'));

/**
 * 主应用组件
 * 负责路由管理和全局数据监听
 */
function App() {
  // 路由信息
  const location: Location = useLocation();

  /**
   * 监听路由变化，根据路由路径动态加载微应用的样式
   */
  useEffect(() => {
    const pathname: string = location.pathname;
    const pathnamePieces: string[] = pathname.split('/');
    const appName: string = pathnamePieces[1];

    switch (appName) {
      case AppNameEnum.App1:
        import('app1/styles').then(({ mount, unmount }) => {
          unmount();
          mount();
        });
        break;

      case AppNameEnum.App2:
        import('app2/styles').then(({ mount, unmount }) => {
          unmount();
          mount();
        });
        break;

      default:
        break;
    }
  }, [location.pathname]);

  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route
          path={`/${AppNameEnum.App1}/order`}
          element={(
            <SuspenseWrapper>
              <Order />
            </SuspenseWrapper>
          )}
        />
        <Route
          path={`/${AppNameEnum.App1}/product`}
          element={(
            <SuspenseWrapper>
              <Product />
            </SuspenseWrapper>
          )}
        />
        <Route
          path={`/${AppNameEnum.App2}/user`}
          element={(
            <SuspenseWrapper>
              <User />
            </SuspenseWrapper>
          )}
        />
        <Route
          path={`/${AppNameEnum.App2}/role`}
          element={(
            <SuspenseWrapper>
              <Role />
            </SuspenseWrapper>
          )}
        />
        <Route
          path="*"
          element={(
            <div className="flex items-center justify-center h-64">
              <Title level={3} type="secondary">
                请选择一个微应用
              </Title>
            </div>
          )}
        />
      </Route>
    </Routes>
  );
}

/**
 * 异步组件包裹器
 * 用于包裹异步加载的组件，显示加载中状态
 */
function SuspenseWrapper(props: { children: JSX.Element }) {
  return (
    <Suspense
      fallback={(
        <div className="h-full flex items-center justify-center">
          <Spin size="large" description="加载中..." />
        </div>
      )}
    >
      { props.children }
    </Suspense>
  );
}

export default App;
