---
title: 股东持仓详情
description: 根据股东对象 ID 查询单个股东的持仓和交易明细。
openapi: "openapi.yaml GET /v1/fundamentals/shareholders/detail"
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

- `object_id` 应取自股东持仓接口中 `detail_available=true` 的记录；否则可能返回 `404`。

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
| `object_id` | 是 | 来自股东持仓接口且 `detail_available=true` 的对象 ID |

## 请求示例

```bash
curl -H "X-API-Key: YOUR_API_KEY" \
  "https://api.tickdb.ai/v1/fundamentals/shareholders/detail?symbol=AAPL&type=stock&object_id=452583"
```

## 返回字段说明

以下列出 `data` 中的字段；外层 `code=0` 表示成功。

| 字段 | 说明 |
|------|------|
| symbol | 股票代码。 |
| object_id | 股东对象 ID。 |
| name | 股东名称。 |
| title | 股东或机构标题。 |
| holding_summary | 分报告期的持仓汇总。 |
| └─ accum_buy | 该报告期累计买入数量。 |
| └─ accum_sell | 该报告期累计卖出数量。 |
| └─ percent_stock_price_changed | 该报告期股价变化比例，包含百分号。 |
| └─ period | 报告期。 |
| └─ stock_price | 该报告期对应股价。 |
| holding_periods | 可用持仓报告期列表。 |
| holding_details | 逐报告期持仓明细。 |
| └─ filing_date | 原始申报日期文本，例如 `2026/05/07`。 |
| └─ name | 股东名称。 |
| └─ object_id | 股东对象 ID。 |
| └─ percent_shares_changed | 持股比例变化，包含百分号。 |
| └─ percent_shares_held | 持股比例，包含百分号。 |
| └─ period | 报告期。 |
| └─ shares_changed | 股份变动数量。 |
| └─ shares_held | 持股数量。 |
| trading_periods | 可用交易统计期间。 |
| tradings | 分期间交易汇总。 |
| └─ accum_buy | 该期间累计买入数量。 |
| └─ accum_sell | 该期间累计卖出数量。 |
| └─ net_buy | 该期间净买入数量。 |
| └─ period | 交易统计期间。 |
| └─ trading_details | 该期间的交易明细列表。 |

返回股东持仓汇总、持仓期间、持仓明细、交易期间和交易汇总。没有可用详情时可能返回结构化 `404`。
