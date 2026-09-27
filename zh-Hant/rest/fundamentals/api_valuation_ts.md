---
title: 歷史估值
description: 查詢市盈率（PE）按日或按月的歷史數值。
openapi: "openapi.zh-Hant.yaml GET /v1/fundamentals/valuation/ts"
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

- `points` 中每個元素為 `[時間, 指標值]`，不是帶字段名的對象；時間是帶時區信息的 RFC 3339 字符串。
- 未指定日期範圍時，`daily` 默認查詢最近一年，`monthly` 默認查詢最近五年。查詢範圍內沒有記錄時返回 HTTP 404、錯誤碼 `40405`，不是成功的空數組。

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
| `granularity` | 否 | `daily` 或 `monthly`，默認 `daily` |
| `from` | 否 | 起始日期，格式 `YYYY-MM-DD` |
| `to` | 否 | 結束日期，格式 `YYYY-MM-DD` |

## 請求示例

```bash
curl -H "X-API-Key: YOUR_API_KEY" \
  "https://api.tickdb.ai/v1/fundamentals/valuation/ts?symbol=AAPL&type=stock&granularity=monthly"
```

## 返回字段說明

以下列出 `data` 中的字段；外層 `code=0` 表示成功。

| 字段 | 說明 |
|------|------|
| symbol | 股票代碼。 |
| metric | 估值指標，當前為 `PE`（市盈率）。 |
| granularity | 時間粒度：日度或月度。 |
| from | 查詢範圍起始日期，格式 `YYYY-MM-DD`。 |
| to | 查詢範圍結束日期，格式 `YYYY-MM-DD`。 |
| points | 歷史估值記錄；每個元素是 `[時間, 指標值]`。 |
| └─ [0] | RFC 3339 日期時間字符串，包含時區信息。 |
| └─ [1] | 對應指標值，可以是字符串、數值或 `null`。 |

返回市盈率（PE）在查詢時間范圍內的日度或月度歷史數值。
