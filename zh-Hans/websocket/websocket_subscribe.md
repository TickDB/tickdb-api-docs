---
title: 订阅与取消订阅
description: 客户端命令格式和支持的频道。
---

WebSocket 连接建立后，您可以订阅或取消订阅频道。

## 消息格式

所有客户端命令遵循以下结构：

```json
{
  "cmd": "subscribe",
  "data": {
    "channel": "ticker",
    "symbols": ["AAPL.US", "BTCUSDT"]
  }
}
```

## 订阅

```json
{
  "cmd": "subscribe",
  "data": {
    "channel": "ticker",
    "symbols": ["AAPL.US", "BTCUSDT"]
  }
}
```

## 取消订阅

```json
{
  "cmd": "unsubscribe",
  "data": {
    "channel": "ticker",
    "symbols": ["AAPL.US"]
  }
}
```

## 支持的频道

| 频道 | 描述 | 备注 |
|--------|-------------|-------|
| `ticker` | 实时行情更新 | ✅ 可用 |
| `depth`  | 订单簿深度更新 | ⚠️ 部分支持 |
| `trade`  | 成交记录（执行） | ⚠️ 部分支持 |

### 注意事项
- 对于**外汇**交易品种，仅支持 `ticker` 频道。
- `depth` / `trade` 目前支持**股票**和**加密货币**。
