---
title: Full A-Share Market Tickers
description: Retrieve the current full-market ticker snapshot for A-shares.
openapi: "openapi.en.yaml GET /v1/market/ticker/cn-stock"
contextual:
  options:
    - copy
    - view
---

## Plan Access

| Plan | Available |
|---|:---:|
| Free | ❌ |
| Starter | ❌ |
| Professional | ❌ |
| All A-Shares | ✅ |
| All HK-Shares | ❌ |
| All US-Shares | ❌ |
| Enterprise | ✅ |

## Notes

- No request parameters are required. The endpoint returns all currently available records in one non-paginated response.
- Coverage includes Shanghai, Shenzhen, and Beijing stocks, ETFs, indices, and bonds. Use `type` and `category` to identify the product type.
- The response can be large. Clients must enable HTTP response compression and advertise at least one of `gzip`, `br`, or `zstd`; requests without compression support may receive `406`.
- `timestamp` is the data time of each ticker, represented as a Unix timestamp in milliseconds.
- `open` and `prev_close` are omitted when the corresponding data is unavailable.

## Supported Market

| Market | Examples |
|---|---|
| A-Shares | 600519.SH, 000001.SZ, 920186.BJ |

## Request Parameters

None.

## Request Example

```bash
curl --compressed \
  -H "X-API-Key: YOUR_API_KEY" \
  "https://api.tickdb.ai/v1/market/ticker/cn-stock"
```

## Code Example

The following Node.js 22+ example advertises all three compression formats and selects the decompressor from the response `Content-Encoding` header.

```javascript
const https = require("node:https");
const zlib = require("node:zlib");

const decompressors = {
  gzip: zlib.gunzipSync,
  br: zlib.brotliDecompressSync,
  zstd: zlib.zstdDecompressSync,
};

const request = https.get("https://api.tickdb.ai/v1/market/ticker/cn-stock", {
  headers: {
    "X-API-Key": process.env.TICKDB_API_KEY,
    "Accept-Encoding": "gzip, br, zstd",
  },
}, (response) => {
  const chunks = [];
  response.on("data", (chunk) => chunks.push(chunk));
  response.on("end", () => {
    if (response.statusCode !== 200) {
      throw new Error(`Request failed: ${response.statusCode}`);
    }

    const encoding = response.headers["content-encoding"];
    const decompress = decompressors[encoding];
    if (!decompress) {
      throw new Error(`Unsupported compression format: ${encoding}`);
    }

    const body = decompress(Buffer.concat(chunks));
    const result = JSON.parse(body.toString("utf8"));
    console.log(`Received ${result.data.length} tickers`);
    console.log(result.data[0]);
  });
});

request.on("error", console.error);
```

## Response Fields

| Field | Description |
|---|---|
| code | Response code; `0` indicates success. |
| message | Response message. |
| data | Full-market A-share ticker array. |
| └─ symbol | Trading symbol with a `.SH`, `.SZ`, or `.BJ` market suffix. |
| └─ name | Product name. |
| └─ type | Product type: `stock` for equity-like products or `indices` for indices. |
| └─ category | Detailed product category; see the table below. |
| └─ last_price | Latest traded price. |
| └─ open | Current-day open; omitted when unavailable. |
| └─ prev_close | Previous trading day's close; omitted when unavailable. |
| └─ volume_24h | Current-day cumulative volume. |
| └─ quote_volume_24h | Current-day cumulative traded value. |
| └─ high_24h | Current-day high. |
| └─ low_24h | Current-day low. |
| └─ price_change_24h | Price change from the previous close. |
| └─ price_change_percent_24h | Percentage price change from the previous close. |
| └─ timestamp | Unix timestamp in milliseconds. |

### `category` Values

| Value | Description |
|---|---|
| `sh_stock` | Shanghai Stock Exchange stock. |
| `sz_stock` | Shenzhen Stock Exchange stock. |
| `bj_stock` | Beijing Stock Exchange stock. |
| `etf` | ETF. |
| `cn_index` | A-share market index. |
| `cn_bond` | Mainland China exchange-traded bond. |
