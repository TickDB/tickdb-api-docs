---
title: 行情快照
description: 获取一个或多个交易品种的实时市场行情数据。
openapi: GET /v1/market/ticker
---

## 注意事项
- 最多可同时查询 50 个交易品种
- 时间戳单位为毫秒（UTC）

## 支持的市场

**外汇**、**贵金属**、**指数**、**美股**、**港股**、**A股**、**加密货币**

示例：
- 外汇：EURUSD、GBPUSD、USDJPY
- 贵金属：XAUUSD、XAGUSD
- 指数：SPX、NDX、DJI
- 美股：AAPL.US、TSLA.US、MSFT.US
- 港股：700.HK、9988.HK、3690.HK
- A股：000001.SH、000001.SZ
- 加密货币：BTCUSDT、ETHUSDT、ADAUSDT

## 请求参数

| 参数名 | 是否必须 | 描述 |
|--------|----------|------|
| symbols | 是 | 交易产品代码，多个用逗号分隔，最多50个 |

## 返回字段说明

| 字段 | 说明 |
|------|------|
| symbol | 交易产品 |
| last_price | 最新成交价 |
| volume_24h | 24小时成交量 |
| high_24h | 24小时最高价 |
| low_24h | 24小时最低价 |
| price_change_24h | 24小时价格变化 |
| price_change_percent_24h | 24小时价格变化百分比 |
| timestamp | 数据时间戳（毫秒，UTC） |
