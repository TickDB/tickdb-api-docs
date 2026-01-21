---
title: API Error Codes
description: Error code meanings and handling recommendations.
---

This document explains API error codes and provides handling recommendations.

---

## Response Format

### HTTP API

```json
{
  "code": 0,
  "message": "success",
  "data": { ... }
}
```

### WebSocket

```json
{
  "cmd": "subscribe",
  "code": 0,
  "message": "success",
  "data": { ... }
}
```

---

## Error Code Quick Reference

| Code | Meaning | Recommendation |
|------|---------|----------------|
| 0 | Success | - |
| 1001 | Invalid or expired API Key | Check API Key |
| 1002 | API Key not provided | Add `X-API-Key` header |
| 1003 | IP not in whitelist | Contact admin to add IP |
| 1004 | Insufficient permissions | Upgrade plan or contact admin |
| 2001 | Invalid parameters | Check request parameters |
| 2002 | Symbol not found | Use `/v1/symbols/available` to query |
| 2003 | Invalid time range | Check start_time/end_time parameters |
| 2004 | Request limit exceeded | Reduce limit parameter |
| 3001 | Rate limit exceeded | Reduce request frequency, check Retry-After |
| 3002 | Quota exhausted | Wait for reset or upgrade plan |
| 3003 | Connection limit exceeded | Close excess connections |
| 3004 | Subscription limit exceeded | Unsubscribe some channels |
| 4001 | Unknown command | Check WebSocket cmd field |
| 4002 | Invalid message format | Check JSON format |
| 4003 | Depth subscription unavailable | Use HTTP API for depth data |
| 4004 | Trade subscription unavailable | Use HTTP API for trade data |
| 5000 | Internal server error | Retry later, contact support if persists |
| 5001 | Data source unavailable | Retry later |
| 5002 | Service temporarily unavailable | Retry later |

---

## Detailed Descriptions

### Authentication Errors (1xxx)

#### 1001 - Invalid or Expired API Key

```json
{
  "code": 1001,
  "message": "Invalid or expired token"
}
```

**Causes**:
- Incorrect API Key
- API Key disabled
- API Key expired

**Solution**: Verify API Key or contact admin to confirm status.

#### 1002 - API Key Not Provided

```json
{
  "code": 1002,
  "message": "Token is required"
}
```

**Solution**: Add `X-API-Key: your_api_key` to HTTP headers, or add `?api_key=your_api_key` to WebSocket URL.

#### 1003 - IP Not in Whitelist

```json
{
  "code": 1003,
  "message": "IP address not in whitelist"
}
```

**Cause**: Enterprise plan has IP whitelist enabled.

**Solution**: Contact admin to add your IP to whitelist.

#### 1004 - Insufficient Permissions

```json
{
  "code": 1004,
  "message": "Permission denied"
}
```

**Cause**: Current plan doesn't support this feature.

**Solution**: Upgrade plan or contact admin.

---

### Parameter Errors (2xxx)

#### 2001 - Invalid Parameters

```json
{
  "code": 2001,
  "message": "Invalid parameter: symbol is required"
}
```

**Solution**: Check if request parameters are complete and correctly formatted.

#### 2002 - Symbol Not Found

```json
{
  "code": 2002,
  "message": "Symbol not found"
}
```

**Solution**: Call `GET /v1/symbols/available` to get available symbols.

#### 2003 - Invalid Time Range

```json
{
  "code": 2003,
  "message": "Invalid time range"
}
```

**Causes**:
- start_time greater than end_time
- Invalid time format
- Time range exceeds limit

**Solution**: Use Unix millisecond timestamps, ensure start_time < end_time.

#### 2004 - Request Limit Exceeded

```json
{
  "code": 2004,
  "message": "Request limit exceeded"
}
```

**Solution**: Reduce `limit` parameter value (typically max 1000).

---

### Rate Limiting Errors (3xxx)

