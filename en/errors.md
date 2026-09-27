---
title: Error Codes
description: Error codes returned by the API and recommended handling.
---

## Error Response Contract

- A successful response uses the numeric `code` value `0`
- An error response may return `code` as an integer or a string; normalize it with `String(code)` before comparison
- Do not branch on the `message` text. It explains the error and may vary by context
- The HTTP status describes the request-level outcome, while `code` identifies the specific business reason; clients should check both

### HTTP API

HTTP error responses contain at least `code` and `message`. Some endpoints also return `error` or `data`:

```json
{
  "code": "2001",
  "message": "symbol parameter is required",
  "error": "2001"
}
```

Financial and fundamental endpoints generally use this structure:

```json
{
  "code": 40001,
  "message": "granularity must be daily or monthly",
  "data": null
}
```

### WebSocket Connection Failures

Authentication errors that occur before the WebSocket upgrade completes are regular HTTP error responses. The connection has not been established, so no WebSocket message is delivered.

| HTTP Status | `code` | Meaning | Recommended Action |
| ---: | --- | --- | --- |
| 401 | `UNAUTHORIZED` | API Key is missing | Pass `api_key` in the connection URL |
| 401 | `INVALID_TOKEN` | API Key is invalid or no longer valid | Check or regenerate the API Key |
| 403 | `PERMISSION_DENIED` | The API Key cannot establish this connection | Check plan permissions or contact support |

### Errors After WebSocket Connection

Subscription or message errors after the connection is established are delivered as WebSocket messages. `cmd` identifies the command that caused the error:

```json
{
  "cmd": "error",
  "code": 2001,
  "message": "Invalid message format",
  "data": null
}
```

## Error Code Reference

### Authentication Errors (1xxx)

| Code | HTTP / Context | Meaning | Recommended Action |
| ---: | --- | --- | --- |
| `1001` | 401 | Invalid API Key | Check the API Key |
| `1002` | 401 | API Key is missing | Add `X-API-Key` to the request headers |
| `1004` | 403 | Insufficient permissions | Check the current plan permissions |
| `1005` | 401 | API Key has expired | Renew or upgrade the plan, then retry |

### Parameter Errors (2xxx)

| Code | HTTP / Context | Meaning | Recommended Action |
| ---: | --- | --- | --- |
| `2001` | 400 / WS message | Invalid request parameters | Use `message` to check missing fields, formats, or parameter combinations |
| `2002` | 404 / WS message | Symbol does not exist or is unsupported | Query `/v1/symbols/available` for supported symbols |
| `2003` | 400 / WS message | Invalid time range; in some WebSocket subscriptions it also indicates an ambiguous symbol | Correct the time range, or use `message` and `data` to provide `type` |
| `2004` | 400 | Request count exceeds an endpoint limit | Reduce the request size according to that endpoint's documentation |
| `2005` | 400 | Symbol format is unsupported | Use a public symbol format from the data specification |
| `2006` | 400 / WS message | Symbol suffix conflicts with the requested `type` | Correct the symbol or `type` so they agree |
| `2008` | 406 | Full-market request did not enable compression | Enable HTTP response compression as documented by the endpoint |

An ambiguous symbol in an HTTP request returns the string `AMBIGUOUS_SYMBOL`. An ambiguous symbol in a WebSocket subscription currently returns the numeric code `2003`. In both cases, use `available_types` in the response to provide `type`.

### Access and Quota Errors (3xxx)

| Code | HTTP / Context | Meaning | Recommended Action |
| ---: | --- | --- | --- |
| `3001` | 429 | Rate limit exceeded | Wait for the `Retry-After` duration before retrying |
| `3002` | 403 | Quota exhausted | Wait for quota reset or upgrade the plan |
| `3003` | 429 | WebSocket connection limit exceeded | Close unused connections |
| `3004` | 403 / WS message | Subscription limit exceeded | Unsubscribe or reduce the number of symbols |
| `3005` | 429 | Too many requests for the same symbol in a short period | Wait briefly and avoid concentrated duplicate requests |
| `3006` | 403 | Product is unavailable on the current plan | Use another product or change the plan |
| `3007` | 403 | K-line history range exceeds the current plan limit | Shorten the range or change the plan |
| `3008` | 403 | K-line time-range queries are unavailable on the current plan | Use a supported query mode or change the plan |
| `3009` | 403 | The API Key cannot access this endpoint | Check API Key permissions or change the plan |
| `3010` | 403 | The API Key cannot access fundamental data for this market | Use another market or change the plan |
| `3011` | 403 | Fundamental history depth exceeds the limit | Shorten the history range or change the plan |
| `3012` | 403 | Fundamental batch size exceeds the limit | Reduce the number of symbols in one request |

### WebSocket Channel Permission Errors (4xxx)

The current public WebSocket connection uses the following 4xxx error:

| Code | Meaning | Recommended Action |
| ---: | --- | --- |
| `4005` | The API Key cannot subscribe to this channel | Check WebSocket channel permissions |

