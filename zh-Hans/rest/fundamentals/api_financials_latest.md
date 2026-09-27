---
title: 近期财务报表
description: 查询最近若干期利润表、资产负债表或现金流量表的指标数据。
openapi: "openapi.yaml GET /v1/fundamentals/financials/latest"
contextual:
  options:
    - copy
    - view
---

## 套餐权限

| 套餐 | 可用 |
|---|:---:|
| 免费版 | ❌ |
| 基础版 | ✅ |
| 专业版 | ✅ |
| 全量套餐（A 股、港股、美股） | ✅ |
| 企业版 | ✅ |

## 注意事项

- `rows` 是字段级记录；同一期报表通常对应多条记录，`n` 表示期数而非返回行数。

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
| `kind` | 是 | 报表类型：`IS` 利润表、`BS` 资产负债表、`CF` 现金流量表 |
| `n` | 否 | 返回期数，范围 `1–20` |
| `period_type` | 否 | 财务周期类型：`q1` 第一季度、`q2` 第二季度、`q3` 第三季度、`q4` 第四季度、`saf` 半年度、`af` 年度；多个值用逗号分隔 |

## 请求示例

```bash
curl -H "X-API-Key: YOUR_API_KEY" \
  "https://api.tickdb.ai/v1/fundamentals/financials/latest?symbol=AAPL&type=stock&kind=IS&n=4"
```

## 返回字段说明

以下列出 `data` 中的字段；外层 `code=0` 表示成功。

| 字段 | 说明 |
|------|------|
| symbol | 股票代码。 |
| kind | 报表类型：`IS` 利润表、`BS` 资产负债表、`CF` 现金流量表。 |
| rows | 最近若干期的报表指标记录；同一期通常有多条。 |
| └─ kind | 该记录所属报表类型：`IS` 利润表、`BS` 资产负债表、`CF` 现金流量表。 |
| └─ field_name | 财务字段代码；[查看财务字段字典](./financial_fields_dictionary)。 |
| └─ field_display | 展示名称。 |
| └─ indicator_title | 指标标题。 |
| └─ value | 字段数值，以字符串返回。 |
| └─ currency | 币种。 |
| └─ is_percent | 是否为百分比字段。 |
| └─ fiscal_year | 财年。 |
| └─ fiscal_period | 报告期。 |
| └─ period_type | 财务周期类型：`q1` 第一季度、`q2` 第二季度、`q3` 第三季度、`q4` 第四季度、`saf` 半年度、`af` 年度。 |
| └─ period_end | 期末日期，格式 `YYYY-MM-DD`。 |
| └─ yoy | 同比变化；可能为 null。 |
| └─ ratio | 比率；可能为 null。 |

按报表类型返回近期各报告期的指标数据；`n` 控制报告期数，不是指标记录条数。
