---
title: 行情快照
description: 獲取一個或多個交易品種的實時市場行情數據。
openapi: "openapi.zh-Hant.yaml GET /v1/market/ticker"
contextual:
  options:
    - copy
    - view
---

## 套餐權限

| 套餐 | 可用 |
|---|:---:|
| 免費版 | ✅ |
| 基礎版 | ✅ |
| 專業版 | ✅ |
| 全量套餐（A 股、港股、美股） | ✅ |
| 企業版 | ✅ |

## 注意事項
- 最多可同時查詢 50 個交易品種
- `timestamp` 為 Unix 時間戳，單位為毫秒
- 返回順序與請求中有效交易產品代碼的順序一致
- 除 `symbol`、`last_price`、`timestamp` 外，其餘行情字段均根據產品類型、交易時段和數據可用性按條件返回

## 支持的市場

| 市場 | 示例 |
|---|---|
| 外匯 | EURUSD, GBPUSD, USDJPY |
| 貴金屬 | XAUUSD, XAGUSD |
| 指數 | SPX, NDX, DJI |
| 美股 | AAPL.US, TSLA.US, MSFT.US |
| 港股 | 700.HK, 9988.HK, 3690.HK |
| A股 | 600519.SH, 000001.SZ, 920186.BJ |
| 中國期貨 | BU2609, IC2606, AP8888 |
| 香港期貨 | HSI8888, MHI8888, HTI8888 |
| 加密貨幣 | BTCUSDT, ETHUSDT, ADAUSDT |

## 請求參數

| 參數名 | 是否必須 | 描述 |
|--------|----------|------|
| symbols | 是 | 交易產品代碼，多個用逗號分隔，最多50個 |
| type | 否 | 產品類型，可選。代碼無歧義時無需傳遞；若返回 `AMBIGUOUS_SYMBOL` 錯誤，按提示傳入對應值即可。可選值：`stock`、`indices`、`crypto`、`forex`、`futures` |

## 返回字段說明

| 字段 | 說明 |
|------|------|
| symbol | 交易產品 |
| name | 產品名稱；名稱信息可用時返回 |
| type | 產品類型；產品類型成功識別時返回 |
| category | A股產品細分類別，例如 `sh_stock`、`sz_stock`、`bj_stock`、`etf`、`cn_bond`、`cn_index`；僅查詢A股市場產品且分類信息可用時返回 |
| last_price | 最新成交價 |
| open | 開盤價；行情統計可用時返回。傳統市場通常為當日或當前交易時段開盤價，加密貨幣按對應行情統計窗口返回 |
| prev_close | 昨收或參考價；行情統計可用時返回。傳統市場通常為上一交易日或上一交易時段收盤價，加密貨幣按對應行情統計窗口返回 |
| bid_price | 最優買價；盤口報價可用時返回 |
| ask_price | 最優賣價；盤口報價可用時返回 |
| volume_24h | 累計成交量；數據可用時返回。加密貨幣通常為滾動24小時成交量，傳統市場通常為當日或當前交易時段成交量 |
| quote_volume_24h | 與 `volume_24h` 相同統計窗口的成交額；成交額數據可用時返回 |
| high_24h | 最高價；數據可用時返回，統計窗口與 `volume_24h` 一致 |
| low_24h | 最低價；數據可用時返回，統計窗口與 `volume_24h` 一致 |
| price_change_24h | 價格變化；數據可用時返回，統計窗口與 `volume_24h` 一致 |
| price_change_percent_24h | 價格變化百分比；數據可用時返回，非空數值保留兩位小數 |
| timestamp | Unix 時間戳，單位為毫秒 |
| pre_market_quote | 盤前行情對象；僅支持擴展交易時段的產品（如美股）且盤前行情數據可用時返回 |
| ├─ last_done | 盤前最新成交價 |
| ├─ timestamp | 盤前行情時間戳（毫秒，UTC） |
| ├─ volume | 盤前成交量 |
| ├─ quote_volume | 盤前成交額；數據可用時返回 |
| ├─ high | 盤前最高價 |
| ├─ low | 盤前最低價 |
| └─ prev_close | 盤前參考昨收價 |
| post_market_quote | 盤後行情對象；僅支持擴展交易時段的產品（如美股）且盤後行情數據可用時返回 |
| ├─ last_done | 盤後最新成交價 |
| ├─ timestamp | 盤後行情時間戳（毫秒，UTC） |
| ├─ volume | 盤後成交量 |
| ├─ quote_volume | 盤後成交額；數據可用時返回 |
| ├─ high | 盤後最高價 |
| ├─ low | 盤後最低價 |
| └─ prev_close | 盤後參考昨收價 |
| overnight_quote | 夜盤行情對象；僅支持擴展交易時段的產品（如美股）且夜盤行情數據可用時返回 |
| ├─ last_done | 夜盤最新成交價 |
| ├─ timestamp | 夜盤行情時間戳（毫秒，UTC） |
| ├─ volume | 夜盤成交量 |
| ├─ quote_volume | 夜盤成交額；數據可用時返回 |
| ├─ high | 夜盤最高價 |
| ├─ low | 夜盤最低價 |
| └─ prev_close | 夜盤參考昨收價 |
