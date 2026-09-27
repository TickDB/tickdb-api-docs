---
title: Shareholder Holdings
description: Query major shareholders' holdings, position changes, and detail availability across reporting periods.
openapi: "openapi.en.yaml GET /v1/fundamentals/shareholders/top"
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

- The response contains shareholder records from multiple reporting periods and is not limited to ten shareholders. Only an `object_id` with `detail_available=true` can be used with the shareholder detail endpoint.

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
  "https://api.tickdb.ai/v1/fundamentals/shareholders/top?symbol=AAPL&type=stock"
```

## Response Fields

The table below lists fields in `data`; an outer `code=0` indicates success.

| Field | Description |
|------|------|
| symbol | Stock symbol. |
| total | Total number of summarized records. |
| periods | Available reporting periods. |
| info | Shareholder holdings grouped by reporting period. |
| └─ period | Reporting period. |
| └─ share_holders | Shareholder list for the reporting period. |
| &nbsp;&nbsp;&nbsp;&nbsp;└─ object_id | Shareholder object ID. |
| &nbsp;&nbsp;&nbsp;&nbsp;└─ name | Shareholder name. |
| &nbsp;&nbsp;&nbsp;&nbsp;└─ shares_held | Number of shares held, returned as a string. |
| &nbsp;&nbsp;&nbsp;&nbsp;└─ percent_shares_held | Ownership percentage, including the percent sign. |
| &nbsp;&nbsp;&nbsp;&nbsp;└─ shares_changed | Change in shares. |
| &nbsp;&nbsp;&nbsp;&nbsp;└─ percent_shares_changed | Change in ownership percentage, including the percent sign. |
| &nbsp;&nbsp;&nbsp;&nbsp;└─ period | Reporting period for this record. |
| &nbsp;&nbsp;&nbsp;&nbsp;└─ filing_date | Original filing-date text, for example `2026/05/07`. |
| members | Normalized shareholder records. |
| └─ shareholder_name | Shareholder name. |
| └─ shareholder_type | Shareholder type. |
| └─ shares_held | Number of shares held, returned as a string. |
| └─ percent_shares_held | Ownership percentage value without the percent sign; `null` when it cannot be converted. |
| └─ percent_shares_held_raw | Original ownership percentage text, including the percent sign and representations such as `<0.01%`. |
| └─ percent_shares_changed | Ownership percentage change without the percent sign; `null` when it cannot be converted. |
| └─ filing_date | Filing date in `YYYY-MM-DD` format. |
| └─ report_date | Report date in `YYYY-MM-DD` format; may be `null`. |
| └─ object_id | Shareholder object ID. |
| └─ detail_available | Whether shareholder details can be queried. |

Returns shareholder names, institution types, shares held, ownership percentages, report dates, `object_id`, and `detail_available`.

Only an `object_id` with `detail_available=true` can be used with the shareholder detail endpoint.
