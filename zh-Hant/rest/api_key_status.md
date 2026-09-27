---
title: APIKey管理
description: 無需登入官網，即可查詢 API Key 的到期情況，方便定時檢查和設定提醒。
openapi: "openapi.zh-Hant.yaml GET /v1/apikeys/subscriptions"
contextual:
  options:
    - copy
    - view
---

## 套餐權限

| 套餐 | 可用 |
|---|:---:|
| 免費版 | ✅ |
| 基礎版 | ✅ |
| 專業版 | ✅ |
| 全量套餐（A 股、港股、美股） | ✅ |
| 企業版 | ✅ |

使用自己的 API Key 查詢帳戶名下各 Key 的到期時間和剩餘秒數，無需登入官網。

## 請求參數

此介面不需要查詢參數。

## 請求示例

```bash
curl -H "X-API-Key: YOUR_API_KEY" \
  "https://api.tickdb.ai/v1/apikeys/subscriptions"
```

## 返回欄位說明

以下列出 `data` 中的欄位；外層 `code=0` 表示成功。

| 欄位 | 說明 |
|------|------|
| server_time | 本次查詢的伺服器時間，包含時區的日期時間字串。 |
| total | 返回的 API Key 數量。 |
| api_keys | 帳戶名下的 API Key 列表。 |
| └─ key_prefix | API Key 前綴，用於辨認 Key；不是完整密鑰。 |
| └─ name | API Key 名稱。 |
| └─ plan | 該 Key 對應的方案識別碼。 |
| └─ status | Key 狀態：`active`（有效）、`expired`（已過期）、`suspended`（已暫停）、`revoked`（已撤銷）。 |
| └─ expires_at | 到期時間；未設定到期時間時為 `null`。 |
| └─ remaining_seconds | 距離到期的剩餘秒數；已到期時為 `0`，未設定到期時間時為 `null`。 |
| └─ created_at | API Key 建立時間。 |
