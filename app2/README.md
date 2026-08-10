# 子应用2 - 用户与角色管理

基于 **Module Federation + React + Vite** 构建的微前端子应用，提供用户管理和角色管理功能。该应用通过 Module Federation 消费主应用（host）暴露的公共 UI 组件（表格、分页），同时将自身页面组件（用户列表、角色列表）暴露给主应用动态加载。

## 项目简介

本项目是 [Module Federation React Vite 示例](https://github.com/liuzane/mf-react-vite-example) 的子应用之一，独立开发、独立部署。主要业务功能：

- **用户列表**：展示系统用户数据，支持分页浏览
- **角色列表**：展示角色数据，支持分页浏览

表格展示和分页操作均复用 **host** 提供的通用组件，数据来源于 host 暴露的 **mockDB**（基于 IndexedDB 的本地数据库服务），实现前端数据持久化。

## 技术栈

| 技术 | 说明 |
|------|------|
| Vite | 构建工具，提供快速的开发体验 |
| React 19 | UI 框架 |
| React Router DOM v6 | 内部路由（用户/角色页面切换，仅独立开发时使用） |
| Ant Design 6 | 组件库（可选） |
| Module Federation（`@module-federation/vite`） | 模块联邦，用于暴露页面组件并消费 host 的公共资源 |

## 前置条件

- Node.js >= 22
- npm / yarn / pnpm 均可
- 了解 Module Federation 基本概念
- **host 主应用需要提前启动**，因为 app2 需要消费 host 暴露的公共组件和 mockDB

> 开发时建议先启动 host，再启动 app2；或者同时启动，但确保 host 的 remoteEntry 可访问（默认地址 `http://localhost:3000/assets/remoteEntry.js`）。

## 安装与运行

```bash
# 1. 进入 app2 目录
cd app2

# 2. 安装依赖
npm install

# 3. 启动开发服务器（需确保 host 已启动）
npm run dev

# 4. 生产构建
npm run build
```

应用默认运行在 `http://localhost:3002`（具体端口以终端输出为准）。

### 联调所需服务清单

| 服务名称 | 默认地址 | 说明 |
|----------|----------|------|
| **host** | http://localhost:3000 | 主应用，暴露公共组件和 mockDB |
| **app2** | http://localhost:3002 | 本子应用，提供用户/角色页面 |

**启动顺序建议**：先启动 host，再启动 app2（确保 host 的公共资源可用）。

## 问题与解决

如果在第一次启动开发环境时，遇上以下错误，需要手动解决：

```txt
[ Module Federation DTS ] Failed to download types archive from "http://localhost:3000/@mf-types.zip". Set FEDERATION_DEBUG=true for details.
```

修改 `host/package.json` 和 `app2/package.json` 的打包命令，将 `"build": "npm run tsc && vite build"` 改为 `"build": "vite build"`。
然后打一次包，再启动开发环境。


## 许可证

MIT License  
Copyright (c) 2026-present, liuzane