// 基础模块
import { federation, createModuleFederationConfig } from '@module-federation/vite';

// 配置
import { dependencies } from './package.json';
import storeExposes from './src/store/mfExposes';
import componentExposes from './src/components/mfExposes';

export default (env: Record<string, string>) => federation(createModuleFederationConfig({
  name: 'shared',
  filename: 'remoteEntry.js',
  exposes: {
    './consts': './src/consts',
    './enums': './src/enums',
    './models': './src/models',
    './utils/antdTheme': './src/utils/antdTheme',
    ...componentExposes,
    ...storeExposes,
  },
  remotes: {
    mockDB: {
      type: 'module',
      name: 'mockDB',
      entry: `${env.VITE_MOCKDB_URL}/remoteEntry.js`,
      entryGlobalName: 'mockDB',
      shareScope: 'default',
    },
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
    '@reduxjs/toolkit': {
      requiredVersion: dependencies['@reduxjs/toolkit'],
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
