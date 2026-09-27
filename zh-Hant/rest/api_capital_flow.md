---
title: 資金流向
description: 獲取股票的資金流向數據，包括主力資金、大單、中單、小單的流入流出情況。
openapi: "openapi.zh-Hant.yaml GET /v1/market/capital-flow"
contextual:
  options:
    - copy
    - view
---

## 套餐權限

| 套餐 | 可用 |
|---|:---:|
| 免費版 | ❌ |
| 基礎版 | ✅ |
| 專業版 | ✅ |
| 全量套餐（A 股、港股、美股） | ✅ |
| 企業版 | ✅ |

## 注意事項
- 資金流向數據基于成交量和價格變化計算
- 數據更新頻率取決于市場交易活躍度

## 支持的市場

| 市場 | 示例 |
|---|---|
| 美股 | AAPL.US, TSLA.US, MSFT.US |
| 港股 | 700.HK, 9988.HK, 3690.HK |
| A股 | 600519.SH, 000001.SZ |

## 請求參數

| 參數名 | 是否必須 | 描述 |
|--------|----------|------|
| symbol | 是 | 股票代碼 |
| type | 否 | 產品類型，可選。代碼無歧義時無需傳遞；若返回 `AMBIGUOUS_SYMBOL` 錯誤，按提示傳入對應值即可。可選值：`stock`、`indices`、`crypto`、`forex` |

## 返回字段說明

| 字段名 | 描述 |
|--------|------|
| symbol | 交易產品 |
| timestamp | 數據更新時間，Unix 時間戳，單位為秒 |
| intraday_flow | 資金流向數據 |
| └─ timestamp | 分鐘開始時間，Unix 時間戳，單位為秒 |
| └─ inflow | 凈流入 |
| distribution | 資金分布 |
| └─ timestamp | 數據更新時間，Unix 時間戳，單位為秒 |
| └─ capital_in | 流入資金 |
| &nbsp;&nbsp;&nbsp;&nbsp;└─ large | 大單 |
| &nbsp;&nbsp;&nbsp;&nbsp;└─ medium | 中單 |
| &nbsp;&nbsp;&nbsp;&nbsp;└─ small | 小單 |
| └─ capital_out | 流出資金 |
| &nbsp;&nbsp;&nbsp;&nbsp;└─ large | 大單 |
| &nbsp;&nbsp;&nbsp;&nbsp;└─ medium | 中單 |
| &nbsp;&nbsp;&nbsp;&nbsp;└─ small | 小單 |
