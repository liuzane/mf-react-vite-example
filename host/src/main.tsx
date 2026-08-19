// 基础模块
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

// Ant Design 配置
import { ConfigProvider } from 'antd';
import { StyleProvider } from '@ant-design/cssinjs';
import zhCN from 'antd/es/locale/zh_CN';

// 样式
import './styles';

// 应用入口
import App from './App.tsx';

// 远程模块
const [
  { initIndexedDB }, // 数据库模块
  { DATABASE_NAME }, // 数据库名称
  { default: store }, // Redux 模块 store
  { default: antdTheme }, // Ant Design 主题配置
] = await Promise.all([
  import('mockDB/init'),
  import('shared/consts'),
  import('shared/store'),
  import('shared/utils/antdTheme'),
]);

async function init() {
  // 初始化 IndexedDB 数据库
  await initIndexedDB(DATABASE_NAME);

  // 渲染应用
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <Provider store={store}>
        <ConfigProvider locale={zhCN} theme={antdTheme}>
          <StyleProvider>
            <HashRouter>
              <App />
            </HashRouter>
          </StyleProvider>
        </ConfigProvider>
      </Provider>
    </StrictMode>,
  );

  // 隐藏 loading 文本
  const el: HTMLElement | null = document.getElementById('loading')!;
  el.style.opacity = '0';
  el.addEventListener('transitionend', () => {
    el.remove();
  }, { once: true });
}

init();
