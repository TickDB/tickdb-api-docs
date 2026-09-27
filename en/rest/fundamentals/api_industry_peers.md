---
title: Peer Valuation Comparison
description: Retrieve peer companies and comparable valuation, earnings-per-share, and related metrics.
openapi: "openapi.en.yaml GET /v1/fundamentals/industry/peers"
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

- Peer samples and metric availability vary by market and company. Financial ratios are normally returned as strings.

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
  "https://api.tickdb.ai/v1/fundamentals/industry/peers?symbol=AAPL&type=stock"
```

## Response Fields

The table below lists fields in `data`; an outer `code=0` indicates success.

| Field | Description |
|---|---|
| parent_symbol | Queried stock symbol. |
| peers | Peer companies and comparable metrics. |
| └─ peer_symbol | Peer stock symbol. |
| └─ peer_name | Peer company name. |
| └─ currency | Metric currency. |
| └─ pe | Price-to-earnings ratio. |
| └─ eps | Earnings per share. |
| └─ bps | Book value per share. |
| └─ assets | Asset metric. |
| └─ dps | Dividend per share. |
| └─ div_yield | Dividend yield. |
| └─ div_payout_ratio | Dividend payout ratio. |
| └─ five_y_avg_dps | Five-year average dividend per share. |

Returns peer valuation, earnings per share, book value per share, dividend, and related metrics for cross-company comparison.
