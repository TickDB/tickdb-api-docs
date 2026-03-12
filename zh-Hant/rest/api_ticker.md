---
title: 行情快照
description: 獲取一個或多個交易品種的實時市場行情數據。
openapi: GET /v1/market/ticker
---

## 注意事項
- 最多可同時查詢 50 個交易品種
- 時間戳單位為毫秒（UTC）

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
| symbols | 是 | 交易產品代碼，多個用逗號分隔，最多50個 |

## 返回字段說明

| 字段 | 說明 |
|------|------|
| symbol | 交易產品 |
| last_price | 最新成交價 |
| volume_24h | 24小時成交量 |
| high_24h | 24小時最高價 |
| low_24h | 24小時最低價 |
| price_change_24h | 24小時價格變化 |
| price_change_percent_24h | 24小時價格變化百分比 |
| timestamp | 數據時間戳（毫秒，UTC） |
