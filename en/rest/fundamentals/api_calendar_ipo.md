---
title: IPO Calendar
description: Query new share offerings and listings.
openapi: "openapi.en.yaml GET /v1/fundamentals/calendar/ipo"
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

- The event category is fixed to `ipo` (offerings and listings); do not send `category`.
- `from` defaults to the current UTC date; `to` defaults to seven days after `from`. Both endpoints of the date range are inclusive.
- The default page size is 100; the maximum is 500. Omit `cursor` on the first request. For subsequent pages, keep the filters unchanged and pass the previous `page.next_cursor` verbatim until it is `null`. If you omitted dates initially, use the first response's `data.from` and `data.to` on later pages.
- If the API key is restricted to certain markets, send an allowed `market`. An empty `events` array means no events matched.
- IPO events may use `ipo_listing` or `ipo_offering` in `category`; `issue_price` is returned when available.

## Supported Markets

| Market | Examples |
|---|---|
| US Stocks | US |
| HK Stocks | HK |
| A-Shares | CN |

## Request Parameters

| Parameter | Required | Description |
|---|:---:|---|
| `from` | No | Inclusive start date, `YYYY-MM-DD` |
| `to` | No | Inclusive end date, `YYYY-MM-DD` |
| `market` | No* | Market filter: `US`, `HK`, or `CN`; required for market-restricted API keys |
| `symbols` | No | Comma-separated stock symbols, up to 50 |
| `limit` | No | Page size, `1–500`; default `100` |
| `cursor` | No | Next-page cursor; omit on the first request |

## Request Example

```bash
curl -H "X-API-Key: YOUR_API_KEY" \
  "https://api.tickdb.ai/v1/fundamentals/calendar/ipo?from=2026-09-21&to=2026-09-28&market=CN&limit=100"
```

## Response Fields

A successful response contains top-level `code`, `data`, and `page` fields.

| Field | Description |
|---|---|
| code | Business status code; `0` means success. |
| data | Date range and events on this page. |
| └─ from | Query start date, `YYYY-MM-DD`. |
| └─ to | Query end date, `YYYY-MM-DD`. |
| └─ events | Events on this page; an empty array if none match. |
| &nbsp;&nbsp;└─ event_datetime | Event time as a UTC date-time string. |
| &nbsp;&nbsp;└─ market | Associated market. |
| &nbsp;&nbsp;└─ symbol | Associated product symbol; may be empty when not applicable. |
| &nbsp;&nbsp;└─ category | Detailed event category; may be more specific than the request category. |
| &nbsp;&nbsp;└─ event_type | Event type. |
| &nbsp;&nbsp;└─ content | Event description. |
| &nbsp;&nbsp;└─ counter_name | Associated name; may be `null`. |
| &nbsp;&nbsp;└─ currency | Currency; may be `null`. |
| &nbsp;&nbsp;└─ issue_price | IPO issue price; returned for applicable events and `null` when unavailable. |
| &nbsp;&nbsp;└─ star | Importance level. |
| &nbsp;&nbsp;└─ date_type | Event date type; may be `null`. |
| &nbsp;&nbsp;└─ data | Optional array of additional event data. |
| &nbsp;&nbsp;&nbsp;&nbsp;└─ key | Additional-data key. |
| &nbsp;&nbsp;&nbsp;&nbsp;└─ value_raw | Raw value; may be `null`. |
| &nbsp;&nbsp;&nbsp;&nbsp;└─ value_text | Display value; may be `null`. |
| &nbsp;&nbsp;&nbsp;&nbsp;└─ value_type | Value type. |
| page | Pagination information. |
| └─ next_cursor | Next-page cursor; `null` on the final page. |
| └─ limit | Current page limit. |
