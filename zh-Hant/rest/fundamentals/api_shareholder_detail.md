---
title: 股東持倉詳情
description: 根據股東對象 ID 查詢單個股東的持倉和交易明細。
openapi: "openapi.zh-Hant.yaml GET /v1/fundamentals/shareholders/detail"
contextual:
  options:
    - copy
    - view
---

## 套餐權限

| 套餐 | 可用 |
|---|:---:|
| 免費版 | ❌ |
| 基礎版 | ❌ |
| 專業版 | ✅ |
| 全量套餐（A 股、港股、美股） | ✅ |
| 企業版 | ✅ |

## 注意事項

- `object_id` 應取自股東持倉接口中 `detail_available=true` 的記錄；否則可能返回 `404`。

## 支持的市場

| 市場 | 示例 |
|---|---|
| 美股 | AAPL.US |
| 港股 | 700.HK |
| A股 | 600519.SH |

## 請求參數

| 參數 | 是否必須 | 說明 |
|---|:---:|---|
| `symbol` | 是 | 股票代碼 |
| `type` | 否 | 產品類型，當前支持 `stock` |
| `object_id` | 是 | 來自股東持倉接口且 `detail_available=true` 的對象 ID |

## 請求示例

```bash
curl -H "X-API-Key: YOUR_API_KEY" \
  "https://api.tickdb.ai/v1/fundamentals/shareholders/detail?symbol=AAPL&type=stock&object_id=452583"
```

## 返回字段說明

以下列出 `data` 中的字段；外層 `code=0` 表示成功。

| 字段 | 說明 |
|------|------|
| symbol | 股票代碼。 |
| object_id | 股東對象 ID。 |
| name | 股東名稱。 |
| title | 股東或機構標題。 |
| holding_summary | 分報告期的持倉匯總。 |
| └─ accum_buy | 該報告期累計買入數量。 |
| └─ accum_sell | 該報告期累計賣出數量。 |
| └─ percent_stock_price_changed | 該報告期股價變化比例，包含百分號。 |
| └─ period | 報告期。 |
| └─ stock_price | 該報告期對應股價。 |
| holding_periods | 可用持倉報告期列表。 |
| holding_details | 逐報告期持倉明細。 |
| └─ filing_date | 原始申報日期文本，例如 `2026/05/07`。 |
| └─ name | 股東名稱。 |
| └─ object_id | 股東對象 ID。 |
| └─ percent_shares_changed | 持股比例變化，包含百分號。 |
| └─ percent_shares_held | 持股比例，包含百分號。 |
| └─ period | 報告期。 |
| └─ shares_changed | 股份變動數量。 |
| └─ shares_held | 持股數量。 |
| trading_periods | 可用交易統計期間。 |
| tradings | 分期間交易匯總。 |
| └─ accum_buy | 該期間累計買入數量。 |
| └─ accum_sell | 該期間累計賣出數量。 |
| └─ net_buy | 該期間凈買入數量。 |
| └─ period | 交易統計期間。 |
| └─ trading_details | 該期間的交易明細列表。 |

返回股東持倉匯總、持倉期間、持倉明細、交易期間和交易匯總。沒有可用詳情時可能返回結構化 `404`。
