---
title: 持股基金
description: 查询哪些基金披露持有指定股票，以及该股票在各基金持仓中的比例；支持分页查询。
openapi: "openapi.yaml GET /v1/fundamentals/fund-holdings/latest"
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

- 持股信息以基金披露日期为准，不一定反映当前交易日持仓；分页信息位于响应外层 `page`。

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
| `limit` | 否 | 单页数量，默认 200，范围 `1–500` |
| `cursor` | 否 | 分页游标。第一页不传；查询下一页时，填写上一页响应顶层 `page.next_cursor` 的值 |

## 请求示例

```bash
curl -H "X-API-Key: YOUR_API_KEY" \
  "https://api.tickdb.ai/v1/fundamentals/fund-holdings/latest?symbol=AAPL&type=stock&limit=3"
```

## 返回字段说明

以下列出 `data` 及分页字段；外层 `code=0` 表示成功。

| 字段 | 说明 |
|------|------|
| symbol | 股票代码。 |
| total | 持有该股票的基金记录总数。 |
| members | 披露持有该股票的基金列表。 |
| └─ fund_code | 基金代码。 |
| └─ fund_symbol | 标准化基金代码。 |
| └─ fund_name | 基金名称。 |
| └─ position_ratio | 该股票在对应基金持仓中的比例。 |
| └─ currency | 币种。 |
| └─ report_date | 报告日期，格式 `YYYY-MM-DD`。 |
| page | 响应外层的分页信息。 |
| └─ next_cursor | 下一页游标。非空时原样传入下一次请求的 `cursor`；为 `null` 时表示已到最后一页。 |
| └─ limit | 当前分页上限。 |

`total` 是符合条件的记录总数，`members` 只包含当前页。查询下一页时，保持 `symbol`、`type` 和 `limit` 不变，将本页响应顶层的 `page.next_cursor` 原样作为下一次请求的 `cursor` 参数；游标是供接口使用的不透明字符串，不需要自行解码或计算。当 `page.next_cursor` 为 `null` 时停止翻页。

以上第一页请求使用 `limit=3`。假设响应顶层的分页信息为：

```json
{ "page": { "next_cursor": "Mw", "limit": 3 } }
```

则下一页这样请求：

```bash
curl -H "X-API-Key: YOUR_API_KEY" \
  "https://api.tickdb.ai/v1/fundamentals/fund-holdings/latest?symbol=AAPL&type=stock&limit=3&cursor=Mw"
```

`Mw` 仅是示例；实际请求应使用上一页返回的游标。
