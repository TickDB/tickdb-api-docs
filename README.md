# TickDB API 文档

TickDB API 文档仓库，涵盖实时与历史行情、A 股／港股／美股全量行情、财务与基本面、财经日历和市场资讯。支持 **REST API 与 WebSocket**，覆盖外汇、贵金属、指数、美股、港股、A 股、中国期货、香港期货和加密货币。

🌐 **官网**：https://tickdb.ai  
📘 **在线文档**：https://docs.tickdb.ai  
📝 **更新日志**：https://docs.tickdb.ai/zh-Hans/release-notes  
💻 **GitHub**：https://github.com/TickDB/tickdb-api-docs

---

[简体中文](https://github.com/TickDB/tickdb-api-docs/blob/main/README.md) | [繁體中文](https://github.com/TickDB/tickdb-api-docs/blob/main/README.zh-Hant.md) | [English](https://github.com/TickDB/tickdb-api-docs/blob/main/README.en.md)

![License](https://img.shields.io/github/license/TickDB/tickdb-api-docs)
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
├── openapi.base.yaml      # REST 接口契约源文件
├── openapi.yaml           # 简体中文 REST 规范（OpenAPI 3.0）
├── openapi.zh-Hant.yaml   # 繁体中文 REST 规范
├── openapi.en.yaml        # 英文 REST 规范
├── asyncapi.base.json     # WebSocket 协议契约源文件
├── asyncapi.json          # 简体中文 WebSocket 规范（AsyncAPI 3.0）
├── asyncapi.zh-Hant.json  # 繁体中文 WebSocket 规范
├── asyncapi.en.json       # 英文 WebSocket 规范
├── scripts/               # 规范本地化与一致性检查脚本
├── package.json           # Node.js 依赖与脚本
├── logo.png               # TickDB 标志
├── zh-Hans/               # 简体中文文档
│   ├── index.md
│   ├── getting-started.md
│   ├── quick-start.md
│   ├── release-notes.md
│   ├── data-specification.md
│   ├── errors.md
│   ├── rest/              # REST 接口页面
│   └── websocket/         # WebSocket 指南与频道页面
├── en/                    # 英文文档
└── zh-Hant/               # 繁体中文文档
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

### OpenAPI 与 AsyncAPI

`openapi.base.yaml` 和 `asyncapi.base.json` 分别是 REST 与 WebSocket 的接口契约源文件。三种语言的规范文件由脚本生成；页面通过各自语言的规范提供 Try It 或 WebSocket Playground。

REST 文档包括通用行情、股票市场、全量行情、财务与基本面、财经日历、市场资讯及 API Key 查询。WebSocket 文档包括 `ticker`、`depth`、`trade`、`ping` 和 A 股、港股、美股全量行情订阅。

`docs.json` 管理三语导航；接口的说明、示例及支持市场以对应语言的页面为准。

## 📚 文档特性

- ✅ **多语言支持**：英文、简体中文、繁体中文
- ✅ **交互式 REST API**：支持 API Key 输入的 Try-It 测试
- ✅ **WebSocket Playground**：基于 AsyncAPI 自动生成
- ✅ **多市场示例**：外汇、贵金属、指数、美股、港股、A 股、中国期货、香港期货、加密货币
- ✅ **全量行情**：单次 REST 请求获取指定股票市场的行情快照；一次 WebSocket 订阅持续接收该市场全部标的的实时更新
- ✅ **更多数据**：公司资料、财务报表、估值、行业、分红、股东持仓、财经日历和市场资讯
- ✅ **三语 API 规范**：REST Try It 与 WebSocket Playground 使用相应语言的规范文件
- ✅ **AI 接入**：首页提供 Skill、MCP、CLI 与 `llms.txt` 的使用入口
- ✅ **内置搜索**：快速全文搜索
- ✅ **响应式设计**：适配桌面与移动设备
- ✅ **深色模式**：自动明暗主题切换

## 🛠 开发工作流

### 添加新文档页面

1. 在三个语言目录新增对应的 `.md` 或 `.mdx` 页面：
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

**REST API**：修改 `openapi.base.yaml` 的接口契约及三语页面，再运行 `npm run openapi:localize` 和 `npm run check:openapi`。不要直接修改生成的三语规范文件。

**WebSocket API**：修改 `asyncapi.base.json` 的协议契约及三语页面，再运行 `npm run asyncapi:localize` 和 `npm run check:asyncapi`。不要直接修改生成的三语规范文件。

提交前可运行 `npm run check` 检查文档链接，并用 `npx mintlify validate` 验证构建。

## 📧 支持

- **官网**：https://tickdb.ai
- **文档**：https://docs.tickdb.ai
- **邮箱**：support@tickdb.ai
- **Telegram**：https://t.me/TickDB_Support

## 📄 许可证

本项目基于 LICENSE 文件中规定的条款进行授权。
