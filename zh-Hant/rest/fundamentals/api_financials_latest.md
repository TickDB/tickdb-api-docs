---
title: 近期財務報表
description: 查詢最近若干期利潤表、資產負債表或現金流量表的指標數據。
openapi: "openapi.zh-Hant.yaml GET /v1/fundamentals/financials/latest"
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

- `rows` 是字段級記錄；同一期報表通常對應多條記錄，`n` 表示期數而非返回行數。

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
| `kind` | 是 | 報表類型：`IS` 利潤表、`BS` 資產負債表、`CF` 現金流量表 |
| `n` | 否 | 返回期數，范圍 `1–20` |
| `period_type` | 否 | 財務周期類型：`q1` 第一季度、`q2` 第二季度、`q3` 第三季度、`q4` 第四季度、`saf` 半年度、`af` 年度；多個值用逗號分隔 |

## 請求示例

```bash
curl -H "X-API-Key: YOUR_API_KEY" \
  "https://api.tickdb.ai/v1/fundamentals/financials/latest?symbol=AAPL&type=stock&kind=IS&n=4"
```

## 返回字段說明

以下列出 `data` 中的字段；外層 `code=0` 表示成功。

| 字段 | 說明 |
|------|------|
| symbol | 股票代碼。 |
| kind | 報表類型：`IS` 利潤表、`BS` 資產負債表、`CF` 現金流量表。 |
| rows | 最近若干期的報表指標記錄；同一期通常有多條。 |
| └─ kind | 該記錄所屬報表類型：`IS` 利潤表、`BS` 資產負債表、`CF` 現金流量表。 |
| └─ field_name | 財務字段代碼；[查看財務字段字典](./financial_fields_dictionary)。 |
| └─ field_display | 展示名稱。 |
| └─ indicator_title | 指標標題。 |
| └─ value | 字段數值，以字符串返回。 |
| └─ currency | 幣種。 |
| └─ is_percent | 是否為百分比字段。 |
| └─ fiscal_year | 財年。 |
| └─ fiscal_period | 報告期。 |
| └─ period_type | 財務周期類型：`q1` 第一季度、`q2` 第二季度、`q3` 第三季度、`q4` 第四季度、`saf` 半年度、`af` 年度。 |
| └─ period_end | 期末日期，格式 `YYYY-MM-DD`。 |
| └─ yoy | 同比變化；可能為 null。 |
| └─ ratio | 比率；可能為 null。 |

按報表類型返回近期各報告期的指標數據；`n` 控制報告期數，不是指標記錄條數。
