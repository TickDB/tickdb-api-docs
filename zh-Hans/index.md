---
title: TickDB 文档
description: 统一实时行情数据 API，支持外汇、指数、美股、港股、A 股和加密货币。
---

欢迎使用 **TickDB 在线文档**。

TickDB 是一个**面向开发者的统一实时行情数据 API**，通过单一连接即可访问多个金融市场的实时与历史行情数据，帮助你避免管理多个数据源、协议和供应商的复杂性，专注于业务和策略本身。

---

## 什么是 TickDB？

TickDB 专为需要**可靠、低延迟、可长期依赖**行情数据的开发者而构建。

通过 **一次接入（one connection）**，即可无缝访问外汇、贵金属、指数、美股、港股、A 股和加密货币等多个市场的行情数据。

TickDB 支持多种行情形式，包括 **tick 级成交数据、盘口深度（Order Book）、K 线（Candlestick）**，  
可通过 **REST API 与 WebSocket** 接入，适用于量化交易、实时行情系统、交易平台与数据分析等场景。

---

## 核心特性

- **统一接入**  
  一套 API 覆盖多个市场和资产类别

- **实时数据**  
  基于 WebSocket 的流式推送，适用于实时行情场景

- **多市场支持**  
  外汇、贵金属、指数、美股、港股、A 股、加密货币

- **开发者友好**  
  REST API + WebSocket，接口清晰、文档完整、示例齐全

- **AI 友好**  
  提供 Skill、MCP、CLI 三档 AI 接入方式，从对话到深度集成全场景覆盖

---

## AI 集成

TickDB 提供三档 AI 原生接入方式，从零配置对话到终端自动化全覆盖。

### Skill — 对话即用，零配置

通过 [ClawHub](https://clawhub.com) 一键安装，任意 LLM 即可调用 TickDB 行情数据。

```bash
npx clawhub@latest install tickdb-market-data
```

- 零注册自动试用
- 72 核心品种免费
- 任意 LLM 通用

### MCP — 永久集成，一次配置

通过 Hosted MCP Server 接入，兼容 Claude Code、Cursor、Kiro、Zed 等所有 MCP 客户端。

配置示例（以 Claude 为例，路径：`~/.claude/settings.json`）：

```json
{
  "mcpServers": {
    "tickdb": {
      "type": "http",
      "url": "https://mcp.tickdb.ai/",
      "headers": {
        "X-TickDB-Key": "<YOUR_API_KEY>"
      }
    }
  }
}
```

- Hosted mcp.tickdb.ai，无需自部署
- HTTPS + Header 鉴权
- 兼容所有 MCP 协议客户端
- 提供 13 个工具，与 REST API 端点一一对应

### CLI — 终端 & AI Agent 就绪

全局安装后即可在终端直接查询行情，也适合 Agent 通过 bash-tool 调用。

```bash
npm install -g tickdb
tickdb config set-key <YOUR_KEY>
tickdb ticker BTCUSDT,XAUUSD,AAPL.US
```

- JSON / 表格双输出
- 16 个原生命令
- Bash-tool 友好，适合 Agent 调用

详细信息请访问 [TickDB AI 接入](https://tickdb.ai/ai-tools)。

---

## 典型使用场景

- **量化交易**  
  作为策略与算法系统的实时行情数据源

- **行情看板**  
  实时价格展示、资产与投资组合监控

- **交易应用**  
  构建类似 TradingView 的行情界面与图表系统

- **数据分析与回测**  
  历史行情分析、策略研究与回测

- **金融服务集成**  
  集成到现有交易平台或金融基础设施中

---

## 文档章节导览

### 入门指南
- **快速开始** - 几分钟内开始使用
- **更新日志** - 版本更新记录

### REST API

#### 通用行情接口
- **可用交易品种** - 查询支持的交易品种
- **行情快照** - 实时行情快照
- **历史 K 线** - 已结束周期的历史 K 线数据
- **实时 K 线** - 当前周期正在形成的 K 线数据
- **订单簿** - 实时订单簿深度数据
- **最近成交** - 最新成交执行记录
- **K 线周期** - 支持的 K 线周期列表

#### 股票市场接口
- **当日分时** - 股票当日分时数据
- **股票信息** - 股票详细信息与基本面数据
- **交易时段** - 市场交易时段信息
- **交易日历** - 交易日列表查询
- **市场指标** - 综合市场指标数据
- **资金流向** - 股票资金流向数据

### WebSocket 文档
- **快速开始** - WebSocket 连接与订阅入门
- **频道与消息** - 频道订阅与消息格式

### 参考
- **数据规范** - 交易品种命名与格式
- **错误码说明** - 错误码与处理方式

---

**文档版本**: v1.0.1
