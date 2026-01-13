---
title: Errors
description: Error response formats, common HTTP and WebSocket error codes.
---

This page describes how **TickDB** reports errors across **REST** and **WebSocket** APIs.
It explains the error formats, common status codes, and how to handle them correctly.

For endpoint-specific error details, see **Error Codes by Endpoint**.

---

## REST API Error Format

REST API errors are returned with an HTTP status code and a JSON body.

### Example: Authentication Error (401)

```json
{
  "success": false,
  "error": "Invalid or inactive API key",
  "code": 401
}
```

### Example: Rate Limit Error (429)

Rate limit responses may include additional fields to help clients recover or upgrade.

```json
{
  "success": false,
  "error": "Rate limit exceeded",
  "code": 429,
  "limit": 60,
  "used": 60,
  "reset_at": 1700000000,
  "plan": "free",
  "upgrade_to": "standard"
}
```

---

## WebSocket Error Format

WebSocket errors fall into two categories:

1. **Connection-level errors** (HTTP status codes like `401`, `403`, `429`)
2. **Message-level errors** with custom error codes

### Example: Message-level Error

```json
{
  "cmd": "subscribe",
  "code": 2001,
  "message": "symbols parameter is required"
}
```

---

## Common HTTP Status Codes

| HTTP Status | Description | Typical Cause |
|------------:|-------------|---------------|
| 200 | OK | Request succeeded |
| 400 | Bad Request | Missing or invalid parameters |
| 401 | Unauthorized | Missing, invalid, or inactive API key |
| 403 | Forbidden | Permission denied for this endpoint or market |
| 404 | Not Found | Endpoint or symbol not found |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Server Error | Unexpected server error |
| 502 | Bad Gateway | Upstream service error |
| 503 | Service Unavailable | Temporary service outage |

---

## Common WebSocket Error Codes

> WebSocket error codes are **custom codes**, not HTTP statuses.

| Code | Description | Typical Cause |
|-----:|-------------|---------------|
| 2001 | Invalid message format or command | Malformed JSON, unknown command, or missing fields |
| 2003 | Depth subscription unavailable | Depth channel temporarily disabled |
| 2004 | Trade subscription unavailable | Trade channel temporarily disabled |

---

## Error Handling Best Practices

- Always check the HTTP status code before parsing the response.
- For `429` errors, wait until `reset_at` before retrying.
- Do not retry immediately on `500` errors; use exponential backoff.
- Validate request parameters locally to avoid `400` errors.
- For WebSocket APIs:
  - Ensure messages are valid JSON
  - Always include required fields (`cmd`, `channel`, `symbols`)

---

## Related Documentation

- **Authentication** – API key usage and permissions
- **Data Specification** – symbol formats and market definitions
- **Error Codes by Endpoint** – detailed error messages per API endpoint