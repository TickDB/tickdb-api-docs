---
title: K线时间间隔
description: 获取支持的K线时间间隔。
openapi: GET /v1/market/intervals/kline
---

**GET** `/v1/market/intervals/kline`

## 概述
获取历史数据查询支持的K线（蜡烛图）时间间隔列表。

## 请求示例

```bash
curl -H "X-API-Key: YOUR_API_KEY" \
     "https://api.tickdb.ai/v1/market/intervals/kline"
```

## 响应示例

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

## 时间间隔格式

- **分钟**: `1m`, `3m`, `5m`, `15m`, `30m`
- **小时**: `1h`, `2h`, `4h`
- **天**: `1d`
- **周**: `1w`
- **月**: `1M`
