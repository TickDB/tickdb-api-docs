---
title: 订单簿
description: 获取交易品种的实时盘口、实时订单簿深度（买卖盘）数据。
openapi: GET /v1/market/depth
---

## 注意事项
- 买盘（bids）按价格降序排列
- 卖盘（asks）按价格升序排列
- 时间戳单位为毫秒（UTC）

## 支持的市场

**美股**、**港股**、**A股**、**加密货币**

示例：
- 美股：AAPL.US、TSLA.US、MSFT.US
- 港股：700.HK、9988.HK、3690.HK
- A股：600519.SH、000001.SZ、920186.BJ
- 加密货币：BTCUSDT、ETHUSDT、ADAUSDT

## 请求参数

| 参数名 | 是否必须 | 描述 |
|--------|----------|------|
| symbol | 是 | 交易产品代码 |
| limit | 否 | 深度档位数，默认10，最大50 |
| type | 否 | 产品类型，可选。代码无歧义时无需传递；若返回 `AMBIGUOUS_SYMBOL` 错误，按提示传入对应值即可。可选值：`stock`、`indices`、`crypto`、`forex` |

## 返回字段说明

| 字段 | 说明 |
|------|------|
| symbol | 交易产品 |
| timestamp | 数据时间戳（毫秒，UTC） |
| bids | 买盘数组，每个元素为 [价格, 数量] |
| asks | 卖盘数组，每个元素为 [价格, 数量] |
