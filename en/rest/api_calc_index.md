---
title: Market Metrics
description: Retrieve comprehensive market metrics for stocks, including market statistics, valuation indicators, capital flow, and derivatives-related indicators.
openapi: GET /v1/market/calc-index
---

## Supported Markets

**US Stocks**, **HK Stocks**, **A-Shares**

Examples:
- US Stocks: AAPL.US, TSLA.US, MSFT.US
- HK Stocks: 700.HK, 9988.HK, 3690.HK
- A-Shares: 000001.SH, 000001.SZ

## Response Fields

| Field Name | Description |
|------------|-------------|
| symbol | Trading Symbol |
| last_done | Last Price |
| change_val | Change Value |
| change_rate | Change Rate |
| volume | Volume |
| turnover | Turnover |
| ytd_change_rate | YTD Change Rate |
| turnover_rate | Turnover Rate |
| total_market_value | Total Market Value |
| capital_flow | Capital Flow |
| amplitude | Amplitude |
| volume_ratio | Volume Ratio |
| pe_ttm_ratio | P/E Ratio (TTM) |
| pb_ratio | P/B Ratio |
| dividend_ratio_ttm | Dividend Yield (TTM) |
| five_day_change_rate | 5-Day Change Rate |
| ten_day_change_rate | 10-Day Change Rate |
| half_year_change_rate | Half-Year Change Rate |
| five_minutes_change_rate | 5-Minute Change Rate |

## Notes
- Metrics data is calculated based on real-time quotes and historical data
