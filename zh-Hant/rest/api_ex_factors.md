---
title: 復權因子
description: 獲取 A 股、港股和美股的前復權、後復權因子。
openapi: "openapi.zh-Hant.yaml GET /v1/market/kline/ex-factors"
contextual:
  options:
    - copy
    - view
---

## 套餐權限

| 套餐 | 可用 |
|---|:---:|
| 免費版 | ❌ |
| 基礎版 | ✅ |
| 專業版 | ✅ |
| 全量套餐（A 股、港股、美股） | ✅ |
| 企業版 | ✅ |

## 注意事項

- 本接口用於自行計算或核對股票歷史價格的復權結果；一般查詢可直接使用 K 線查詢或實時 K 線接口的 `adjust` 參數
- 每個除權除息事件分別返回一條 `forward`（前復權）和一條 `backward`（後復權）因子
- 復權價格計算公式：`復權價格 = 原始價格 × factor_a + factor_b`
- 前復權按時間順序應用 K 線時間之後的因子；後復權按時間倒序應用 K 線時間及之前的因子
- 時間戳單位為毫秒

## 代碼示例

本接口適合已經在本地保存未復權 K 線的場景。存儲時只保留一份原始價格數據，查詢、回測或繪製圖表時再獲取復權因子，動態生成前復權或後復權 K 線。這樣無需同時保存未復權、前復權和後復權三套數據；發生新的除權除息事件後，也可以使用最新因子重新計算歷史價格。

下面的 JavaScript 示例先獲取未復權日 K，再查詢同一股票的復權因子，並分別動態計算每根 K 線的前復權和後復權收盤價。實際使用時，可以將示例中請求未復權 K 線的部分替換為讀取本地數據庫。

```javascript
const BASE_URL = "https://api.tickdb.ai";
const SYMBOL = "600519.SH";
const API_KEY = process.env.TICKDB_API_KEY;

async function get(path, params) {
  const url = new URL(path, BASE_URL);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, String(value));
  });

  const response = await fetch(url, {
    headers: { "X-API-Key": API_KEY },
  });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const result = await response.json();
  if (result.code !== 0) {
    throw new Error(result.message);
  }
  return result.data;
}

function adjustPrice(rawPrice, klineTime, mode, factors) {
  // 前復權：選擇 K 線時間之後生效的 forward 因子。
  // 後復權：選擇 K 線時間及之前生效的 backward 因子。
  const selected = factors.filter(
    (factor) =>
      factor.adjust === mode &&
      (mode === "forward"
        ? factor.timestamp > klineTime
        : factor.timestamp <= klineTime),
  );

  // 前復權從早到晚應用，後復權從晚到早應用。
  selected.sort((a, b) =>
    mode === "forward" ? a.timestamp - b.timestamp : b.timestamp - a.timestamp,
  );

  return selected.reduce((price, factor) => {
    // 每條因子必須按順序迭代計算：
    // 復權價格 = 當前價格 × factor_a + factor_b
    return price * Number(factor.factor_a) + Number(factor.factor_b);
  }, Number(rawPrice));
}

async function main() {
  // 獲取未復權 K 線
  const klineData = await get("/v1/market/kline", {
    symbol: SYMBOL,
    type: "stock",
    interval: "1d",
    adjust: "none",
    limit: 100,
  });
  const klines = klineData.klines;

  // 返回結構為 data.data.{symbol}[]
  const factorData = await get("/v1/market/kline/ex-factors", {
    symbols: SYMBOL,
    type: "stock",
  });
  const factors = factorData.data[SYMBOL];

  for (const kline of klines) {
    console.log({
      time: kline.time,
      raw: kline.close,
      forward: adjustPrice(kline.close, kline.time, "forward", factors),
      backward: adjustPrice(kline.close, kline.time, "backward", factors),
    });
  }
}

main().catch(console.error);
```

- **前復權 `forward`**：以近期價格為基準。對一根過往 K 線，選取其時間之後發生的前復權因子，並按時間從早到晚依次應用
- **後復權 `backward`**：以早期價格為基準。對一根 K 線，選取其時間及之前發生的後復權因子，並按時間從晚到早依次應用
- 每應用一條因子，都按 `復權價格 = 當前價格 × factor_a + factor_b` 重新計算一次
- 如果只需要直接取得復權 K 線，無需自行計算，在 K 線查詢接口中傳入 `adjust=forward` 或 `adjust=backward` 即可

## 支持的市場

| 市場 | 示例 |
|---|---|
| A股 | 600519.SH, 000001.SZ |
| 港股 | 700.HK, 9988.HK |
| 美股 | AAPL.US, TSLA.US |

## 請求參數

| 參數名 | 是否必須 | 描述 |
|--------|----------|------|
| symbols | 是 | 股票代碼，多個用逗號分隔 |
| type | 否 | 產品類型，僅支持 `stock`；代碼無歧義時無需傳遞 |
| start_time | 否 | 開始時間戳，單位為毫秒，包含該時刻 |
| end_time | 否 | 結束時間戳，單位為毫秒，包含該時刻 |

## 返回字段說明

| 字段名 | 描述 |
|--------|------|
| data | 按股票代碼分組的復權因子對象 |
| └─ `{symbol}` | 對應股票代碼的復權因子數組 |
| &nbsp;&nbsp;└─ timestamp | 因子生效時間戳，單位為毫秒 |
| &nbsp;&nbsp;└─ adjust | 復權方向：`forward` 為前復權，`backward` 為後復權 |
| &nbsp;&nbsp;└─ factor_a | 復權計算中的乘法因子 |
| &nbsp;&nbsp;└─ factor_b | 復權計算中的加法因子 |
