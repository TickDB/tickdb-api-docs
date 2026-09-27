---
title: 最佳實踐
description: WebSocket 連線、壓縮、心跳與斷線重連。
---

TickDB WebSocket 位址為 `wss://api.tickdb.ai/v1/realtime`，建立連線時透過查詢參數 `api_key` 傳入密鑰。不要將長期有效的 API Key 寫入公開的前端程式碼或日誌。

## 連線管理

- **壓縮**：全量行情訂閱必須在握手時協商 `permessage-deflate`。Node.js 用戶端應明確啟用，並在連線建立後檢查協商結果；一般瀏覽器通常會自動發起協商。`Accept-Encoding` 不是 WebSocket 壓縮開關。
- **心跳**：用戶端會自動回應服務端的 WebSocket 協定級 Ping，無需高頻發送應用層消息。範例每 60 秒發送一次 `{"cmd":"ping"}`，用於用戶端主動檢查連線；20 秒內未收到 `pong` 時結束失活連線。
- **斷線重連**：按下表分檔等待，不加入隨機延遲。達到最後一檔後持續按該檔間隔重連；連線成功後重設計數，下次斷線重新從第一檔開始。
- **恢復訂閱**：每次重新建立連線後重新發送訂閱消息；全量行情會再次發送初始快照。驗證、權限或壓縮設定錯誤應先修正，不應無限重試。
- **消息格式**：一般頻道通常返回單條消息；全量行情以陣列分批推送，每批最多 500 條 `ticker` 消息。

| 連續重連次數 | 每次等待 |
| --- | --- |
| 第 1～3 次 | 1 秒 |
| 第 4～6 次 | 5 秒 |
| 第 7 次起 | 30 秒 |

程式碼中的 `RECONNECT_STAGES` 將「等待時間」與「該檔次數」配成一組；可按需要增減檔位，最後一檔使用 `Infinity` 表示一直按該間隔重連。

## Node.js 範例

先安裝 `ws`：`npm install ws`。設定環境變數 `TICKDB_API_KEY` 後執行以下程式碼；若另設定 `TICKDB_UNIVERSE=CN_Stock`、`HK_Stock` 或 `US_Stock`，則訂閱對應市場的全量行情。範例中的 60 秒應用層心跳和 20 秒逾時可依應用需求調整。

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
  [30_000, Infinity] // 此後每次等待 30 秒
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
    ws.send(JSON.stringify(subscription)); // 每次重連後重新訂閱

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

不同頻道的訂閱命令與回應欄位，請直接查看 [即時行情](./ticker)、[盤口深度](./depth)、[逐筆成交](./trade) 和 [Ping](./ping) 頁面。全量行情的壓縮與推送格式見 [A 股](./ticker_cn_stock)、[港股](./ticker_hk_stock)和[美股](./ticker_us_stock)頁面。
