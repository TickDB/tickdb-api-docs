---
title: Trading Sessions
description: Query trading session information for one or all supported markets, including opening and closing times.
openapi: "openapi.en.yaml GET /v1/market/trading-sessions"
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
- All returned times are in the **local timezone** of each market

## Supported Markets

| Market | Examples |
|---|---|
| US Stocks | US |
| HK Stocks | HK |
| A-Shares | CN |

## Request Parameters

| Parameter | Required | Description |
|-----------|----------|-------------|
| market | No | Market code: `US`, `HK`, or `CN`. Omit it to return all supported markets |

## Response Fields

| Field | Description |
|-------|-------------|
| market | Market (US - US Stock Market, HK - Hong Kong Stock Exchange, CN - A-Share Market) |
| trading_sessions | Trading sessions array |
| └─ begin_time | Trading start time, format: hhmm, e.g., 900 |
| └─ end_time | Trading end time, format: hhmm, e.g., 1400 |
| └─ trade_session | Trading session type (0 - Normal Trading, 1 - Pre-Market, 2 - After-Hours, 3 - Overnight) |
