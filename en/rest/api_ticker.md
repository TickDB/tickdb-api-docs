---
title: Market Ticker
description: Get real-time ticker snapshots for one or more symbols.
openapi: GET /v1/market/ticker
---

**GET** `/v1/market/ticker`

## Overview
Retrieve real-time market ticker data for one or more trading symbols.

## Query Parameters

| Name    | Type   | Required | Description |
|---------|--------|----------|-------------|
| symbols | string | Yes      | Comma-separated symbols, max 50 |

## Multi-Market Examples

Click any symbol to auto-fill the parameter:

**Crypto**: `BTCUSDT`, `ETHUSDT`, `ADAUSDT`
**US Stocks**: `AAPL.US`, `TSLA.US`, `MSFT.US`
**HK Stocks**: `700.HK`, `9988.HK`, `3690.HK`
**Forex**: `EURUSD`, `GBPUSD`, `USDJPY`
**Indices**: `SPX`, `NDX`, `DJI`
**Metals**: `XAUUSD`, `XAGUSD`

## Example Request

```bash
curl -X GET "https://api.tickdb.ai/v1/market/ticker?symbols=BTCUSDT,AAPL.US" \
  -H "X-API-Key: YOUR_API_KEY"
```

## Response Format

```json
{
  "code": 0,
  "message": "success",
  "data": [
    {
      "symbol": "BTCUSDT",
      "price": "43250.50",
      "change": "1250.30",
      "change_percent": "2.98",
      "volume": "15420.5",
      "high": "43800.00",
      "low": "41900.00",
      "timestamp": 1703123456789
    }
  ]
}
curl -H "X-API-Key: YOUR_API_KEY" \
     "https://api.tickdb.ai/v1/market/ticker?symbols=AAPL.US,700.HK,BTCUSDT,XAGUSD"
```

## Example Response

```json
{
    "code": 0,
    "message": "success",
    "data": [
        {
            "symbol": "AAPL.US",
            "last_price": "259.62",
            "volume_24h": "45263767",
            "high_24h": "260.26",
            "low_24h": "259.5",
            "timestamp": 1768265997000
        },
        {
            "symbol": "700.HK",
            "last_price": "628",
            "volume_24h": "10154124",
            "high_24h": "0",
            "low_24h": "626.5",
            "timestamp": 1768273479000
        },
        {
            "symbol": "BTCUSDT",
            "last_price": "91170.59000000",
            "volume_24h": "14308.45245000",
            "high_24h": "92519.95000000",
            "low_24h": "90128.44000000",
            "price_change_24h": "-991.91000000",
            "price_change_percent_24h": "-1.076",
            "timestamp": 1768273481005
        },
        {
            "symbol": "XAGUSD",
            "last_price": "85.76650",
            "bid_price": "85.72820",
            "ask_price": "85.80480",
            "timestamp": 1768273481000
        }
    ]
}
```
