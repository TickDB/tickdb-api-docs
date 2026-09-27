---
title: 股息TTM
description: TTM 指截至統計日的最近 12 個月；查詢這段時間內按幣種匯總的每股現金股息。
openapi: "openapi.zh-Hant.yaml GET /v1/fundamentals/dividends/ttm"
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

- 統計窗口按除息日計算：`ex_date > window_start_exclusive` 且 `ex_date <= as_of_date`；不同幣種不合并。

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
| `as_of` | 否 | 統計截止日，格式 `YYYY-MM-DD`；默認當前日期 |

## 請求示例

```bash
curl -H "X-API-Key: YOUR_API_KEY" \
  "https://api.tickdb.ai/v1/fundamentals/dividends/ttm?symbol=AAPL&type=stock"
```

## 返回字段說明

以下列出 `data` 中的字段；外層 `code=0` 表示成功。

| 字段 | 說明 |
|------|------|
| symbol | 股票代碼。 |
| as_of_date | TTM 統計截止日，格式 `YYYY-MM-DD`。 |
| window_start_exclusive | 最近 12 個月窗口的排他起點，格式 `YYYY-MM-DD`。 |
| currencies | 按幣種分別匯總的現金股息列表。 |
| └─ currency | 分紅幣種。 |
| └─ normal_cash_dps_ttm | 普通現金每股股息 TTM。 |
| └─ special_cash_dps_ttm | 特別現金每股股息 TTM。 |
| └─ total_cash_dps_ttm | 現金每股股息合計；不是股息率。 |
| └─ normal_event_count | 普通現金分紅事件次數。 |
| └─ special_event_count | 特別現金分紅事件次數。 |

按幣種返回普通股息、特殊股息、合計現金每股股息及事件數量。統計窗口為截至 `as_of` 的最近 12 個月。
