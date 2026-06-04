---
title: 訂單簿
description: 獲取交易品種的實時盤口、實時訂單簿深度（買賣盤）數據。
openapi: GET /v1/market/depth
---

## 注意事項
- 買盤（bids）按價格降序排列
- 賣盤（asks）按價格升序排列
- 時間戳單位為毫秒（UTC）

## 支持的市場

**美股**、**港股**、**A股**、**加密貨幣**

示例：
- 美股：AAPL.US、TSLA.US、MSFT.US
- 港股：700.HK、9988.HK、3690.HK
- A股：600519.SH、000001.SZ、920186.BJ
- 加密貨幣：BTCUSDT、ETHUSDT、ADAUSDT

## 請求參數

| 參數名 | 是否必須 | 描述 |
|--------|----------|------|
| symbol | 是 | 交易產品代碼 |
| limit | 否 | 深度檔位數，默認10，最大50 |
| type | 否 | 產品類型，可選。代碼無歧義時無需傳遞；若返回 `AMBIGUOUS_SYMBOL` 錯誤，按提示傳入對應值即可。可選值：`stock`、`indices`、`crypto`、`forex` |

## 返回字段說明

| 字段 | 說明 |
|------|------|
| symbol | 交易產品 |
| timestamp | 數據時間戳（毫秒，UTC） |
| bids | 買盤數組，每個元素為 [價格, 數量] |
| asks | 賣盤數組，每個元素為 [價格, 數量] |
