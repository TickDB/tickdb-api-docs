---
title: 数据规范
description: 交易品种命名、时间戳和 K 线间隔规则。
---

## 交易品种命名规则

- 加密货币：`BTCUSDT`
- 美股：`AAPL.US`
- 港股：`700.HK`
- 外汇：`EURUSD`
- 贵金属：`XAUUSD`

## 时间戳

- 所有时间戳均为**毫秒 (ms)**
- 基于 UTC

## K 线间隔

参考：
**GET** `/v1/market/intervals/kline`
