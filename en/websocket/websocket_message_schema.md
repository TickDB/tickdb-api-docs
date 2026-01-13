---
title: Message Schema
description: Server push payload schemas for ticker, depth, and trade.
---

This page documents the payload formats pushed by TickDB WebSocket.

## Common Fields

Most server messages use:

| Field | Type | Description |
|------|------|-------------|
| cmd | string | Message type (usually equals channel name) |
| data | object | Payload data |

`timestamp` fields are **milliseconds (ms)**.

---

## `ticker` Message

### Example

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

### Fields

| Field | Type | Description |
|------|------|-------------|
| symbol | string | Trading symbol |
| last_price | string | Last traded price |
| timestamp | int | Server timestamp in ms |

---

## `depth` Message (Stocks & Crypto only)

### Example

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

### Fields

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

## `trade` Message (Stocks & Crypto only)

### Example

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

### Fields

| Field | Type | Description |
|------|------|-------------|
| symbol | string | Trading symbol |
| price | string | Trade price |
| quantity | string | Trade quantity |
| side | string | `buy` or `sell` |
| timestamp | int | Server timestamp in ms |
