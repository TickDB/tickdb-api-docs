---
title: 港股全量行情
description: 获取港股市场当前全量行情快照。
openapi: "openapi.yaml GET /v1/market/ticker/hk-stock"
contextual:
  options:
    - copy
    - view
---

## 套餐权限

| 套餐 | 可用 |
|---|:---:|
| 免费版 | ❌ |
| 基础版 | ❌ |
| 专业版 | ❌ |
| A 股全量 | ❌ |
| 港股全量 | ✅ |
| 美股全量 | ❌ |
| 企业版 | ✅ |

## 注意事项

- 无需传入请求参数，一次返回当前可用的全部行情记录，不分页。
- 返回范围以港股为主，并包含当前可用的港股市场指数，可通过 `type` 判断产品类型。
- 响应数据量较大，客户端必须启用 HTTP 响应压缩，并声明支持 `gzip`、`br` 或 `zstd` 中的至少一种格式；未启用压缩时可能返回 `406`。
- `timestamp` 为每条行情的数据时间，使用 Unix 毫秒时间戳。
- `open`、`prev_close` 在对应数据不可用时不会返回。

## 支持的市场

| 市场 | 示例 |
|---|---|
| 港股 | 700.HK, 9988.HK, 3690.HK |

## 请求参数

无。

## 请求示例

```bash
curl --compressed \
  -H "X-API-Key: YOUR_API_KEY" \
  "https://api.tickdb.ai/v1/market/ticker/hk-stock"
```

## 代码示例

以下 Node.js 22+ 示例声明支持三种压缩格式，并根据响应中的 `Content-Encoding` 自动选择解压方式。

```javascript
const https = require("node:https");
const zlib = require("node:zlib");

const decompressors = {
  gzip: zlib.gunzipSync,
  br: zlib.brotliDecompressSync,
  zstd: zlib.zstdDecompressSync,
};

const request = https.get("https://api.tickdb.ai/v1/market/ticker/hk-stock", {
  headers: {
    "X-API-Key": process.env.TICKDB_API_KEY,
    "Accept-Encoding": "gzip, br, zstd",
  },
}, (response) => {
  const chunks = [];
  response.on("data", (chunk) => chunks.push(chunk));
  response.on("end", () => {
    if (response.statusCode !== 200) {
      throw new Error(`请求失败：${response.statusCode}`);
    }

    const encoding = response.headers["content-encoding"];
    const decompress = decompressors[encoding];
    if (!decompress) {
      throw new Error(`不支持的压缩格式：${encoding}`);
    }

    const body = decompress(Buffer.concat(chunks));
    const result = JSON.parse(body.toString("utf8"));
    console.log(`返回 ${result.data.length} 条行情`);
    console.log(result.data[0]);
  });
});

request.on("error", console.error);
```

## 返回字段说明

| 字段 | 说明 |
|------|------|
| code | 响应码，`0` 表示成功。 |
| message | 响应消息。 |
| data | 港股市场全量行情数组。 |
| └─ symbol | 港股市场代码，例如 `700`。 |
| └─ name | 产品名称。 |
| └─ type | 产品类型：`stock` 股票类产品、`indices` 指数。 |
| └─ last_price | 最新成交价。 |
| └─ open | 当日开盘价；数据不可用时不返回。 |
| └─ prev_close | 上一交易日收盘价；数据不可用时不返回。 |
| └─ volume_24h | 当日累计成交量。 |
| └─ quote_volume_24h | 当日累计成交额。 |
| └─ high_24h | 当日最高价。 |
| └─ low_24h | 当日最低价。 |
| └─ price_change_24h | 相对昨收的价格变化。 |
| └─ price_change_percent_24h | 相对昨收的价格变化百分比。 |
| └─ timestamp | Unix 时间戳，单位为毫秒。 |
