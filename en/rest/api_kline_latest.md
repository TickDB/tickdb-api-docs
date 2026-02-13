---
title: Real-time K-Line
description: Get real-time K-line data for the current time period that is being formed and updated.
openapi: GET /v1/market/kline/latest
---

**GET** `/v1/market/kline/latest`

## 📌 Description

This endpoint returns **K-line data for the current time period being formed**.

- Data updates continuously with trades
- When the current period ends, this K-line becomes historical
- For completed period data, use 👉 Historical K-Line: `/v1/market/kline`

---

## 🧠 Lifecycle Explanation

Period Start → Real-time Updates → Period End → Becomes Historical Data
Real-time K-line represents data in "ongoing period" status.

---

## 🎯 Use Cases

- Real-time chart display
- Current price monitoring
- Intraday dynamic updates

---

## ⚠️ Not Recommended For

- Historical backtesting
- Technical indicator statistics
- Fixed data storage

---

## 🔍 Difference from Historical K-Line

| Item | Real-time K-Line | Historical K-Line |
|------|------------------|-------------------|
| Time Range | Current period | Completed periods |
| Data Status | Continuously updating | Fixed |
| Use Case | Real-time display | Backtesting / Analysis |
| Updates | Yes | No |

---

## Multi-Market Examples

**Forex**: `EURUSD`, `GBPUSD`, `USDJPY`  
**Precious Metals**: `XAUUSD`, `XAGUSD`  
**US Stocks**: `AAPL.US`, `TSLA.US`, `MSFT.US`  
**Hong Kong Stocks**: `700.HK`, `9988.HK`, `3690.HK`  
**Cryptocurrency**: `BTCUSDT`, `ETHUSDT`, `ADAUSDT`

---

## Supported Time Intervals

- **Minutes**: `1m`, `5m`, `15m`, `30m`
- **Hours**: `1h`, `4h`, `12h`
- **Days**: `1d`, `1w`, `1M`

---

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
