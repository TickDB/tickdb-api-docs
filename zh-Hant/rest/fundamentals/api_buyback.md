---
title: 股票回購
description: 獲取公司回購計劃、執行情況和歷史指標。
openapi: "openapi.zh-Hant.yaml GET /v1/fundamentals/buyback"
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

- 估算類回購指標可能為 `null`。

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
  "https://api.tickdb.ai/v1/fundamentals/buyback?symbol=AAPL&type=stock"
```

## 返回字段說明

以下列出 `data` 中的字段；外層 `code=0` 表示成功。

| 字段 | 說明 |
|------|------|
| symbol | 股票代碼。 |
| currency | 回購金額幣種。 |
| ttm | 最近 12 個月回購指標。 |
| └─ net_buyback | 凈回購額。 |
| └─ net_buyback_yield | 凈回購收益率；可能為 null。 |
| └─ buyback_payout_ratio | 回購支付率；可能為 null。 |
| └─ buyback_to_cashflow_ratio | 回購額與現金流比率；可能為 null。 |
| history | 歷史年度回購記錄。 |
| └─ fiscal_year | 財年。 |
| └─ fiscal_year_range | 財年日期範圍文本，例如 `2024/01/01 - 2024/12/31`。 |
| └─ currency | 該年度幣種。 |
| └─ net_buyback | 凈回購額。 |
| └─ net_buyback_yield | 凈回購收益率；可能為 null。 |
| └─ net_buyback_growth_rate | 凈回購增長率；可能為 null。 |

返回回購 TTM 指標與歷史年度記錄。
