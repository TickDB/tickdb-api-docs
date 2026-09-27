---
title: 分紅記錄
description: 查詢股票的分紅記錄，包括歷史及已知的未來分紅事件，支持日期、類型和分頁篩選。
openapi: "openapi.zh-Hant.yaml GET /v1/fundamentals/dividends"
contextual:
  options:
    - copy
    - view
---

## 套餐權限

| 套餐 | 可用 |
|---|:---:|
| 免費版 | ❌ |
| 基礎版 | ✅ |
| 專業版 | ✅ |
| 全量套餐（A 股、港股、美股） | ✅ |
| 企業版 | ✅ |

## 注意事項

- `amount` 是每股現金分紅金額的十進制字符串；非現金分派時可能為 `null`。分頁游標位于響應外層 `page`。

## 支持的市場

| 市場 | 示例 |
|---|---|
| 美股 | AAPL.US |
| 港股 | 700.HK |
| A股 | 600519.SH |

## 請求參數

| 參數 | 是否必須 | 說明 |
|---|:---:|---|
| `symbol` | 是 | 股票代碼 |
| `type` | 否 | 產品類型，當前支持 `stock` |
| `dividend_type` | 否 | `normal`、`special`、`non_cash`、`unknown` |
| `from` | 否 | 起始日期，格式 `YYYY-MM-DD` |
| `to` | 否 | 結束日期，格式 `YYYY-MM-DD` |
| `limit` | 否 | 單頁數量，默認 100，范圍 `1–500` |
| `cursor` | 否 | 下一頁游標 |

## 請求示例

```bash
curl -H "X-API-Key: YOUR_API_KEY" \
  "https://api.tickdb.ai/v1/fundamentals/dividends?symbol=AAPL&type=stock&limit=100"
```

## 返回字段說明

以下列出 `data` 及分頁字段；外層 `code=0` 表示成功。

| 字段 | 說明 |
|------|------|
| symbol | 股票代碼。 |
| events | 符合篩選條件的分紅記錄列表。 |
| └─ event_id | 事件 ID。 |
| └─ type | 分紅類別。 |
| └─ distribution_kind | 分派形式。 |
| └─ amount | 每股現金金額；非現金分派時可能為 null。 |
| └─ stock_distribution_ratio | 每股送股或轉增比例；例如 `0.7` 表示每 1 股送轉 0.7 股，即每 10 股送轉 7 股。 |
| └─ currency | 幣種。 |
| └─ declaration_date | 公告日，格式 `YYYY-MM-DD`；可能為 `null`。 |
| └─ record_date | 股權登記日，格式 `YYYY-MM-DD`；可能為 `null`。 |
| └─ ex_date | 除權除息日，格式 `YYYY-MM-DD`；可能為 `null`。 |
| └─ payment_date | 支付日，格式 `YYYY-MM-DD`；可能為 `null`。 |
| └─ description | 事件說明。 |
| └─ detail_level | 詳情級別。 |
| page | 響應外層的分頁信息。 |
| └─ next_cursor | 下一頁游標；末頁為空。 |
| └─ limit | 當前分頁上限。 |

每條記錄包含分紅類型、每股金額、幣種及相關日期；未來日期不代表分紅已經完成。