Invalid JSON and unknown commands currently return `cmd="error"` with `code=2001`. Codes `4001–4004` are not part of the current public response contract, so clients should not depend on them.

### Service Errors (5xxx)

| Code | HTTP / Context | Meaning | Recommended Action |
| ---: | --- | --- | --- |
| `5000` | 500 | Internal server error | Retry later; contact support if it persists |
| `5001` | 503 | Market data temporarily unavailable | Retry later |
| `5002` | 503 | Service temporarily unavailable | Retry later |
| `5003` | 503 | No data service is currently available for this request | Retry later or change the symbol or query |
| `5004` | 503 / WS message | Real-time market data temporarily unavailable | Retry only the symbols marked as retryable after a short delay |
| `5005` | 503 | Adjustment factors temporarily unavailable | Retry later or request unadjusted K-lines |
| `5006` | 422 | Base data required to generate adjusted K-lines is unavailable for this interval | Use another interval or request unadjusted K-lines |

The `data` object in a WebSocket subscription response with `5004` may include these fields:

```json
{
  "channel": "ticker",
  "symbols": ["700.HK"],
  "failed_symbols": ["AAPL.US", "BTCUSDT"],
  "retryable_symbols": ["AAPL.US"],
  "retryable": true
}
```

- `symbols`: symbols already subscribed successfully; do not subscribe to them again
- `failed_symbols`: all symbols that were not subscribed in this request
- `retryable_symbols`: the subset that can be retried later
- `retryable`: whether at least one symbol can be retried

## String Error Codes

| `code` | Context | Recommended Action |
| --- | --- | --- |
| `"2001"`, `"2002"`, `"5000"`, and similar | Some HTTP endpoints serialize numeric error codes as strings | Normalize with `String(code)` and handle them like the corresponding numeric code |
| `AMBIGUOUS_SYMBOL` | An HTTP symbol matches multiple product types | Pass `type` using `data.available_types` |
| `UNAUTHORIZED` | API Key is missing before WebSocket connection | Pass `api_key` in the connection URL |
| `INVALID_TOKEN` | API Key is invalid or no longer valid before WebSocket connection | Check or regenerate the API Key |
| `PERMISSION_DENIED` | Insufficient permission before WebSocket connection | Check plan and connection permissions |

## Financial and Fundamental API Errors

The following five-digit codes apply to standard financial and fundamental endpoints. Stock news endpoints may use a different error mapping; use the `code` and `message` returned by those endpoints.

| Code | HTTP | Meaning | Recommended Action |
| ---: | ---: | --- | --- |
| `40001` | 400 | Invalid request parameters | Use `message` to check parameter formats and combinations |
| `40101` | 401 | Authentication failed | Check the API Key |
| `40404` | 404 | Requested resource not found | Check the symbol, object ID, or query |
| `40405` | 404 | No business data is available for the query | Change the symbol, date range, or query |
| `50001` | 500 | Internal endpoint error | Retry later; contact support if it persists |

## Error Handling Examples

### JavaScript

```javascript
const BASE_URL = 'https://api.tickdb.ai';
const API_KEY = 'YOUR_API_KEY';

async function fetchTicker(symbol) {
  const url = new URL('/v1/market/ticker', BASE_URL);
  url.searchParams.set('symbols', symbol);

  const response = await fetch(url, {
    headers: { 'X-API-Key': API_KEY }
  });

  let body;
  try {
    body = await response.json();
  } catch {
    throw new Error(`HTTP ${response.status}: response is not JSON`);
  }

  if (!response.ok || String(body.code) !== '0') {
    const code = String(body.code ?? 'UNKNOWN');
    const retryAfter = response.headers.get('Retry-After');
    const message = code === '3001' && retryAfter
      ? `Rate limit exceeded; retry after ${retryAfter} seconds`
      : body.message || `HTTP ${response.status}`;

    const error = new Error(message);
    error.status = response.status;
    error.code = code;
    error.retryAfter = retryAfter;
    error.details = body;
    throw error;
  }

  return body.data;
}
```

### Python

```python
import requests

BASE_URL = 'https://api.tickdb.ai'

def fetch_ticker(symbol, api_key):
    response = requests.get(
        f'{BASE_URL}/v1/market/ticker',
        params={'symbols': symbol},
        headers={'X-API-Key': api_key},
        timeout=10,
    )

    try:
        body = response.json()
    except requests.exceptions.JSONDecodeError as exc:
        raise RuntimeError(f'HTTP {response.status_code}: response is not JSON') from exc

    code = str(body.get('code', 'UNKNOWN'))
    if not response.ok or code != '0':
        retry_after = response.headers.get('Retry-After')
        if code == '3001' and retry_after:
            message = f'Rate limit exceeded; retry after {retry_after} seconds'
        else:
            message = body.get('message') or f'HTTP {response.status_code}'
        raise RuntimeError(f'[{code}] {message}')

    return body['data']
```
