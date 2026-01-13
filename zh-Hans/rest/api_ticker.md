---
title: 市场行情
description: 获取一个或多个交易品种的实时行情快照。
openapi: GET /v1/market/ticker
---

**GET** `/v1/market/ticker`

## 概述
获取一个或多个交易品种的实时市场行情数据。

## 查询参数

| 名称    | 类型   | 必需 | 描述 |
|---------|--------|----------|-------------|
| symbols | string | 是      | 逗号分隔的交易品种，最多 50 个 |

## 多市场示例

点击任意交易品种自动填充参数：

**加密货币**：`BTCUSDT`、`ETHUSDT`、`ADAUSDT`
**美股**：`AAPL.US`、`TSLA.US`、`MSFT.US`
**港股**：`700.HK`、`9988.HK`、`3690.HK`
**外汇**：`EURUSD`、`GBPUSD`、`USDJPY`
**指数**：`SPX`、`NDX`、`DJI`
**贵金属**：`XAUUSD`、`XAGUSD`

## 请求示例

```bash
curl -X GET "https://api.tickdb.ai/v1/market/ticker?symbols=BTCUSDT,AAPL.US" \
  -H "X-API-Key: YOUR_API_KEY"
```

## 响应格式

```json
{
  "code": 0,
  "message": "success",
  "data": [
    {
      "symbol": "BTCUSDT",
      "price": "43250.50",
      "change": "1250.30",
      "change_percent": "2.98",
      "volume": "15420.5",
      "high": "43800.00",
      "low": "41900.00",
      "timestamp": 1703123456789
    }
  ]
}
```

```bash
curl -H "X-API-Key: YOUR_API_KEY" \
     "https://api.tickdb.ai/v1/market/ticker?symbols=AAPL.US,700.HK,BTCUSDT,XAGUSD"
```

## 响应示例

```json
{
    "code": 0,
    "message": "success",
    "data": [
        {
            "symbol": "AAPL.US",
            "last_price": "259.62",
            "volume_24h": "45263767",
            "high_24h": "260.26",
            "low_24h": "259.5",
            "timestamp": 1768265997000
        },
        {
            "symbol": "700.HK",
            "last_price": "628",
            "volume_24h": "10154124",
            "high_24h": "0",
            "low_24h": "626.5",
            "timestamp": 1768273479000
        },
        {
            "symbol": "BTCUSDT",
            "last_price": "91170.59000000",
            "volume_24h": "14308.45245000",
            "high_24h": "92519.95000000",
            "low_24h": "90128.44000000",
            "price_change_24h": "-991.91000000",
            "price_change_percent_24h": "-1.076",
            "timestamp": 1768273481005
        },
        {
            "symbol": "XAGUSD",
            "last_price": "85.76650",
            "bid_price": "85.72820",
            "ask_price": "85.80480",
            "timestamp": 1768273481000
        }
    ]
}
```
