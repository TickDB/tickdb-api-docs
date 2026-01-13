---
title: 消息结构
description: ticker、depth 和 trade 的服务器推送数据格式。
---

本页面记录了 TickDB WebSocket 推送的数据格式。

## 通用字段

大多数服务器消息使用：

| 字段 | 类型 | 描述 |
|------|------|-------------|
| cmd | string | 消息类型（通常等于频道名称） |
| data | object | 数据载荷 |

`timestamp` 字段单位为**毫秒 (ms)**。

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

| 字段 | 类型 | 描述 |
|------|------|-------------|
| symbol | string | 交易品种 |
| last_price | string | 最新成交价 |
| timestamp | int | 服务器时间戳（毫秒） |

---

## `depth` 消息（仅股票和加密货币）

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

| 字段 | 类型 | 描述 |
|------|------|-------------|
| symbol | string | 交易品种 |
| bids | array | 买盘档位：`[价格, 数量]` |
| asks | array | 卖盘档位：`[价格, 数量]` |
| timestamp | int | 服务器时间戳（毫秒） |

**排序**
- `bids`：价格降序
- `asks`：价格升序

---

## `trade` 消息（仅股票和加密货币）

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

| 字段 | 类型 | 描述 |
|------|------|-------------|
| symbol | string | 交易品种 |
| price | string | 成交价格 |
| quantity | string | 成交数量 |
| side | string | `buy`（买入）或 `sell`（卖出） |
| timestamp | int | 服务器时间戳（毫秒） |
