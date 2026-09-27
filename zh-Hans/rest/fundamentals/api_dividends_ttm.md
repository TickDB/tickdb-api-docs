---
title: 股息TTM
description: TTM 指截至统计日的最近 12 个月；查询这段时间内按币种汇总的每股现金股息。
openapi: "openapi.yaml GET /v1/fundamentals/dividends/ttm"
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

- 统计窗口按除息日计算：`ex_date > window_start_exclusive` 且 `ex_date <= as_of_date`；不同币种不合并。

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
| `as_of` | 否 | 统计截止日，格式 `YYYY-MM-DD`；默认当前日期 |

## 请求示例

```bash
curl -H "X-API-Key: YOUR_API_KEY" \
  "https://api.tickdb.ai/v1/fundamentals/dividends/ttm?symbol=AAPL&type=stock"
```

## 返回字段说明

以下列出 `data` 中的字段；外层 `code=0` 表示成功。

| 字段 | 说明 |
|------|------|
| symbol | 股票代码。 |
| as_of_date | TTM 统计截止日，格式 `YYYY-MM-DD`。 |
| window_start_exclusive | 最近 12 个月窗口的排他起点，格式 `YYYY-MM-DD`。 |
| currencies | 按币种分别汇总的现金股息列表。 |
| └─ currency | 分红币种。 |
| └─ normal_cash_dps_ttm | 普通现金每股股息 TTM。 |
| └─ special_cash_dps_ttm | 特别现金每股股息 TTM。 |
| └─ total_cash_dps_ttm | 现金每股股息合计；不是股息率。 |
| └─ normal_event_count | 普通现金分红事件次数。 |
| └─ special_event_count | 特别现金分红事件次数。 |

按币种返回普通股息、特殊股息、合计现金每股股息及事件数量。统计窗口为截至 `as_of` 的最近 12 个月。
