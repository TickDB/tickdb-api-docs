---
title: 财务数据 TTM
description: 查询最近四个有效单季汇总的近12个月利润表或现金流量表指标。
openapi: "openapi.yaml GET /v1/fundamentals/financials/ttm"
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

- TTM 指滚动近12个月，由最近四个有效单季数据汇总；仅支持利润表 `IS` 和现金流量表 `CF`。

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
| `kind` | 是 | 报表类型：`IS` 利润表或 `CF` 现金流量表 |

<Note>TTM 仅对利润表 `IS` 和现金流量表 `CF` 定义，传入资产负债表 `BS` 会返回参数错误。</Note>

## 请求示例

```bash
curl -H "X-API-Key: YOUR_API_KEY" \
  "https://api.tickdb.ai/v1/fundamentals/financials/ttm?symbol=AAPL&type=stock&kind=IS"
```

## 返回字段说明

以下列出 `data` 中的字段；外层 `code=0` 表示成功。

| 字段 | 说明 |
|------|------|
| symbol | 股票代码。 |
| kind | 报表类型：`IS` 利润表或 `CF` 现金流量表。 |
| rows | 滚动近12个月的财务指标记录。 |
| └─ kind | 该记录所属报表类型：`IS` 利润表或 `CF` 现金流量表。 |
| └─ field_name | 财务字段代码；[查看财务字段字典](./financial_fields_dictionary)。 |
| └─ field_display | 展示名称。 |
| └─ indicator_title | 指标标题。 |
| └─ value | 对应指标的近12个月汇总值，以字符串返回。 |
| └─ currency | 币种。 |
| └─ is_percent | 是否为百分比字段。 |
| └─ fiscal_year | 对应财年。 |
| └─ fiscal_period | 对应报告期。 |
| └─ period_type | `ttm`，表示滚动近12个月的汇总数据。 |
| └─ period_end | 期末日期，格式 `YYYY-MM-DD`。 |
| └─ yoy | 同比变化；可能为 null。 |
| └─ ratio | 比率；可能为 null。 |

返回最近四个有效单季汇总后的滚动近12个月财务指标。
