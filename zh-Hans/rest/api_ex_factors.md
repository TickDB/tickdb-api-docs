---
title: 复权因子
description: 获取 A 股、港股和美股的前复权、后复权因子。
openapi: "openapi.yaml GET /v1/market/kline/ex-factors"
contextual:
  options:
    - copy
    - view
---

## 套餐权限

| 套餐 | 可用 |
|---|:---:|
| 免费版 | ❌ |
| 基础版 | ✅ |
| 专业版 | ✅ |
| 全量套餐（A 股、港股、美股） | ✅ |
| 企业版 | ✅ |

## 注意事项

- 本接口用于自行计算或核对股票历史价格的复权结果；一般查询可直接使用 K 线查询或实时 K 线接口的 `adjust` 参数
- 每个除权除息事件分别返回一条 `forward`（前复权）和一条 `backward`（后复权）因子
- 复权价格计算公式：`复权价格 = 原始价格 × factor_a + factor_b`
- 前复权按时间顺序应用 K 线时间之后的因子；后复权按时间倒序应用 K 线时间及之前的因子
- 时间戳单位为毫秒

## 代码示例

本接口适合已经在本地保存不复权 K 线的场景。存储时只保留一份原始价格数据，查询、回测或绘制图表时再获取复权因子，动态生成前复权或后复权 K 线。这样无需同时保存不复权、前复权和后复权三套数据；发生新的除权除息事件后，也可以使用最新因子重新计算历史价格。

下面的 JavaScript 示例先获取未复权日 K，再查询同一股票的复权因子，并分别动态计算每根 K 线的前复权和后复权收盘价。实际使用时，可以将示例中请求未复权 K 线的部分替换为读取本地数据库。

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
  // 前复权：选择 K 线时间之后生效的 forward 因子。
  // 后复权：选择 K 线时间及之前生效的 backward 因子。
  const selected = factors.filter(
    (factor) =>
      factor.adjust === mode &&
      (mode === "forward"
        ? factor.timestamp > klineTime
        : factor.timestamp <= klineTime),
  );

  // 前复权从早到晚应用，后复权从晚到早应用。
  selected.sort((a, b) =>
    mode === "forward" ? a.timestamp - b.timestamp : b.timestamp - a.timestamp,
  );

  return selected.reduce((price, factor) => {
    // 每条因子必须按顺序迭代计算：
    // 复权价格 = 当前价格 × factor_a + factor_b
    return price * Number(factor.factor_a) + Number(factor.factor_b);
  }, Number(rawPrice));
}

async function main() {
  // 获取未复权 K 线
  const klineData = await get("/v1/market/kline", {
    symbol: SYMBOL,
    type: "stock",
    interval: "1d",
    adjust: "none",
    limit: 100,
  });
  const klines = klineData.klines;

  // 返回结构为 data.data.{symbol}[]
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

- **前复权 `forward`**：以近期价格为基准。对一根过往 K 线，选取其时间之后发生的前复权因子，并按时间从早到晚依次应用
- **后复权 `backward`**：以早期价格为基准。对一根 K 线，选取其时间及之前发生的后复权因子，并按时间从晚到早依次应用
- 每应用一条因子，都按 `复权价格 = 当前价格 × factor_a + factor_b` 重新计算一次
- 如果只需要直接取得复权 K 线，无需自行计算，在 K 线查询接口中传入 `adjust=forward` 或 `adjust=backward` 即可

## 支持的市场

| 市场 | 示例 |
|---|---|
| A股 | 600519.SH, 000001.SZ |
| 港股 | 700.HK, 9988.HK |
| 美股 | AAPL.US, TSLA.US |

## 请求参数

| 参数名 | 是否必须 | 描述 |
|--------|----------|------|
| symbols | 是 | 股票代码，多个用逗号分隔 |
| type | 否 | 产品类型，仅支持 `stock`；代码无歧义时无需传递 |
| start_time | 否 | 开始时间戳，单位为毫秒，包含该时刻 |
| end_time | 否 | 结束时间戳，单位为毫秒，包含该时刻 |

## 返回字段说明

| 字段名 | 描述 |
|--------|------|
| data | 按股票代码分组的复权因子对象 |
| └─ `{symbol}` | 对应股票代码的复权因子数组 |
| &nbsp;&nbsp;└─ timestamp | 因子生效时间戳，单位为毫秒 |
| &nbsp;&nbsp;└─ adjust | 复权方向：`forward` 为前复权，`backward` 为后复权 |
| &nbsp;&nbsp;└─ factor_a | 复权计算中的乘法因子 |
| &nbsp;&nbsp;└─ factor_b | 复权计算中的加法因子 |
