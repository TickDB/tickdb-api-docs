---
title: 實時 K 線
description: 獲取當前時間週期內正在形成並實時更新的 K 線數據。
openapi: GET /v1/market/kline/latest
---

## 注意事項
- 本接口返回當前週期內正在形成的K線數據，數據會隨著成交持續更新
- 適用於實時行情圖表展示、當前價格監控、分時動態更新
- 不建議用於歷史回測、技術指標統計、固定數據存儲
- 若需查詢已結束週期的數據，請使用歷史K線：`/v1/market/kline`

## 支持的市場

**外匯**、**貴金屬**、**指數**、**美股**、**港股**、**A股**、**加密貨幣**

示例：
- 外匯：EURUSD、GBPUSD、USDJPY
- 貴金屬：XAUUSD、XAGUSD
- 指數：SPX、NDX、DJI
- 美股：AAPL.US、TSLA.US、MSFT.US
- 港股：700.HK、9988.HK、3690.HK
- A股：000001.SH、000001.SZ
- 加密貨幣：BTCUSDT、ETHUSDT、ADAUSDT

## 請求參數

| 參數名 | 是否必須 | 描述 |
|--------|----------|------|
| symbols | 是 | 交易產品代碼，多個用逗號分隔，例如：AAPL.US,00700.HK |
| interval | 是 | K線週期，可選值：1m, 3m, 5m, 15m, 30m, 1h, 4h, 12h, 1d, 1w, 1M |

## 返回字段說明

| 字段 | 說明 |
|------|------|
| symbol | 交易產品 |
| interval | K線週期 |
| klines | K線數據數組 |
| └─ time | K線時間戳（毫秒） |
| └─ open | 開盤價 |
| └─ high | 最高價 |
| └─ low | 最低價 |
| └─ close | 收盤價 |
| └─ volume | 成交量 |
| └─ quote_volume | 成交額 |
