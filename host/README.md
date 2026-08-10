# Host 主应用

基于 **Module Federation + React + Vite** 构建的微前端主应用（基座），负责全局布局、路由控制、全局状态管理，并提供公共组件供子应用使用。它通过 Module Federation 动态加载子应用（app1、app2）暴露的页面组件，实现微前端架构。

## 项目简介

本项目是 [Module Federation React Vite 示例](https://github.com/liuzane/mf-react-vite-example) 的主应用，主要职责包括：

- 提供整体布局（侧边栏菜单、顶部栏、内容区域）
- 统一路由控制，管理所有页面路径
- 提供全局状态（如用户信息、主题设置），子应用可通过 props 或 Context 消费
- 将公共 UI 组件（表格、分页等）和 IndexedDB 数据服务（mockDB）通过 Module Federation 暴露给子应用（app1/app2）
- 动态加载 app1（订单管理、商品管理）和 app2（用户管理、角色管理）的页面组件

## 技术栈

| 技术 | 说明 |
|------|------|
| Vite | 构建工具，提供快速的开发体验 |
| React 19 | UI 框架 |
| React Router DOM v6 | 路由管理，统一控制所有页面路径 |
| Ant Design 6 | UI 组件库（可选，用于界面美化） |
| Module Federation（`@module-federation/vite`） | 模块联邦，用于暴露公共资源并加载子应用页面 |
| Redux | 全局状态管理（可根据喜好选择） |

## 前置条件

- Node.js >= 22
- npm / yarn / pnpm 均可
- 了解 Module Federation 基本概念
- **子应用 app1 和 app2 需要提前启动**，以便 host 能加载其暴露的页面组件

> 开发时建议按顺序启动：先启动 host（暴露公共组件），再启动 app1/app2（以便 host 可以加载它们），或者先启动所有子应用再启动 host 也可以（只要子应用启动时能访问到 host 暴露的 remote 资源即可）。但为保证一致，推荐先启动 host。

## 安装与运行

```bash
# 1. 进入 host 目录
cd host

# 2. 安装依赖
npm install

# 3. 启动开发服务器
npm run dev
```

应用默认运行在 `http://localhost:3000`（具体端口以终端输出为准）。

### 联调所需服务清单

| 服务名称 | 默认地址 | 说明 |
|----------|----------|------|
| **host** | http://localhost:3000 | 主应用，提供布局、路由、全局状态及公共组件 |
| **app1** | http://localhost:3001 | 子应用1，暴露订单/商品页面 |
| **app2** | http://localhost:3002 | 子应用2，暴露用户/角色页面 |

**启动顺序建议**：先启动 host，再启动 app1/app2（或者同时启动，只要确保 host 的 remote 地址配置正确）。

> 注意：子应用会通过 Module Federation 消费 host 暴露的公共组件，因此 host 必须先于子应用启动，或者子应用启动时能访问到 host 的 remoteEntry。


## 问题与解决

如果在第一次启动开发环境时，遇上以下错误，需要手动解决：

```txt
[ Module Federation DTS ] Failed to download types archive from "http://localhost:3001/@mf-types.zip". Set FEDERATION_DEBUG=true for details.
[ Module Federation DTS ] Failed to download types archive from "http://localhost:3002/@mf-types.zip". Set FEDERATION_DEBUG=true for details.
```

修改 `host/package.json`、`app1/package.json` 和 `app2/package.json` 的打包命令，将 `"build": "npm run tsc && vite build"` 改为 `"build": "vite build"`。
然后打一次包，再启动开发环境。


## 许可证

MIT License  
Copyright (c) 2026-present, liuzane