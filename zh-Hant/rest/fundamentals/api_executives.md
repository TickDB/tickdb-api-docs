---
title: 高管與董事
description: 獲取公司當前高管、董事及關鍵人員列表。
openapi: "openapi.zh-Hant.yaml GET /v1/fundamentals/executives"
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

- 人員簡介可能為空。

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
  "https://api.tickdb.ai/v1/fundamentals/executives?symbol=AAPL&type=stock"
```

## 返回字段說明

以下列出 `data` 中的字段；外層 `code=0` 表示成功。

| 字段 | 說明 |
|------|------|
| symbol | 股票代碼。 |
| total | 人員總數。 |
| members | 高管、董事及關鍵人員列表。 |
| └─ name | 姓名。 |
| └─ title | 職務。 |
| └─ biography | 人物簡介。 |

返回公司當前高管、董事或關鍵人員列表，可用於管理層和公司治理研究。
