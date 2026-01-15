---
title: WebSocket 快速開始
description: 連接並訂閱實時行情數據。
---

本指南幫助您快速建立實時數據流。

## 1) 連接

```javascript
const ws = new WebSocket('wss://api.tickdb.ai/v1/realtime?api_key=YOUR_API_KEY');

ws.onopen = () => {
  console.log('已連接');

  ws.send(JSON.stringify({
    cmd: 'subscribe',
    data: { channel: 'ticker', symbols: ['BTCUSDT'] }
  }));
};

ws.onmessage = (evt) => {
  const msg = JSON.parse(evt.data);
  console.log('消息', msg);
};

ws.onclose = () => console.log('已關閉');
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

## 注意事項
- 外匯交易品種**僅支持 ticker 頻道**。
- 如果需要穩定的長期連接，請實現帶退避的重連機制。
