---
title: 產品查詢
description: 查詢 TickDB 支持的產品，涵蓋外匯、指數、美股、港股、A股、加密貨幣等市場，共計超過 27,000 個產品，且持續增加中。
openapi: GET /v1/symbols/available
---

## 注意事項
- 市場代碼不區分大小寫
- 產品命名規則請參閱數據規範文檔

## 市場與產品類型

透過 `market` 和 `type` 參數可以靈活過濾產品，兩者可單獨或組合使用。

| market | type | 說明 | 產品量級 |
|--------|------|------|----------|
| GLOBAL | forex | 外匯貨幣對、貴金屬 | 1,200+ |
| GLOBAL | indices | 市場指數 | 12,700+ |
| GLOBAL | crypto | 加密貨幣交易對 | 800+ |
| US | stock | 美國股票 | 4,000+ |
| HK | stock | 香港股票 | 2,800+ |
| CN | stock | A股 | 6,000+ |

- `market` 按具體市場過濾，如 `market=CN` 僅返回A股
- `type` 按產品大類過濾，如 `type=stock` 返回 US + HK + CN 全部股票
- 組合使用：`market=HK&type=stock` 僅返回港股

## 請求參數

| 參數名 | 是否必須 | 描述 |
|--------|----------|------|
| type | 否 | 產品類型過濾，可選值：stock, crypto, forex, indices |
| market | 否 | 市場過濾，可選值：GLOBAL, US, HK, CN |
| limit | 否 | 每頁返回數量，預設100，最大1000 |
| offset | 否 | 分頁偏移量，預設0 |

## 返回字段說明

| 字段名 | 描述 |
|--------|------|
| products | 產品陣列 |
| └─ symbol | 產品代碼 |
| └─ name | 產品名稱 |
| └─ market | 市場代碼 |
| └─ type | 產品類型（stock/crypto/forex/indices） |
| └─ currency | 交易幣種（CNY/USD/HKD/USDT） |
| └─ is_active | 是否活躍 |
| └─ updated_at | 更新時間 |
| summary | 匯總資訊 |
| └─ total_products | 產品總數 |
| └─ by_market | 按市場統計數量 |
| └─ by_type | 按類型統計數量 |
| └─ last_updated | 最後更新時間 |
| pagination | 分頁資訊 |
| └─ limit | 每頁數量 |
| └─ offset | 偏移量 |
| └─ total | 總數 |
| └─ count | 當前頁返回數量 |
