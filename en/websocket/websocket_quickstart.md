---
title: Best Practices
description: WebSocket connections, compression, heartbeats, and reconnection.
---

Connect to `wss://api.tickdb.ai/v1/realtime` and pass your API key in the `api_key` query parameter. Do not put long-lived API keys in public frontend code or logs.

## Connection Management

- **Compression**: Full-market subscriptions must negotiate `permessage-deflate` during the handshake. Enable it explicitly in a Node.js client and check the negotiated extension after connecting. Browsers usually offer it automatically. `Accept-Encoding` does not control WebSocket compression.
- **Heartbeat**: The client automatically replies to WebSocket protocol-level Pings from the server, so high-frequency application messages are unnecessary. The example sends `{"cmd":"ping"}` every 60 seconds as an additional client-side health check and closes a stale connection if no `pong` arrives within 20 seconds.
- **Reconnection**: Use the fixed stages below, without random delay. Stay at the last stage until reconnecting succeeds. A successful connection resets the counter, so the next disconnection starts from the first stage again.
- **Resubscription**: Send subscriptions again after every reconnect. A full-market subscription receives another initial snapshot. Fix authentication, permission, or compression errors instead of retrying indefinitely.
- **Message format**: Regular channels generally send single messages. Full-market updates arrive in arrays of up to 500 `ticker` messages.

| Consecutive reconnect attempt | Wait before each attempt |
| --- | --- |
| 1–3 | 1 second |
| 4–6 | 5 seconds |
| 7 onward | 30 seconds |

In `RECONNECT_STAGES`, each entry pairs a delay with the number of attempts at that delay. Add or adjust stages as needed; `Infinity` in the final entry keeps retrying at that interval.

## Node.js Example

Install `ws` with `npm install ws`. Set `TICKDB_API_KEY` before running the code. Optionally set `TICKDB_UNIVERSE` to `CN_Stock`, `HK_Stock`, or `US_Stock` to subscribe to all symbols in that market. The example's 60-second application heartbeat and 20-second timeout are adjustable.

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
  [1_000, 3],        // Wait 1 second for 3 attempts
  [5_000, 3],        // Wait 5 seconds for 3 attempts
  [30_000, Infinity] // Keep waiting 30 seconds thereafter
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
    ws.send(JSON.stringify(subscription)); // Resubscribe after reconnect

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

See the [Real-Time Quotes](./ticker), [Orderbook](./depth), [Tick-by-Tick Trades](./trade), and [Ping](./ping) pages for channel-specific commands and response fields. See the [A-share](./ticker_cn_stock), [Hong Kong stock](./ticker_hk_stock), and [US stock](./ticker_us_stock) pages for full-market compression and message formats.
