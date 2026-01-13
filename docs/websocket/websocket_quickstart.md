---
title: WebSocket Quick Start
description: Connect and subscribe to realtime market data.
---
# WebSocket Quick Start

This guide gets you a running realtime stream quickly.

## 1) Connect

```javascript
const ws = new WebSocket('wss://api.tickdb.ai/v1/realtime?api_key=YOUR_API_KEY');

ws.onopen = () => {
  console.log('connected');

  ws.send(JSON.stringify({
    cmd: 'subscribe',
    data: { channel: 'ticker', symbols: ['BTCUSDT'] }
  }));
};

ws.onmessage = (evt) => {
  const msg = JSON.parse(evt.data);
  console.log('message', msg);
};

ws.onclose = () => console.log('closed');
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

## Notes
- Forex symbols support **ticker only**.
- If you need stable long-running connections, implement reconnect with backoff.
