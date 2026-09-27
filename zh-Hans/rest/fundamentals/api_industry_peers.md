---
title: 同行估值对比
description: 查询与该股票同行的公司及其估值、每股收益等可比指标。
openapi: "openapi.yaml GET /v1/fundamentals/industry/peers"
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

- 同业样本和指标可用性随市场、公司而变化；财务比率通常以字符串返回。

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
  "https://api.tickdb.ai/v1/fundamentals/industry/peers?symbol=AAPL&type=stock"
```

## 返回字段说明

以下列出 `data` 中的字段；外层 `code=0` 表示成功。

| 字段 | 说明 |
|------|------|
| parent_symbol | 被查询股票代码。 |
| peers | 可用于横向比较的同行公司及指标列表。 |
| └─ peer_symbol | 同行公司股票代码。 |
| └─ peer_name | 同行公司名称。 |
| └─ currency | 指标币种。 |
| └─ pe | 市盈率。 |
| └─ eps | 每股收益。 |
| └─ bps | 每股净资产。 |
| └─ assets | 资产指标。 |
| └─ dps | 每股股息。 |
| └─ div_yield | 股息率。 |
| └─ div_payout_ratio | 派息率。 |
| └─ five_y_avg_dps | 五年平均每股股息。 |

返回同行公司的估值、每股收益、每股净资产和股息等指标，便于横向比较。
