---
title: 新聞詳情
description: 根據新聞 ID 查詢新聞正文或可用摘要。
openapi: "openapi.zh-Hant.yaml GET /v1/fundamentals/news/{news_id}"
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

- 使用新聞列表返回的 `news_id` 查詢詳情。若 `detail_status` 為 `pending`、`blocked` 或 `failed`，`body_text` 和 `body_html` 可能為 `null`；展示 `body_html` 前應安全過濾。

## 支持的市場

| 市場 | 示例 |
|---|---|
| 美股 | US |
| 港股 | HK |
| A股 | CN |

## 請求參數

| 參數 | 位置 | 是否必須 | 說明 |
|---|---|:---:|---|
| `news_id` | path | 是 | 新聞列表返回的不透明文章 ID，按字符串傳遞 |

## 請求示例

```bash
curl -H "X-API-Key: YOUR_API_KEY" \
  "https://api.tickdb.ai/v1/fundamentals/news/6288041"
```

## 返回字段說明

以下列出 `data` 中的字段；外層 `code=0` 表示成功。

| 字段 | 說明 |
|------|------|
| news_id | 新聞 ID。 |
| title | 新聞標題。 |
| description | 新聞摘要。 |
| published_at | 發布時間，RFC 3339 日期時間字符串（UTC）。 |
| detail_status | 正文詳情獲取狀態。 |
| content_scope | 可提供的內容范圍；excerpt 表示節選。 |
| body_text | 純文本正文；不可用時可能為 null。 |
| body_html | HTML 正文；不可用時可能為 null。 |

返回標題、摘要、發布時間、正文狀態、內容范圍、純文本正文和 HTML 正文。

`content_scope=excerpt` 表示摘要或節選，不代表完整全文。`body_html` 屬于外部內容，展示時應繼續執行安全過濾。
