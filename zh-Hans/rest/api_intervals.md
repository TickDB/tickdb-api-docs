---
title: K 线周期
description: 查询系统支持的 K 线周期列表。用于在调用 K 线接口前确认可用的周期参数。
openapi: GET /v1/market/intervals/kline
---

## 周期格式

- **分钟**: 1m, 3m, 5m, 15m, 30m
- **小时**: 1h, 2h, 4h
- **天**: 1d
- **周**: 1w
- **月**: 1M

## 返回字段说明

| 字段名 | 描述 |
|--------|------|
| count | 支持的周期数量 |
| description | 接口说明 |
| intervals | 支持的K线周期列表 |
