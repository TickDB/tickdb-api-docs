---
title: 歷史 K 線
description: 獲取已結束時間週期的歷史 K 線數據。
openapi: GET /v1/market/kline
---

## 注意事項
- 本接口返回已結束週期的歷史K線數據，數據已固定不會變化
- 適用於策略回測、技術指標計算、數據歸檔存儲
- 若需獲取當前週期內正在更新的K線，請使用實時K線：`/v1/market/kline/latest`

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
| symbol | 是 | 交易產品代碼 |
| interval | 是 | K線週期，可選值：1m, 5m, 15m, 30m, 1h, 2h, 4h, 1d, 1w, 1M |
| limit | 否 | 返回記錄數，默認100，最大1000 |
| start_time | 否 | 開始時間戳（毫秒） |
| end_time | 否 | 結束時間戳（毫秒） |

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
