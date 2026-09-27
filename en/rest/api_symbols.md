---
title: Symbol Query
description: Query products supported by TickDB, covering forex, indices, US stocks, HK stocks, A-shares, China futures, Hong Kong futures, and crypto markets, with the product list continuously growing.
openapi: "openapi.en.yaml GET /v1/symbols/available"
contextual:
  options:
    - copy
    - view
---

## Plan Access

| Plan | Available |
|---|:---:|
| Free | ✅ |
| Starter | ✅ |
| Professional | ✅ |
| Full-Market Plans (A-Shares, HK Stocks, US Stocks) | ✅ |
| Enterprise | ✅ |

## Notes
- Market codes are case-insensitive
- You can also browse and search all supported products in the [TickDB Dashboard](https://tickdb.ai) product management page

<Frame>
  <img src="/symbols.png" alt="TickDB Dashboard - Product Query" />
</Frame>

## Markets & Product Types

Use `market` and `type` parameters to filter products flexibly. They can be used individually or combined.

| market | type | Description | Volume |
|--------|------|-------------|--------|
| GLOBAL | forex | Forex pairs & precious metals | 1,200+ |
| GLOBAL | indices | Market indices | 13,300+ |
| GLOBAL | crypto | Cryptocurrency pairs | 800+ |
| US | stock | US stocks | 14,300+ |
| HK | stock | Hong Kong stocks | 3,300+ |
| CN | stock | A-shares | 7,500+ |
| CN | futures | China futures | 1,000+ |
| HK | futures | Hong Kong futures | 200+ |

- `market` filters by specific market, e.g. `market=CN` returns A-shares and China futures
- `type` filters by product category, e.g. `type=stock` returns all stocks across US + HK + CN
- Combined: `market=HK&type=stock` returns only HK stocks
- Combined: `market=HK&type=futures` returns only Hong Kong futures

## Request Parameters

| Parameter | Required | Description |
|-----------|----------|-------------|
| type | No | Product type filter: stock, crypto, forex, indices, futures |
| market | No | Market filter: GLOBAL, US, HK, CN |
| limit | No | Number of results per page, default 100, max 1000 |
| offset | No | Pagination offset, default 0 |

## Response Fields

| Field | Description |
|-------|-------------|
| products | Array of products |
| └─ symbol | Product symbol code |
| └─ name | Product name |
| └─ market | Market code |
| └─ type | Product type (stock/crypto/forex/indices/futures) |
| └─ currency | Trading currency (CNY/USD/HKD/USDT) |
| └─ is_active | Whether the symbol is active |
| └─ updated_at | Last updated time as an RFC 3339 date-time string with a time-zone offset |
| summary | Summary information |
| └─ total_products | Total number of products |
| └─ by_market | Count by market |
| └─ by_type | Count by type |
| └─ last_updated | Last updated time as an RFC 3339 date-time string with a time-zone offset |
| pagination | Pagination information |
| └─ limit | Page size |
| └─ offset | Offset |
| └─ total | Total count |
| └─ count | Number of items returned in current page |
