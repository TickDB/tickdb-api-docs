---
title: 行情快照
description: 获取一个或多个交易品种的实时市场行情数据。
openapi: "openapi.yaml GET /v1/market/ticker"
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
- 最多可同时查询 50 个交易品种
- `timestamp` 为 Unix 时间戳，单位为毫秒
- 返回顺序与请求中有效交易产品代码的顺序一致
- 除 `symbol`、`last_price`、`timestamp` 外，其余行情字段均根据产品类型、交易时段和数据可用性按条件返回

## 支持的市场

| 市场 | 示例 |
|---|---|
| 外汇 | EURUSD, GBPUSD, USDJPY |
| 贵金属 | XAUUSD, XAGUSD |
| 指数 | SPX, NDX, DJI |
| 美股 | AAPL.US, TSLA.US, MSFT.US |
| 港股 | 700.HK, 9988.HK, 3690.HK |
| A股 | 600519.SH, 000001.SZ, 920186.BJ |
| 中国期货 | BU2609, IC2606, AP8888 |
| 香港期货 | HSI8888, MHI8888, HTI8888 |
| 加密货币 | BTCUSDT, ETHUSDT, ADAUSDT |

## 请求参数

| 参数名 | 是否必须 | 描述 |
|--------|----------|------|
| symbols | 是 | 交易产品代码，多个用逗号分隔，最多50个 |
| type | 否 | 产品类型，可选。代码无歧义时无需传递；若返回 `AMBIGUOUS_SYMBOL` 错误，按提示传入对应值即可。可选值：`stock`、`indices`、`crypto`、`forex`、`futures` |

## 返回字段说明

| 字段 | 说明 |
|------|------|
| symbol | 交易产品 |
| name | 产品名称；名称信息可用时返回 |
| type | 产品类型；产品类型成功识别时返回 |
| category | A股产品细分类别，例如 `sh_stock`、`sz_stock`、`bj_stock`、`etf`、`cn_bond`、`cn_index`；仅查询A股市场产品且分类信息可用时返回 |
| last_price | 最新成交价 |
| open | 开盘价；行情统计可用时返回。传统市场通常为当日或当前交易时段开盘价，加密货币按对应行情统计窗口返回 |
| prev_close | 昨收或参考价；行情统计可用时返回。传统市场通常为上一交易日或上一交易时段收盘价，加密货币按对应行情统计窗口返回 |
| bid_price | 最优买价；盘口报价可用时返回 |
| ask_price | 最优卖价；盘口报价可用时返回 |
| volume_24h | 累计成交量；数据可用时返回。加密货币通常为滚动24小时成交量，传统市场通常为当日或当前交易时段成交量 |
| quote_volume_24h | 与 `volume_24h` 相同统计窗口的成交额；成交额数据可用时返回 |
| high_24h | 最高价；数据可用时返回，统计窗口与 `volume_24h` 一致 |
| low_24h | 最低价；数据可用时返回，统计窗口与 `volume_24h` 一致 |
| price_change_24h | 价格变化；数据可用时返回，统计窗口与 `volume_24h` 一致 |
| price_change_percent_24h | 价格变化百分比；数据可用时返回，非空数值保留两位小数 |
| timestamp | Unix 时间戳，单位为毫秒 |
| pre_market_quote | 盘前行情对象；仅支持扩展交易时段的产品（如美股）且盘前行情数据可用时返回 |
| ├─ last_done | 盘前最新成交价 |
| ├─ timestamp | 盘前行情时间戳（毫秒，UTC） |
| ├─ volume | 盘前成交量 |
| ├─ quote_volume | 盘前成交额；数据可用时返回 |
| ├─ high | 盘前最高价 |
| ├─ low | 盘前最低价 |
| └─ prev_close | 盘前参考昨收价 |
| post_market_quote | 盘后行情对象；仅支持扩展交易时段的产品（如美股）且盘后行情数据可用时返回 |
| ├─ last_done | 盘后最新成交价 |
| ├─ timestamp | 盘后行情时间戳（毫秒，UTC） |
| ├─ volume | 盘后成交量 |
| ├─ quote_volume | 盘后成交额；数据可用时返回 |
| ├─ high | 盘后最高价 |
| ├─ low | 盘后最低价 |
| └─ prev_close | 盘后参考昨收价 |
| overnight_quote | 夜盘行情对象；仅支持扩展交易时段的产品（如美股）且夜盘行情数据可用时返回 |
| ├─ last_done | 夜盘最新成交价 |
| ├─ timestamp | 夜盘行情时间戳（毫秒，UTC） |
| ├─ volume | 夜盘成交量 |
| ├─ quote_volume | 夜盘成交额；数据可用时返回 |
| ├─ high | 夜盘最高价 |
| ├─ low | 夜盘最低价 |
| └─ prev_close | 夜盘参考昨收价 |
