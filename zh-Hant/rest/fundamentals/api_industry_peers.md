---
title: 同行估值對比
description: 查詢與該股票同行的公司及其估值、每股收益等可比指標。
openapi: "openapi.zh-Hant.yaml GET /v1/fundamentals/industry/peers"
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

- 同業樣本和指標可用性隨市場、公司而變化；財務比率通常以字符串返回。

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
  "https://api.tickdb.ai/v1/fundamentals/industry/peers?symbol=AAPL&type=stock"
```

## 返回字段說明

以下列出 `data` 中的字段；外層 `code=0` 表示成功。

| 字段 | 說明 |
|------|------|
| parent_symbol | 被查詢股票代碼。 |
| peers | 可用於橫向比較的同行公司及指標列表。 |
| └─ peer_symbol | 同行公司股票代碼。 |
| └─ peer_name | 同行公司名稱。 |
| └─ currency | 指標幣種。 |
| └─ pe | 市盈率。 |
| └─ eps | 每股收益。 |
| └─ bps | 每股凈資產。 |
| └─ assets | 資產指標。 |
| └─ dps | 每股股息。 |
| └─ div_yield | 股息率。 |
| └─ div_payout_ratio | 派息率。 |
| └─ five_y_avg_dps | 五年平均每股股息。 |

返回同行公司的估值、每股收益、每股凈資產和股息等指標，便于橫向比較。
