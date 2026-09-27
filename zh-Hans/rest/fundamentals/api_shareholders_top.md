---
title: 股东持仓
description: 查询主要股东在不同报告期的持股情况、持仓变动及详情可用状态。
openapi: "openapi.yaml GET /v1/fundamentals/shareholders/top"
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

- 响应包含多个报告期的股东记录，不限于十位股东；只有 `detail_available=true` 的 `object_id` 可用于股东详情接口。

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

## 请求示例

```bash
curl -H "X-API-Key: YOUR_API_KEY" \
  "https://api.tickdb.ai/v1/fundamentals/shareholders/top?symbol=AAPL&type=stock"
```

## 返回字段说明

以下列出 `data` 中的字段；外层 `code=0` 表示成功。

| 字段 | 说明 |
|------|------|
| symbol | 股票代码。 |
| total | 汇总记录数。 |
| periods | 可用报告期列表。 |
| info | 按报告期分组的股东持仓数据。 |
| └─ period | 报告期。 |
| └─ share_holders | 该报告期的股东列表。 |
| &nbsp;&nbsp;&nbsp;&nbsp;└─ object_id | 股东对象 ID。 |
| &nbsp;&nbsp;&nbsp;&nbsp;└─ name | 股东名称。 |
| &nbsp;&nbsp;&nbsp;&nbsp;└─ shares_held | 持股数量，以字符串返回。 |
| &nbsp;&nbsp;&nbsp;&nbsp;└─ percent_shares_held | 持股比例，包含百分号。 |
| &nbsp;&nbsp;&nbsp;&nbsp;└─ shares_changed | 股份变动。 |
| &nbsp;&nbsp;&nbsp;&nbsp;└─ percent_shares_changed | 持股比例变化，包含百分号。 |
| &nbsp;&nbsp;&nbsp;&nbsp;└─ period | 该条记录的报告期。 |
| &nbsp;&nbsp;&nbsp;&nbsp;└─ filing_date | 原始申报日期文本，例如 `2026/05/07`。 |
| members | 整理后的股东记录。 |
| └─ shareholder_name | 股东名称。 |
| └─ shareholder_type | 股东类型。 |
| └─ shares_held | 持股数量，以字符串返回。 |
| └─ percent_shares_held | 持股比例数值，不含百分号；无法转换时为 `null`。 |
| └─ percent_shares_held_raw | 持股比例原始文本，包含百分号并可保留 `<0.01%` 等表示。 |
| └─ percent_shares_changed | 持股比例变化数值，不含百分号；无法转换时为 `null`。 |
| └─ filing_date | 申报日期，格式 `YYYY-MM-DD`。 |
| └─ report_date | 报告日期，格式 `YYYY-MM-DD`；可能为 `null`。 |
| └─ object_id | 股东对象 ID。 |
| └─ detail_available | 是否可查询股东详情。 |

返回股东名称、机构类型、持股数量、持股比例、报告日期、`object_id` 和 `detail_available`。

只有 `detail_available=true` 时，对应的 `object_id` 才可用于股东详情接口。
