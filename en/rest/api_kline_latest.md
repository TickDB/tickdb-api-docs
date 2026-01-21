---
title: Latest Kline
description: Get the kline data currently being formed in the current period.
openapi: GET /v1/market/kline/latest
---

**GET** `/v1/market/kline/latest`

## Overview
Get the kline data currently being formed for trading symbols. This endpoint returns the unclosed latest kline, ideal for real-time price monitoring.

## Multi-Market Examples

**Forex**: `EURUSD`, `GBPUSD`, `USDJPY`  
**Precious Metals**: `XAUUSD`, `XAGUSD`  
**US Stocks**: `AAPL.US`, `TSLA.US`, `MSFT.US`  
**HK Stocks**: `700.HK`, `9988.HK`, `3690.HK`  
**Crypto**: `BTCUSDT`, `ETHUSDT`, `ADAUSDT`

## Supported Intervals

- **Minutes**: `1m`, `5m`, `15m`, `30m`
- **Hours**: `1h`, `4h`, `12h`
- **Days**: `1d`, `1w`, `1M`

## Request Example

```bash
curl -H "X-API-Key: YOUR_API_KEY" \
     "https://api.tickdb.ai/v1/market/kline/latest?symbols=AAPL.US,00700.HK&interval=3m"
```

## Response Example

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
