---
title: 股票信息
description: 获取股票的详细信息，包括公司名称、行业分类、市值等基本面数据。
openapi: GET /v1/market/stock-info
---

## 注意事项
- 返回的信息可能因数据源而异

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

| 字段 | 说明 |
|------|------|
| symbol | 交易产品 |
| name_cn | 中文简体标的名称 |
| name_en | 英文标的名称 |
| name_hk | 中文繁体标的名称 |
| exchange | 标的所属交易所 |
| currency | 交易币种（CNY/USD/HKD） |
| lot_size | 每手股数 |
| total_shares | 总股本 |
| circulating_shares | 流通股本 |
| hk_shares | 港股股本（仅港股） |
| eps | 每股盈利 |
| eps_ttm | 每股盈利（TTM） |
| bps | 每股净资产 |
| dividend_yield | 股息（如果标的的股息是按年度计算，可提供的年度计算类型） |
| stock_derivatives | 可选值：1 - 期权，2 - 轮证 |
