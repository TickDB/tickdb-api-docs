---
title: 其他日曆
description: 按類別查詢宏觀數據、休市、會議等其他財經事件。
openapi: "openapi.zh-Hant.yaml GET /v1/fundamentals/calendar/other"
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

- 必須傳入一種 `category`；財報、股息、拆股和新股事件請使用各自的專用日曆接口。
- `from` 預設為目前 UTC 日期；`to` 預設為 `from` 後 7 天。日期範圍包含兩端。
- 預設每頁 100 條，最多 500 條。第一頁不傳 `cursor`；後續保持篩選條件不變，並將上一頁的 `page.next_cursor` 原樣傳入，直到其為 `null`。若首次未傳日期，後續頁請使用首個回應的 `data.from`、`data.to` 固定日期範圍。
- API Key 僅允許部分市場時，必須傳入獲准的 `market`；沒有對應事件時返回空 `events` 陣列。

## 支援市場

| 市場 | 示例 |
|---|---|
| 美股 | US |
| 港股 | HK |
| A股 | CN |

## 請求參數

| 參數 | 必填 | 說明 |
|---|:---:|---|
| `from` | 否 | 開始日期，格式 `YYYY-MM-DD` |
| `to` | 否 | 結束日期，格式 `YYYY-MM-DD` |
| `category` | 是 | 其他事件類別，取值見下表 |
| `market` | 否* | 市場篩選：`US`、`HK`、`CN`；市場受限的 API Key 必填 |
| `symbols` | 否 | 股票代碼，以英文逗號分隔，最多 50 個 |
| `limit` | 否 | 每頁數量，`1–500`，預設 `100` |
| `cursor` | 否 | 下一頁遊標；第一頁不傳 |

## category 取值

| 取值 | 說明 |
|---|---|
| `macrodata` | 宏觀經濟數據公布 |
| `closed` | 市場休市 |
| `meeting` | 會議 |
| `merge` | 併購與合併 |
| `halt_resume` | 停復牌 |
| `special_treatment` | 特別處理 |
| `special_treatment_start` | 特別處理開始 |
| `special_treatment_end` | 特別處理結束 |
| `listing_status` | 上市狀態 |
| `listing_suspension` | 暫停上市 |
| `listing_resumption` | 恢復上市 |
| `delisting` | 退市 |
| `lockup_expiry` | 限售股解禁 |

## 請求範例

```bash
curl -H "X-API-Key: YOUR_API_KEY" \
  "https://api.tickdb.ai/v1/fundamentals/calendar/other?from=2026-09-21&to=2026-09-28&market=US&category=macrodata&limit=100"
```

## 返回欄位說明

成功回應包含頂層 `code`、`data` 和 `page`。

| 欄位 | 說明 |
|---|---|
| code | 業務狀態碼，成功為 `0`。 |
| data | 當前頁的日期範圍和事件資料。 |
| └─ from | 查詢開始日期，`YYYY-MM-DD`。 |
| └─ to | 查詢結束日期，`YYYY-MM-DD`。 |
| └─ events | 當前頁事件列表；無事件時為空陣列。 |
| &nbsp;&nbsp;└─ event_datetime | 事件時間，UTC 日期時間字串。 |
| &nbsp;&nbsp;└─ market | 所屬市場。 |
| &nbsp;&nbsp;└─ symbol | 關聯產品代碼；不適用時可能為空。 |
| &nbsp;&nbsp;└─ category | 事件細分類別，可能比請求類別更具體。 |
| &nbsp;&nbsp;└─ event_type | 事件類型。 |
| &nbsp;&nbsp;└─ content | 事件內容。 |
| &nbsp;&nbsp;└─ counter_name | 關聯名稱；可能為 `null`。 |
| &nbsp;&nbsp;└─ currency | 幣種；可能為 `null`。 |
| &nbsp;&nbsp;└─ star | 重要程度。 |
| &nbsp;&nbsp;└─ date_type | 事件日期類型；可能為 `null`。 |
| &nbsp;&nbsp;└─ data | 可選的事件附加資料陣列。 |
| &nbsp;&nbsp;&nbsp;&nbsp;└─ key | 附加資料鍵名。 |
| &nbsp;&nbsp;&nbsp;&nbsp;└─ value_raw | 原始值；可能為 `null`。 |
| &nbsp;&nbsp;&nbsp;&nbsp;└─ value_text | 顯示值；可能為 `null`。 |
| &nbsp;&nbsp;&nbsp;&nbsp;└─ value_type | 值類型。 |
| page | 分頁資訊。 |
| └─ next_cursor | 下一頁遊標；末頁為 `null`。 |
| └─ limit | 當前分頁上限。 |
