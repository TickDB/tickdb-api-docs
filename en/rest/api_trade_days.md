---
title: Trading Calendar
description: Query the list of trading days for a specified market within a specific time range, used to determine if a particular day is a trading day.
openapi: GET /v1/market/trade-days
---

## Notes
- Date format must be YYYYMMDD (e.g., 20260201)
- Returned trading days exclude weekends and holidays
- Market code is case-insensitive

## Supported Markets

- **US** - US Stock Market
- **HK** - Hong Kong Stock Exchange
- **CN** - A-Share Market

## Request Parameters

| Parameter | Required | Description |
|-----------|----------|-------------|
| market | Yes | Market code, options: US, HK, CN |
| beg_day | Yes | Start date, format: YYYYMMDD |
| end_day | Yes | End date, format: YYYYMMDD |

## Response Fields

| Field | Description |
|-------|-------------|
| market | Market code |
| trade_days | Full trading days list, using YYYYMMDD format |
| half_trade_days | Half trading days list (half-day trading only), using YYYYMMDD format |
