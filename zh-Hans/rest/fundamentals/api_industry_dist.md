---
title: 行业估值分布
description: 获取股票所属行业的估值分布和样本统计。
openapi: "openapi.yaml GET /v1/fundamentals/industry/dist"
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
| 专业版 | ✅ |
| 全量套餐（A 股、港股、美股） | ✅ |
| 企业版 | ✅ |

## 注意事项

- 不同估值指标分别形成一条分布记录；排名和分位值以对应行业样本为准。

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
  "https://api.tickdb.ai/v1/fundamentals/industry/dist?symbol=AAPL&type=stock"
```

## 返回字段说明

以下列出 `data` 中的字段；外层 `code=0` 表示成功。

| 字段 | 说明 |
|------|------|
| symbol | 股票代码。 |
| distributions | 行业估值分布列表。 |
| └─ metric | 估值指标代码。 |
| └─ value | 当前股票的指标值。 |
| └─ low | 行业样本低位。 |
| └─ median | 行业样本中位。 |
| └─ high | 行业样本高位。 |
| └─ rank_index | 当前排名。 |
| └─ rank_total | 样本总数。 |
| └─ ranking | 排名展示值。 |

返回行业估值区间、样本中位数、当前标的排名及样本数量等信息。
