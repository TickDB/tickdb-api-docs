---
title: 行業估值分布
description: 獲取股票所屬行業的估值分布和樣本統計。
openapi: "openapi.zh-Hant.yaml GET /v1/fundamentals/industry/dist"
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

- 不同估值指標分別形成一條分布記錄；排名和分位值以對應行業樣本為準。

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
  "https://api.tickdb.ai/v1/fundamentals/industry/dist?symbol=AAPL&type=stock"
```

## 返回字段說明

以下列出 `data` 中的字段；外層 `code=0` 表示成功。

| 字段 | 說明 |
|------|------|
| symbol | 股票代碼。 |
| distributions | 行業估值分布列表。 |
| └─ metric | 估值指標代碼。 |
| └─ value | 當前股票的指標值。 |
| └─ low | 行業樣本低位。 |
| └─ median | 行業樣本中位。 |
| └─ high | 行業樣本高位。 |
| └─ rank_index | 當前排名。 |
| └─ rank_total | 樣本總數。 |
| └─ ranking | 排名展示值。 |

返回行業估值區間、樣本中位數、當前標的排名及樣本數量等信息。
