---
title: 历史 K 线
description: 获取已结束时间周期的历史 K 线数据。
openapi: GET /v1/market/kline
---

## 注意事项
- 本接口返回已结束周期的历史K线数据，数据已固定不会变化
- 适用于策略回测、技术指标计算、数据归档存储
- 若需获取当前周期内正在更新的K线，请使用实时K线：`/v1/market/kline/latest`

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
| symbol | 是 | 交易产品代码 |
| interval | 是 | K线周期，可选值：1m, 5m, 15m, 30m, 1h, 4h, 12h, 1d, 1w, 1M |
| limit | 否 | 返回记录数，默认100，最大1000 |
| start_time | 否 | 开始时间戳（毫秒） |
| end_time | 否 | 结束时间戳（毫秒） |

## 返回字段说明

| 字段 | 说明 |
|------|------|
| symbol | 交易产品 |
| interval | K线周期 |
| klines | K线数据数组 |
| └─ time | K线时间戳（毫秒） |
| └─ open | 开盘价 |
| └─ high | 最高价 |
| └─ low | 最低价 |
| └─ close | 收盘价 |
| └─ volume | 成交量 |
| └─ quote_volume | 成交额 |
