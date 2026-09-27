---
title: 公司资料
description: 获取公司的基本资料、所属市场、行业和上市信息。
openapi: "openapi.yaml GET /v1/fundamentals/profile"
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

- 部分资料字段可能为空字符串或 `null`；不要把缺失值当作“无”。

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
  "https://api.tickdb.ai/v1/fundamentals/profile?symbol=AAPL&type=stock"
```

## 返回字段说明

以下列出 `data` 中的字段；外层 `code=0` 表示成功。

| 字段 | 说明 |
|------|------|
| symbol | 标准化股票代码。 |
| market | 所属市场。 |
| region | 所属地区。 |
| company_name | 公司全称。 |
| name | 展示名称。 |
| profile | 公司业务简介。 |
| address | 地址。 |
| office_address | 办公地址。 |
| phone | 联系电话。 |
| email | 电子邮箱。 |
| website | 公司网站。 |
| founded | 成立年份或日期；无数据时为 null。 |
| listing_date | 上市日期，格式 `YYYY-MM-DD`；可能为 `null`。 |
| year_end | 财年结束信息；可能为 null。 |
| employees | 员工人数。 |
| chairman | 董事长。 |
| manager | 主要管理人员。 |
| secretary | 公司秘书。 |
| legal_repr | 法定代表人。 |
| accounting_firm | 会计师事务所。 |
| legal_counsel | 法律顾问。 |
| category | 公司类别。 |

部分字段会因市场及个股而异；以实际返回为准。
