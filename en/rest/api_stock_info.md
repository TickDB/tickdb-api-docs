---
title: Stock Information
description: Retrieve stock names, exchanges, currencies, share capital, and per-share metrics.
openapi: "openapi.en.yaml GET /v1/market/stock-info"
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

- A single request can contain up to 500 stock symbols.
- Returned fields vary by market and data availability. Conditional fields are omitted when no value is available.

## Supported Markets

| Market | Examples |
|---|---|
| US Stocks | AAPL.US, TSLA.US, MSFT.US |
| HK Stocks | 700.HK, 9988.HK, 3690.HK |
| A-Shares | 600519.SH, 000001.SZ, 300750.SZ |

## Request Parameters

| Parameter | Required | Description |
|-----------|----------|-------------|
| symbols | Yes | Stock symbol codes, comma-separated, maximum 500 |
| type | No | Symbol type, optional. Not required when the symbol is unambiguous; if the API returns an `AMBIGUOUS_SYMBOL` error, pass the value as indicated. Values: `stock`, `indices`, `crypto`, `forex` |

## Response Fields

| Field | Description |
|-------|-------------|
| symbol | Trading Symbol |
| name_cn | Chinese simplified name |
| name_en | English name; returned for HK and US stocks |
| name_hk | Traditional Chinese name; returned for HK and US stocks |
| exchange | Exchange where the symbol is traded |
| currency | Trading currency (CNY/USD/HKD) |
| lot_size | Shares per lot |
| total_shares | Total shares outstanding; returned when available |
| circulating_shares | Circulating shares; returned when available |
| hk_shares | H-share capital; returned for HK stocks and A-share companies that also issue H shares |
| eps | Earnings per share; returned when available |
| eps_ttm | Earnings per share for the trailing twelve months; returned for HK and US stocks when available |
| bps | Book value per share; returned when available |
| dividend_yield | Dividend yield; returned for HK and US stocks when available |
| stock_derivatives | Available derivative types; `1` means options and `2` means warrants. Returned for HK and US stocks when available |
| board | A-share board or security classification code; returned for A-shares |
