---
title: 最近成交
description: 获取交易品种的最新成交记录。
openapi: GET /v1/market/trades
---

**GET** `/v1/market/trades`

## 概述
获取交易品种的最近成交执行记录。

## 多市场示例

**加密货币**：`BTCUSDT`、`ETHUSDT`、`ADAUSDT`
**美股**：`AAPL.US`、`TSLA.US`、`MSFT.US`
**港股**：`700.HK`、`9988.HK`、`3690.HK`

```bash
curl -H "X-API-Key: YOUR_API_KEY" \
     "https://api.tickdb.ai/v1/market/trades?symbol=700.HK&limit=5"
```

## 响应示例

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

## 注意事项
- side：买入（buy）/ 卖出（sell）
- 时间戳单位为毫秒（UTC）
