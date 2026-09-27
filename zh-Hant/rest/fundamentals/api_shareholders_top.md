---
title: 股東持倉
description: 查詢主要股東在不同報告期的持股情況、持倉變動及詳情可用狀態。
openapi: "openapi.zh-Hant.yaml GET /v1/fundamentals/shareholders/top"
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

- 響應包含多個報告期的股東記錄，不限於十位股東；只有 `detail_available=true` 的 `object_id` 可用於股東詳情接口。

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

## 請求示例

```bash
curl -H "X-API-Key: YOUR_API_KEY" \
  "https://api.tickdb.ai/v1/fundamentals/shareholders/top?symbol=AAPL&type=stock"
```

## 返回字段說明

以下列出 `data` 中的字段；外層 `code=0` 表示成功。

| 字段 | 說明 |
|------|------|
| symbol | 股票代碼。 |
| total | 匯總記錄數。 |
| periods | 可用報告期列表。 |
| info | 按報告期分組的股東持倉數據。 |
| └─ period | 報告期。 |
| └─ share_holders | 該報告期的股東列表。 |
| &nbsp;&nbsp;&nbsp;&nbsp;└─ object_id | 股東對象 ID。 |
| &nbsp;&nbsp;&nbsp;&nbsp;└─ name | 股東名稱。 |
| &nbsp;&nbsp;&nbsp;&nbsp;└─ shares_held | 持股數量，以字符串返回。 |
| &nbsp;&nbsp;&nbsp;&nbsp;└─ percent_shares_held | 持股比例，包含百分號。 |
| &nbsp;&nbsp;&nbsp;&nbsp;└─ shares_changed | 股份變動。 |
| &nbsp;&nbsp;&nbsp;&nbsp;└─ percent_shares_changed | 持股比例變化，包含百分號。 |
| &nbsp;&nbsp;&nbsp;&nbsp;└─ period | 該條記錄的報告期。 |
| &nbsp;&nbsp;&nbsp;&nbsp;└─ filing_date | 原始申報日期文本，例如 `2026/05/07`。 |
| members | 整理後的股東記錄。 |
| └─ shareholder_name | 股東名稱。 |
| └─ shareholder_type | 股東類型。 |
| └─ shares_held | 持股數量，以字符串返回。 |
| └─ percent_shares_held | 持股比例數值，不含百分號；無法轉換時為 `null`。 |
| └─ percent_shares_held_raw | 持股比例原始文本，包含百分號并可保留 `<0.01%` 等表示。 |
| └─ percent_shares_changed | 持股比例變化數值，不含百分號；無法轉換時為 `null`。 |
| └─ filing_date | 申報日期，格式 `YYYY-MM-DD`。 |
| └─ report_date | 報告日期，格式 `YYYY-MM-DD`；可能為 `null`。 |
| └─ object_id | 股東對象 ID。 |
| └─ detail_available | 是否可查詢股東詳情。 |

返回股東名稱、機構類型、持股數量、持股比例、報告日期、`object_id` 和 `detail_available`。

只有 `detail_available=true` 時，對應的 `object_id` 才可用於股東詳情接口。
