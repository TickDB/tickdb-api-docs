---
title: 公司行动
description: 查询拆股、并股、配股、代码变更等公司行动事件。
openapi: "openapi.yaml GET /v1/fundamentals/corp-actions"
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

- 公司行动事件可跨多个历史日期；`is_recent` 标记近期事件，不代表事件一定发生在查询当天。

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
| `from` | 否 | 起始日期，格式 `YYYY-MM-DD` |
| `to` | 否 | 结束日期，格式 `YYYY-MM-DD` |

## 请求示例

```bash
curl -H "X-API-Key: YOUR_API_KEY" \
  "https://api.tickdb.ai/v1/fundamentals/corp-actions?symbol=AAPL&type=stock"
```

## 返回字段说明

以下列出 `data` 中的字段；外层 `code=0` 表示成功。

| 字段 | 说明 |
|------|------|
| symbol | 股票代码。 |
| events | 公司行动事件列表。 |
| └─ event_id | 事件 ID。 |
| └─ action_code | 行动代码。 |
| └─ act_type | 行动类型。 |
| └─ act_desc | 行动说明。 |
| └─ event_date | 事件日期，格式 `YYYY-MM-DD`。 |
| └─ date_type | 日期类型。 |
| └─ date_zone | 时区。 |
| └─ is_recent | 是否为近期事件。 |

返回事件日期、事件类型、行动代码和事件说明等公司行动信息。
