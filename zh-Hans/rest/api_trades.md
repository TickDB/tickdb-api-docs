---
title: 最近成交
description: 获取交易品种的逐笔成交、最近成交执行记录。
openapi: GET /v1/market/trades
---

## 注意事项
- side：买入（buy）/ 卖出（sell）/ 中性（neutral）
- 时间戳单位为毫秒（UTC）

## 支持的市场

**美股**、**港股**、**A股**、**中国期货**、**加密货币**

示例：
- 美股：AAPL.US、TSLA.US、MSFT.US
- 港股：700.HK、9988.HK、3690.HK
- A股：600519.SH、000001.SZ、920186.BJ
- 中国期货：BU2609、IC2606、AP8888
- 加密货币：BTCUSDT、ETHUSDT、ADAUSDT

## 请求参数

| 参数名 | 是否必须 | 描述 |
|--------|----------|------|
| symbol | 是 | 交易产品代码 |
| limit | 否 | 返回成交记录数，默认100，最大1000 |
| type | 否 | 产品类型，可选。代码无歧义时无需传递；若返回 `AMBIGUOUS_SYMBOL` 错误，按提示传入对应值即可。可选值：`stock`、`indices`、`crypto`、`forex`、`futures` |

## 返回字段说明

| 字段 | 说明 |
|------|------|
| symbol | 交易产品 |
| type | 产品类型 |
| trades | 成交记录数组 |
| └─ id | 成交ID |
| └─ price | 成交价格 |
| └─ quantity | 成交数量 |
| └─ side | 成交方向（`buy`、`sell` 或 `neutral`） |
| └─ timestamp | 成交时间（毫秒时间戳，UTC） |
| └─&nbsp;open_interest_change | 持仓变化，仅期货返回 |
| └─&nbsp;position_effect | 持仓影响，仅期货返回；取值见下表 |

### `position_effect` 取值说明

| 类型 | 取值 |
|------|------|
| 开仓 | `long_open`（多开）<br />`short_open`（空开）<br />`both_open`（双开） |
| 平仓 | `long_close`（多平）<br />`short_close`（空平）<br />`both_close`（双平） |
| 换手 | `long_transfer`（多换）<br />`short_transfer`（空换） |
