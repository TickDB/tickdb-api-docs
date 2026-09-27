---
title: 分红记录
description: 查询股票的分红记录，包括历史及已知的未来分红事件，支持日期、类型和分页筛选。
openapi: "openapi.yaml GET /v1/fundamentals/dividends"
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

- `amount` 是每股现金分红金额的十进制字符串；非现金分派时可能为 `null`。分页游标位于响应外层 `page`。

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
| `dividend_type` | 否 | `normal`、`special`、`non_cash`、`unknown` |
| `from` | 否 | 起始日期，格式 `YYYY-MM-DD` |
| `to` | 否 | 结束日期，格式 `YYYY-MM-DD` |
| `limit` | 否 | 单页数量，默认 100，范围 `1–500` |
| `cursor` | 否 | 下一页游标 |

## 请求示例

```bash
curl -H "X-API-Key: YOUR_API_KEY" \
  "https://api.tickdb.ai/v1/fundamentals/dividends?symbol=AAPL&type=stock&limit=100"
```

## 返回字段说明

以下列出 `data` 及分页字段；外层 `code=0` 表示成功。

| 字段 | 说明 |
|------|------|
| symbol | 股票代码。 |
| events | 符合筛选条件的分红记录列表。 |
| └─ event_id | 事件 ID。 |
| └─ type | 分红类别。 |
| └─ distribution_kind | 分派形式。 |
| └─ amount | 每股现金金额；非现金分派时可能为 null。 |
| └─ stock_distribution_ratio | 每股送股或转增比例；例如 `0.7` 表示每 1 股送转 0.7 股，即每 10 股送转 7 股。 |
| └─ currency | 币种。 |
| └─ declaration_date | 公告日，格式 `YYYY-MM-DD`；可能为 `null`。 |
| └─ record_date | 股权登记日，格式 `YYYY-MM-DD`；可能为 `null`。 |
| └─ ex_date | 除权除息日，格式 `YYYY-MM-DD`；可能为 `null`。 |
| └─ payment_date | 支付日，格式 `YYYY-MM-DD`；可能为 `null`。 |
| └─ description | 事件说明。 |
| └─ detail_level | 详情级别。 |
| page | 响应外层的分页信息。 |
| └─ next_cursor | 下一页游标；末页为空。 |
| └─ limit | 当前分页上限。 |

每条记录包含分红类型、每股金额、币种及相关日期；未来日期不代表分红已经完成。
