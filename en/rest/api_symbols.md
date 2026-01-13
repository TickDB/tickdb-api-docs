---
title: Available Symbols
description: List tradable instruments and supported markets.
openapi: GET /v1/symbols/available
---

**GET** `/v1/symbols/available`

## Overview
Query all available trading symbols supported by TickDB.

## Supported Markets

- **FOREX** - Foreign Exchange
- **METALS** - Precious Metals
- **INDICES** - Market Indices
- **US** - US Stock Market
- **HK** - Hong Kong Stock Exchange
- **CN** - A-Shares Market
- **CRYPTO** - Cryptocurrency Pairs

```bash
curl -H "X-API-Key: YOUR_API_KEY" \
     "https://api.tickdb.ai/v1/symbols/available?market=FOREX&limit=5"
```

## Example Response

```json
{
    "products": [
        {
            "symbol": "AUDBRL",
            "name": "AUDBRL",
            "market": "FOREX",
            "product_type": "forex",
            "currency": "USD",
            "is_active": true,
            "updated_at": "2026-01-13T11:19:59+08:00"
        },
        {
            "symbol": "AUDCAD",
            "name": "AUDCAD",
            "market": "FOREX",
            "product_type": "forex",
            "currency": "USD",
            "is_active": true,
            "updated_at": "2026-01-13T11:19:59+08:00"
        },
        {
            "symbol": "AUDCHF",
            "name": "AUDCHF",
            "market": "FOREX",
            "product_type": "forex",
            "currency": "USD",
            "is_active": true,
            "updated_at": "2026-01-13T11:19:59+08:00"
        },
        {
            "symbol": "AUDCNY",
            "name": "AUDCNY",
            "market": "FOREX",
            "product_type": "forex",
            "currency": "USD",
            "is_active": true,
            "updated_at": "2026-01-13T11:19:59+08:00"
        },
        {
            "symbol": "AUDCZK",
            "name": "AUDCZK",
            "market": "FOREX",
            "product_type": "forex",
            "currency": "USD",
            "is_active": true,
            "updated_at": "2026-01-13T11:19:59+08:00"
        }
    ],
    "summary": {
        "total_products": 434,
        "by_market": {
            "FOREX": 434
        },
        "last_updated": "2026-01-13T11:19:59+08:00"
    },
    "cache_info": {
        "from_cache": true,
        "cached_at": "2026-01-13T11:19:59+08:00",
        "expires_at": "2026-01-13T11:49:59+08:00"
    },
    "pagination": {
        "limit": 5,
        "offset": 0,
        "count": 5
    }
}
```

## Notes
- Market codes are case-insensitive
- Symbol naming rules are documented in Data Specification
- The response example shows only 5 products for illustration; all listed stock symbols in US, HK, and CN markets are supported
