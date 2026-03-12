---
title: 股票信息
description: 獲取股票的詳細信息，包括公司名稱、行業分類、市值等基本面數據。
openapi: GET /v1/market/stock-info
---

## 注意事項
- 返回的信息可能因數據源而異

## 支持的市場

**美股**、**港股**、**A股**

示例：
- 美股：AAPL.US、TSLA.US、MSFT.US
- 港股：700.HK、9988.HK、3690.HK
- A股：000001.SH、000001.SZ

## 請求參數

| 參數名 | 是否必須 | 描述 |
|--------|----------|------|
| symbols | 是 | 股票代碼，多個用逗號分隔，最多50個 |

## 返回字段說明

| 字段 | 說明 |
|------|------|
| symbol | 交易產品 |
| name_cn | 中文簡體標的名稱 |
| name_en | 英文標的名稱 |
| name_hk | 中文繁體標的名稱 |
| exchange | 標的所屬交易所 |
| currency | 交易幣種（CNY/USD/HKD） |
| lot_size | 每手股數 |
| total_shares | 總股本 |
| circulating_shares | 流通股本 |
| hk_shares | 港股股本（僅港股） |
| eps | 每股盈利 |
| eps_ttm | 每股盈利（TTM） |
| bps | 每股淨資產 |
| dividend_yield | 股息（如果標的的股息是按年度計算，可提供的年度計算類型） |
| stock_derivatives | 可選值：1 - 期權，2 - 輪證 |
