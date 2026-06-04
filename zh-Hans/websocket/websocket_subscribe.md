---
title: 频道与消息
description: WebSocket 频道、订阅命令和消息格式。
---

本页面记录了 WebSocket 频道、如何订阅/取消订阅，以及每个频道的消息格式。

## 支持的频道

| 频道 | 描述 | 支持的市场 |
|--------|-------------|------------|
| `ticker` | 实时行情更新 | 外汇、贵金属、指数、美股、港股、A股、加密货币 |
| `depth`  | 订单簿深度更新 | 美股、港股、A股、加密货币 |
| `trade`  | 成交记录 | 美股、港股、加密货币 |

---

## ticker 频道

### 订阅

```jsonc
{
  "cmd": "subscribe",
  "data": {
    "channel": "ticker",
    "symbols": ["AAPL.US", "BTCUSDT"],
    "type": "stock" // 可选，收到 AMBIGUOUS_SYMBOL 错误时按提示传入
  }
}
```

### 取消订阅

```json
{
  "cmd": "unsubscribe",
  "data": {
    "channel": "ticker",
    "symbols": ["AAPL.US"]
  }
}
```

### 服务器响应

ticker 消息根据不同市场类型返回不同的字段。

#### 指数

```json
{
  "cmd": "ticker",
  "data": {
    "symbol": "SPX",
    "last_price": "7342.86",
    "timestamp": 1779204386000
  }
}
```

#### 贵金属

```json
{
  "cmd": "ticker",
  "data": {
    "symbol": "XAUUSD",
    "last_price": "5130.72000",
    "ask_price": "5131.07000",
    "bid_price": "5130.37000",
    "spread": "0.70000",
    "exchange": 48,
    "timestamp": 1773334355000
  }
}
```

#### 外汇

```json
{
  "cmd": "ticker",
  "data": {
    "symbol": "EURUSD",
    "last_price": "1.15200",
    "ask_price": "1.15202",
    "bid_price": "1.15199",
    "spread": "0.00003",
    "exchange": 48,
    "timestamp": 1773334426000
  }
}
```

#### 股票

美股：

```jsonc
{
  "cmd": "ticker",
  "data": {
    "symbol": "NVDA",
    "last_price": "221.25",
    "volume_24h": "462724",
    "high_24h": "223.44",
    "low_24h": "220.04",
    // 仅非正常交易时段返回，正常交易时段无此字段
    // 可选值：pre_market（盘前）、post_market（盘后）、overnight（夜盘）
    "trade_session": "overnight",
    "timestamp": 1779171600000
  }
}
```

港股：

```json
{
  "cmd": "ticker",
  "data": {
    "symbol": "700",
    "last_price": "461.4",
    "volume_24h": "24687716",
    "high_24h": "468.8",
    "low_24h": "448.6",
    "timestamp": 1779171608000
  }
}
```

A股：

```json
{
  "cmd": "ticker",
  "data": {
    "symbol": "600519",
    "last_price": "1319.01",
    "volume_24h": "37263",
    "high_24h": "1329.99",
    "low_24h": "1318",
    "price_change_24h": "-3.99",
    "price_change_percent_24h": "-0.30",
    "timestamp": 1779171605000
  }
}
```

#### 加密货币

```json
{
  "cmd": "ticker",
  "data": {
    "symbol": "BTCUSDT",
    "last_price": "70480.57000000",
    "volume_24h": "23737.52989000",
    "high_24h": "71321.00000000",
    "low_24h": "69205.91000000",
    "price_change_24h": "-362.06000000",
    "price_change_percent_24h": "-0.511",
    "timestamp": 1773335135026
  }
}
```

#### 字段说明

| 字段 | 类型 | 描述 | 市场 |
|------|------|-------------|------|
| symbol | string | 交易品种 | 全部 |
| last_price | string | 最新成交价 | 全部 |
| timestamp | int | 服务器时间戳（毫秒） | 全部 |
| ask_price | string | 卖价 | 外汇、贵金属 |
| bid_price | string | 买价 | 外汇、贵金属 |
| spread | string | 买卖价差 | 外汇、贵金属 |
| exchange | int | 交易所代码 | 外汇、贵金属 |
| volume_24h | string | 24小时成交量 | 股票、加密货币 |
| high_24h | string | 24小时最高价 | 股票、加密货币 |
| low_24h | string | 24小时最低价 | 股票、加密货币 |
| price_change_24h | string | 24小时价格变化 | A股、加密货币 |
| price_change_percent_24h | string | 24小时价格变化百分比 | A股、加密货币 |
| trade_session | string | 非开盘交易期间返回，详见示例 | 美股 |

---

## depth 频道

### 订阅

```jsonc
{
  "cmd": "subscribe",
  "data": {
    "channel": "depth",
    "symbols": ["AAPL.US", "BTCUSDT"],
    "type": "stock" // 可选，收到 AMBIGUOUS_SYMBOL 错误时按提示传入
  }
}
```

### 取消订阅

```json
{
  "cmd": "unsubscribe",
  "data": {
    "channel": "depth",
    "symbols": ["AAPL.US"]
  }
}
```

### 服务器响应

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

#### 字段说明

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

## trade 频道

### 订阅

```jsonc
{
  "cmd": "subscribe",
  "data": {
    "channel": "trade",
    "symbols": ["700.HK", "BTCUSDT"],
    "type": "stock" // 可选，收到 AMBIGUOUS_SYMBOL 错误时按提示传入
  }
}
```

### 取消订阅

```json
{
  "cmd": "unsubscribe",
  "data": {
    "channel": "trade",
    "symbols": ["700.HK"]
  }
}
```

### 服务器响应

```json
{
  "cmd": "trade",
  "data": {
    "symbol": "700.HK",
    "trades": [
      {
        "id": "20950",
        "price": "553.000",
        "quantity": "100",
        "side": "buy",
        "timestamp": 1773371154
      }
    ]
  }
}
```

#### 字段说明

| 字段 | 类型 | 描述 |
|------|------|-------------|
| symbol | string | 交易品种 |
| trades | array | 成交记录数组 |
| └─ id | string | 成交ID |
| └─ price | string | 成交价格 |
| └─ quantity | string | 成交数量 |
| └─ side | string | `buy`（买入）或 `sell`（卖出） |
| └─ timestamp | int | 成交时间戳（秒） |
