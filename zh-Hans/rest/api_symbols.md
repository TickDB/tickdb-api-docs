---
title: 产品查询
description: 查询 TickDB 支持的产品，覆盖外汇、指数、美股、港股、A股、加密货币等市场，共计超过 35,000 个产品，且持续增加中。
openapi: GET /v1/symbols/available
---

## 注意事项
- 市场代码不区分大小写
- 产品命名规则请参阅数据规范文档
- 除 API 查询外，您也可以登录 [TickDB 官网](https://tickdb.ai) 用户中心，在产品管理页面直接浏览和搜索所有支持的产品

<Frame>
  <img src="/symbols.png" alt="TickDB 用户中心 - 产品查询" />
</Frame>

## 市场与产品类型

通过 `market` 和 `type` 参数可以灵活过滤产品，两者可单独或组合使用。

| market | type | 说明 | 产品量级 |
|--------|------|------|----------|
| GLOBAL | forex | 外汇货币对、贵金属 | 1,200+ |
| GLOBAL | indices | 市场指数 | 12,700+ |
| GLOBAL | crypto | 加密货币交易对 | 800+ |
| US | stock | 美国股票 | 12,000+ |
| HK | stock | 香港股票 | 2,800+ |
| CN | stock | A股 | 6,000+ |

- `market` 按具体市场过滤，如 `market=CN` 仅返回A股
- `type` 按产品大类过滤，如 `type=stock` 返回 US + HK + CN 全部股票
- 组合使用：`market=HK&type=stock` 仅返回港股

## 请求参数

| 参数名 | 是否必须 | 描述 |
|--------|----------|------|
| type | 否 | 产品类型过滤，可选值：stock, crypto, forex, indices |
| market | 否 | 市场过滤，可选值：GLOBAL, US, HK, CN |
| limit | 否 | 每页返回数量，默认100，最大1000 |
| offset | 否 | 分页偏移量，默认0 |

## 返回字段说明

| 字段名 | 描述 |
|--------|------|
| products | 产品数组 |
| └─ symbol | 产品代码 |
| └─ name | 产品名称 |
| └─ market | 市场代码 |
| └─ type | 产品类型（stock/crypto/forex/indices） |
| └─ currency | 交易币种（CNY/USD/HKD/USDT） |
| └─ is_active | 是否活跃 |
| └─ updated_at | 更新时间 |
| summary | 汇总信息 |
| └─ total_products | 产品总数 |
| └─ by_market | 按市场统计数量 |
| └─ by_type | 按类型统计数量 |
| └─ last_updated | 最后更新时间 |
| pagination | 分页信息 |
| └─ limit | 每页数量 |
| └─ offset | 偏移量 |
| └─ total | 总数 |
| └─ count | 当前页返回数量 |
