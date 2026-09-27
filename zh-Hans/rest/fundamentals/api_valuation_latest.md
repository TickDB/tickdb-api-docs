---
title: 最新估值
description: 获取股票当前市盈率及近一年区间统计。
openapi: "openapi.yaml GET /v1/fundamentals/valuation/latest"
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

- 缺少可用估值数据时，单个指标的 `value` 和区间统计可能为 `null`。

## 支持的市场

| 市场 | 示例 |
|---|---|
| 美股 | AAPL.US |
| 港股 | 700.HK |
| A股 | 600519.SH |

## 请求参数

| 参数 | 是否必须 | 说明 |
|---|:---:|---|
| `symbol` | 是 | 股票代码 |
| `type` | 否 | 产品类型，当前支持 `stock` |

## 请求示例

```bash
curl -H "X-API-Key: YOUR_API_KEY" \
  "https://api.tickdb.ai/v1/fundamentals/valuation/latest?symbol=AAPL&type=stock"
```

## 返回字段说明

以下列出 `data` 中的字段；外层 `code=0` 表示成功。

| 字段 | 说明 |
|------|------|
| symbol | 股票代码。 |
| metrics | 按指标代码组织的估值快照。 |
| └─ PE | 市盈率指标。 |
| &nbsp;&nbsp;&nbsp;&nbsp;└─ value | 当前市盈率；可能为 null。 |
| &nbsp;&nbsp;&nbsp;&nbsp;└─ low_1y | 近一年低位。 |
| &nbsp;&nbsp;&nbsp;&nbsp;└─ median_1y | 近一年中位。 |
| &nbsp;&nbsp;&nbsp;&nbsp;└─ high_1y | 近一年高位。 |
| &nbsp;&nbsp;&nbsp;&nbsp;└─ desc | 指标说明；可能为 null。 |

返回当前市盈率（PE）及其近一年低位、中位和高位统计。
