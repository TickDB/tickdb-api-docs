# TickDB API 文档

官方 TickDB API 文档仓库，提供统一的实时行情数据 API，  
支持 **REST 与 WebSocket**，覆盖外汇、贵金属、指数、美股、港股、A 股与加密货币。

🌐 **官网**：https://tickdb.ai  
📘 **在线文档**：https://docs.tickdb.ai  
💻 **GitHub**：https://github.com/TickDB  

---

[简体中文](README.md) | [繁體中文](README.zh-Hant.md) | [English](README.en.md)

![License](https://img.shields.io/github/license/TickDB/tickdb-unified-realtime-marketdata-api)
[![Website](https://img.shields.io/badge/docs.tickdb.ai-online-blue)](https://docs.tickdb.ai)
![Docs](https://img.shields.io/badge/documentation-live-brightgreen)
![API](https://img.shields.io/badge/API-REST%20%26%20WebSocket-blue)


## 🚀 快速开始

本文档基于 [Mintlify](https://mintlify.com) 构建，并通过 GitHub 集成自动部署。

### 本地开发

```bash
# 安装依赖
npm install

# 启动本地开发服务器
npm run dev
```

访问 `http://localhost:3000` 在本地预览文档。

### 部署

当更改推送到 `main` 分支时，文档将自动部署至 Mintlify。

- **在线站点**: https://docs.tickdb.ai
- **部署方式**: 通过 Mintlify GitHub App 管理

## 📁 项目结构

```
├── docs.json              # Mintlify 配置文件
├── asyncapi.json          # WebSocket API 规范（AsyncAPI 3.0）
├── openapi.yaml           # REST API 规范（OpenAPI 3.0）
├── package.json           # Node.js 依赖与脚本
├── logo.png               # TickDB 标志
├── en/                    # 英文文档
│   ├── index.md
│   ├── quick-start.md
│   ├── authentication.md
│   ├── data-specification.md
│   ├── errors.md
│   ├── rest/
│   └── websocket/
├── zh-Hans/               # 简体中文文档
│   ├── index.md
│   ├── quick-start.md
│   ├── authentication.md
│   ├── data-specification.md
│   ├── errors.md
│   ├── rest/
│   └── websocket/
└── zh-Hant/               # 繁体中文文档
    ├── index.md
    ├── quick-start.md
    ├── authentication.md
    ├── data-specification.md
    ├── errors.md
    ├── rest/
    └── websocket/
```

## 🌍 多语言支持

文档提供以下语言版本：

- **English** (`en`)
- **简体中文** (`zh-Hans`)
- **繁體中文** (`zh-Hant`)

可在文档站点右上角切换语言。

## 🔧 配置文件说明

### docs.json

Mintlify 的主配置文件，包含：

- 主题与品牌设置
- 多语言导航结构
- API 参考文档集成
- WebSocket Playground 的 AsyncAPI 配置

### asyncapi.json

WebSocket API 规范（AsyncAPI 3.0），用于定义：

- WebSocket 连接端点
- 频道定义（如 ticker、depth、trades）
- 消息结构与示例
- 身份验证要求

> **说明**：Mintlify 会基于该文件自动生成交互式 WebSocket Playground。

### openapi.yaml

REST API 规范（OpenAPI 3.0），用于定义：

- 所有 REST 接口
- 请求与响应结构
- 身份验证方式
- Try-It 交互式示例

## 📚 文档特性

- ✅ **多语言支持**：英文、简体中文、繁体中文
- ✅ **交互式 REST API**：支持 API Key 输入的 Try-It 测试
- ✅ **WebSocket Playground**：基于 AsyncAPI 自动生成
- ✅ **多市场示例**：外汇、贵金属、指数、美股、港股、A 股、加密货币
- ✅ **OpenAPI 集成**：自动生成 REST API 参考文档
- ✅ **AsyncAPI 集成**：交互式 WebSocket 调试
- ✅ **内置搜索**：快速全文搜索
- ✅ **响应式设计**：适配桌面与移动设备
- ✅ **深色模式**：自动明暗主题切换

## 🛠 开发工作流

### 添加新文档页面

1. 在对应语言目录中新建 `.md` 文件：
   - English：`en/`
   - 简体中文：`zh-Hans/`
   - 繁体中文：`zh-Hant/`

2. 在文件顶部添加 frontmatter：

   ```markdown
   ---
   title: "页面标题"
   description: "用于 SEO 的页面描述"
   ---
   ```

3. 更新 `docs.json` 中对应语言的导航配置

4. 使用 `npm run dev` 进行本地预览

5. 推送至 GitHub，自动触发部署

### 更新 API 规范

**REST APIs**：
- 修改 `openapi.yaml`
- Mintlify 将自动更新 Try-It 界面
- 部署完成后立即生效

**WebSocket APIs**：
- 修改 `asyncapi.json`
- Mintlify 将重新生成 WebSocket Playground
- 交互式 UI 自动更新

## 📧 支持

- **官网**：https://tickdb.ai
- **文档**：https://docs.tickdb.ai
- **邮箱**：support@tickdb.ai
- **Telegram**：https://t.me/TickDB_Support

## 📄 许可证

本项目基于 LICENSE 文件中规定的条款进行授权。
