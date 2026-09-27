---
title: 行业指标排行
description: 查询指定市场按行业指标排序的结果。
openapi: "openapi.yaml GET /v1/fundamentals/industries/rank"
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

- 此接口按 `market` 查询，不使用股票代码；返回的 `industry_counter_id` 可用于行业分类层级接口。
- `market` 不区分大小写，文档中的市场代码统一使用大写形式。

## 支持的市场

| 市场 | 示例 |
|---|---|
| 美股 | US |
| 港股 | HK |
| A股 | CN |

## 请求参数

| 参数 | 是否必须 | 说明 |
|---|:---:|---|
| `market` | 是 | 市场代码：`US` 美股、`HK` 港股、`CN` A股 |
| `limit` | 否 | 返回条数，默认 50，范围 `1–200` |

## 请求示例

```bash
curl -H "X-API-Key: YOUR_API_KEY" \
  "https://api.tickdb.ai/v1/fundamentals/industries/rank?market=US&limit=50"
```

## 返回字段说明

以下列出 `data` 中的字段；外层 `code=0` 表示成功。

| 字段 | 说明 |
|------|------|
| market | 查询市场。 |
| indicator | 排行指标。 |
| sort_type | 排序方式。 |
| items | 行业指标排行列表。 |
| └─ industry_counter_id | 行业节点 ID。 |
| └─ industry_name | 行业名称。 |
| └─ rank | 名次。 |
| └─ value | 行业总市值。 |
| └─ change_percent | 涨跌幅。 |

返回行业 ID、行业名称、排名、行业总市值及变化率；行业 ID 可用于查询行业分类层级。
