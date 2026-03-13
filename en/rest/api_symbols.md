---
title: Symbol Query
description: Query products supported by TickDB, covering forex, indices, US stocks, HK stocks, A-shares, and crypto markets with over 27,000 products and growing.
openapi: GET /v1/symbols/available
---

## Notes
- Market codes are case-insensitive
- Refer to Data Specification for product naming conventions

## Markets & Product Types

Use `market` and `type` parameters to filter products flexibly. They can be used individually or combined.

| market | type | Description | Volume |
|--------|------|-------------|--------|
| GLOBAL | forex | Forex pairs & precious metals | 1,200+ |
| GLOBAL | indices | Market indices | 12,700+ |
| GLOBAL | crypto | Cryptocurrency pairs | 800+ |
| US | stock | US stocks | 4,000+ |
| HK | stock | Hong Kong stocks | 2,800+ |
| CN | stock | A-shares | 6,000+ |

- `market` filters by specific market, e.g. `market=CN` returns only A-shares
- `type` filters by product category, e.g. `type=stock` returns all stocks across US + HK + CN
- Combined: `market=HK&type=stock` returns only HK stocks

## Request Parameters

| Parameter | Required | Description |
|-----------|----------|-------------|
| type | No | Product type filter: stock, crypto, forex, indices |
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
| └─ type | Product type (stock/crypto/forex/indices) |
| └─ currency | Trading currency (CNY/USD/HKD/USDT) |
| └─ is_active | Whether the symbol is active |
| └─ updated_at | Last updated time |
| summary | Summary information |
| └─ total_products | Total number of products |
| └─ by_market | Count by market |
| └─ by_type | Count by type |
| └─ last_updated | Last updated time |
| pagination | Pagination information |
| └─ limit | Page size |
| └─ offset | Offset |
| └─ total | Total count |
| └─ count | Number of items returned in current page |
