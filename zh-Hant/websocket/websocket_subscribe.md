---
title: 訂閱與取消訂閱
description: 客戶端命令格式和支持的頻道。
---

WebSocket 連接建立後，您可以訂閱或取消訂閱頻道。

## 消息格式

所有客戶端命令遵循以下結構：

```json
{
  "cmd": "subscribe",
  "data": {
    "channel": "ticker",
    "symbols": ["AAPL.US", "BTCUSDT"]
  }
}
```

## 訂閱

```json
{
  "cmd": "subscribe",
  "data": {
    "channel": "ticker",
    "symbols": ["AAPL.US", "BTCUSDT"]
  }
}
```

## 取消訂閱

```json
{
  "cmd": "unsubscribe",
  "data": {
    "channel": "ticker",
    "symbols": ["AAPL.US"]
  }
}
```

## 支持的頻道

| 頻道 | 描述 | 備註 |
|--------|-------------|-------|
| `ticker` | 實時行情更新 | ✅ 可用 |
| `depth`  | 訂單簿深度更新 | ⚠️ 部分支持 |
| `trade`  | 成交記錄（執行） | ⚠️ 部分支持 |

### 注意事項
- 對於**外匯**交易品種，僅支持 `ticker` 頻道。
- `depth` / `trade` 目前支持**股票**和**加密貨幣**。
