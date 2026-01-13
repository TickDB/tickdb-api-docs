---
title: 可用交易品種
description: 列出可交易的金融工具和支持的市場。
openapi: GET /v1/symbols/available
---

**GET** `/v1/symbols/available`

## 概述
查詢 TickDB 支持的所有可用交易品種。

## 支持的市場

- **FOREX** - 外匯市場
- **METALS** - 貴金屬
- **INDICES** - 市場指數
- **US** - 美國股票市場
- **HK** - 香港證券交易所
- **CN** - A股市場
- **CRYPTO** - 加密貨幣交易對

```bash
curl -H "X-API-Key: YOUR_API_KEY" \
     "https://api.tickdb.ai/v1/symbols/available?market=FOREX&limit=5"
```

## 響應示例

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

## 注意事項
- 市場代碼不區分大小寫
- 交易品種命名規則請參閱數據規範文檔
- 響應示例僅展示 5 個產品作為示意，US、HK、CN 三個股票市場實際上所有已上市的股票產品代碼均受支持
