---
title: Kline Intervals
description: Get supported K-line time intervals.
openapi: GET /v1/market/intervals/kline
---

**GET** `/v1/market/intervals/kline`

## Overview
Retrieve the list of supported K-line (candlestick) time intervals for historical data queries.

## Example Request

```bash
curl -H "X-API-Key: YOUR_API_KEY" \
     "https://api.tickdb.ai/v1/market/intervals/kline"
```

## Example Response

```json
{
    "code": 0,
    "message": "success",
    "data": {
        "count": 11,
        "description": "Supported K-line time intervals for historical data queries",
        "intervals": [
            "1m",
            "3m",
            "5m",
            "15m",
            "30m",
            "1h",
            "2h",
            "4h",
            "1d",
            "1w",
            "1M"
        ]
    }
}
```

## Interval Format

- **Minutes**: `1m`, `3m`, `5m`, `15m`, `30m`
- **Hours**: `1h`, `2h`, `4h`
- **Days**: `1d`
- **Weeks**: `1w`
- **Months**: `1M`
