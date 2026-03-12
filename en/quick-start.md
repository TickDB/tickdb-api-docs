---
title: Quick Start
description: Get up and running with TickDB in minutes.
---

This guide helps you get started with TickDB in under 10 minutes.

## Step 1: Create an API Key

Sign up at https://tickdb.ai and create an API key from the dashboard.

## Step 2: Authentication

TickDB uses API Key authentication. All REST API requests must include the following header:

```http
X-API-Key: YOUR_API_KEY
```

## Step 3: Base URL

```
https://api.tickdb.ai
```

## Step 4: First Request

```bash
curl -H "X-API-Key: YOUR_API_KEY" \
     "https://api.tickdb.ai/v1/market/ticker?symbols=700.HK,AAPL.US"
```

### Response Example

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
