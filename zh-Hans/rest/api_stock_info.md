---
title: 股票信息
description: 获取股票名称、交易所、币种、股本和每股指标等基础信息。
openapi: "openapi.yaml GET /v1/market/stock-info"
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

- 单次最多查询 500 个股票代码。
- 返回字段会因市场和个股的数据情况而异；条件字段没有可用数据时不会返回。

## 支持的市场

| 市场 | 示例 |
|---|---|
| 美股 | AAPL.US, TSLA.US, MSFT.US |
| 港股 | 700.HK, 9988.HK, 3690.HK |
| A股 | 600519.SH, 000001.SZ, 300750.SZ |

## 请求参数

| 参数名 | 是否必须 | 描述 |
|--------|----------|------|
| symbols | 是 | 股票代码，多个用逗号分隔，最多 500 个 |
| type | 否 | 产品类型，可选。代码无歧义时无需传递；若返回 `AMBIGUOUS_SYMBOL` 错误，按提示传入对应值即可。可选值：`stock`、`indices`、`crypto`、`forex` |

## 返回字段说明

| 字段 | 说明 |
|------|------|
| symbol | 交易产品 |
| name_cn | 中文简体标的名称 |
| name_en | 英文标的名称；港股、美股返回 |
| name_hk | 中文繁体标的名称；港股、美股返回 |
| exchange | 标的所属交易所 |
| currency | 交易币种（CNY/USD/HKD） |
| lot_size | 每手股数 |
| total_shares | 总股本；数据可用时返回 |
| circulating_shares | 流通股本；数据可用时返回 |
| hk_shares | H股股本；港股及同时发行H股的A股公司返回 |
| eps | 每股收益；数据可用时返回 |
| eps_ttm | 最近十二个月每股收益；港股、美股数据可用时返回 |
| bps | 每股净资产；数据可用时返回 |
| dividend_yield | 股息率；港股、美股数据可用时返回 |
| stock_derivatives | 支持的衍生品类型数组；`1` 表示期权，`2` 表示轮证，港股、美股数据可用时返回 |
| board | A股所属板块或证券分类代码；A股返回 |
