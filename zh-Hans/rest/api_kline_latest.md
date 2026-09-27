---
title: 实时 K 线
description: 获取当前时间周期内正在形成并实时更新的 K 线数据。
openapi: "openapi.yaml GET /v1/market/kline/latest"
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
- 本接口返回当前周期内正在形成的K线数据，数据会随着成交持续更新
- 适用于实时行情图表展示、当前价格监控、分时动态更新
- 不建议用于历史回测、技术指标统计、固定数据存储
- 若需按时间范围查询 K 线，请使用[K 线查询](./api_kline)。
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
| symbols | 是 | 交易产品代码，多个用逗号分隔，最多50个，例如：AAPL.US,00700.HK |
| interval | 是 | K线周期，可选值：1m, 3m, 5m, 15m, 30m, 1h, 2h, 4h, 1d, 1w, 1M |
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
