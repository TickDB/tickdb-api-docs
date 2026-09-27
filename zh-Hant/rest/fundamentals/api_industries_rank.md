---
title: 行業指標排行
description: 查詢指定市場按行業指標排序的結果。
openapi: "openapi.zh-Hant.yaml GET /v1/fundamentals/industries/rank"
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

- 此接口按 `market` 查詢，不使用股票代碼；返回的 `industry_counter_id` 可用於行業分類層級接口。
- `market` 不區分大小寫，文檔中的市場代碼統一使用大寫形式。

## 支持的市場

| 市場 | 示例 |
|---|---|
| 美股 | US |
| 港股 | HK |
| A股 | CN |

## 請求參數

| 參數 | 是否必須 | 說明 |
|---|:---:|---|
| `market` | 是 | 市場代碼：`US` 美股、`HK` 港股、`CN` A股 |
| `limit` | 否 | 返回條數，默認 50，范圍 `1–200` |

## 請求示例

```bash
curl -H "X-API-Key: YOUR_API_KEY" \
  "https://api.tickdb.ai/v1/fundamentals/industries/rank?market=US&limit=50"
```

## 返回字段說明

以下列出 `data` 中的字段；外層 `code=0` 表示成功。

| 字段 | 說明 |
|------|------|
| market | 查詢市場。 |
| indicator | 排行指標。 |
| sort_type | 排序方式。 |
| items | 行業指標排行列表。 |
| └─ industry_counter_id | 行業節點 ID。 |
| └─ industry_name | 行業名稱。 |
| └─ rank | 名次。 |
| └─ value | 行業總市值。 |
| └─ change_percent | 漲跌幅。 |

返回行業 ID、行業名稱、排名、行業總市值及變化率；行業 ID 可用於查詢行業分類層級。
