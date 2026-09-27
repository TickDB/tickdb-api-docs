---
title: 行業分類層級
description: 查詢指定行業所屬的頂層分類及下級行業分類。
openapi: "openapi.zh-Hant.yaml GET /v1/fundamentals/industries/tree"
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

- `industry_counter_id` 可從行業指標排行獲取；不同市場的行業節點不能混用。
- `market` 不區分大小寫，文檔中的市場代碼統一使用大寫形式。

## 支持的市場

| 市場 | 示例 |
|---|---|
| 美股 | US |
| 港股 | HK |
| A股 | CN |

## 請求參數

| 參數 | 是否必須 | 說明 |
|---|:---:|---|
| `market` | 是 | 市場代碼：`US` 美股、`HK` 港股、`CN` A股 |
| `industry_counter_id` | 是 | 行業節點 ID，可從行業指標排行接口獲取 |

## 請求示例

```bash
curl -H "X-API-Key: YOUR_API_KEY" \
  "https://api.tickdb.ai/v1/fundamentals/industries/tree?market=US&industry_counter_id=BK%2FUS%2FIN00260"
```

## 返回字段說明

以下列出 `data` 中的字段；外層 `code=0` 表示成功。

| 字段 | 說明 |
|------|------|
| market | 查詢市場。 |
| industry_counter_id | 行業節點 ID。 |
| top | 所屬頂層行業分類。 |
| └─ name | 頂層行業名稱。 |
| └─ market | 頂層行業市場。 |
| chain | 當前行業及其下級分類組成的層級結構。 |
| └─ name | 節點名稱。 |
| └─ counter_id | 行業節點 ID。 |
| └─ level | 節點層級。 |
| └─ parent_code | 父節點代碼。 |
| └─ market | 所屬市場。 |
| └─ stock_num | 股票數量。 |
| └─ chg | 變動值。 |
| └─ ytd_chg | 年初至今變動值。 |
| └─ symbol | 節點關聯代碼。 |
| └─ sharelist_id | 股票列表 ID。 |
| └─ next | 下級行業分類列表；元素遞歸使用相同節點結構。 |

返回指定行業的頂層歸屬、當前分類和下級分類，便于查看行業分類關系。
