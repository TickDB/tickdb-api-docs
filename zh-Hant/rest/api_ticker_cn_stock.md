---
title: A股全量行情
description: 獲取A股市場當前全量行情快照。
openapi: "openapi.zh-Hant.yaml GET /v1/market/ticker/cn-stock"
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
| A 股全量 | ✅ |
| 港股全量 | ❌ |
| 美股全量 | ❌ |
| 企業版 | ✅ |

## 注意事項

- 無需傳入請求參數，一次返回當前可用的全部行情記錄，不分頁。
- 返回范圍包括滬深京股票、ETF、指數和債券，可通過 `type` 和 `category` 判斷產品類型。
- 響應數據量較大，客戶端必須啟用 HTTP 響應壓縮，并聲明支持 `gzip`、`br` 或 `zstd` 中的至少一種格式；未啟用壓縮時可能返回 `406`。
- `timestamp` 為每條行情的數據時間，使用 Unix 毫秒時間戳。
- `open`、`prev_close` 在對應數據不可用時不會返回。

## 支持的市場

| 市場 | 示例 |
|---|---|
| A股 | 600519.SH, 000001.SZ, 920186.BJ |

## 請求參數

無。

## 請求示例

```bash
curl --compressed \
  -H "X-API-Key: YOUR_API_KEY" \
  "https://api.tickdb.ai/v1/market/ticker/cn-stock"
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

const request = https.get("https://api.tickdb.ai/v1/market/ticker/cn-stock", {
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
| data | A股市場全量行情數組。 |
| └─ symbol | 交易產品代碼，包含 `.SH`、`.SZ` 或 `.BJ` 市場後綴。 |
| └─ name | 產品名稱。 |
| └─ type | 產品類型：`stock` 股票類產品、`indices` 指數。 |
| └─ category | 產品細分類別，取值說明見下表。 |
| └─ last_price | 最新成交價。 |
| └─ open | 當日開盤價；數據不可用時不返回。 |
| └─ prev_close | 上一交易日收盤價；數據不可用時不返回。 |
| └─ volume_24h | 當日累計成交量。 |
| └─ quote_volume_24h | 當日累計成交額。 |
| └─ high_24h | 當日最高價。 |
| └─ low_24h | 當日最低價。 |
| └─ price_change_24h | 相對昨收的價格變化。 |
| └─ price_change_percent_24h | 相對昨收的價格變化百分比。 |
| └─ timestamp | Unix 時間戳，單位為毫秒。 |

### category 取值

| 取值 | 說明 |
|------|------|
| `sh_stock` | 上交所股票。 |
| `sz_stock` | 深交所股票。 |
| `bj_stock` | 北交所股票。 |
| `etf` | ETF。 |
| `cn_index` | A股市場指數。 |
| `cn_bond` | A股市場債券。 |
