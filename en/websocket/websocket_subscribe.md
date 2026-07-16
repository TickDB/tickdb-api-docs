---
title: Channels & Messages
description: WebSocket channels, subscription commands, and message formats.
---

This page documents WebSocket channels, how to subscribe/unsubscribe, and the message formats for each channel.

## Supported Channels

| Channel | Description | Supported Markets |
|--------|-------------|-------------------|
| `ticker` | Real-time ticker updates | Forex, Metals, Indices, US Stocks, HK Stocks, A-Shares, China Futures, Crypto |
| `depth`  | Order book depth updates | US Stocks, HK Stocks, A-Shares, China Futures, Crypto |
| `trade`  | Trade records | US Stocks, HK Stocks, A-Shares, China Futures, Crypto |

---

## ticker Channel

### Subscribe

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

> `type` is optional. Not required when the symbol is unambiguous; if the server returns an `AMBIGUOUS_SYMBOL` error, pass the value as indicated. Values: `stock`, `indices`, `crypto`, `forex`, `futures`

### Unsubscribe

```json
{
  "cmd": "unsubscribe",
  "data": {
    "channel": "ticker",
    "symbols": ["AAPL.US"]
  }
}
```

### Server Response

The ticker message returns different fields based on market type.

#### Index

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

#### Metals

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

#### Forex

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

#### Stocks

US Stocks:

```jsonc
{
  "cmd": "ticker",
  "data": {
    "symbol": "NVDA",
    "last_price": "221.25",
    "volume_24h": "462724",
    "high_24h": "223.44",
    "low_24h": "220.04",
    // Only present outside regular trading hours
    // Values: pre_market, post_market, overnight
    "trade_session": "overnight",
    "timestamp": 1779171600000
  }
}
```

HK Stocks:

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

A-Shares:

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

#### Crypto

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

#### China Futures

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

#### Fields

| Field | Type | Description | Markets |
|------|------|-------------|---------|
| symbol | string | Trading symbol | All |
| last_price | string | Last traded price | All |
| timestamp | int | Server timestamp in ms | All |
| ask_price | string | Ask price | Forex, Metals, China Futures |
| bid_price | string | Bid price | Forex, Metals, China Futures |
| spread | string | Bid-ask spread | Forex, Metals |
| exchange | int | Exchange code | Forex, Metals |
| volume_24h | string | 24-hour trading volume | Stocks, China Futures, Crypto |
| high_24h | string | 24-hour high price | Stocks, China Futures, Crypto |
| low_24h | string | 24-hour low price | Stocks, China Futures, Crypto |
| price_change_24h | string | 24-hour price change | A-Shares, Crypto |
| price_change_percent_24h | string | 24-hour price change percentage | A-Shares, Crypto |
| trade_session | string | Present outside regular trading hours, see example | US Stocks |

---

## depth Channel

### Subscribe

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

> `type` is optional. Not required when the symbol is unambiguous; if the server returns an `AMBIGUOUS_SYMBOL` error, pass the value as indicated. Values: `stock`, `indices`, `crypto`, `forex`, `futures`

### Unsubscribe

```json
{
  "cmd": "unsubscribe",
  "data": {
    "channel": "depth",
    "symbols": ["AAPL.US"]
  }
}
```

### Server Response

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

#### Fields

| Field | Type | Description |
|------|------|-------------|
| symbol | string | Trading symbol |
| bids | array | Bid levels: `[price, quantity]` |
| asks | array | Ask levels: `[price, quantity]` |
| timestamp | int | Server timestamp in ms |

**Ordering**
- `bids`: price descending
- `asks`: price ascending

---

## trade Channel

### Subscribe

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

> `type` is optional. Not required when the symbol is unambiguous; if the server returns an `AMBIGUOUS_SYMBOL` error, pass the value as indicated. Values: `stock`, `indices`, `crypto`, `forex`, `futures`

### Unsubscribe

```json
{
  "cmd": "unsubscribe",
  "data": {
    "channel": "trade",
    "symbols": ["700.HK"]
  }
}
```

China futures trade pushes contain one trade per message and include optional position metadata:

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

### Server Response

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

#### Fields

| Field | Type | Description |
|------|------|-------------|
| symbol | string | Trading symbol |
| trades | array | Array of trade records |
| └─ id | string | Trade ID |
| └─ price | string | Trade price |
| └─ quantity | string | Trade quantity |
| └─ side | string | `buy`, `sell`, or `neutral` |
| └─ timestamp | int | Trade timestamp (milliseconds) |
| open_interest_change | int | Change in open interest; China futures only |
| position_effect | string | Position effect; China futures only: `long_open`, `short_open`, `both_open`, `long_close`, `short_close`, `both_close`, `long_transfer`, or `short_transfer` |
