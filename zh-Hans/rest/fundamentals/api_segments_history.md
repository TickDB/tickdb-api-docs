---
title: 历史营收构成
description: 展示历史报告期按业务或地区划分的收入金额和占比。
openapi: "openapi.yaml GET /v1/fundamentals/segments/history"
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

- 可查询的历史报告期因公司而异；没有匹配数据时可能返回结构化 `404`。

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
| `category` | 否 | 营收构成维度：`business` 按业务；`regional` 按地区。不传返回全部可用维度。 |
| `report` | 否 | 报告周期：`qf` 季度报告、`saf` 半年度报告、`af` 年度报告 |
| `limit` | 否 | 返回条数，默认 200，范围 `1–1000` |

## 请求示例

```bash
curl -H "X-API-Key: YOUR_API_KEY" \
  "https://api.tickdb.ai/v1/fundamentals/segments/history?symbol=AAPL&type=stock&category=business&limit=200"
```

## 返回字段说明

以下列出 `data` 中的字段；外层 `code=0` 表示成功。

| 字段 | 说明 |
|------|------|
| symbol | 股票代码。 |
| report | 请求指定的报告周期；`qf` 季度报告、`saf` 半年度报告、`af` 年度报告，未指定时可为 null。 |
| segments | 历史报告期的营收构成明细。 |
| └─ segment_name | 业务类别或地区名称。 |
| └─ category | 该记录所属维度：`business` 按业务，`regional` 按地区。 |
| └─ value | 该业务类别或地区的收入金额。 |
| └─ total_revenue | 该报告期总收入。 |
| └─ percent | 该业务类别或地区收入占当期总收入的百分比，例如 `79.74` 表示 79.74%。 |
| └─ currency | 金额币种。 |
| └─ report | 该记录的报告周期：`qf` 季度报告、`saf` 半年度报告、`af` 年度报告。 |
| └─ period_start | 周期开始日期，格式 `YYYY-MM-DD`。 |
| └─ period_end | 周期结束日期，格式 `YYYY-MM-DD`。 |

每条明细对应一个报告期的业务类别或地区。筛选条件没有匹配数据时可能返回结构化 `404`。
