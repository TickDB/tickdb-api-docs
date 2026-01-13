---
title: Subscribe & Unsubscribe
description: Client command format and supported channels.
---
# Subscribe & Unsubscribe

After the WebSocket connection is open, you can subscribe or unsubscribe to channels.

## Message Envelope

All client commands follow this structure:

```json
{
  "cmd": "subscribe",
  "data": {
    "channel": "ticker",
    "symbols": ["AAPL.US", "BTCUSDT"]
  }
}
```

## Subscribe

```json
{
  "cmd": "subscribe",
  "data": {
    "channel": "ticker",
    "symbols": ["AAPL.US", "BTCUSDT"]
  }
}
```

## Unsubscribe

```json
{
  "cmd": "unsubscribe",
  "data": {
    "channel": "ticker",
    "symbols": ["AAPL.US"]
  }
}
```

## Supported Channels

| Channel | Description | Notes |
|--------|-------------|-------|
| `ticker` | Real-time ticker updates | ✅ Available |
| `depth`  | Order book depth updates | ⚠️ Partially supported |
| `trade`  | Trade prints (executions) | ⚠️ Partially supported |

### Notes
- For **Forex** symbols, only `ticker` is available.
- `depth` / `trade` are currently supported for **Stocks** and **Crypto**.
