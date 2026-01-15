---
title: Recent Trades
description: Get latest trade prints for a symbol.
openapi: GET /v1/market/trades
---

**GET** `/v1/market/trades`

## Overview
Retrieve recent trade execution records for a trading symbol.

## Multi-Market Examples

**Crypto**: `BTCUSDT`, `ETHUSDT`, `ADAUSDT`  
**US Stocks**: `AAPL.US`, `TSLA.US`, `MSFT.US`  
**HK Stocks**: `700.HK`, `9988.HK`, `3690.HK`

```bash
curl -H "X-API-Key: YOUR_API_KEY" \
     "https://api.tickdb.ai/v1/market/trades?symbol=700.HK&limit=5"
```

## Example Response

```json
{
    "code": 0,
    "message": "success",
    "data": {
        "symbol": "700.HK",
        "trades": [
            {
                "id": "0",
                "price": "625.500",
                "quantity": "200",
                "side": "sell",
                "timestamp": 1768274130
            },
            {
                "id": "0",
                "price": "625.500",
                "quantity": "100",
                "side": "sell",
                "timestamp": 1768274133
            },
            {
                "id": "0",
                "price": "625.250",
                "quantity": "100",
                "side": "buy",
                "timestamp": 1768274137
            },
            {
                "id": "0",
                "price": "625.500",
                "quantity": "100",
                "side": "sell",
                "timestamp": 1768274138
            },
            {
                "id": "0",
                "price": "625.500",
                "quantity": "300",
                "side": "sell",
                "timestamp": 1768274140
            }
        ]
    }
}
```

## Notes
- side: buy / sell
- timestamp in milliseconds (UTC)
