---
title: 快速开始
description: 在几分钟内开始使用 TickDB。
---

本指南帮助您在 10 分钟内开始使用 TickDB。

## 步骤 1：创建 API 密钥

在 https://tickdb.ai 注册并从控制台创建 API 密钥。

## 步骤 2：身份验证

TickDB 使用 API 密钥身份验证。所有 REST API 请求必须包含以下请求头：

```http
X-API-Key: YOUR_API_KEY
```

## 步骤 3：基础 URL

```
https://api.tickdb.ai
```

## 步骤 4：第一个请求

```bash
curl -H "X-API-Key: YOUR_API_KEY" \
     "https://api.tickdb.ai/v1/market/ticker?symbols=700.HK,AAPL.US"
```

### 响应示例

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
