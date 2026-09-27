---
title: 最新股東結構
description: 獲取當前股東結構快照。
openapi: "openapi.zh-Hant.yaml GET /v1/fundamentals/shareholders/latest"
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

- 報告日期代表股東數據所屬披露期，不一定是當前交易日。

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

## 請求示例

```bash
curl -H "X-API-Key: YOUR_API_KEY" \
  "https://api.tickdb.ai/v1/fundamentals/shareholders/latest?symbol=AAPL&type=stock"
```

## 返回字段說明

以下列出 `data` 中的字段；外層 `code=0` 表示成功。

| 字段 | 說明 |
|------|------|
| symbol | 股票代碼。 |
| report_date | 報告日期，格式 `YYYY-MM-DD`。 |
| total | 股東記錄總數。 |
| members | 股東記錄列表。 |
| └─ shareholder_name | 股東名稱。 |
| └─ percent_of_shares | 持股比例數值，不含百分號。 |
| └─ shares_changed | 較上一報告期的股份變動數量。 |
| └─ report_date | 該條記錄的報告日期，格式 `YYYY-MM-DD`。 |

返回股東名稱、持股比例、股份變化和報告日期等當前股東結構信息。
