---
title: 资金流向
description: 获取股票的资金流向数据，包括主力资金、大单、中单、小单的流入流出情况。
openapi: GET /v1/market/capital-flow
---

## 注意事项
- 资金流向数据基于成交量和价格变化计算
- 数据更新频率取决于市场交易活跃度

## 支持的市场

**美股**、**港股**、**A股**

示例：
- 美股：AAPL.US、TSLA.US、MSFT.US
- 港股：700.HK、9988.HK、3690.HK
- A股：000001.SH、000001.SZ

## 请求参数

| 参数名 | 是否必须 | 描述 |
|--------|----------|------|
| symbol | 是 | 股票代码 |

## 返回字段说明

| 字段名 | 描述 |
|--------|------|
| symbol | 交易产品 |
| timestamp | 数据更新时间戳 |
| intraday_flow | 资金流向数据 |
| └─ timestamp | 分钟开始时间戳 |
| └─ inflow | 净流入 |
| distribution | 资金分布 |
| └─ timestamp | 数据更新时间戳 |
| └─ capital_in | 流入资金 |
| &nbsp;&nbsp;&nbsp;&nbsp;└─ large | 大单 |
| &nbsp;&nbsp;&nbsp;&nbsp;└─ medium | 中单 |
| &nbsp;&nbsp;&nbsp;&nbsp;└─ small | 小单 |
| └─ capital_out | 流出资金 |
| &nbsp;&nbsp;&nbsp;&nbsp;└─ large | 大单 |
| &nbsp;&nbsp;&nbsp;&nbsp;└─ medium | 中单 |
| &nbsp;&nbsp;&nbsp;&nbsp;└─ small | 小单 |
