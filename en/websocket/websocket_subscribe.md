---
title: Channels & Messages
description: WebSocket channels, subscription commands, and message formats.
---

This page documents WebSocket channels, how to subscribe/unsubscribe, and the message formats for each channel.

## Supported Channels

| Channel | Description | Supported Markets |
|--------|-------------|-------------------|
| `ticker` | Real-time ticker updates | Forex, Metals, Indices, US Stocks, HK Stocks, A-Shares, Crypto |
| `depth`  | Order book depth updates | US Stocks, HK Stocks, A-Shares, Crypto |
| `trade`  | Trade records | HK Stocks, Crypto |

---

## ticker Channel

### Subscribe

```json
{
  "cmd": "subscribe",
  "data": {
    "channel": "ticker",
    "symbols": ["AAPL.US", "BTCUSDT"]
  }
}
```

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
    "last_price": "6703.59",
    "ask_price": "0.00",
    "bid_price": "0.00",
    "type": "index",
    "timestamp": 1773331355037
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

#### Fields

| Field | Type | Description | Markets |
|------|------|-------------|---------|
| symbol | string | Trading symbol | All |
| last_price | string | Last traded price | All |
| timestamp | int | Server timestamp in ms | All |
| ask_price | string | Ask price | Forex, Metals, Index |
| bid_price | string | Bid price | Forex, Metals, Index |
| spread | string | Bid-ask spread | Forex, Metals |
| exchange | int | Exchange code | Forex, Metals |
| type | string | Type identifier (e.g., "index") | Index |
| volume_24h | string | 24-hour trading volume | Crypto |
| high_24h | string | 24-hour high price | Crypto |
| low_24h | string | 24-hour low price | Crypto |
| price_change_24h | string | 24-hour price change | Crypto |
| price_change_percent_24h | string | 24-hour price change percentage | Crypto |

---

## depth Channel

### Subscribe

```json
{
  "cmd": "subscribe",
  "data": {
    "channel": "depth",
    "symbols": ["AAPL.US", "BTCUSDT"]
  }
}
```

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
    "symbols": ["700.HK", "BTCUSDT"]
  }
}
```

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
        "timestamp": 1773371154
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
| └─ side | string | `buy` or `sell` |
| └─ timestamp | int | Trade timestamp (seconds) |
