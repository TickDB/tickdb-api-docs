---
title: 资金流向
description: 获取股票的资金流向数据，包括主力资金、大单、中单、小单的流入流出情况。
openapi: "openapi.yaml GET /v1/market/capital-flow"
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
- 资金流向数据基于成交量和价格变化计算
- 数据更新频率取决于市场交易活跃度

## 支持的市场

| 市场 | 示例 |
|---|---|
| 美股 | AAPL.US, TSLA.US, MSFT.US |
| 港股 | 700.HK, 9988.HK, 3690.HK |
| A股 | 600519.SH, 000001.SZ |

## 请求参数

| 参数名 | 是否必须 | 描述 |
|--------|----------|------|
| symbol | 是 | 股票代码 |
| type | 否 | 产品类型，可选。代码无歧义时无需传递；若返回 `AMBIGUOUS_SYMBOL` 错误，按提示传入对应值即可。可选值：`stock`、`indices`、`crypto`、`forex` |

## 返回字段说明

| 字段名 | 描述 |
|--------|------|
| symbol | 交易产品 |
| timestamp | 数据更新时间，Unix 时间戳，单位为秒 |
| intraday_flow | 资金流向数据 |
| └─ timestamp | 分钟开始时间，Unix 时间戳，单位为秒 |
| └─ inflow | 净流入 |
| distribution | 资金分布 |
| └─ timestamp | 数据更新时间，Unix 时间戳，单位为秒 |
| └─ capital_in | 流入资金 |
| &nbsp;&nbsp;&nbsp;&nbsp;└─ large | 大单 |
| &nbsp;&nbsp;&nbsp;&nbsp;└─ medium | 中单 |
| &nbsp;&nbsp;&nbsp;&nbsp;└─ small | 小单 |
| └─ capital_out | 流出资金 |
| &nbsp;&nbsp;&nbsp;&nbsp;└─ large | 大单 |
| &nbsp;&nbsp;&nbsp;&nbsp;└─ medium | 中单 |
| &nbsp;&nbsp;&nbsp;&nbsp;└─ small | 小单 |
