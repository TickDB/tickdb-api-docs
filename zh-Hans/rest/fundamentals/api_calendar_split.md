---
title: 拆股日历
description: 查询拆股、合股等事件。
openapi: "openapi.yaml GET /v1/fundamentals/calendar/split"
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

- 此接口的事件类别固定为 `split`（拆股或合股），无需传入 `category`。
- `from` 默认为当前 UTC 日期；`to` 默认为 `from` 后 7 天。日期范围两端均包含。
- 默认每页 100 条，最多 500 条。第一页不传 `cursor`；后续保持筛选条件不变，并将上一页的 `page.next_cursor` 原样传入，直到其为 `null`。若首次未传日期，后续页请使用首响应的 `data.from`、`data.to` 固定日期范围。
- API Key 仅允许部分市场时，必须传入已获准的 `market`；无对应事件时返回空 `events` 数组。

## 支持的市场

| 市场 | 示例 |
|---|---|
| 美股 | US |
| 港股 | HK |
| A股 | CN |

## 请求参数

| 参数 | 必填 | 说明 |
|---|:---:|---|
| `from` | 否 | 起始日期，格式 `YYYY-MM-DD` |
| `to` | 否 | 结束日期，格式 `YYYY-MM-DD` |
| `market` | 否* | 市场过滤：`US`、`HK`、`CN`；市场受限的 API Key 必填 |
| `symbols` | 否 | 股票代码，英文逗号分隔，最多 50 个 |
| `limit` | 否 | 每页数量，`1–500`，默认 `100` |
| `cursor` | 否 | 下一页游标；第一页不传 |

## 请求示例

```bash
curl -H "X-API-Key: YOUR_API_KEY" \
  "https://api.tickdb.ai/v1/fundamentals/calendar/split?from=2026-09-21&to=2026-09-28&market=US&limit=100"
```

## 返回字段说明

成功响应包含顶层 `code`、`data` 和 `page`。

| 字段 | 说明 |
|---|---|
| code | 业务状态码，成功为 `0`。 |
| data | 当前页的日期范围和事件数据。 |
| └─ from | 查询起始日期，`YYYY-MM-DD`。 |
| └─ to | 查询结束日期，`YYYY-MM-DD`。 |
| └─ events | 当前页事件列表；无事件时为空数组。 |
| &nbsp;&nbsp;└─ event_datetime | 事件时间，UTC 日期时间字符串。 |
| &nbsp;&nbsp;└─ market | 所属市场。 |
| &nbsp;&nbsp;└─ symbol | 关联产品代码；不适用时可能为空。 |
| &nbsp;&nbsp;└─ category | 事件细分类别，可能细于请求类别。 |
| &nbsp;&nbsp;└─ event_type | 事件类型。 |
| &nbsp;&nbsp;└─ content | 事件内容。 |
| &nbsp;&nbsp;└─ counter_name | 关联名称；可能为 `null`。 |
| &nbsp;&nbsp;└─ currency | 币种；可能为 `null`。 |
| &nbsp;&nbsp;└─ star | 重要程度。 |
| &nbsp;&nbsp;└─ date_type | 事件日期类型；可能为 `null`。 |
| &nbsp;&nbsp;└─ data | 可选的事件附加数据数组。 |
| &nbsp;&nbsp;&nbsp;&nbsp;└─ key | 附加数据键名。 |
| &nbsp;&nbsp;&nbsp;&nbsp;└─ value_raw | 原始值；可能为 `null`。 |
| &nbsp;&nbsp;&nbsp;&nbsp;└─ value_text | 展示值；可能为 `null`。 |
| &nbsp;&nbsp;&nbsp;&nbsp;└─ value_type | 值类型。 |
| page | 分页信息。 |
| └─ next_cursor | 下一页游标；末页为 `null`。 |
| └─ limit | 当前分页上限。 |
