---
title: 公司行動
description: 查詢拆股、并股、配股、代碼變更等公司行動事件。
openapi: "openapi.zh-Hant.yaml GET /v1/fundamentals/corp-actions"
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

- 公司行動事件可跨多個歷史日期；`is_recent` 標記近期事件，不代表事件一定發生在查詢當天。

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
| `from` | 否 | 起始日期，格式 `YYYY-MM-DD` |
| `to` | 否 | 結束日期，格式 `YYYY-MM-DD` |

## 請求示例

```bash
curl -H "X-API-Key: YOUR_API_KEY" \
  "https://api.tickdb.ai/v1/fundamentals/corp-actions?symbol=AAPL&type=stock"
```

## 返回字段說明

以下列出 `data` 中的字段；外層 `code=0` 表示成功。

| 字段 | 說明 |
|------|------|
| symbol | 股票代碼。 |
| events | 公司行動事件列表。 |
| └─ event_id | 事件 ID。 |
| └─ action_code | 行動代碼。 |
| └─ act_type | 行動類型。 |
| └─ act_desc | 行動說明。 |
| └─ event_date | 事件日期，格式 `YYYY-MM-DD`。 |
| └─ date_type | 日期類型。 |
| └─ date_zone | 時區。 |
| └─ is_recent | 是否為近期事件。 |

返回事件日期、事件類型、行動代碼和事件說明等公司行動信息。
