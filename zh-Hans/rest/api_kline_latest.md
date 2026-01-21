---
title: 最新 K 线
description: 获取当前周期正在形成的 K 线数据。
openapi: GET /v1/market/kline/latest
---

**GET** `/v1/market/kline/latest`

## 概述
获取交易品种当前周期正在形成的 K 线数据。此接口返回尚未收盘的最新 K 线，适用于实时价格监控。

## 多市场示例

**外汇**：`EURUSD`、`GBPUSD`、`USDJPY`
**贵金属**：`XAUUSD`、`XAGUSD`
**美股**：`AAPL.US`、`TSLA.US`、`MSFT.US`
**港股**：`700.HK`、`9988.HK`、`3690.HK`
**加密货币**：`BTCUSDT`、`ETHUSDT`、`ADAUSDT`

## 支持的时间间隔

- **分钟**：`1m`、`5m`、`15m`、`30m`
- **小时**：`1h`、`4h`、`12h`
- **天**：`1d`、`1w`、`1M`

## 请求示例

```bash
curl -H "X-API-Key: YOUR_API_KEY" \
     "https://api.tickdb.ai/v1/market/kline/latest?symbols=AAPL.US,00700.HK&interval=3m"
```

## 响应示例

```json
{
    "code": 0,
    "message": "success",
    "data": [
        {
            "symbol": "AAPL.US",
            "interval": "3m",
            "klines": [
                {
                    "time": 1768942620000,
                    "open": "246.035",
                    "high": "246.93",
                    "low": "245.58",
                    "close": "246.7",
                    "volume": "3608863",
                    "quote_volume": "889235872.74"
                }
            ]
        },
        {
            "symbol": "00700.HK",
            "interval": "3m",
            "klines": [
                {
                    "time": 1768982400000,
                    "open": "602",
                    "high": "602",
                    "low": "601.5",
                    "close": "601.5",
                    "volume": "35900",
                    "quote_volume": "21599833.33"
                }
            ]
        }
    ]
}
```
