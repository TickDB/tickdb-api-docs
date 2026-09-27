---
title: Adjustment Factors
description: Get forward and backward price adjustment factors for A-shares, HK stocks, and US stocks.
openapi: "openapi.en.yaml GET /v1/market/kline/ex-factors"
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

- Use this endpoint to calculate or verify adjusted historical stock prices. For standard queries, use the `adjust` parameter of the historical or latest K-line endpoint
- Each corporate-action event returns one `forward` factor and one `backward` factor
- Formula: `adjusted price = raw price × factor_a + factor_b`
- For forward adjustment, apply factors after the K-line timestamp in chronological order; for backward adjustment, apply factors at or before the K-line timestamp in reverse chronological order
- Timestamps are Unix timestamps in milliseconds

## Code Example

This endpoint is intended for applications that store unadjusted K-lines locally. Store a single copy of the raw price history, then retrieve adjustment factors when querying, backtesting, or charting to generate forward- or backward-adjusted K-lines dynamically. This avoids storing three separate datasets and allows historical prices to be recalculated with the latest factors after a new corporate action.

The following JavaScript example retrieves unadjusted daily K-lines and the adjustment factors for the same stock, then dynamically calculates both forward- and backward-adjusted closing prices. In a production application, replace the unadjusted K-line request with a read from your local database.

```javascript
const BASE_URL = "https://api.tickdb.ai";
const SYMBOL = "600519.SH";
const API_KEY = process.env.TICKDB_API_KEY;

async function get(path, params) {
  const url = new URL(path, BASE_URL);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, String(value));
  });

  const response = await fetch(url, {
    headers: { "X-API-Key": API_KEY },
  });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const result = await response.json();
  if (result.code !== 0) {
    throw new Error(result.message);
  }
  return result.data;
}

function adjustPrice(rawPrice, klineTime, mode, factors) {
  // Forward: select forward factors effective after the K-line timestamp.
  // Backward: select backward factors effective at or before the timestamp.
  const selected = factors.filter(
    (factor) =>
      factor.adjust === mode &&
      (mode === "forward"
        ? factor.timestamp > klineTime
        : factor.timestamp <= klineTime),
  );

  // Apply forward factors oldest to newest and backward factors newest to oldest.
  selected.sort((a, b) =>
    mode === "forward" ? a.timestamp - b.timestamp : b.timestamp - a.timestamp,
  );

  return selected.reduce((price, factor) => {
    // Apply each factor sequentially:
    // adjusted_price = current_price * factor_a + factor_b
    return price * Number(factor.factor_a) + Number(factor.factor_b);
  }, Number(rawPrice));
}

async function main() {
  // Get unadjusted K-lines
  const klineData = await get("/v1/market/kline", {
    symbol: SYMBOL,
    type: "stock",
    interval: "1d",
    adjust: "none",
    limit: 100,
  });
  const klines = klineData.klines;

  // The response path is data.data.{symbol}[]
  const factorData = await get("/v1/market/kline/ex-factors", {
    symbols: SYMBOL,
    type: "stock",
  });
  const factors = factorData.data[SYMBOL];

  for (const kline of klines) {
    console.log({
      time: kline.time,
      raw: kline.close,
      forward: adjustPrice(kline.close, kline.time, "forward", factors),
      backward: adjustPrice(kline.close, kline.time, "backward", factors),
    });
  }
}

main().catch(console.error);
```

- **Forward adjustment (`forward`)** uses recent prices as the reference. For each past K-line, select forward factors occurring after its timestamp and apply them from oldest to newest
- **Backward adjustment (`backward`)** uses early prices as the reference. For each K-line, select backward factors occurring at or before its timestamp and apply them from newest to oldest
- Apply every factor separately using `adjusted price = current price × factor_a + factor_b`
- If you only need adjusted K-lines, pass `adjust=forward` or `adjust=backward` directly to the [Candlestick Data](./api_kline) endpoint instead of calculating them yourself

## Supported Markets

| Market | Examples |
|---|---|
| A-Shares | 600519.SH, 000001.SZ |
| HK Stocks | 700.HK, 9988.HK |
| US Stocks | AAPL.US, TSLA.US |

## Request Parameters

| Parameter | Required | Description |
|-----------|----------|-------------|
| symbols | Yes | Stock symbols, comma-separated |
| type | No | Product type. Only `stock` is supported; omit it when the symbol is unambiguous |
| start_time | No | Start timestamp in milliseconds, inclusive |
| end_time | No | End timestamp in milliseconds, inclusive |

## Response Fields

| Field | Description |
|-------|-------------|
| data | Adjustment factors grouped by stock symbol |
| └─ `{symbol}` | Adjustment factor array for the corresponding stock symbol |
| &nbsp;&nbsp;└─ timestamp | Factor effective timestamp in milliseconds |
| &nbsp;&nbsp;└─ adjust | Adjustment direction: `forward` or `backward` |
| &nbsp;&nbsp;└─ factor_a | Multiplicative factor in the adjustment formula |
| &nbsp;&nbsp;└─ factor_b | Additive factor in the adjustment formula |
