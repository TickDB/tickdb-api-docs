---
title: Quick Start
description: Connect and subscribe to realtime market data.
---

TickDB provides real-time market data streaming over WebSocket.

## Connection

- **URL**: `wss://api.tickdb.ai/v1/realtime`
- **Protocol**: WebSocket
- **Authentication**: API key in query string

### Query Parameters

| Name    | Type   | Required | Description |
|---------|--------|----------|-------------|
| api_key | string | Yes      | Your API key |

## 1) Connect and Subscribe

```javascript
const ws = new WebSocket('wss://api.tickdb.ai/v1/realtime?api_key=YOUR_API_KEY');

// Heartbeat to keep connection alive
let heartbeatInterval;

ws.onopen = () => {
  console.log('connected');

  // Send ping every 1 second to keep connection alive
  heartbeatInterval = setInterval(() => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ cmd: 'ping' }));
    }
  }, 1000);

  ws.send(JSON.stringify({
    cmd: 'subscribe',
    data: { channel: 'ticker', symbols: ['BTCUSDT'] }
  }));
};

ws.onmessage = (evt) => {
  const msg = JSON.parse(evt.data);
  console.log('message', msg);
};

ws.onclose = () => {
  console.log('closed');
  clearInterval(heartbeatInterval);
};

ws.onerror = (e) => console.error('error', e);
```

## 2) Subscribe Multiple Channels

```javascript
ws.send(JSON.stringify({
  cmd: 'subscribe',
  data: { channel: 'ticker', symbols: ['AAPL.US', '700.HK', 'BTCUSDT'] }
}));

ws.send(JSON.stringify({
  cmd: 'subscribe',
  data: { channel: 'depth', symbols: ['AAPL.US', '700.HK', 'BTCUSDT'] }
}));

ws.send(JSON.stringify({
  cmd: 'subscribe',
  data: { channel: 'trade', symbols: ['AAPL.US', '700.HK', 'BTCUSDT'] }
}));
```

## 3) Receive Subscription Data

```javascript
ws.onmessage = (evt) => {
  const msg = JSON.parse(evt.data);
  
  // Handle different channel messages
  switch (msg.cmd) {
    case 'ticker':
      console.log('Ticker update:', msg.data);
      // { symbol: 'AAPL.US', last_price: '150.25', timestamp: 1703123456789 }
      break;
      
    case 'depth':
      console.log('Depth update:', msg.data);
      // { symbol: 'BTCUSDT', bids: [...], asks: [...], timestamp: 1703123456789 }
      break;
      
    case 'trade':
      console.log('Trade update:', msg.data);
      // { symbol: '700.HK', price: '350.20', quantity: '100', side: 'buy', timestamp: 1703123456789 }
      break;
      
    case 'pong':
      console.log('Pong received:', msg.data);
      // { timestamp: 1773336522965 }
      break;
      
    default:
      console.log('Other message:', msg);
  }
};
```
