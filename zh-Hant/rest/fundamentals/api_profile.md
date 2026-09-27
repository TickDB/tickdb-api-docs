---
title: 公司資料
description: 獲取公司的基本資料、所屬市場、行業和上市信息。
openapi: "openapi.zh-Hant.yaml GET /v1/fundamentals/profile"
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

- 部分資料字段可能為空字符串或 `null`；不要把缺失值當作“無”。

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
  "https://api.tickdb.ai/v1/fundamentals/profile?symbol=AAPL&type=stock"
```

## 返回字段說明

以下列出 `data` 中的字段；外層 `code=0` 表示成功。

| 字段 | 說明 |
|------|------|
| symbol | 標準化股票代碼。 |
| market | 所屬市場。 |
| region | 所屬地區。 |
| company_name | 公司全稱。 |
| name | 展示名稱。 |
| profile | 公司業務簡介。 |
| address | 地址。 |
| office_address | 辦公地址。 |
| phone | 聯系電話。 |
| email | 電子郵箱。 |
| website | 公司網站。 |
| founded | 成立年份或日期；無數據時為 null。 |
| listing_date | 上市日期，格式 `YYYY-MM-DD`；可能為 `null`。 |
| year_end | 財年結束信息；可能為 null。 |
| employees | 員工人數。 |
| chairman | 董事長。 |
| manager | 主要管理人員。 |
| secretary | 公司秘書。 |
| legal_repr | 法定代表人。 |
| accounting_firm | 會計師事務所。 |
| legal_counsel | 法律顧問。 |
| category | 公司類別。 |

部分字段會因市場及個股而異；以實際返回為準。
