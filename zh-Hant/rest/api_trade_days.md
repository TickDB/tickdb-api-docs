---
title: 交易日曆
description: 查詢指定市場在特定時間範圍內的交易日列表，用於判斷某日是否為交易日。
openapi: GET /v1/market/trade-days
---

## 注意事項
- 日期格式必須為 YYYYMMDD（如：20260201）
- 返回的交易日不包括週末和節假日
- 市場代碼不區分大小寫

## 支持的市場

- **US** - 美國股票市場
- **HK** - 香港證券交易所
- **CN** - A股市場

## 請求參數

| 參數名 | 是否必須 | 描述 |
|--------|----------|------|
| market | 是 | 市場代碼，可選值：US, HK, CN |
| beg_day | 是 | 開始日期，格式：YYYYMMDD |
| end_day | 是 | 結束日期，格式：YYYYMMDD |

## 返回字段說明

| 字段 | 說明 |
|------|------|
| market | 市場代碼 |
| trade_days | 全日交易日列表，使用 YYYYMMDD 格式 |
| half_trade_days | 半日交易日列表（僅半天交易），使用 YYYYMMDD 格式 |
