# Module Federation React Vite 示例

一个基于 Module Federation + React + Vite 构建的微前端演示项目，展示如何通过模块联邦实现微前端架构。


## 项目结构

```
mf-react-vite-example/
├── host/                 # 主应用（基座） - 布局、路由、全局状态、公共组件
├── app1/                 # 子应用1 - 订单管理、商品管理
└── app2/                 # 子应用2 - 用户管理、角色管理
```


## 模块说明

| 模块     | 职责                                                                           | 默认开发地址       |
| -------- | ------------------------------------------------------------------------------ | ------------------ |
| **host** | 主应用，提供整体布局、侧边栏菜单、路由控制、全局状态（Redux），并通过联邦暴露公共 UI 组件（表格、分页）供子应用消费 | `http://localhost:3000` |
| **app1** | 子应用1，暴露 `OrderList`、`ProductList` 页面组件，消费 host 的公共组件 | `http://localhost:3001` |
| **app2** | 子应用2，暴露 `UserList`、`RoleList` 页面组件，消费 host 的公共组件 | `http://localhost:3002` |


## 技术栈

- **微前端方案**：Module Federation（`@module-federation/vite`）
- **构建工具**：Vite
- **前端框架**：React 19
- **路由**：React Router v6（host 统一控制路由，子应用独立开发时自用）
- **状态管理**：Zustand / Redux（由 host 提供，子应用通过 props 或 Context 消费）
- **本地数据**：IndexedDB（由 host 中的 mockDB 统一管理，暴露给子应用）


## 核心特性

- **页面暴露与消费**：app1 和 app2 各自暴露页面组件（如 `./OrderList`），host 通过 Module Federation 的 `remotes` 动态导入这些组件，并挂载到自己的路由中。
- **全局状态共享**：host 负责全局状态（如用户信息、主题），子应用加载时可通过 props 或全局 Context 获取状态，实现数据统一。
- **路由控制**：host 作为路由总控，定义所有页面的路径，子应用仅在独立开发时维护自身路由。
- **公共组件与数据服务**：host 将通用 UI 组件（表格、分页）和 mockDB（IndexedDB 操作）通过联邦暴露，所有子应用统一引用，保证视觉一致性及数据统一。


## 快速开始

### 前置要求

- Node.js >= 22
- npm / yarn / pnpm

### 配置 Git 大小写敏感（Mac/Windows）

```bash
git config core.ignorecase false
```

### 安装依赖

在根目录执行：

```bash
npm install --prefix host && npm install --prefix app1 && npm install --prefix app2
```

### 启动开发环境（按顺序）

由于 host 需要先暴露公共组件和数据服务，**请务必先启动 host**，再启动子应用。

1. **启动 host**

```bash
cd host
npm run dev   # 默认 3000 端口
```

2. **启动 app1 和 app2**

```bash
cd app1 && npm run dev   # 默认 3001
cd app2 && npm run dev   # 默认 3002
```

3. 访问主应用：`http://localhost:3000`

> 若端口被占用，请查看各模块日志中的实际端口，并修改对应配置（如 host 的 remote 地址或子应用的 server.port）。

### 打包项目

在根目录执行：

```bash
npm run build --prefix host && npm run build --prefix app1 && npm run build --prefix app2
```

构建产物：
- host 输出到 `dist/`
- app1 输出到 `dist/app1/`
- app2 输出到 `dist/app2/`


## 线上地址

[https://liuzane.github.io/mf-react-vite-example](https://liuzane.github.io/mf-react-vite-example)


## 许可证

MIT License  
Copyright (c) 2026-present, liuzane