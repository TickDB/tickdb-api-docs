---
title: 交易日历
description: 查询指定市场在特定时间范围内的交易日列表，用于判断某日是否为交易日。
openapi: GET /v1/market/trade-days
---

## 注意事项
- 日期格式必须为 YYYYMMDD（如：20260201）
- 返回的交易日不包括周末和节假日
- 市场代码不区分大小写

## 支持的市场

- **US** - 美国股票市场
- **HK** - 香港证券交易所
- **CN** - A股市场

## 请求参数

| 参数名 | 是否必须 | 描述 |
|--------|----------|------|
| market | 是 | 市场代码，可选值：US, HK, CN |
| beg_day | 是 | 开始日期，格式：YYYYMMDD |
| end_day | 是 | 结束日期，格式：YYYYMMDD |

## 返回字段说明

| 字段 | 说明 |
|------|------|
| market | 市场代码 |
| trade_days | 全日交易日列表，使用 YYYYMMDD 格式 |
| half_trade_days | 半日交易日列表（仅半天交易），使用 YYYYMMDD 格式 |
