---
title: 快速開始
description: 在幾分鐘內開始使用 TickDB。
---

本指南幫助您在 10 分鐘內開始使用 TickDB。

## 步驟 1：創建 API 密鑰

在 https://tickdb.ai 註冊並從控制台創建 API 密鑰。

## 步驟 2：身份驗證

TickDB 使用 API 密鑰身份驗證。所有 REST API 請求必須包含以下請求頭：

```http
X-API-Key: YOUR_API_KEY
```

## 步驟 3：基礎 URL

```
https://api.tickdb.ai
```

## 步驟 4：第一個請求

```bash
curl -H "X-API-Key: YOUR_API_KEY" \
     "https://api.tickdb.ai/v1/market/ticker?symbols=700.HK,AAPL.US"
```

### 響應示例

```json
{
  "code": 0,
  "message": "success",
  "data": [
    {
      "symbol": "700.HK",
      "last_price": "543",
      "volume_24h": "11205874",
      "high_24h": "557",
      "low_24h": "543",
      "price_change_24h": "-9",
      "price_change_percent_24h": "-1.63",
      "timestamp": 1773292807000
    },
    {
      "symbol": "AAPL.US",
      "last_price": "260.81",
      "volume_24h": "26218927",
      "high_24h": "262.13",
      "low_24h": "259.55",
      "price_change_24h": "-0.02",
      "price_change_percent_24h": "-0.01",
      "timestamp": 1773259201000
    }
  ]
}
```
