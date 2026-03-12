---
title: 快速开始
description: 连接并订阅实时行情数据。
---

TickDB 通过 WebSocket 提供实时行情数据流。

## 连接

- **URL**：`wss://api.tickdb.ai/v1/realtime`
- **协议**：WebSocket
- **身份验证**：在查询字符串中传递 API 密钥

### 查询参数

| 名称    | 类型   | 必需 | 描述 |
|---------|--------|----------|-------------|
| api_key | string | 是      | 您的 API 密钥 |

## 1) 连接并订阅

```javascript
const ws = new WebSocket('wss://api.tickdb.ai/v1/realtime?api_key=YOUR_API_KEY');

// 心跳机制，保持连接活跃
let heartbeatInterval;

ws.onopen = () => {
  console.log('已连接');

  // 每秒发送一次 ping，保持 WebSocket 连接活跃
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
  console.log('消息', msg);
};

ws.onclose = () => {
  console.log('已关闭');
  clearInterval(heartbeatInterval);
};

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

## 3) 接收订阅数据

```javascript
ws.onmessage = (evt) => {
  const msg = JSON.parse(evt.data);
  
  // 处理不同频道的消息
  switch (msg.cmd) {
    case 'ticker':
      console.log('行情更新:', msg.data);
      // { symbol: 'AAPL.US', last_price: '150.25', timestamp: 1703123456789 }
      break;
      
    case 'depth':
      console.log('深度更新:', msg.data);
      // { symbol: 'BTCUSDT', bids: [...], asks: [...], timestamp: 1703123456789 }
      break;
      
    case 'trade':
      console.log('成交更新:', msg.data);
      // { symbol: '700.HK', price: '350.20', quantity: '100', side: 'buy', timestamp: 1703123456789 }
      break;
      
    case 'pong':
      console.log('收到 Pong:', msg.data);
      // { timestamp: 1773336522965 }
      break;
      
    default:
      console.log('其他消息:', msg);
  }
};
```
