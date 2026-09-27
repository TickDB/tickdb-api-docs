---
title: 年度财务报表
description: 查询最近若干年的利润表、资产负债表或现金流量表指标数据。
openapi: "openapi.yaml GET /v1/fundamentals/financials/annual"
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

- `rows` 是字段级记录；同一年度可能对应多条财务指标。

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
| `n` | 否 | 返回年度数，范围 `1–20` |

## 请求示例

```bash
curl -H "X-API-Key: YOUR_API_KEY" \
  "https://api.tickdb.ai/v1/fundamentals/financials/annual?symbol=AAPL&type=stock&kind=IS&n=5"
```

## 返回字段说明

以下列出 `data` 中的字段；外层 `code=0` 表示成功。

| 字段 | 说明 |
|------|------|
| symbol | 股票代码。 |
| kind | 报表类型：`IS` 利润表、`BS` 资产负债表、`CF` 现金流量表。 |
| rows | 各年度的报表指标记录；同一年度通常有多条。 |
| └─ kind | 该记录所属报表类型：`IS` 利润表、`BS` 资产负债表、`CF` 现金流量表。 |
| └─ field_name | 财务字段代码；[查看财务字段字典](./financial_fields_dictionary)。 |
| └─ field_display | 展示名称。 |
| └─ indicator_title | 指标标题。 |
| └─ value | 字段数值，以字符串返回。 |
| └─ currency | 币种。 |
| └─ is_percent | 是否为百分比字段。 |
| └─ fiscal_year | 财年。 |
| └─ fiscal_period | 报告期。 |
| └─ period_type | 财务周期类型；年度数据通常为 `af`（年度），也可能以 `q4`（第四季度）表示年末报告期。 |
| └─ period_end | 期末日期，格式 `YYYY-MM-DD`。 |
| └─ yoy | 同比变化；可能为 null。 |
| └─ ratio | 比率；可能为 null。 |

按报表类型返回年度指标数据，适合比较不同年度；`n` 控制年度数。
