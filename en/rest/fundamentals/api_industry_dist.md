---
title: Industry Valuation Distribution
description: Retrieve valuation distributions and sample statistics for the stock's industry.
openapi: "openapi.en.yaml GET /v1/fundamentals/industry/dist"
contextual:
  options:
    - copy
    - view
---

## Plan Access

| Plan | Available |
|---|:---:|
| Free | ❌ |
| Starter | ❌ |
| Professional | ✅ |
| Full-Market Plans (A-Shares, HK Stocks, US Stocks) | ✅ |
| Enterprise | ✅ |

## Notes

- Each valuation metric produces a separate distribution record. Rankings and percentile values are based on the corresponding industry sample.

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
  "https://api.tickdb.ai/v1/fundamentals/industry/dist?symbol=AAPL&type=stock"
```

## Response Fields

The table below lists fields in `data`; an outer `code=0` indicates success.

| Field | Description |
|---|---|
| symbol | Stock symbol. |
| distributions | Industry valuation distributions. |
| └─ metric | Valuation metric code. |
| └─ value | Current stock's metric value. |
| └─ low | Industry sample low. |
| └─ median | Industry sample median. |
| └─ high | Industry sample high. |
| └─ rank_index | Current rank. |
| └─ rank_total | Total sample size. |
| └─ ranking | Display value for the ranking. |

Returns the industry valuation range, sample median, the stock's rank, and sample size.
