---
title: Kline Periods
description: Query the list of supported kline periods. Use this endpoint to confirm available period parameters before calling kline endpoints.
openapi: GET /v1/market/intervals/kline
---

## Period Formats

- **Minutes**: 1m, 3m, 5m, 15m, 30m
- **Hours**: 1h, 2h, 4h
- **Days**: 1d
- **Weeks**: 1w
- **Months**: 1M

## Response Fields

| Field Name | Description |
|------------|-------------|
| count | Number of supported periods |
| description | Endpoint description |
| intervals | List of supported K-line periods |
