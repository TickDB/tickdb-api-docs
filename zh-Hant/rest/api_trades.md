---
title: 最近成交
description: 獲取交易品種的最新成交記錄。
openapi: GET /v1/market/trades
---

**GET** `/v1/market/trades`

## 概述
獲取交易品種的最近成交執行記錄。

## 多市場示例

**加密貨幣**：`BTCUSDT`、`ETHUSDT`、`ADAUSDT`
**美股**：`AAPL.US`、`TSLA.US`、`MSFT.US`
**港股**：`700.HK`、`9988.HK`、`3690.HK`

```bash
curl -H "X-API-Key: YOUR_API_KEY" \
     "https://api.tickdb.ai/v1/market/trades?symbol=700.HK&limit=5"
```

## 響應示例

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

## 注意事項
- side：買入（buy）/ 賣出（sell）
- 時間戳單位為毫秒（UTC）
