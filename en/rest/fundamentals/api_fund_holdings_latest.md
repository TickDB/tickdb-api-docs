---
title: Funds Holding a Stock
description: Query funds that disclose holdings in a specified stock and the stock's weight in each fund; supports pagination.
openapi: "openapi.en.yaml GET /v1/fundamentals/fund-holdings/latest"
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

- Holdings are based on each fund's disclosure date and may not reflect the current trading date. Pagination information is returned in the top-level `page` object.

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
| `limit` | No | Number of records per page; default `200`, range `1–500` |
| `cursor` | No | Pagination cursor. Omit it on the first request; for the next page, pass the previous response's top-level `page.next_cursor` value |

## Request Example

```bash
curl -H "X-API-Key: YOUR_API_KEY" \
  "https://api.tickdb.ai/v1/fundamentals/fund-holdings/latest?symbol=AAPL&type=stock&limit=3"
```

## Response Fields

The table below lists fields in `data` and the pagination fields; an outer `code=0` indicates success.

| Field | Description |
|------|------|
| symbol | Stock symbol. |
| total | Total number of fund records holding the stock. |
| members | Funds that disclose holdings in the stock. |
| └─ fund_code | Fund code. |
| └─ fund_symbol | Standardized fund symbol. |
| └─ fund_name | Fund name. |
| └─ position_ratio | Weight of the stock in the fund's holdings. |
| └─ currency | Currency. |
| └─ report_date | Report date in `YYYY-MM-DD` format. |
| page | Top-level pagination information. |
| └─ next_cursor | Cursor for the next page. When non-null, pass it unchanged as `cursor` in the next request; `null` means the last page has been reached. |
| └─ limit | Current page limit. |

`total` is the total number of matching records, while `members` contains only the current page. To request the next page, keep `symbol`, `type`, and `limit` unchanged and pass the current response's top-level `page.next_cursor` value unchanged as the next request's `cursor`. The cursor is an opaque string used by the API and should not be decoded or calculated by the client. Stop when `page.next_cursor` is `null`.

The first-page example above uses `limit=3`. If its top-level pagination object is:

```json
{ "page": { "next_cursor": "Mw", "limit": 3 } }
```

request the next page as follows:

```bash
curl -H "X-API-Key: YOUR_API_KEY" \
  "https://api.tickdb.ai/v1/fundamentals/fund-holdings/latest?symbol=AAPL&type=stock&limit=3&cursor=Mw"
```

`Mw` is only an example; always use the cursor returned by the preceding page.
