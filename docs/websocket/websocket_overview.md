---
title: WebSocket Overview
description: Connection endpoint, authentication, and basics.
---
# WebSocket Streaming (Realtime)

TickDB provides real-time market data streaming over WebSocket.

## Connection

- **URL**: `wss://api.tickdb.ai/v1/realtime`
- **Protocol**: WebSocket
- **Authentication**: API key in query string

### Query Parameters

| Name    | Type   | Required | Description |
|---------|--------|----------|-------------|
| api_key | string | Yes      | Your API key |

### Connect Example

```javascript
const ws = new WebSocket('wss://api.tickdb.ai/v1/realtime?api_key=YOUR_API_KEY');
```
