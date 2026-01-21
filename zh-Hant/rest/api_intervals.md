---
title: K 線間隔
description: 查詢支持的 K 線時間間隔列表。
openapi: GET /v1/market/intervals/kline
---

**GET** `/v1/market/intervals/kline`

## 概述
查詢系統支持的 K 線時間間隔列表。用於在調用 K 線接口前確認可用的時間週期參數。

## 請求示例

```bash
curl -H "X-API-Key: YOUR_API_KEY" \
     "https://api.tickdb.ai/v1/market/intervals/kline"
```

## 響應示例

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

## 時間間隔格式

- **分鐘**: `1m`, `3m`, `5m`, `15m`, `30m`
- **小時**: `1h`, `2h`, `4h`
- **天**: `1d`
- **週**: `1w`
- **月**: `1M`