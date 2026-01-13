---
title: 消息結構
description: ticker、depth 和 trade 的服務器推送數據格式。
---

本頁面記錄了 TickDB WebSocket 推送的數據格式。

## 通用字段

大多數服務器消息使用：

| 字段 | 類型 | 描述 |
|------|------|-------------|
| cmd | string | 消息類型（通常等於頻道名稱） |
| data | object | 數據載荷 |

`timestamp` 字段單位為**毫秒 (ms)**。

---

## `ticker` 消息

### 示例

```json
{
  "cmd": "ticker",
  "data": {
    "symbol": "AAPL.US",
    "last_price": "150.25",
    "timestamp": 1703123456789
  }
}
```

### 字段

| 字段 | 類型 | 描述 |
|------|------|-------------|
| symbol | string | 交易品種 |
| last_price | string | 最新成交價 |
| timestamp | int | 服務器時間戳（毫秒） |

---

## `depth` 消息（僅股票和加密貨幣）

### 示例

```json
{
  "cmd": "depth",
  "data": {
    "symbol": "BTCUSDT",
    "bids": [
      ["43250.50", "0.125"],
      ["43250.00", "0.250"]
    ],
    "asks": [
      ["43251.00", "0.180"],
      ["43251.50", "0.320"]
    ],
    "timestamp": 1703123456789
  }
}
```

### 字段

| 字段 | 類型 | 描述 |
|------|------|-------------|
| symbol | string | 交易品種 |
| bids | array | 買盤檔位：`[價格, 數量]` |
| asks | array | 賣盤檔位：`[價格, 數量]` |
| timestamp | int | 服務器時間戳（毫秒） |

**排序**
- `bids`：價格降序
- `asks`：價格升序

---

## `trade` 消息（僅股票和加密貨幣）

### 示例

```json
{
  "cmd": "trade",
  "data": {
    "symbol": "AAPL.US",
    "price": "150.25",
    "quantity": "100",
    "side": "buy",
    "timestamp": 1703123456789
  }
}
```

### 字段

| 字段 | 類型 | 描述 |
|------|------|-------------|
| symbol | string | 交易品種 |
| price | string | 成交價格 |
| quantity | string | 成交數量 |
| side | string | `buy`（買入）或 `sell`（賣出） |
| timestamp | int | 服務器時間戳（毫秒） |
