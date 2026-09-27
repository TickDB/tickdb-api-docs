---
title: Trading Calendar
description: Query the list of trading days for a specified market within a specific time range, used to determine if a particular day is a trading day.
openapi: "openapi.en.yaml GET /v1/market/trade-days"
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
- Date format must be YYYYMMDD (e.g., 20260201)
- A single query can cover no more than 31 days
- The start date must be within the most recent year
- Returned trading days exclude weekends and holidays
- Market code is case-insensitive

## Supported Markets

| Market | Examples |
|---|---|
| US Stocks | US |
| HK Stocks | HK |
| A-Shares | CN |

## Request Parameters

| Parameter | Required | Description |
|-----------|----------|-------------|
| market | Yes | Market code: `US`, `HK`, or `CN` |
| beg_day | Yes | Start date in YYYYMMDD format; must be within the most recent year |
| end_day | Yes | End date in YYYYMMDD format; the range from the start date cannot exceed 31 days |

## Response Fields

| Field | Description |
|-------|-------------|
| market | Market code |
| trade_days | Full trading days list, using YYYYMMDD format |
| half_trade_days | Half trading days list (half-day trading only), using YYYYMMDD format |
