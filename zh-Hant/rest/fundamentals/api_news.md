---
title: 個股新聞
description: 獲取個股新聞列表、發布時間和正文可用狀態。
openapi: "openapi.zh-Hant.yaml GET /v1/fundamentals/news"
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

- 新聞列表不包含正文；使用 `news_id` 查詢詳情。`from` 和 `to` 必須同時提供或同時省略。

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
| `limit` | 否 | 返回數量，默認 50，范圍 `1–200` |
| `from` | 否 | 起始日期，格式 `YYYY-MM-DD` |
| `to` | 否 | 結束日期，格式 `YYYY-MM-DD` |

<Note>`from` 和 `to` 必須同時提供或同時省略。</Note>

## 請求示例

```bash
curl -H "X-API-Key: YOUR_API_KEY" \
  "https://api.tickdb.ai/v1/fundamentals/news?symbol=AAPL&type=stock&limit=20"
```

## 返回字段說明

以下列出 `data` 中的字段；外層 `code=0` 表示成功。

| 字段 | 說明 |
|------|------|
| symbol | 股票代碼。 |
| limit | 本次請求的返回條數上限。 |
| news | 新聞列表。 |
| └─ news_id | 新聞 ID，可用於查詢詳情。 |
| └─ title | 新聞標題。 |
| └─ description | 新聞摘要。 |
| └─ published_at | 發布時間，RFC 3339 日期時間字符串（UTC）。 |
| └─ has_body | 是否有可用正文。 |

新聞列表返回 `news_id`、標題、摘要、發布時間和正文可用狀態，不直接內嵌正文。使用 `news_id` 查詢新聞詳情。
