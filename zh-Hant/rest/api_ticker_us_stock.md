---
title: 美股全量行情
description: 獲取美股市場當前全量行情快照。
openapi: "openapi.zh-Hant.yaml GET /v1/market/ticker/us-stock"
contextual:
  options:
    - copy
    - view
---

## 套餐權限

| 套餐 | 可用 |
|---|:---:|
| 免費版 | ❌ |
| 基礎版 | ❌ |
| 專業版 | ❌ |
| A 股全量 | ❌ |
| 港股全量 | ❌ |
| 美股全量 | ✅ |
| 企業版 | ✅ |

## 注意事項

- 無需傳入請求參數，一次返回當前可用的全部行情記錄，不分頁。
- 響應數據量較大，客戶端必須啟用 HTTP 響應壓縮，并聲明支持 `gzip`、`br` 或 `zstd` 中的至少一種格式；未啟用壓縮時可能返回 `406`。
- `timestamp` 為每條行情的數據時間，使用 Unix 毫秒時間戳。
- 除 `symbol`、`last_price` 和 `timestamp` 外，其余字段根據產品和行情數據可用性返回。

## 支持的市場

| 市場 | 示例 |
|---|---|
| 美股 | AAPL.US, TSLA.US, MSFT.US |

## 請求參數

無。

## 請求示例

```bash
curl --compressed \
  -H "X-API-Key: YOUR_API_KEY" \
  "https://api.tickdb.ai/v1/market/ticker/us-stock"
```

## 代碼示例

以下 Node.js 22+ 示例聲明支持三種壓縮格式，并根據響應中的 `Content-Encoding` 自動選擇解壓方式。

```javascript
const https = require("node:https");
const zlib = require("node:zlib");

const decompressors = {
  gzip: zlib.gunzipSync,
  br: zlib.brotliDecompressSync,
  zstd: zlib.zstdDecompressSync,
};

const request = https.get("https://api.tickdb.ai/v1/market/ticker/us-stock", {
  headers: {
    "X-API-Key": process.env.TICKDB_API_KEY,
    "Accept-Encoding": "gzip, br, zstd",
  },
}, (response) => {
  const chunks = [];
  response.on("data", (chunk) => chunks.push(chunk));
  response.on("end", () => {
    if (response.statusCode !== 200) {
      throw new Error(`請求失敗：${response.statusCode}`);
    }

    const encoding = response.headers["content-encoding"];
    const decompress = decompressors[encoding];
    if (!decompress) {
      throw new Error(`不支持的壓縮格式：${encoding}`);
    }

    const body = decompress(Buffer.concat(chunks));
    const result = JSON.parse(body.toString("utf8"));
    console.log(`返回 ${result.data.length} 條行情`);
    console.log(result.data[0]);
  });
});

request.on("error", console.error);
```

## 返回字段說明

| 字段 | 說明 |
|------|------|
| code | 響應碼，`0` 表示成功。 |
| message | 響應消息。 |
| data | 美股市場全量行情數組。 |
| └─ symbol | 美股代碼，例如 `AAPL`。 |
| └─ name | 產品名稱；名稱信息可用時返回。 |
| └─ type | 產品類型。 |
| └─ last_price | 最新成交價。 |
| └─ open | 當日開盤價；數據不可用時不返回。 |
| └─ prev_close | 上一交易日收盤價；數據不可用時不返回。 |
| └─ volume_24h | 當日累計成交量；數據不可用時不返回。 |
| └─ quote_volume_24h | 當日累計成交額；數據不可用時不返回。 |
| └─ high_24h | 當日最高價；數據不可用時不返回。 |
| └─ low_24h | 當日最低價；數據不可用時不返回。 |
| └─ price_change_24h | 相對昨收的價格變化；數據不可用時不返回。 |
| └─ price_change_percent_24h | 相對昨收的價格變化百分比；數據不可用時不返回。 |
| └─ timestamp | Unix 時間戳，單位為毫秒。 |
