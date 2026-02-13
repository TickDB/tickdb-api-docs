---
title: 歷史 K 線
description: 獲取已結束時間週期的歷史 K 線數據。
openapi: GET /v1/market/kline
---

**GET** `/v1/market/kline`

---

## 📌 接口說明

本接口返回**已結束時間週期的歷史 K 線數據**。

- 數據已固定，不會再發生變化
- 適用於回測與歷史分析
- 若需獲取當前週期內正在更新的 K 線，請使用 👉實時K線： `/v1/market/kline/latest`

---

## 🧠 生命週期說明

週期開始 → 實時更新 → 週期結束 → 進入歷史數據
歷史 K 線表示「週期已結束」的穩定數據。

---

## 🎯 適用場景

- 策略回測
- 技術指標計算
- 數據歸檔存儲

---

## 🔍 與實時 K 線的區別

| 項目 | 歷史 K 線 | 實時 K 線 |
|------|------------|------------|
| 時間範圍 | 已結束週期 | 當前週期 |
| 數據狀態 | 固定不變 | 會持續變化 |
| 適用場景 | 分析 / 回測 | 實時行情 |
| 是否更新 | 不會 | 會 |

---

## 多市場示例

**加密貨幣**：`BTCUSDT`、`ETHUSDT`、`ADAUSDT`  
**美股**：`AAPL.US`、`TSLA.US`、`MSFT.US`  
**港股**：`700.HK`、`9988.HK`、`3690.HK`  
**外匯**：`EURUSD`、`GBPUSD`、`USDJPY`  
**貴金屬**：`XAUUSD`、`XAGUSD`

---

## 支持的時間間隔

- **分鐘**：`1m`、`5m`、`15m`、`30m`
- **小時**：`1h`、`4h`、`12h`
- **天**：`1d`、`1w`、`1M`

---

## 請求示例

```bash
curl -H "X-API-Key: YOUR_API_KEY" \
     "https://api.tickdb.ai/v1/market/kline?symbol=AAPL.US&interval=1m&limit=5"
```

## 響應示例

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
