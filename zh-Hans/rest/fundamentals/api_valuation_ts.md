---
title: 历史估值
description: 查询市盈率（PE）按日或按月的历史数值。
openapi: "openapi.yaml GET /v1/fundamentals/valuation/ts"
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

- `points` 中每个元素为 `[时间, 指标值]`，不是带字段名的对象；时间是带时区信息的 RFC 3339 字符串。
- 未指定日期范围时，`daily` 默认查询最近一年，`monthly` 默认查询最近五年。查询范围内没有记录时返回 HTTP 404、错误码 `40405`，不是成功的空数组。

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
| `granularity` | 否 | `daily` 或 `monthly`，默认 `daily` |
| `from` | 否 | 起始日期，格式 `YYYY-MM-DD` |
| `to` | 否 | 结束日期，格式 `YYYY-MM-DD` |

## 请求示例

```bash
curl -H "X-API-Key: YOUR_API_KEY" \
  "https://api.tickdb.ai/v1/fundamentals/valuation/ts?symbol=AAPL&type=stock&granularity=monthly"
```

## 返回字段说明

以下列出 `data` 中的字段；外层 `code=0` 表示成功。

| 字段 | 说明 |
|------|------|
| symbol | 股票代码。 |
| metric | 估值指标，当前为 `PE`（市盈率）。 |
| granularity | 时间粒度：日度或月度。 |
| from | 查询范围起始日期，格式 `YYYY-MM-DD`。 |
| to | 查询范围结束日期，格式 `YYYY-MM-DD`。 |
| points | 历史估值记录；每个元素是 `[时间, 指标值]`。 |
| └─ [0] | RFC 3339 日期时间字符串，包含时区信息。 |
| └─ [1] | 对应指标值，可以是字符串、数值或 `null`。 |

返回市盈率（PE）在查询时间范围内的日度或月度历史数值。
