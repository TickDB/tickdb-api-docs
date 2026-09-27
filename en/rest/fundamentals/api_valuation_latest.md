---
title: Latest Valuation
description: Retrieve the current price-to-earnings ratio and one-year range statistics.
openapi: "openapi.en.yaml GET /v1/fundamentals/valuation/latest"
contextual:
  options:
    - copy
    - view
---

## Plan Access

| Plan | Available |
|---|:---:|
| Free | ❌ |
| Starter | ✅ |
| Professional | ✅ |
| Full-Market Plans (A-Shares, HK Stocks, US Stocks) | ✅ |
| Enterprise | ✅ |

## Notes

- When valuation data is unavailable, an individual metric's `value` and range statistics may be `null`.

## Supported Markets

| Market | Examples |
|---|---|
| US Stocks | AAPL.US |
| HK Stocks | 700.HK |
| A-Shares | 600519.SH |

## Request Parameters

| Parameter | Required | Description |
|---|:---:|---|
| `symbol` | Yes | Stock symbol |
| `type` | No | Product type; currently supports `stock` |

## Request Example

```bash
curl -H "X-API-Key: YOUR_API_KEY" \
  "https://api.tickdb.ai/v1/fundamentals/valuation/latest?symbol=AAPL&type=stock"
```

## Response Fields

The table below lists fields in `data`; an outer `code=0` indicates success.

| Field | Description |
|---|---|
| symbol | Stock symbol. |
| metrics | Valuation snapshot keyed by metric code. |
| └─ PE | Price-to-earnings metric. |
| &nbsp;&nbsp;&nbsp;&nbsp;└─ value | Current price-to-earnings ratio; may be `null`. |
| &nbsp;&nbsp;&nbsp;&nbsp;└─ low_1y | One-year low. |
| &nbsp;&nbsp;&nbsp;&nbsp;└─ median_1y | One-year median. |
| &nbsp;&nbsp;&nbsp;&nbsp;└─ high_1y | One-year high. |
| &nbsp;&nbsp;&nbsp;&nbsp;└─ desc | Metric description; may be `null`. |

Returns the current price-to-earnings ratio (`PE`) and its one-year low, median, and high.
