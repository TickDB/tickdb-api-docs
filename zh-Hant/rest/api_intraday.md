---
title: 當日分時
description: 獲取股票當日的分時數據，包括每分鐘的價格、成交量、成交額等信息。
openapi: "openapi.zh-Hant.yaml GET /v1/market/intraday"
contextual:
  options:
    - copy
    - view
---

## 套餐權限

| 套餐 | 可用 |
|---|:---:|
| 免費版 | ✅ |
| 基礎版 | ✅ |
| 專業版 | ✅ |
| 全量套餐（A 股、港股、美股） | ✅ |
| 企業版 | ✅ |

## 注意事項
- 數據為當日開盤至當前時間的分時數據
- 非交易時段以實際可用數據為準，可能返回已有分時數據，也可能返回空數組。

## 支持的市場

| 市場 | 示例 |
|---|---|
| 美股 | AAPL.US, TSLA.US, MSFT.US |
| 港股 | 700.HK, 9988.HK, 3690.HK |
| A股 | 600519.SH, 000001.SZ |

## 請求參數

| 參數名 | 是否必須 | 描述 |
|--------|----------|------|
| symbols | 是 | 股票代碼，多個用逗號分隔，最多50個 |
| type | 否 | 產品類型，可選。代碼無歧義時無需傳遞；若返回 `AMBIGUOUS_SYMBOL` 錯誤，按提示傳入對應值即可。可選值：`stock`、`indices`、`crypto`、`forex` |

## 返回字段說明

| 字段名 | 描述 |
|--------|------|
| symbol | 交易產品 |
| type | 產品類型，當前為 `stock` |
| lines | 分時數據 |
| └─ timestamp | 當前分鐘的開始時間，Unix 時間戳，單位為毫秒 |
| └─ price | 當前分鐘的收盤價格 |
| └─ volume | 成交量 |
| └─ turnover | 成交額 |
| └─ avg_price | 均價 |
