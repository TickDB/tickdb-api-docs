---
title: WebSocket 快速开始
description: 连接并订阅实时行情数据。
---

本指南帮助您快速建立实时数据流。

## 1) 连接

```javascript
const ws = new WebSocket('wss://api.tickdb.ai/v1/realtime?api_key=YOUR_API_KEY');

ws.onopen = () => {
  console.log('已连接');

  ws.send(JSON.stringify({
    cmd: 'subscribe',
    data: { channel: 'ticker', symbols: ['BTCUSDT'] }
  }));
};

ws.onmessage = (evt) => {
  const msg = JSON.parse(evt.data);
  console.log('消息', msg);
};

ws.onclose = () => console.log('已关闭');
ws.onerror = (e) => console.error('错误', e);
```

## 2) 订阅多个频道

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

## 注意事项
- 外汇交易品种**仅支持 ticker 频道**。
- 如果需要稳定的长期连接，请实现带退避的重连机制。
