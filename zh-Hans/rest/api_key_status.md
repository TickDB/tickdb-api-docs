---
title: APIKey管理
description: 无需登录官网，即可查询 API Key 的到期情况，便于定时检查和设置提醒。
openapi: "openapi.yaml GET /v1/apikeys/subscriptions"
contextual:
  options:
    - copy
    - view
---

## 套餐权限

| 套餐 | 可用 |
|---|:---:|
| 免费版 | ✅ |
| 基础版 | ✅ |
| 专业版 | ✅ |
| 全量套餐（A 股、港股、美股） | ✅ |
| 企业版 | ✅ |

使用自己的 API Key 查询账户名下各 Key 的到期时间和剩余秒数，无需登录官网。

## 请求参数

该接口不需要查询参数。

## 请求示例

```bash
curl -H "X-API-Key: YOUR_API_KEY" \
  "https://api.tickdb.ai/v1/apikeys/subscriptions"
```

## 返回字段说明

以下列出 `data` 中的字段；外层 `code=0` 表示成功。

| 字段 | 说明 |
|------|------|
| server_time | 本次查询的服务器时间，带时区的日期时间字符串。 |
| total | 返回的 API Key 数量。 |
| api_keys | 账户名下的 API Key 列表。 |
| └─ key_prefix | API Key 前缀，用于辨认 Key；不是完整密钥。 |
| └─ name | API Key 名称。 |
| └─ plan | 该 Key 对应的套餐标识。 |
| └─ status | Key 状态：`active`（有效）、`expired`（已过期）、`suspended`（已暂停）、`revoked`（已撤销）。 |
| └─ expires_at | 到期时间；未设置到期时间时为 `null`。 |
| └─ remaining_seconds | 距离到期的剩余秒数；已到期时为 `0`，未设置到期时间时为 `null`。 |
| └─ created_at | API Key 创建时间。 |
