---
title: K 线（蜡烛图）
description: 获取交易品种的历史 K 线数据。
openapi: GET /v1/market/kline
---

**GET** `/v1/market/kline`

## 概述
获取交易品种的历史 K 线（蜡烛图）数据。

## 多市场示例

**加密货币**：`BTCUSDT`、`ETHUSDT`、`ADAUSDT`
**美股**：`AAPL.US`、`TSLA.US`、`MSFT.US`
**港股**：`700.HK`、`9988.HK`、`3690.HK`
**外汇**：`EURUSD`、`GBPUSD`、`USDJPY`
**贵金属**：`XAUUSD`、`XAGUSD`

## 支持的时间间隔

- **分钟**：`1m`、`5m`、`15m`、`30m`
- **小时**：`1h`、`4h`、`12h`
- **天**：`1d`、`1w`、`1M`

## 请求示例

```bash
curl -H "X-API-Key: YOUR_API_KEY" \
     "https://api.tickdb.ai/v1/market/kline?symbol=AAPL.US&interval=1m&limit=5"
```

## 响应示例

```json
{
    "code": 0,
    "message": "success",
    "data": {
        "symbol": "AAPL.US",
        "interval": "1m",
        "klines": [
            {
                "time": 1768251300000,
                "open": "260.29",
                "high": "260.41",
                "low": "260.09",
                "close": "260.09",
                "volume": "129288",
                "quote_volume": "33640306.64"
            },
            {
                "time": 1768251360000,
                "open": "260.08",
                "high": "260.17",
                "low": "260.01",
                "close": "260.15",
                "volume": "124012",
                "quote_volume": "32256761.32"
            },
            {
                "time": 1768251420000,
                "open": "260.15",
                "high": "260.31",
                "low": "260.072",
                "close": "260.23",
                "volume": "111445",
                "quote_volume": "28998434.78"
            },
            {
                "time": 1768251480000,
                "open": "260.23",
                "high": "260.32",
                "low": "260.16",
                "close": "260.23",
                "volume": "127622",
                "quote_volume": "33211923.87"
            },
            {
                "time": 1768251540000,
                "open": "260.22",
                "high": "260.35",
                "low": "260.19",
                "close": "260.25",
                "volume": "285977",
                "quote_volume": "74429327.28"
            }
        ]
    }
}
```
