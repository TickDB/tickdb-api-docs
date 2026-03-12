---
title: Capital Flow
description: Retrieve capital flow data for stocks, including inflow and outflow of main funds, large orders, medium orders, and small orders.
openapi: GET /v1/market/capital-flow
---

## Notes
- Capital flow data is calculated based on volume and price changes
- Update frequency depends on market trading activity

## Supported Markets

**US Stocks**, **HK Stocks**, **A-Shares**

Examples:
- US Stocks: AAPL.US, TSLA.US, MSFT.US
- HK Stocks: 700.HK, 9988.HK, 3690.HK
- A-Shares: 000001.SH, 000001.SZ

## Request Parameters

| Parameter | Required | Description |
|-----------|----------|-------------|
| symbol | Yes | Stock symbol code |

## Response Fields

| Field Name | Description |
|------------|-------------|
| symbol | Trading Symbol |
| timestamp | Data update timestamp |
| intraday_flow | Capital flow data |
| └─ timestamp | Minute start timestamp |
| └─ inflow | Net inflow |
| distribution | Capital distribution |
| └─ timestamp | Data update timestamp |
| └─ capital_in | Inflow capital |
| &nbsp;&nbsp;&nbsp;&nbsp;└─ large | Large orders |
| &nbsp;&nbsp;&nbsp;&nbsp;└─ medium | Medium orders |
| &nbsp;&nbsp;&nbsp;&nbsp;└─ small | Small orders |
| └─ capital_out | Outflow capital |
| &nbsp;&nbsp;&nbsp;&nbsp;└─ large | Large orders |
| &nbsp;&nbsp;&nbsp;&nbsp;└─ medium | Medium orders |
| &nbsp;&nbsp;&nbsp;&nbsp;└─ small | Small orders |
