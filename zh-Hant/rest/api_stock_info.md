---
title: 股票信息
description: 獲取股票名稱、交易所、幣種、股本和每股指標等基礎信息。
openapi: "openapi.zh-Hant.yaml GET /v1/market/stock-info"
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

- 單次最多查詢 500 個股票代碼。
- 返回字段會因市場和個股的數據情況而異；條件字段沒有可用數據時不會返回。

## 支持的市場

| 市場 | 示例 |
|---|---|
| 美股 | AAPL.US, TSLA.US, MSFT.US |
| 港股 | 700.HK, 9988.HK, 3690.HK |
| A股 | 600519.SH, 000001.SZ, 300750.SZ |

## 請求參數

| 參數名 | 是否必須 | 描述 |
|--------|----------|------|
| symbols | 是 | 股票代碼，多個用逗號分隔，最多 500 個 |
| type | 否 | 產品類型，可選。代碼無歧義時無需傳遞；若返回 `AMBIGUOUS_SYMBOL` 錯誤，按提示傳入對應值即可。可選值：`stock`、`indices`、`crypto`、`forex` |

## 返回字段說明

| 字段 | 說明 |
|------|------|
| symbol | 交易產品 |
| name_cn | 中文簡體標的名稱 |
| name_en | 英文標的名稱；港股、美股返回 |
| name_hk | 中文繁體標的名稱；港股、美股返回 |
| exchange | 標的所屬交易所 |
| currency | 交易幣種（CNY/USD/HKD） |
| lot_size | 每手股數 |
| total_shares | 總股本；數據可用時返回 |
| circulating_shares | 流通股本；數據可用時返回 |
| hk_shares | H股股本；港股及同時發行H股的A股公司返回 |
| eps | 每股收益；數據可用時返回 |
| eps_ttm | 最近十二個月每股收益；港股、美股數據可用時返回 |
| bps | 每股淨資產；數據可用時返回 |
| dividend_yield | 股息率；港股、美股數據可用時返回 |
| stock_derivatives | 支持的衍生品類型數組；`1` 表示期權，`2` 表示輪證，港股、美股數據可用時返回 |
| board | A股所屬板塊或證券分類代碼；A股返回 |
