---
title: API 錯誤碼說明
description: 接口返回的錯誤碼含義及處理建議。
---

本文檔面向 API 用戶，說明接口返回的錯誤碼含義及處理建議。

---

## 響應格式

### HTTP API

```json
{
  "code": 0,
  "message": "success",
  "data": { ... }
}
```

### WebSocket

```json
{
  "cmd": "subscribe",
  "code": 0,
  "message": "success",
  "data": { ... }
}
```

---

## 錯誤碼速查表

| 錯誤碼 | 含義 | 處理建議 |
|--------|------|----------|
| 0 | 成功 | - |
| 1001 | API Key 無效或已過期 | 檢查 API Key 是否正確 |
| 1002 | 未提供 API Key | 在請求頭添加 `X-API-Key` |
| 1003 | IP 不在白名單 | 聯繫管理員添加 IP |
| 1004 | 權限不足 | 升級套餐或聯繫管理員 |
| 2001 | 參數錯誤 | 檢查請求參數 |
| 2002 | 交易品種不存在 | 使用 `/v1/symbols/available` 查詢可用品種 |
| 2003 | 時間範圍無效 | 檢查 start_time/end_time 參數 |
| 2004 | 請求數量超限 | 減少 limit 參數值 |
| 3001 | 請求頻率超限 | 降低請求頻率，參考 Retry-After 頭 |
| 3002 | 配額已用盡 | 等待配額重置或升級套餐 |
| 3003 | 連接數超限 | 關閉多餘連接 |
| 3004 | 訂閱數超限 | 取消部分訂閱 |
| 4001 | 未知命令 | 檢查 WebSocket 消息的 cmd 字段 |
| 4002 | 消息格式錯誤 | 檢查 JSON 格式 |
| 4003 | 深度訂閱暫不可用 | 使用 HTTP API 獲取深度數據 |
| 4004 | 成交訂閱暫不可用 | 使用 HTTP API 獲取成交數據 |
| 5000 | 服務器內部錯誤 | 稍後重試，如持續請聯繫支持 |
| 5001 | 數據源不可用 | 稍後重試 |
| 5002 | 服務暫時不可用 | 稍後重試 |

---

## 詳細說明

### 認證錯誤 (1xxx)

#### 1001 - API Key 無效或已過期

```json
{
  "code": 1001,
  "message": "Invalid or expired token"
}
```

**原因**：
- API Key 輸入錯誤
- API Key 已被禁用
- API Key 已過期

**解決**：檢查 API Key 是否正確，或聯繫管理員確認狀態。

#### 1002 - 未提供 API Key

```json
{
  "code": 1002,
  "message": "Token is required"
}
```

**解決**：在 HTTP 請求頭中添加 `X-API-Key: your_api_key`，或在 WebSocket URL 中添加 `?api_key=your_api_key`。

#### 1003 - IP 不在白名單

```json
{
  "code": 1003,
  "message": "IP address not in whitelist"
}
```

**原因**：企業版套餐啟用了 IP 白名單限制。

**解決**：聯繫管理員將您的 IP 添加到白名單。

#### 1004 - 權限不足

```json
{
  "code": 1004,
  "message": "Permission denied"
}
```

**原因**：當前套餐不支持該功能。

**解決**：升級套餐或聯繫管理員。

---

### 參數錯誤 (2xxx)

#### 2001 - 參數錯誤

```json
{
  "code": 2001,
  "message": "Invalid parameter: symbol is required"
}
```

**解決**：檢查請求參數是否完整、格式是否正確。

#### 2002 - 交易品種不存在

```json
{
  "code": 2002,
  "message": "Symbol not found"
}
```

**解決**：調用 `GET /v1/symbols/available` 獲取可用品種列表。

#### 2003 - 時間範圍無效

```json
{
  "code": 2003,
  "message": "Invalid time range"
}
```

**原因**：
- start_time 大於 end_time
- 時間格式錯誤
- 時間範圍超出限制

**解決**：使用 Unix 毫秒時間戳，確保 start_time < end_time。

#### 2004 - 請求數量超限

```json
{
  "code": 2004,
  "message": "Request limit exceeded"
}
```

