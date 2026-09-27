---
title: 歷史營收構成
description: 展示歷史報告期按業務或地區劃分的收入金額和占比。
openapi: "openapi.zh-Hant.yaml GET /v1/fundamentals/segments/history"
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

- 可查詢的歷史報告期因公司而異；沒有匹配數據時可能返回結構化 `404`。

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
| `category` | 否 | 營收構成維度：`business` 按業務；`regional` 按地區。不傳返回全部可用維度。 |
| `report` | 否 | 報告周期：`qf` 季度報告、`saf` 半年度報告、`af` 年度報告 |
| `limit` | 否 | 返回條數，默認 200，范圍 `1–1000` |

## 請求示例

```bash
curl -H "X-API-Key: YOUR_API_KEY" \
  "https://api.tickdb.ai/v1/fundamentals/segments/history?symbol=AAPL&type=stock&category=business&limit=200"
```

## 返回字段說明

以下列出 `data` 中的字段；外層 `code=0` 表示成功。

| 字段 | 說明 |
|------|------|
| symbol | 股票代碼。 |
| report | 請求指定的報告周期；`qf` 季度報告、`saf` 半年度報告、`af` 年度報告，未指定時可為 null。 |
| segments | 歷史報告期的營收構成明細。 |
| └─ segment_name | 業務類別或地區名稱。 |
| └─ category | 該記錄所屬維度：`business` 按業務，`regional` 按地區。 |
| └─ value | 該業務類別或地區的收入金額。 |
| └─ total_revenue | 該報告期總收入。 |
| └─ percent | 該業務類別或地區收入占當期總收入的百分比，例如 `79.74` 表示 79.74%。 |
| └─ currency | 金額幣種。 |
| └─ report | 該記錄的報告周期：`qf` 季度報告、`saf` 半年度報告、`af` 年度報告。 |
| └─ period_start | 周期開始日期，格式 `YYYY-MM-DD`。 |
| └─ period_end | 周期結束日期，格式 `YYYY-MM-DD`。 |

每條明細對應一個報告期的業務類別或地區。篩選條件沒有匹配數據時可能返回結構化 `404`。
