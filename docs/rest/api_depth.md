---
title: Order Book Depth
description: Get real-time order book bids and asks.
openapi: GET /v1/market/depth
---

**GET** `/v1/market/depth`

## Overview
Retrieve real-time order book depth (bids & asks) for a trading symbol.

## Multi-Market Examples

**Crypto**: `BTCUSDT`, `ETHUSDT`, `ADAUSDT`  
**US Stocks**: `AAPL.US`, `TSLA.US`, `MSFT.US`  
**HK Stocks**: `700.HK`, `9988.HK`, `3690.HK`

```bash
curl -H "X-API-Key: YOUR_API_KEY" \
     "https://api.tickdb.ai/v1/market/depth?symbol=700.HK&limit=10"
```

## Example Response

```json
{
    "code": 0,
    "message": "success",
    "data": {
        "symbol": "700.HK",
        "timestamp": 1768274016162,
        "bids": [
            [
                "626",
                "19700"
            ],
            [
                "625.5",
                "40800"
            ],
            [
                "625",
                "58200"
            ],
            [
                "624.5",
                "23600"
            ],
            [
                "624",
                "31300"
            ],
            [
                "623.5",
                "37500"
            ],
            [
                "623",
                "47200"
            ],
            [
                "622.5",
                "17000"
            ],
            [
                "622",
                "12700"
            ],
            [
                "621.5",
                "5600"
            ]
        ],
        "asks": [
            [
                "626.5",
                "36100"
            ],
            [
                "627",
                "50700"
            ],
            [
                "627.5",
                "49100"
            ],
            [
                "628",
                "54000"
            ],
            [
                "628.5",
                "37500"
            ],
            [
                "629",
                "37100"
            ],
            [
                "629.5",
                "43600"
            ],
            [
                "630",
                "78900"
            ],
            [
                "630.5",
                "53500"
            ],
            [
                "631",
                "37700"
            ]
        ]
    }
}
```

## Notes
- bids sorted by price descending
- asks sorted by price ascending
- timestamp in milliseconds (UTC)
