---
title: 最新 K 線
description: 獲取當前週期正在形成的 K 線數據。
openapi: GET /v1/market/kline/latest
---

**GET** `/v1/market/kline/latest`

## 概述
獲取交易品種當前週期正在形成的 K 線數據。此接口返回尚未收盤的最新 K 線，適用於即時價格監控。

## 多市場示例

**外匯**：`EURUSD`、`GBPUSD`、`USDJPY`  
**貴金屬**：`XAUUSD`、`XAGUSD`  
**美股**：`AAPL.US`、`TSLA.US`、`MSFT.US`  
**港股**：`700.HK`、`9988.HK`、`3690.HK`  
**加密貨幣**：`BTCUSDT`、`ETHUSDT`、`ADAUSDT`

## 支持的時間間隔

- **分鐘**：`1m`、`5m`、`15m`、`30m`
- **小時**：`1h`、`4h`、`12h`
- **天**：`1d`、`1w`、`1M`

## 請求示例

```bash
curl -H "X-API-Key: YOUR_API_KEY" \
     "https://api.tickdb.ai/v1/market/kline/latest?symbols=AAPL.US,00700.HK&interval=3m"
```

## 響應示例

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
