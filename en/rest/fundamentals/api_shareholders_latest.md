---
title: Latest Shareholder Structure
description: Retrieve the latest disclosed shareholder structure snapshot.
openapi: "openapi.en.yaml GET /v1/fundamentals/shareholders/latest"
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

- The report date identifies the disclosure period of the shareholder data and may not be the current trading date.

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
  "https://api.tickdb.ai/v1/fundamentals/shareholders/latest?symbol=AAPL&type=stock"
```

## Response Fields

The table below lists fields in `data`; an outer `code=0` indicates success.

| Field | Description |
|------|------|
| symbol | Stock symbol. |
| report_date | Report date in `YYYY-MM-DD` format. |
| total | Total number of shareholder records. |
| members | Shareholder record list. |
| └─ shareholder_name | Shareholder name. |
| └─ percent_of_shares | Shareholding percentage value without the percent sign. |
| └─ shares_changed | Change in shares from the previous reporting period. |
| └─ report_date | Report date for this record in `YYYY-MM-DD` format. |

Returns the current shareholder structure, including shareholder names, ownership percentages, share changes, and report dates.
