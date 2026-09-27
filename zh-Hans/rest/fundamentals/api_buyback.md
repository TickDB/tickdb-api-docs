---
title: 股票回购
description: 获取公司回购计划、执行情况和历史指标。
openapi: "openapi.yaml GET /v1/fundamentals/buyback"
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

- 估算类回购指标可能为 `null`。

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
  "https://api.tickdb.ai/v1/fundamentals/buyback?symbol=AAPL&type=stock"
```

## 返回字段说明

以下列出 `data` 中的字段；外层 `code=0` 表示成功。

| 字段 | 说明 |
|------|------|
| symbol | 股票代码。 |
| currency | 回购金额币种。 |
| ttm | 最近 12 个月回购指标。 |
| └─ net_buyback | 净回购额。 |
| └─ net_buyback_yield | 净回购收益率；可能为 null。 |
| └─ buyback_payout_ratio | 回购支付率；可能为 null。 |
| └─ buyback_to_cashflow_ratio | 回购额与现金流比率；可能为 null。 |
| history | 历史年度回购记录。 |
| └─ fiscal_year | 财年。 |
| └─ fiscal_year_range | 财年日期范围文本，例如 `2024/01/01 - 2024/12/31`。 |
| └─ currency | 该年度币种。 |
| └─ net_buyback | 净回购额。 |
| └─ net_buyback_yield | 净回购收益率；可能为 null。 |
| └─ net_buyback_growth_rate | 净回购增长率；可能为 null。 |

返回回购 TTM 指标与历史年度记录。
