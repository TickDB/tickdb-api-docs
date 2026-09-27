---
title: API Key Management
description: Check when your API keys expire and set up alerts without signing in to the website.
openapi: "openapi.en.yaml GET /v1/apikeys/subscriptions"
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

Use your API key to check expiration times and remaining seconds for the keys under your account, without signing in to the website.

## Request parameters

This endpoint has no query parameters.

## Example request

```bash
curl -H "X-API-Key: YOUR_API_KEY" \
  "https://api.tickdb.ai/v1/apikeys/subscriptions"
```

## Response fields

The fields below are inside `data`; an outer `code` of `0` indicates success.

| Field | Description |
|------|-------------|
| server_time | Server time of this request, as a date-time string with a time zone. |
| total | Number of API keys returned. |
| api_keys | API keys under the account. |
| └─ key_prefix | Prefix used to identify the key; this is not the complete key. |
| └─ name | API key name. |
| └─ plan | Plan identifier associated with the key. |
| └─ status | Key status: `active`, `expired`, `suspended`, or `revoked`. |
| └─ expires_at | Expiration time, or `null` if no expiration is set. |
| └─ remaining_seconds | Seconds until expiration; `0` if expired, or `null` if no expiration is set. |
| └─ created_at | API key creation time. |
