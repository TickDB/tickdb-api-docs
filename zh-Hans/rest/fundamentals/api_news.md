---
title: 个股新闻
description: 获取个股新闻列表、发布时间和正文可用状态。
openapi: "openapi.yaml GET /v1/fundamentals/news"
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

- 新闻列表不包含正文；使用 `news_id` 查询详情。`from` 和 `to` 必须同时提供或同时省略。

## 支持的市场

| 市场 | 示例 |
|---|---|
| 美股 | AAPL.US |
| 港股 | 700.HK |
| A股 | 600519.SH |

## 请求参数

| 参数 | 是否必须 | 说明 |
|---|:---:|---|
| `symbol` | 是 | 股票代码 |
| `type` | 否 | 产品类型，当前支持 `stock` |
| `limit` | 否 | 返回数量，默认 50，范围 `1–200` |
| `from` | 否 | 起始日期，格式 `YYYY-MM-DD` |
| `to` | 否 | 结束日期，格式 `YYYY-MM-DD` |

<Note>`from` 和 `to` 必须同时提供或同时省略。</Note>

## 请求示例

```bash
curl -H "X-API-Key: YOUR_API_KEY" \
  "https://api.tickdb.ai/v1/fundamentals/news?symbol=AAPL&type=stock&limit=20"
```

## 返回字段说明

以下列出 `data` 中的字段；外层 `code=0` 表示成功。

| 字段 | 说明 |
|------|------|
| symbol | 股票代码。 |
| limit | 本次请求的返回条数上限。 |
| news | 新闻列表。 |
| └─ news_id | 新闻 ID，可用于查询详情。 |
| └─ title | 新闻标题。 |
| └─ description | 新闻摘要。 |
| └─ published_at | 发布时间，RFC 3339 日期时间字符串（UTC）。 |
| └─ has_body | 是否有可用正文。 |

新闻列表返回 `news_id`、标题、摘要、发布时间和正文可用状态，不直接内嵌正文。使用 `news_id` 查询新闻详情。
