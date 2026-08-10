// 基础模块
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import type { ConfigEnv } from 'vite';

// 插件
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';
import tailwindcss from '@tailwindcss/vite';
import { analyzer } from 'vite-bundle-analyzer';
import federation from './module-federation.config';

// https://vite.dev/config/
export default defineConfig(({ mode }: ConfigEnv) => {
  const env: Record<string, string> = loadEnv(mode, process.cwd(), '');
  return {
    base: env.VITE_BASE,
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: Number(env.VITE_PORT),
      open: false,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      watch: {
        ignored: [
          '**/@mf-types/**',
          '**/.mf/**',
        ],
      },
    },
    build: {
      target: 'esnext',
      emptyOutDir: true,
      outDir: '../dist/app1',
    },
    plugins: [
      react(),
      babel({ presets: [reactCompilerPreset()] }),
      tailwindcss(),
      federation(env),
      mode === 'analyze'
        ? analyzer({
            analyzerPort: Number(env.VITE_ANALYZE_PORT),
          })
        : null,
    ],
  };
});
