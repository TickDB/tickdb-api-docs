---
title: Historical K-Line
description: Get historical K-line data for completed time periods.
openapi: GET /v1/market/kline
---

**GET** `/v1/market/kline`

---

## 📌 Description

This endpoint returns **historical K-line data for completed time periods**.

- Data is fixed and will not change
- Suitable for backtesting and historical analysis
- For real-time K-line data in the current period, use 👉 Real-time K-Line: `/v1/market/kline/latest`

---

## 🧠 Lifecycle Explanation

Period Start → Real-time Updates → Period End → Becomes Historical Data
Historical K-line represents stable data for "completed periods".

---

## 🎯 Use Cases

- Strategy backtesting
- Technical indicator calculation
- Data archiving and storage

---

## 🔍 Difference from Real-time K-Line

| Item | Historical K-Line | Real-time K-Line |
|------|-------------------|------------------|
| Time Range | Completed periods | Current period |
| Data Status | Fixed | Continuously updating |
| Use Case | Analysis / Backtesting | Real-time quotes |
| Updates | No | Yes |

---

## Multi-Market Examples

**Cryptocurrency**: `BTCUSDT`, `ETHUSDT`, `ADAUSDT`  
**US Stocks**: `AAPL.US`, `TSLA.US`, `MSFT.US`  
**Hong Kong Stocks**: `700.HK`, `9988.HK`, `3690.HK`  
**Forex**: `EURUSD`, `GBPUSD`, `USDJPY`  
**Precious Metals**: `XAUUSD`, `XAGUSD`

---

## Supported Time Intervals

- **Minutes**: `1m`, `5m`, `15m`, `30m`
- **Hours**: `1h`, `4h`, `12h`
- **Days**: `1d`, `1w`, `1M`

---

## Request Example

```bash
curl -H "X-API-Key: YOUR_API_KEY" \
     "https://api.tickdb.ai/v1/market/kline?symbol=AAPL.US&interval=1m&limit=5"
```

## Response Example

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
