---
title: 頻道與消息
description: WebSocket 頻道、訂閱命令和消息格式。
---

本頁面記錄了 WebSocket 頻道、如何訂閱/取消訂閱，以及每個頻道的消息格式。

## 支持的頻道

| 頻道 | 描述 | 支持的市場 |
|--------|-------------|------------|
| `ticker` | 實時行情更新 | 外匯、貴金屬、指數、美股、港股、A股、中國期貨、加密貨幣 |
| `depth`  | 訂單簿深度更新 | 美股、港股、A股、中國期貨、加密貨幣 |
| `trade`  | 成交記錄 | 美股、港股、A股、中國期貨、加密貨幣 |

---

## ticker 頻道

### 訂閱

```json
{
  "cmd": "subscribe",
  "data": {
    "channel": "ticker",
    "symbols": ["AAPL.US", "BTCUSDT"],
    "type": "stock"
  }
}
```

> `type` 可選，代碼無歧義時無需傳遞；若返回 `AMBIGUOUS_SYMBOL` 錯誤，按提示傳入對應值即可。可選值：`stock`、`indices`、`crypto`、`forex`、`futures`

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
    "last_price": "7342.86",
    "timestamp": 1779204386000
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
    // 僅非正常交易時段返回，正常交易時段無此字段
    // 可選值：pre_market（盤前）、post_market（盤後）、overnight（夜盤）
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

中國期貨：

```json
{
  "cmd": "ticker",
  "data": {
    "symbol": "BU2609",
    "type": "futures",
    "last_price": "4309",
    "bid_price": "4308",
    "ask_price": "4310",
    "volume_24h": "37263",
    "high_24h": "4336",
    "low_24h": "4278",
    "timestamp": 1784012398000
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
| ask_price | string | 賣價 | 外匯、貴金屬、中國期貨 |
| bid_price | string | 買價 | 外匯、貴金屬、中國期貨 |
| spread | string | 買賣價差 | 外匯、貴金屬 |
| exchange | int | 交易所代碼 | 外匯、貴金屬 |
| volume_24h | string | 24小時成交量 | 股票、中國期貨、加密貨幣 |
| high_24h | string | 24小時最高價 | 股票、中國期貨、加密貨幣 |
| low_24h | string | 24小時最低價 | 股票、中國期貨、加密貨幣 |
| price_change_24h | string | 24小時價格變化 | A股、加密貨幣 |
| price_change_percent_24h | string | 24小時價格變化百分比 | A股、加密貨幣 |
| trade_session | string | 非開盤交易期間返回，詳見示例 | 美股 |

---

## depth 頻道

### 訂閱

```json
{
  "cmd": "subscribe",
  "data": {
    "channel": "depth",
    "symbols": ["AAPL.US", "BTCUSDT"],
    "type": "stock"
  }
}
```

> `type` 可選，代碼無歧義時無需傳遞；若返回 `AMBIGUOUS_SYMBOL` 錯誤，按提示傳入對應值即可。可選值：`stock`、`indices`、`crypto`、`forex`、`futures`

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
    "symbols": ["700.HK", "BTCUSDT"],
    "type": "stock"
  }
}
```

> `type` 可選，代碼無歧義時無需傳遞；若返回 `AMBIGUOUS_SYMBOL` 錯誤，按提示傳入對應值即可。可選值：`stock`、`indices`、`crypto`、`forex`、`futures`

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

中國期貨每條消息推送一筆成交，並附帶可選的持倉資訊：

```json
{
  "cmd": "trade",
  "data": {
    "symbol": "BU2609",
    "type": "futures",
    "price": "4309",
    "quantity": "1",
    "side": "sell",
    "timestamp": 1784012398000,
    "open_interest_change": 0,
    "position_effect": "short_transfer"
  }
}
```

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
        "timestamp": 1773371154000
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
| └─ side | string | `buy`（買入）、`sell`（賣出）或 `neutral`（中性） |
| └─ timestamp | int | 成交時間戳（毫秒） |
| open_interest_change | int | 持倉變化，僅中國期貨返回 |
| position_effect | string | 持倉影響，僅中國期貨返回：`long_open`（多開）、`short_open`（空開）、`both_open`（雙開）、`long_close`（多平）、`short_close`（空平）、`both_close`（雙平）、`long_transfer`（多換）、`short_transfer`（空換） |