**解決**：減少 `limit` 參數值（通常最大 1000）。

---

### 限流錯誤 (3xxx)

#### 3001 - 請求頻率超限

```json
{
  "code": 3001,
  "message": "Rate limit exceeded"
}
```

HTTP 響應會包含 `Retry-After` 頭，指示等待秒數。

**解決**：
- 降低請求頻率
- 使用 WebSocket 訂閱替代輪詢
- 升級套餐獲取更高配額

#### 3002 - 配額已用盡

```json
{
  "code": 3002,
  "message": "Quota exhausted"
}
```

**解決**：等待配額重置（通常每月重置）或升級套餐。

#### 3003 - 連接數超限

```json
{
  "code": 3003,
  "message": "Connection limit exceeded"
}
```

**解決**：
- 調用 `GET /v1/connections` 查看當前連接
- 調用 `DELETE /v1/connections/:id` 關閉多餘連接

#### 3004 - 訂閱數超限

```json
{
  "code": 3004,
  "message": "Subscription limit exceeded"
}
```

**解決**：取消部分訂閱後再訂閱新品種。

---

### WebSocket 錯誤 (4xxx)

#### 4001 - 未知命令

```json
{
  "cmd": "unknown",
  "code": 4001,
  "message": "Unknown command"
}
```

**解決**：檢查 `cmd` 字段，支持的命令：`subscribe`、`unsubscribe`、`ping`。

#### 4002 - 消息格式錯誤

```json
{
  "cmd": "subscribe",
  "code": 4002,
  "message": "Invalid message format"
}
```

**解決**：確保發送的是有效 JSON，包含必需字段。

#### 4003 / 4004 - 訂閱暫不可用

```json
{
  "cmd": "subscribe",
  "code": 4003,
  "message": "Depth subscriptions temporarily unavailable",
  "data": {
    "channel": "depth",
    "suggestion": "Use HTTP API /v1/market/depth for current depth data"
  }
}
```

**解決**：使用 HTTP API 獲取數據。

---

### 服務錯誤 (5xxx)

#### 5000 - 服務器內部錯誤

```json
{
  "code": 5000,
  "message": "Internal server error"
}
```

**解決**：稍後重試。如持續出現，請聯繫技術支持。

#### 5001 - 數據源不可用

```json
{
  "code": 5001,
  "message": "Data source unavailable"
}
```

**解決**：稍後重試，通常會自動恢復。

#### 5002 - 服務暫時不可用

```json
{
  "code": 5002,
  "message": "Service temporarily unavailable"
}
```

**解決**：服務可能正在維護，稍後重試。

---

## 錯誤處理示例

### JavaScript

```javascript
async function fetchTicker(symbol) {
  const response = await fetch(`/v1/market/ticker/${symbol}`, {
    headers: { 'X-API-Key': API_KEY }
  });
  
  const data = await response.json();
  
  if (data.code !== 0) {
    switch (data.code) {
      case 1001:
      case 1002:
        throw new Error('認證失敗，請檢查 API Key');
      case 2002:
        throw new Error(`交易品種 ${symbol} 不存在`);
      case 3001:
        const retryAfter = response.headers.get('Retry-After') || 60;
        console.log(`請求過快，${retryAfter} 秒後重試`);
        break;
      default:
        throw new Error(data.message);
    }
  }
  
  return data.data;
}
```

### Python

```python
import requests

def fetch_ticker(symbol, api_key):
    response = requests.get(
        f'/v1/market/ticker/{symbol}',
        headers={'X-API-Key': api_key}
    )
    
    data = response.json()
    
    if data['code'] != 0:
        if data['code'] in [1001, 1002]:
            raise Exception('認證失敗，請檢查 API Key')
        elif data['code'] == 2002:
            raise Exception(f'交易品種 {symbol} 不存在')
        elif data['code'] == 3001:
            retry_after = response.headers.get('Retry-After', 60)
            print(f'請求過快，{retry_after} 秒後重試')
        else:
            raise Exception(data['message'])
    
    return data['data']
```

---

*如有疑問，請聯繫技術支持。*
