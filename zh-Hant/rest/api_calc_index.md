---
title: 市場指標
description: 獲取股票的綜合市場指標，包括行情統計、估值指標、資金流向以及衍生品相關指標。
openapi: GET /v1/market/calc-index
---

## 注意事項
- 指標數據基於實時行情和歷史數據計算

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

| 字段名 | 描述 |
|--------|------|
| symbol | 交易品種代碼 |
| last_done | 最新價 |
| change_val | 漲跌額 |
| change_rate | 漲跌幅 |
| volume | 成交量 |
| turnover | 成交額 |
| ytd_change_rate | 年初至今漲幅 |
| turnover_rate | 換手率 |
| total_market_value | 總市值 |
| capital_flow | 資金流向 |
| amplitude | 振幅 |
| volume_ratio | 量比 |
| pe_ttm_ratio | 市盈率 (TTM) |
| pb_ratio | 市淨率 |
| dividend_ratio_ttm | 股息率 (TTM) |
| five_day_change_rate | 五日漲幅 |
| ten_day_change_rate | 十日漲幅 |
| half_year_change_rate | 半年漲幅 |
| five_minutes_change_rate | 五分鐘漲幅 |
