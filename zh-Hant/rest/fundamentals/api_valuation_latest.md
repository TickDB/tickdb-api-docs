---
title: 最新估值
description: 獲取股票當前市盈率及近一年區間統計。
openapi: "openapi.zh-Hant.yaml GET /v1/fundamentals/valuation/latest"
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

- 缺少可用估值數據時，單個指標的 `value` 和區間統計可能為 `null`。

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
  "https://api.tickdb.ai/v1/fundamentals/valuation/latest?symbol=AAPL&type=stock"
```

## 返回字段說明

以下列出 `data` 中的字段；外層 `code=0` 表示成功。

| 字段 | 說明 |
|------|------|
| symbol | 股票代碼。 |
| metrics | 按指標代碼組織的估值快照。 |
| └─ PE | 市盈率指標。 |
| &nbsp;&nbsp;&nbsp;&nbsp;└─ value | 當前市盈率；可能為 null。 |
| &nbsp;&nbsp;&nbsp;&nbsp;└─ low_1y | 近一年低位。 |
| &nbsp;&nbsp;&nbsp;&nbsp;└─ median_1y | 近一年中位。 |
| &nbsp;&nbsp;&nbsp;&nbsp;└─ high_1y | 近一年高位。 |
| &nbsp;&nbsp;&nbsp;&nbsp;└─ desc | 指標說明；可能為 null。 |

返回當前市盈率（PE）及其近一年低位、中位和高位統計。
