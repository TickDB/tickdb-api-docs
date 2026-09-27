---
title: 實時 K 線
description: 獲取當前時間週期內正在形成並實時更新的 K 線數據。
openapi: "openapi.zh-Hant.yaml GET /v1/market/kline/latest"
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
- 本接口返回當前週期內正在形成的K線數據，數據會隨著成交持續更新
- 適用於實時行情圖表展示、當前價格監控、分時動態更新
- 不建議用於歷史回測、技術指標統計、固定數據存儲
- 若需按時間範圍查詢 K 線，請使用[K 線查詢](./api_kline)。
- A股、港股和美股統一支持不復權、前復權和後復權

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

## K 線週期

| `interval` | 週期說明 |
| --- | --- |
| `1m` | 1 分鐘 |
| `3m` | 3 分鐘 |
| `5m` | 5 分鐘 |
| `15m` | 15 分鐘 |
| `30m` | 30 分鐘 |
| `1h` | 1 小時 |
| `2h` | 2 小時 |
| `4h` | 4 小時 |
| `1d` | 1 天 |
| `1w` | 1 週 |
| `1M` | 1 個月 |

`1m` 中的小寫 `m` 表示分鐘，`1M` 中的大寫 `M` 表示月。

## 請求參數

| 參數名 | 是否必須 | 描述 |
|--------|----------|------|
| symbols | 是 | 交易產品代碼，多個用逗號分隔，最多50個，例如：AAPL.US,00700.HK |
| interval | 是 | K線週期，可選值：1m, 3m, 5m, 15m, 30m, 1h, 2h, 4h, 1d, 1w, 1M |
| type | 否 | 產品類型，可選。代碼無歧義時無需傳遞；若返回 `AMBIGUOUS_SYMBOL` 錯誤，按提示傳入對應值即可。可選值：`stock`、`indices`、`crypto`、`forex`、`futures` |
| adjust | 否 | 復權方式，適用於 A 股、港股和美股。可選值：`none` 不復權、`forward` 前復權、`backward` 後復權；不傳時默認不復權（`none`） |

## 返回字段說明

| 字段 | 說明 |
|------|------|
| symbol | 交易產品 |
| type | 產品類型 |
| interval | K線週期 |
| adjust | 實際使用的復權方式：`none`、`forward` 或 `backward` |
| klines | K線數據數組 |
| └─ time | K線時間戳（毫秒） |
| └─ open | 開盤價 |
| └─ high | 最高價 |
| └─ low | 最低價 |
| └─ close | 收盤價 |
| └─ volume | 成交量 |
| └─ quote_volume | 成交額，期貨通常不返回 |
| └─ open_interest | 持倉量，僅期貨返回 |
