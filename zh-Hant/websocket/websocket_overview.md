---
title: WebSocket 概述
description: 連接端點、身份驗證和基礎知識。
---

TickDB 通過 WebSocket 提供實時行情數據流。

## 連接

- **URL**：`wss://api.tickdb.ai/v1/realtime`
- **協議**：WebSocket
- **身份驗證**：在查詢字符串中傳遞 API 密鑰

### 查詢參數

| 名稱    | 類型   | 必需 | 描述 |
|---------|--------|----------|-------------|
| api_key | string | 是      | 您的 API 密鑰 |

### 連接示例

```javascript
const ws = new WebSocket('wss://api.tickdb.ai/v1/realtime?api_key=YOUR_API_KEY');
```
