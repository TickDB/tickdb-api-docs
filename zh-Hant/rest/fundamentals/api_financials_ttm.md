---
title: 財務數據 TTM
description: 查詢最近四個有效單季匯總的近12個月利潤表或現金流量表指標。
openapi: "openapi.zh-Hant.yaml GET /v1/fundamentals/financials/ttm"
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

- TTM 指滾動近12個月，由最近四個有效單季數據匯總；僅支持利潤表 `IS` 和現金流量表 `CF`。

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
| `kind` | 是 | 報表類型：`IS` 利潤表或 `CF` 現金流量表 |

<Note>TTM 僅對利潤表 `IS` 和現金流量表 `CF` 定義，傳入資產負債表 `BS` 會返回參數錯誤。</Note>

## 請求示例

```bash
curl -H "X-API-Key: YOUR_API_KEY" \
  "https://api.tickdb.ai/v1/fundamentals/financials/ttm?symbol=AAPL&type=stock&kind=IS"
```

## 返回字段說明

以下列出 `data` 中的字段；外層 `code=0` 表示成功。

| 字段 | 說明 |
|------|------|
| symbol | 股票代碼。 |
| kind | 報表類型：`IS` 利潤表或 `CF` 現金流量表。 |
| rows | 滾動近12個月的財務指標記錄。 |
| └─ kind | 該記錄所屬報表類型：`IS` 利潤表或 `CF` 現金流量表。 |
| └─ field_name | 財務字段代碼；[查看財務字段字典](./financial_fields_dictionary)。 |
| └─ field_display | 展示名稱。 |
| └─ indicator_title | 指標標題。 |
| └─ value | 對應指標的近12個月匯總值，以字符串返回。 |
| └─ currency | 幣種。 |
| └─ is_percent | 是否為百分比字段。 |
| └─ fiscal_year | 對應財年。 |
| └─ fiscal_period | 對應報告期。 |
| └─ period_type | `ttm`，表示滾動近12個月的匯總數據。 |
| └─ period_end | 期末日期，格式 `YYYY-MM-DD`。 |
| └─ yoy | 同比變化；可能為 null。 |
| └─ ratio | 比率；可能為 null。 |

返回最近四個有效單季匯總後的滾動近12個月財務指標。
