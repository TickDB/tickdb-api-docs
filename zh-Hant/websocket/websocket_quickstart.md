---
title: 快速開始
description: 連接並訂閱實時行情數據。
---

TickDB 通過 WebSocket 提供實時行情數據流。

## 連接

- **URL**：`wss://api.tickdb.ai/v1/realtime`
- **協議**：WebSocket
- **身份驗證**：在查詢字符串中傳遞 API 密鑰

### 查詢參數

| 名稱    | 類型   | 必需 | 描述 |
|---------|--------|----------|-------------|
| api_key | string | 是      | 您的 API 密鑰 |

## 1) 連接並訂閱

```javascript
const ws = new WebSocket('wss://api.tickdb.ai/v1/realtime?api_key=YOUR_API_KEY');

// 心跳機制，保持連接活躍
let heartbeatInterval;

ws.onopen = () => {
  console.log('已連接');

  // 每秒發送一次 ping，保持 WebSocket 連接活躍
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
  console.log('已關閉');
  clearInterval(heartbeatInterval);
};

ws.onerror = (e) => console.error('錯誤', e);
```

## 2) 訂閱多個頻道

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

## 3) 接收訂閱數據

```javascript
ws.onmessage = (evt) => {
  const msg = JSON.parse(evt.data);
  
  // 處理不同頻道的消息
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
