// 基础模块
import { federation, createModuleFederationConfig } from '@module-federation/vite';

// 配置
// import exposes from './src/exposes';
import { dependencies } from './package.json';

export default (env: Record<string, string>) => federation(createModuleFederationConfig({
  name: 'app1',
  filename: 'remoteEntry.js',
  remotes: {
    mockDB: {
      type: 'module',
      name: 'mockDB',
      entry: `${env.VITE_MOCKDB_URL}/remoteEntry.js`,
      entryGlobalName: 'mockDB',
      shareScope: 'default',
    },
    shared: {
      type: 'module',
      name: 'shared',
      entry: `${env.VITE_SHARED_URL}/remoteEntry.js`,
      entryGlobalName: 'shared',
      shareScope: 'default',
    },
  },
  exposes: {
    './styles': './src/styles/index.ts',
    './Order': './src/pages/Order/index.ts',
    './Product': './src/pages/Product/index.ts',
  },
  shared: {
    'react': {
      requiredVersion: dependencies.react,
      singleton: true,
    },
    'react-dom/client': {
      requiredVersion: dependencies['react-dom'],
      singleton: true,
    },
    'react-router-dom': {
      requiredVersion: dependencies['react-router-dom'],
      singleton: true,
    },
    'react-redux': {
      requiredVersion: dependencies['react-redux'],
      singleton: true,
    },
    'antd': {
      requiredVersion: dependencies.antd,
      singleton: true,
    },
  },
  dts: {
    generateTypes: {
      tsConfigPath: './tsconfig.app.json',
    },
  },
}));
