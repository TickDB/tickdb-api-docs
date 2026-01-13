---
title: 市場行情
description: 獲取一個或多個交易品種的實時行情快照。
openapi: GET /v1/market/ticker
---

**GET** `/v1/market/ticker`

## 概述
獲取一個或多個交易品種的實時市場行情數據。

## 查詢參數

| 名稱    | 類型   | 必需 | 描述 |
|---------|--------|----------|-------------|
| symbols | string | 是      | 逗號分隔的交易品種，最多 50 個 |

## 多市場示例

點擊任意交易品種自動填充參數：

**加密貨幣**：`BTCUSDT`、`ETHUSDT`、`ADAUSDT`
**美股**：`AAPL.US`、`TSLA.US`、`MSFT.US`
**港股**：`700.HK`、`9988.HK`、`3690.HK`
**外匯**：`EURUSD`、`GBPUSD`、`USDJPY`
**指數**：`SPX`、`NDX`、`DJI`
**貴金屬**：`XAUUSD`、`XAGUSD`

## 請求示例

```bash
curl -X GET "https://api.tickdb.ai/v1/market/ticker?symbols=BTCUSDT,AAPL.US" \
  -H "X-API-Key: YOUR_API_KEY"
```

## 響應格式

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

## 響應示例

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
