---
title: K 線查詢
description: 按週期和時間範圍查詢 K 線數據。
openapi: "openapi.zh-Hant.yaml GET /v1/market/kline"
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
- 免費版可查詢 K 線，但不支援使用 `start_time` 或 `end_time` 指定時間範圍。
- 查詢結果的最後一根 K 線可能仍在形成，價格和成交量可能繼續變化。
- 適用於技術指標計算。股票數據歸檔或策略回測時，建議記錄查詢時間與復權方式；如保存未復權 K 線，可參考[復權因子](./api_ex_factors)動態生成復權價格。復權歷史價格可能隨公司行動或數據更新調整。
- 若需一次查詢多個代碼各自的最新 K 線，請使用[實時 K 線](./api_kline_latest)。
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
| symbol | 是 | 交易產品代碼 |
| interval | 是 | K線週期，可選值：1m, 3m, 5m, 15m, 30m, 1h, 2h, 4h, 1d, 1w, 1M |
| limit | 否 | 返回記錄數，默認 100；大於 1000 時按 1000 處理，非正數使用默認值 100 |
| start_time | 否 | 開始時間戳（毫秒） |
| end_time | 否 | 結束時間戳（毫秒） |
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