#### 3001 - Rate Limit Exceeded

```json
{
  "code": 3001,
  "message": "Rate limit exceeded"
}
```

HTTP response includes `Retry-After` header indicating wait time in seconds.

**Solutions**:
- Reduce request frequency
- Use WebSocket subscriptions instead of polling
- Upgrade plan for higher quota

#### 3002 - Quota Exhausted

```json
{
  "code": 3002,
  "message": "Quota exhausted"
}
```

**Solution**: Wait for quota reset (typically monthly) or upgrade plan.

#### 3003 - Connection Limit Exceeded

```json
{
  "code": 3003,
  "message": "Connection limit exceeded"
}
```

**Solutions**:
- Call `GET /v1/connections` to view current connections
- Call `DELETE /v1/connections/:id` to close excess connections

#### 3004 - Subscription Limit Exceeded

```json
{
  "code": 3004,
  "message": "Subscription limit exceeded"
}
```

**Solution**: Unsubscribe from some channels before subscribing to new ones.

---

### WebSocket Errors (4xxx)

#### 4001 - Unknown Command

```json
{
  "cmd": "unknown",
  "code": 4001,
  "message": "Unknown command"
}
```

**Solution**: Check `cmd` field. Supported commands: `subscribe`, `unsubscribe`, `ping`.

#### 4002 - Invalid Message Format

```json
{
  "cmd": "subscribe",
  "code": 4002,
  "message": "Invalid message format"
}
```

**Solution**: Ensure valid JSON with required fields.

#### 4003 / 4004 - Subscription Temporarily Unavailable

```json
{
  "cmd": "subscribe",
  "code": 4003,
  "message": "Depth subscriptions temporarily unavailable",
  "data": {
    "channel": "depth",
    "suggestion": "Use HTTP API /v1/market/depth for current depth data"
  }
}
```

**Solution**: Use HTTP API to fetch data.

---

### Service Errors (5xxx)

#### 5000 - Internal Server Error

```json
{
  "code": 5000,
  "message": "Internal server error"
}
```

**Solution**: Retry later. Contact support if issue persists.

#### 5001 - Data Source Unavailable

```json
{
  "code": 5001,
  "message": "Data source unavailable"
}
```

**Solution**: Retry later, typically recovers automatically.

#### 5002 - Service Temporarily Unavailable

```json
{
  "code": 5002,
  "message": "Service temporarily unavailable"
}
```

**Solution**: Service may be under maintenance, retry later.

---

## Error Handling Examples

### JavaScript

```javascript
async function fetchTicker(symbol) {
  const response = await fetch(`/v1/market/ticker/${symbol}`, {
    headers: { 'X-API-Key': API_KEY }
  });
  
  const data = await response.json();
  
  if (data.code !== 0) {
    switch (data.code) {
      case 1001:
      case 1002:
        throw new Error('Authentication failed, check API Key');
      case 2002:
        throw new Error(`Symbol ${symbol} not found`);
      case 3001:
        const retryAfter = response.headers.get('Retry-After') || 60;
        console.log(`Rate limited, retry after ${retryAfter} seconds`);
        break;
      default:
        throw new Error(data.message);
    }
  }
  
  return data.data;
}
```

### Python

```python
import requests

def fetch_ticker(symbol, api_key):
    response = requests.get(
        f'/v1/market/ticker/{symbol}',
        headers={'X-API-Key': api_key}
    )
    
    data = response.json()
    
    if data['code'] != 0:
        if data['code'] in [1001, 1002]:
            raise Exception('Authentication failed, check API Key')
        elif data['code'] == 2002:
            raise Exception(f'Symbol {symbol} not found')
        elif data['code'] == 3001:
            retry_after = response.headers.get('Retry-After', 60)
            print(f'Rate limited, retry after {retry_after} seconds')
        else:
            raise Exception(data['message'])
    
    return data['data']
```

---

*For questions, please contact technical support.*
