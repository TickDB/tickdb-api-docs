---
title: Company Profile
description: Retrieve basic company information, market, industry, and listing details.
openapi: "openapi.en.yaml GET /v1/fundamentals/profile"
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

- Some profile fields may be an empty string or `null`; do not interpret a missing value as “none.”

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
  "https://api.tickdb.ai/v1/fundamentals/profile?symbol=AAPL&type=stock"
```

## Response Fields

The table below lists fields in `data`; an outer `code=0` indicates success.

| Field | Description |
|---|---|
| symbol | Normalized stock symbol. |
| market | Market. |
| region | Region. |
| company_name | Full company name. |
| name | Display name. |
| profile | Business profile. |
| address | Address. |
| office_address | Office address. |
| phone | Telephone number. |
| email | Email address. |
| website | Company website. |
| founded | Founding year or date; `null` when unavailable. |
| listing_date | Listing date in `YYYY-MM-DD` format; may be `null`. |
| year_end | Fiscal year-end information; may be `null`. |
| employees | Number of employees. |
| chairman | Chairperson. |
| manager | Principal manager. |
| secretary | Company secretary. |
| legal_repr | Legal representative. |
| accounting_firm | Accounting firm. |
| legal_counsel | Legal counsel. |
| category | Company category. |

Field availability varies by market and company; use the actual response as the source of truth.
