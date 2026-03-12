---
title: 頻道與消息
description: WebSocket 頻道、訂閱命令和消息格式。
---

本頁面記錄了 WebSocket 頻道、如何訂閱/取消訂閱，以及每個頻道的消息格式。

## 支持的頻道

| 頻道 | 描述 | 支持的市場 |
|--------|-------------|------------|
| `ticker` | 實時行情更新 | 外匯、貴金屬、指數、美股、港股、A股、加密貨幣 |
| `depth`  | 訂單簿深度更新 | 美股、港股、A股、加密貨幣 |
| `trade`  | 成交記錄 | 港股、加密貨幣 |

---

## ticker 頻道

### 訂閱

```json
{
  "cmd": "subscribe",
  "data": {
    "channel": "ticker",
    "symbols": ["AAPL.US", "BTCUSDT"]
  }
}
```

### 取消訂閱

```json
{
  "cmd": "unsubscribe",
  "data": {
    "channel": "ticker",
    "symbols": ["AAPL.US"]
  }
}
```

### 服務器響應

ticker 消息根據不同市場類型返回不同的字段。

#### 指數

```json
{
  "cmd": "ticker",
  "data": {
    "symbol": "SPX",
    "last_price": "6703.59",
    "ask_price": "0.00",
    "bid_price": "0.00",
    "type": "index",
    "timestamp": 1773331355037
  }
}
```

#### 貴金屬

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

#### 外匯

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

```json
{
  "cmd": "ticker",
  "data": {
    "symbol": "TSLA.US",
    "last_price": "400.67",
    "timestamp": 1773335203000
  }
}
```

```json
{
  "cmd": "ticker",
  "data": {
    "symbol": "600519.SH",
    "last_price": "1401",
    "timestamp": 1769756400000
  }
}
```

#### 加密貨幣

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

#### 字段說明

| 字段 | 類型 | 描述 | 市場 |
|------|------|-------------|------|
| symbol | string | 交易品種 | 全部 |
| last_price | string | 最新成交價 | 全部 |
| timestamp | int | 服務器時間戳（毫秒） | 全部 |
| ask_price | string | 賣價 | 外匯、貴金屬、指數 |
| bid_price | string | 買價 | 外匯、貴金屬、指數 |
| spread | string | 買賣價差 | 外匯、貴金屬 |
| exchange | int | 交易所代碼 | 外匯、貴金屬 |
| type | string | 類型標識（如 "index"） | 指數 |
| volume_24h | string | 24小時成交量 | 加密貨幣 |
| high_24h | string | 24小時最高價 | 加密貨幣 |
| low_24h | string | 24小時最低價 | 加密貨幣 |
| price_change_24h | string | 24小時價格變化 | 加密貨幣 |
| price_change_percent_24h | string | 24小時價格變化百分比 | 加密貨幣 |

---

## depth 頻道

### 訂閱

```json
{
  "cmd": "subscribe",
  "data": {
    "channel": "depth",
    "symbols": ["AAPL.US", "BTCUSDT"]
  }
}
```

### 取消訂閱

```json
{
  "cmd": "unsubscribe",
  "data": {
    "channel": "depth",
    "symbols": ["AAPL.US"]
  }
}
```

### 服務器響應

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

#### 字段說明

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

## trade 頻道

### 訂閱

```json
{
  "cmd": "subscribe",
  "data": {
    "channel": "trade",
    "symbols": ["700.HK", "BTCUSDT"]
  }
}
```

### 取消訂閱

```json
{
  "cmd": "unsubscribe",
  "data": {
    "channel": "trade",
    "symbols": ["700.HK"]
  }
}
```

### 服務器響應

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

#### 字段說明

| 字段 | 類型 | 描述 |
|------|------|-------------|
| symbol | string | 交易品種 |
| trades | array | 成交記錄數組 |
| └─ id | string | 成交ID |
| └─ price | string | 成交價格 |
| └─ quantity | string | 成交數量 |
| └─ side | string | `buy`（買入）或 `sell`（賣出） |
| └─ timestamp | int | 成交時間戳（秒） |
