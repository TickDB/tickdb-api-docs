---
title: WebSocket 概述
description: 连接端点、身份验证和基础知识。
---

TickDB 通过 WebSocket 提供实时行情数据流。

## 连接

- **URL**：`wss://api.tickdb.ai/v1/realtime`
- **协议**：WebSocket
- **身份验证**：在查询字符串中传递 API 密钥

### 查询参数

| 名称    | 类型   | 必需 | 描述 |
|---------|--------|----------|-------------|
| api_key | string | 是      | 您的 API 密钥 |

### 连接示例

```javascript
const ws = new WebSocket('wss://api.tickdb.ai/v1/realtime?api_key=YOUR_API_KEY');
```
