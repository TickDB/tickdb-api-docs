---
title: 最近成交
description: 获取交易品种的最近成交执行记录。
openapi: GET /v1/market/trades
---

## 注意事项
- 本接口不支持美股和A股市场
- side：买入（buy）/ 卖出（sell）
- 时间戳单位为毫秒（UTC）

## 支持的市场

**港股**、**加密货币**

示例：
- 港股：700.HK、9988.HK、3690.HK
- 加密货币：BTCUSDT、ETHUSDT、ADAUSDT

## 请求参数

| 参数名 | 是否必须 | 描述 |
|--------|----------|------|
| symbol | 是 | 交易产品代码 |
| limit | 否 | 返回成交记录数，默认50，最大200 |

## 返回字段说明

| 字段 | 说明 |
|------|------|
| id | 成交ID |
| price | 成交价格 |
| quantity | 成交数量 |
| side | 成交方向（买入/卖出） |
| timestamp | 成交时间（毫秒时间戳，UTC） |
