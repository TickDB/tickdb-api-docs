---
title: 可用交易品种
description: 列出可交易的金融工具和支持的市场。
openapi: GET /v1/symbols/available
---

**GET** `/v1/symbols/available`

## 概述
查询 TickDB 支持的所有可用交易品种。

## 支持的市场

- **FOREX** - 外汇市场
- **METALS** - 贵金属
- **INDICES** - 市场指数
- **US** - 美国股票市场
- **HK** - 香港证券交易所
- **CN** - A股市场
- **CRYPTO** - 加密货币交易对

```bash
curl -H "X-API-Key: YOUR_API_KEY" \
     "https://api.tickdb.ai/v1/symbols/available?market=FOREX&limit=5"
```

## 响应示例

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

## 注意事项
- 市场代码不区分大小写
- 交易品种命名规则请参阅数据规范文档
- 响应示例仅展示 5 个产品作为示意，US、HK、CN 三个股票市场实际上所有已上市的股票产品代码均受支持
