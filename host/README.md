# 主应用 - Micro App Host

基于 MicroApp + React + Vite 构建的微前端主应用（基座应用），负责整体布局、菜单导航以及子应用的动态加载。菜单组件通过 Module Federation 从 `shared` 远程模块获取，实现菜单配置的统一管理。

## 项目简介

本项目是 [Vite Microapp React Example](https://github.com/liuzane/mf-react-vite-example) 的主应用，采用 MicroApp 框架聚合多个独立子应用（如订单管理、用户管理等）。主要职责：

- 提供全局布局（顶部栏 / 侧边栏 / 内容区域）
- 从 `shared` 远程模块加载动态菜单组件
- 管理子应用的注册、切换与生命周期
- 提供全局样式、错误边界等基础能力

所有菜单项及导航逻辑由 `shared` 模块统一维护，主应用仅负责渲染和路由联动。

## 技术栈

| 技术                | 说明                                                                 |
| ------------------- | -------------------------------------------------------------------- |
| Vite                | 构建工具，提供极速的开发体验                                          |
| React 19            | UI 框架                                                             |
| React Router DOM v6 | 路由管理（主应用的路由与子应用路径映射）                               |
| Ant Design 6        | 组件库，提供一致的 UI 组件集                                         |
| MicroApp            | 微前端框架，负责子应用的加载、卸载与通信                               |
| Module Federation   | 用于加载 `shared` 远程模块（菜单组件、全局配置）                      |

## 前置条件

- Node.js >= 22
- npm / yarn / pnpm 均可
- 已了解 MicroApp 基本概念
- `shared` 远程模块需要提前启动（提供菜单组件及配置）
- 子应用1（订单/商品）、子应用2（用户/角色）需能够独立访问

> 开发时建议同时启动 `shared` 以及所有子应用，以保证完整的联调环境。

## 安装与运行

```bash
# 1. 克隆仓库
git clone https://github.com/liuzane/mf-react-vite-example.git
cd host

# 2. 安装依赖
npm install

# 3. 启动开发服务器（需要确保 shared 模块已启动）
npm run dev

# 4. 生产构建
npm run build
```

应用默认运行在 `http://localhost:3000`（Vite 默认端口可能被占用，具体以终端输出为准）。

### 联调所需服务清单

| 服务名称          | 默认地址                 | 说明                       |
| ----------------- | ------------------------ | -------------------------- |
| shared 模块      | http://localhost:3999    | 提供菜单组件、全局配置      |
| 子应用1（订单）   | http://localhost:3001    | 订单与商品管理页面         |
| 子应用2（用户）   | http://localhost:3002    | 用户与角色管理页面         |
| 主应用           | http://localhost:3000    | 主应用入口，聚合所有子应用   |

启动顺序建议：`shared` → 子应用1 / 子应用2 → 主应用。

## 问题与解决

如果在第一次启动开发环境时，遇上以下错误，需要手动解决：

```txt
[ Module Federation DTS ] Failed to download types archive from "http://localhost:3001/@mf-types.zip". Set FEDERATION_DEBUG=true for details.
[ Module Federation DTS ] Failed to download types archive from "http://localhost:3002/@mf-types.zip". Set FEDERATION_DEBUG=true for details.
```

修改 `host/package.json`、`app1/package.json` 和 `app2/package.json` 的打包命令，将 `"build": "npm run tsc && vite build"` 改为 `"build": "vite build"`。
然后打一次包，再启动开发环境。

> 原因：这是因为 host 的模块联邦和 app1、app2 的模块联邦配置相互引用，导致在第一次启动时，无法正确创建和下载模块类型定义，因此需要先打包一次让模块类型定义生成。去掉 `npm run tsc` 是因为本地没有 @mf-types 的类型，打包不会通过。
