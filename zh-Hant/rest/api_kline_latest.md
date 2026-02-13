---
title: 實時 K 線
description: 獲取當前時間週期內正在形成並實時更新的 K 線數據。
openapi: GET /v1/market/kline/latest
---

**GET** `/v1/market/kline/latest`

## 📌 接口說明

本接口返回**當前時間週期內正在形成的 K 線數據**。

- 數據會隨著成交持續更新
- 當前時間週期結束後，該 K 線將成為歷史 K 線
- 若需查詢已結束週期的數據，請使用 👉歷史K線： `/v1/market/kline`

---

## 🧠 生命週期說明

週期開始 → 實時更新 → 週期結束 → 進入歷史數據
實時 K 線表示「週期進行中」的數據狀態。

---

## 🎯 適用場景

- 實時行情圖表展示
- 當前價格監控
- 分時動態更新

---

## ⚠️ 不建議用於

- 歷史回測
- 技術指標統計
- 固定數據存儲

---

## 🔍 與歷史 K 線的區別

| 項目 | 實時 K 線 | 歷史 K 線 |
|------|------------|------------|
| 時間範圍 | 當前週期 | 已結束週期 |
| 數據狀態 | 會持續變化 | 固定不變 |
| 適用場景 | 實時展示 | 回測 / 分析 |
| 是否更新 | 會 | 不會 |

---

## 多市場示例

**外匯**：`EURUSD`、`GBPUSD`、`USDJPY`  
**貴金屬**：`XAUUSD`、`XAGUSD`  
**美股**：`AAPL.US`、`TSLA.US`、`MSFT.US`  
**港股**：`700.HK`、`9988.HK`、`3690.HK`  
**加密貨幣**：`BTCUSDT`、`ETHUSDT`、`ADAUSDT`

---

## 支持的時間間隔

- **分鐘**：`1m`、`5m`、`15m`、`30m`
- **小時**：`1h`、`4h`、`12h`
- **天**：`1d`、`1w`、`1M`

---

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
