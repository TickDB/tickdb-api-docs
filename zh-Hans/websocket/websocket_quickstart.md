---
title: 最佳实践
description: WebSocket 连接、压缩、心跳与断线重连。
---

TickDB WebSocket 地址为 `wss://api.tickdb.ai/v1/realtime`，建立连接时通过查询参数 `api_key` 传入密钥。不要把长期有效的 API Key 写入公开的前端代码或日志。

## 连接管理

- **压缩**：全量行情订阅必须在握手时协商 `permessage-deflate`。Node.js 客户端应显式启用，并在连接建立后检查协商结果；普通浏览器通常会自动发起协商。`Accept-Encoding` 不是 WebSocket 压缩开关。
- **心跳**：客户端会自动回应服务端的 WebSocket 协议级 Ping，无需高频发送应用层消息。示例每 60 秒发送一次 `{"cmd":"ping"}`，用于客户端主动检查连接；20 秒内未收到 `pong` 时结束失活连接。
- **断线重连**：按下表分档等待，不加入随机延迟。达到最后一档后持续按该档间隔重连；连接成功后重置计数，下次断线重新从第一档开始。
- **恢复订阅**：每次重新建立连接后重新发送订阅消息；全量行情会再次发送初始快照。鉴权、权限或压缩配置错误应先修正，不应无限重试。
- **消息格式**：普通频道通常返回单条消息；全量行情以数组分批推送，每批最多 500 条 `ticker` 消息。

| 连续重连次数 | 每次等待 |
| --- | --- |
| 第 1～3 次 | 1 秒 |
| 第 4～6 次 | 5 秒 |
| 第 7 次起 | 30 秒 |

代码中的 `RECONNECT_STAGES` 把“等待时间”和“该档次数”配成一组；可按需要增减档位，最后一档使用 `Infinity` 表示一直按该间隔重连。

## Node.js 示例

先安装 `ws`：`npm install ws`。设置环境变量 `TICKDB_API_KEY` 后运行以下代码；若还设置 `TICKDB_UNIVERSE=CN_Stock`、`HK_Stock` 或 `US_Stock`，则改为订阅对应市场的全量行情。示例中的 60 秒应用层心跳和 20 秒超时可按应用需要调整。

```javascript
const WebSocket = require("ws");

const apiKey = process.env.TICKDB_API_KEY;
const universe = process.env.TICKDB_UNIVERSE;
if (!apiKey) throw new Error("Set TICKDB_API_KEY first");
if (universe && !["CN_Stock", "HK_Stock", "US_Stock"].includes(universe)) {
  throw new Error("Invalid TICKDB_UNIVERSE");
}

let attempts = 0;
let stopped = false;
const RECONNECT_STAGES = new Map([
  [1_000, 3],        // 等待 1 秒，最多 3 次
  [5_000, 3],        // 等待 5 秒，最多 3 次
  [30_000, Infinity] // 此后每次等待 30 秒
]);

function reconnectDelay(attempt) {
  for (const [delayMs, count] of RECONNECT_STAGES) {
    if (attempt <= count) return delayMs;
    attempt -= count;
  }
}

function connect() {
  const url = new URL("wss://api.tickdb.ai/v1/realtime");
  url.searchParams.set("api_key", apiKey);
  const ws = new WebSocket(url, { perMessageDeflate: true });
  let heartbeat;
  let pongTimeout;

  ws.on("unexpected-response", (_request, response) => {
    if ([401, 403].includes(response.statusCode)) stopped = true;
    console.error("WebSocket handshake failed:", response.statusCode);
    response.resume();
    ws.terminate();
  });

  ws.on("open", () => {
    attempts = 0;
    if (universe && !ws.extensions.includes("permessage-deflate")) {
      stopped = true;
      console.error("Full-market subscriptions require permessage-deflate");
      ws.close();
      return;
    }

    const subscription = universe
      ? { cmd: "subscribe", data: { universes: [universe], channels: ["ticker"] } }
      : { cmd: "subscribe", data: { channel: "ticker", symbols: ["BTCUSDT"] } };
    ws.send(JSON.stringify(subscription)); // 每次重连后重新订阅

    heartbeat = setInterval(() => {
      if (ws.readyState !== WebSocket.OPEN || pongTimeout) return;
      ws.send(JSON.stringify({ cmd: "ping" }));
      pongTimeout = setTimeout(() => ws.terminate(), 20_000);
    }, 60_000);
  });

  ws.on("message", (raw) => {
    let message;
    try { message = JSON.parse(raw.toString()); }
    catch { return; }

    for (const item of Array.isArray(message) ? message : [message]) {
      if (item.cmd === "pong") {
        clearTimeout(pongTimeout);
        pongTimeout = undefined;
      } else if (item.cmd === "ticker") {
        console.log(item.data.symbol, item.data.last_price);
      } else if (item.cmd === "error") {
        console.error("Subscription error:", item.code, item.message);
        if (["2008", "4005"].includes(String(item.code))) {
          stopped = true;
          ws.close();
        }
      }
    }
  });

  ws.on("error", (error) => console.error("WebSocket error:", error.message));
  ws.on("close", () => {
    clearInterval(heartbeat);
    clearTimeout(pongTimeout);
    if (stopped) return;

    setTimeout(connect, reconnectDelay(++attempts));
  });
}

connect();
```

不同频道的订阅命令与响应字段，请直接查看 [实时行情](./ticker)、[盘口深度](./depth)、[逐笔成交](./trade) 和 [Ping](./ping) 页面。全量行情的压缩与推送格式见 [A 股](./ticker_cn_stock)、[港股](./ticker_hk_stock)和[美股](./ticker_us_stock)页面。
