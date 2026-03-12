---
title: Stock Information
description: Retrieve detailed information for stocks, including company name, industry classification, market capitalization, and other fundamental data.
openapi: GET /v1/market/stock-info
---

## Notes
- Returned information may vary depending on data source

## Supported Markets

**US Stocks**, **HK Stocks**, **A-Shares**

Examples:
- US Stocks: AAPL.US, TSLA.US, MSFT.US
- HK Stocks: 700.HK, 9988.HK, 3690.HK
- A-Shares: 000001.SH, 000001.SZ

## Request Parameters

| Parameter | Required | Description |
|-----------|----------|-------------|
| symbols | Yes | Stock symbol codes, comma-separated, max 50 |

## Response Fields

| Field | Description |
|-------|-------------|
| symbol | Trading Symbol |
| name_cn | Chinese simplified name |
| name_en | English name |
| name_hk | Chinese traditional name |
| exchange | Exchange where the symbol is traded |
| currency | Trading currency (CNY/USD/HKD) |
| lot_size | Shares per lot |
| total_shares | Total shares outstanding |
| circulating_shares | Circulating shares |
| hk_shares | HK shares (HK stocks only) |
| eps | Earnings per share |
| eps_ttm | Earnings per share (TTM) |
| bps | Book value per share |
| dividend_yield | Dividend yield (if calculated annually, annual calculation type provided) |
| stock_derivatives | Options: 1 - Options, 2 - Warrants |
