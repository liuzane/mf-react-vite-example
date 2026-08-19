// 基础模块
import { federation, createModuleFederationConfig } from '@module-federation/vite';

// 配置
import { dependencies } from './package.json';

export default (env: Record<string, string>) => federation(createModuleFederationConfig({
  name: 'host',
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
    app1: {
      type: 'module',
      name: 'app1',
      entry: `${env.VITE_APP1_URL}/remoteEntry.js`,
      entryGlobalName: 'app1',
      shareScope: 'default',
    },
    app2: {
      type: 'module',
      name: 'app2',
      entry: `${env.VITE_APP2_URL}/remoteEntry.js`,
      entryGlobalName: 'app2',
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
