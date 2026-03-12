---
title: K 線週期
description: 查詢系統支持的 K 線週期列表。用於在調用 K 線接口前確認可用的週期參數。
openapi: GET /v1/market/intervals/kline
---

## 週期格式

- **分鐘**: 1m, 3m, 5m, 15m, 30m
- **小時**: 1h, 2h, 4h
- **天**: 1d
- **週**: 1w
- **月**: 1M

## 返回字段說明

| 字段名 | 描述 |
|--------|------|
| count | 支持的週期數量 |
| description | 接口說明 |
| intervals | 支持的K線週期列表 |
