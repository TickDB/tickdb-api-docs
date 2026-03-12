---
title: 市场指标
description: 获取股票的综合市场指标，包括行情统计、估值指标、资金流向以及衍生品相关指标。
openapi: GET /v1/market/calc-index
---

## 注意事项
- 指标数据基于实时行情和历史数据计算

## 支持的市场

**美股**、**港股**、**A股**

示例：
- 美股：AAPL.US、TSLA.US、MSFT.US
- 港股：700.HK、9988.HK、3690.HK
- A股：000001.SH、000001.SZ

## 请求参数

| 参数名 | 是否必须 | 描述 |
|--------|----------|------|
| symbols | 是 | 股票代码，多个用逗号分隔，最多50个 |

## 返回字段说明

| 字段名 | 描述 |
|--------|------|
| symbol | 交易品种代码 |
| last_done | 最新价 |
| change_val | 涨跌额 |
| change_rate | 涨跌幅 |
| volume | 成交量 |
| turnover | 成交额 |
| ytd_change_rate | 年初至今涨幅 |
| turnover_rate | 换手率 |
| total_market_value | 总市值 |
| capital_flow | 资金流向 |
| amplitude | 振幅 |
| volume_ratio | 量比 |
| pe_ttm_ratio | 市盈率 (TTM) |
| pb_ratio | 市净率 |
| dividend_ratio_ttm | 股息率 (TTM) |
| five_day_change_rate | 五日涨幅 |
| ten_day_change_rate | 十日涨幅 |
| half_year_change_rate | 半年涨幅 |
| five_minutes_change_rate | 五分钟涨幅 |
