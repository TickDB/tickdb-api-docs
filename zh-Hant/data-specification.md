---
title: 數據規範
description: 交易品種命名、時間戳和 K 線間隔規則。
---

## 交易品種命名規則

- 加密貨幣：`BTCUSDT`
- 美股：`AAPL.US`
- 港股：`700.HK`
- 外匯：`EURUSD`
- 貴金屬：`XAUUSD`

## 時間戳

- 所有時間戳均為**毫秒 (ms)**
- 基於 UTC

## K 線間隔

參考：
**GET** `/v1/market/intervals/kline`
