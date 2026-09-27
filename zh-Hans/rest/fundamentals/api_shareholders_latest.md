---
title: 最新股东结构
description: 获取当前股东结构快照。
openapi: "openapi.yaml GET /v1/fundamentals/shareholders/latest"
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

- 报告日期代表股东数据所属披露期，不一定是当前交易日。

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
  "https://api.tickdb.ai/v1/fundamentals/shareholders/latest?symbol=AAPL&type=stock"
```

## 返回字段说明

以下列出 `data` 中的字段；外层 `code=0` 表示成功。

| 字段 | 说明 |
|------|------|
| symbol | 股票代码。 |
| report_date | 报告日期，格式 `YYYY-MM-DD`。 |
| total | 股东记录总数。 |
| members | 股东记录列表。 |
| └─ shareholder_name | 股东名称。 |
| └─ percent_of_shares | 持股比例数值，不含百分号。 |
| └─ shares_changed | 较上一报告期的股份变动数量。 |
| └─ report_date | 该条记录的报告日期，格式 `YYYY-MM-DD`。 |

返回股东名称、持股比例、股份变化和报告日期等当前股东结构信息。
