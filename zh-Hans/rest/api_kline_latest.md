---
title: 实时 K 线
description: 获取当前时间周期内正在形成并实时更新的 K 线数据。
openapi: GET /v1/market/kline/latest
---

## 注意事项
- 本接口返回当前周期内正在形成的K线数据，数据会随着成交持续更新
- 适用于实时行情图表展示、当前价格监控、分时动态更新
- 不建议用于历史回测、技术指标统计、固定数据存储
- 若需查询已结束周期的数据，请使用历史K线：`/v1/market/kline`

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
| symbols | 是 | 交易产品代码，多个用逗号分隔，例如：AAPL.US,00700.HK |
| interval | 是 | K线周期，可选值：1m, 3m, 5m, 15m, 30m, 1h, 2h, 4h, 1d, 1w, 1M |

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
