---
title: 新闻详情
description: 根据新闻 ID 查询新闻正文或可用摘要。
openapi: "openapi.yaml GET /v1/fundamentals/news/{news_id}"
contextual:
  options:
    - copy
    - view
---

## 套餐权限

| 套餐 | 可用 |
|---|:---:|
| 免费版 | ❌ |
| 基础版 | ❌ |
| 专业版 | ✅ |
| 全量套餐（A 股、港股、美股） | ✅ |
| 企业版 | ✅ |

## 注意事项

- 使用新闻列表返回的 `news_id` 查询详情。若 `detail_status` 为 `pending`、`blocked` 或 `failed`，`body_text` 和 `body_html` 可能为 `null`；展示 `body_html` 前应安全过滤。

## 支持的市场

| 市场 | 示例 |
|---|---|
| 美股 | US |
| 港股 | HK |
| A股 | CN |

## 请求参数

| 参数 | 位置 | 是否必须 | 说明 |
|---|---|:---:|---|
| `news_id` | path | 是 | 新闻列表返回的不透明文章 ID，按字符串传递 |

## 请求示例

```bash
curl -H "X-API-Key: YOUR_API_KEY" \
  "https://api.tickdb.ai/v1/fundamentals/news/6288041"
```

## 返回字段说明

以下列出 `data` 中的字段；外层 `code=0` 表示成功。

| 字段 | 说明 |
|------|------|
| news_id | 新闻 ID。 |
| title | 新闻标题。 |
| description | 新闻摘要。 |
| published_at | 发布时间，RFC 3339 日期时间字符串（UTC）。 |
| detail_status | 正文详情获取状态。 |
| content_scope | 可提供的内容范围；excerpt 表示节选。 |
| body_text | 纯文本正文；不可用时可能为 null。 |
| body_html | HTML 正文；不可用时可能为 null。 |

返回标题、摘要、发布时间、正文状态、内容范围、纯文本正文和 HTML 正文。

`content_scope=excerpt` 表示摘要或节选，不代表完整全文。`body_html` 属于外部内容，展示时应继续执行安全过滤。
