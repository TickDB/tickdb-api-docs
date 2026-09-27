---
title: K 线查询
description: 按周期和时间范围查询 K 线数据。
openapi: "openapi.yaml GET /v1/market/kline"
contextual:
  options:
    - copy
    - view
---

## 套餐权限

| 套餐 | 可用 |
|---|:---:|
| 免费版 | ✅ |
| 基础版 | ✅ |
| 专业版 | ✅ |
| 全量套餐（A 股、港股、美股） | ✅ |
| 企业版 | ✅ |

## 注意事项
- 免费版可查询 K 线，但不支持使用 `start_time` 或 `end_time` 指定时间范围。
- 查询结果的最后一根 K 线可能仍在形成，价格和成交量可能继续变化。
- 适用于技术指标计算。股票数据归档或策略回测时，建议记录查询时间与复权方式；如保存不复权 K 线，可参考[复权因子](./api_ex_factors)动态生成复权价格。复权历史价格可能随公司行动或数据更新调整。
- 若需一次查询多个代码各自的最新 K 线，请使用[实时 K 线](./api_kline_latest)。
- A股、港股和美股统一支持不复权、前复权和后复权

## 支持的市场

| 市场 | 示例 |
|---|---|
| 外汇 | EURUSD, GBPUSD, USDJPY |
| 贵金属 | XAUUSD, XAGUSD |
| 指数 | SPX, NDX, DJI |
| 美股 | AAPL.US, TSLA.US, MSFT.US |
| 港股 | 700.HK, 9988.HK, 3690.HK |
| A股 | 600519.SH, 000001.SZ, 920186.BJ |
| 中国期货 | BU2609, IC2606, AP8888 |
| 香港期货 | HSI8888, MHI8888, HTI8888 |
| 加密货币 | BTCUSDT, ETHUSDT, ADAUSDT |

## K 线周期

| `interval` | 周期说明 |
| --- | --- |
| `1m` | 1 分钟 |
| `3m` | 3 分钟 |
| `5m` | 5 分钟 |
| `15m` | 15 分钟 |
| `30m` | 30 分钟 |
| `1h` | 1 小时 |
| `2h` | 2 小时 |
| `4h` | 4 小时 |
| `1d` | 1 天 |
| `1w` | 1 周 |
| `1M` | 1 个月 |

`1m` 中的小写 `m` 表示分钟，`1M` 中的大写 `M` 表示月。

## 请求参数

| 参数名 | 是否必须 | 描述 |
|--------|----------|------|
| symbol | 是 | 交易产品代码 |
| interval | 是 | K线周期，可选值：1m, 3m, 5m, 15m, 30m, 1h, 2h, 4h, 1d, 1w, 1M |
| limit | 否 | 返回记录数，默认 100；大于 1000 时按 1000 处理，非正数使用默认值 100 |
| start_time | 否 | 开始时间戳（毫秒） |
| end_time | 否 | 结束时间戳（毫秒） |
| type | 否 | 产品类型，可选。代码无歧义时无需传递；若返回 `AMBIGUOUS_SYMBOL` 错误，按提示传入对应值即可。可选值：`stock`、`indices`、`crypto`、`forex`、`futures` |
| adjust | 否 | 复权方式，适用于 A 股、港股和美股。可选值：`none` 不复权、`forward` 前复权、`backward` 后复权；不传时默认不复权（`none`） |

## 返回字段说明

| 字段 | 说明 |
|------|------|
| symbol | 交易产品 |
| type | 产品类型 |
| interval | K线周期 |
| adjust | 实际使用的复权方式：`none`、`forward` 或 `backward` |
| klines | K线数据数组 |
| └─ time | K线时间戳（毫秒） |
| └─ open | 开盘价 |
| └─ high | 最高价 |
| └─ low | 最低价 |
| └─ close | 收盘价 |
| └─ volume | 成交量 |
| └─ quote_volume | 成交额，期货通常不返回 |
| └─ open_interest | 持仓量，仅期货返回 |
