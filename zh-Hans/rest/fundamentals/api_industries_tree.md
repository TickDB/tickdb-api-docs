---
title: 行业分类层级
description: 查询指定行业所属的顶层分类及下级行业分类。
openapi: "openapi.yaml GET /v1/fundamentals/industries/tree"
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

- `industry_counter_id` 可从行业指标排行获取；不同市场的行业节点不能混用。
- `market` 不区分大小写，文档中的市场代码统一使用大写形式。

## 支持的市场

| 市场 | 示例 |
|---|---|
| 美股 | US |
| 港股 | HK |
| A股 | CN |

## 请求参数

| 参数 | 是否必须 | 说明 |
|---|:---:|---|
| `market` | 是 | 市场代码：`US` 美股、`HK` 港股、`CN` A股 |
| `industry_counter_id` | 是 | 行业节点 ID，可从行业指标排行接口获取 |

## 请求示例

```bash
curl -H "X-API-Key: YOUR_API_KEY" \
  "https://api.tickdb.ai/v1/fundamentals/industries/tree?market=US&industry_counter_id=BK%2FUS%2FIN00260"
```

## 返回字段说明

以下列出 `data` 中的字段；外层 `code=0` 表示成功。

| 字段 | 说明 |
|------|------|
| market | 查询市场。 |
| industry_counter_id | 行业节点 ID。 |
| top | 所属顶层行业分类。 |
| └─ name | 顶层行业名称。 |
| └─ market | 顶层行业市场。 |
| chain | 当前行业及其下级分类组成的层级结构。 |
| └─ name | 节点名称。 |
| └─ counter_id | 行业节点 ID。 |
| └─ level | 节点层级。 |
| └─ parent_code | 父节点代码。 |
| └─ market | 所属市场。 |
| └─ stock_num | 股票数量。 |
| └─ chg | 变动值。 |
| └─ ytd_chg | 年初至今变动值。 |
| └─ symbol | 节点关联代码。 |
| └─ sharelist_id | 股票列表 ID。 |
| └─ next | 下级行业分类列表；元素递归使用相同节点结构。 |

返回指定行业的顶层归属、当前分类和下级分类，便于查看行业分类关系。
