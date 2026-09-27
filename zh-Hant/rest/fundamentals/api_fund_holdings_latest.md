---
title: 持股基金
description: 查詢哪些基金披露持有指定股票，以及該股票在各基金持倉中的比例；支持分頁查詢。
openapi: "openapi.zh-Hant.yaml GET /v1/fundamentals/fund-holdings/latest"
contextual:
  options:
    - copy
    - view
---

## 套餐權限

| 套餐 | 可用 |
|---|:---:|
| 免費版 | ❌ |
| 基礎版 | ❌ |
| 專業版 | ✅ |
| 全量套餐（A 股、港股、美股） | ✅ |
| 企業版 | ✅ |

## 注意事項

- 持股信息以基金披露日期為準，不一定反映當前交易日持倉；分頁信息位于響應外層 `page`。

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
| `limit` | 否 | 單頁數量，默認 200，范圍 `1–500` |
| `cursor` | 否 | 分頁游標。第一頁不傳；查詢下一頁時，填寫上一頁響應頂層 `page.next_cursor` 的值 |

## 請求示例

```bash
curl -H "X-API-Key: YOUR_API_KEY" \
  "https://api.tickdb.ai/v1/fundamentals/fund-holdings/latest?symbol=AAPL&type=stock&limit=3"
```

## 返回字段說明

以下列出 `data` 及分頁字段；外層 `code=0` 表示成功。

| 字段 | 說明 |
|------|------|
| symbol | 股票代碼。 |
| total | 持有該股票的基金記錄總數。 |
| members | 披露持有該股票的基金列表。 |
| └─ fund_code | 基金代碼。 |
| └─ fund_symbol | 標準化基金代碼。 |
| └─ fund_name | 基金名稱。 |
| └─ position_ratio | 該股票在對應基金持倉中的比例。 |
| └─ currency | 幣種。 |
| └─ report_date | 報告日期，格式 `YYYY-MM-DD`。 |
| page | 響應外層的分頁信息。 |
| └─ next_cursor | 下一頁游標。非空時原樣傳入下一次請求的 `cursor`；為 `null` 時表示已到最後一頁。 |
| └─ limit | 當前分頁上限。 |

`total` 是符合條件的記錄總數，`members` 只包含當前頁。查詢下一頁時，保持 `symbol`、`type` 和 `limit` 不變，將本頁響應頂層的 `page.next_cursor` 原樣作為下一次請求的 `cursor` 參數；游標是供接口使用的不透明字符串，不需要自行解碼或計算。當 `page.next_cursor` 為 `null` 時停止翻頁。

以上第一頁請求使用 `limit=3`。假設響應頂層的分頁信息為：

```json
{ "page": { "next_cursor": "Mw", "limit": 3 } }
```

則下一頁這樣請求：

```bash
curl -H "X-API-Key: YOUR_API_KEY" \
  "https://api.tickdb.ai/v1/fundamentals/fund-holdings/latest?symbol=AAPL&type=stock&limit=3&cursor=Mw"
```

`Mw` 僅是示例；實際請求應使用上一頁返回的游標。
