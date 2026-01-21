---
title: API 错误码说明
description: 接口返回的错误码含义及处理建议。
---

本文档面向 API 用户，说明接口返回的错误码含义及处理建议。

---

## 响应格式

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

## 错误码速查表

| 错误码 | 含义 | 处理建议 |
|--------|------|----------|
| 0 | 成功 | - |
| 1001 | API Key 无效或已过期 | 检查 API Key 是否正确 |
| 1002 | 未提供 API Key | 在请求头添加 `X-API-Key` |
| 1003 | IP 不在白名单 | 联系管理员添加 IP |
| 1004 | 权限不足 | 升级套餐或联系管理员 |
| 2001 | 参数错误 | 检查请求参数 |
| 2002 | 交易品种不存在 | 使用 `/v1/symbols/available` 查询可用品种 |
| 2003 | 时间范围无效 | 检查 start_time/end_time 参数 |
| 2004 | 请求数量超限 | 减少 limit 参数值 |
| 3001 | 请求频率超限 | 降低请求频率，参考 Retry-After 头 |
| 3002 | 配额已用尽 | 等待配额重置或升级套餐 |
| 3003 | 连接数超限 | 关闭多余连接 |
| 3004 | 订阅数超限 | 取消部分订阅 |
| 4001 | 未知命令 | 检查 WebSocket 消息的 cmd 字段 |
| 4002 | 消息格式错误 | 检查 JSON 格式 |
| 4003 | 深度订阅暂不可用 | 使用 HTTP API 获取深度数据 |
| 4004 | 成交订阅暂不可用 | 使用 HTTP API 获取成交数据 |
| 5000 | 服务器内部错误 | 稍后重试，如持续请联系支持 |
| 5001 | 数据源不可用 | 稍后重试 |
| 5002 | 服务暂时不可用 | 稍后重试 |

---

## 详细说明

### 认证错误 (1xxx)

#### 1001 - API Key 无效或已过期

```json
{
  "code": 1001,
  "message": "Invalid or expired token"
}
```

**原因**：
- API Key 输入错误
- API Key 已被禁用
- API Key 已过期

**解决**：检查 API Key 是否正确，或联系管理员确认状态。

#### 1002 - 未提供 API Key

```json
{
  "code": 1002,
  "message": "Token is required"
}
```

**解决**：在 HTTP 请求头中添加 `X-API-Key: your_api_key`，或在 WebSocket URL 中添加 `?api_key=your_api_key`。

#### 1003 - IP 不在白名单

```json
{
  "code": 1003,
  "message": "IP address not in whitelist"
}
```

**原因**：企业版套餐启用了 IP 白名单限制。

**解决**：联系管理员将您的 IP 添加到白名单。

#### 1004 - 权限不足

```json
{
  "code": 1004,
  "message": "Permission denied"
}
```

**原因**：当前套餐不支持该功能。

**解决**：升级套餐或联系管理员。

---

### 参数错误 (2xxx)

#### 2001 - 参数错误

```json
{
  "code": 2001,
  "message": "Invalid parameter: symbol is required"
}
```

**解决**：检查请求参数是否完整、格式是否正确。

#### 2002 - 交易品种不存在

```json
{
  "code": 2002,
  "message": "Symbol not found"
}
```

**解决**：调用 `GET /v1/symbols/available` 获取可用品种列表。

#### 2003 - 时间范围无效

```json
{
  "code": 2003,
  "message": "Invalid time range"
}
```

**原因**：
- start_time 大于 end_time
- 时间格式错误
- 时间范围超出限制

**解决**：使用 Unix 毫秒时间戳，确保 start_time < end_time。

#### 2004 - 请求数量超限

```json
{
  "code": 2004,
  "message": "Request limit exceeded"
}
```

**解决**：减少 `limit` 参数值（通常最大 1000）。

---

### 限流错误 (3xxx)

#### 3001 - 请求频率超限

```json
{
  "code": 3001,
  "message": "Rate limit exceeded"
}
```

HTTP 响应会包含 `Retry-After` 头，指示等待秒数。

**解决**：
- 降低请求频率
- 使用 WebSocket 订阅替代轮询
- 升级套餐获取更高配额

#### 3002 - 配额已用尽

```json
{
  "code": 3002,
  "message": "Quota exhausted"
}
```

**解决**：等待配额重置（通常每月重置）或升级套餐。

#### 3003 - 连接数超限

```json
{
  "code": 3003,
  "message": "Connection limit exceeded"
}
```

**解决**：
- 调用 `GET /v1/connections` 查看当前连接
- 调用 `DELETE /v1/connections/:id` 关闭多余连接

#### 3004 - 订阅数超限

```json
{
  "code": 3004,
  "message": "Subscription limit exceeded"
}
```

**解决**：取消部分订阅后再订阅新品种。

---

### WebSocket 错误 (4xxx)

#### 4001 - 未知命令

```json
{
  "cmd": "unknown",
  "code": 4001,
  "message": "Unknown command"
}
```

**解决**：检查 `cmd` 字段，支持的命令：`subscribe`、`unsubscribe`、`ping`。

#### 4002 - 消息格式错误

```json
{
  "cmd": "subscribe",
  "code": 4002,
  "message": "Invalid message format"
}
```

**解决**：确保发送的是有效 JSON，包含必需字段。

#### 4003 / 4004 - 订阅暂不可用

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

**解决**：使用 HTTP API 获取数据。

---

### 服务错误 (5xxx)

#### 5000 - 服务器内部错误

```json
{
  "code": 5000,
  "message": "Internal server error"
}
```

**解决**：稍后重试。如持续出现，请联系技术支持。

#### 5001 - 数据源不可用

```json
{
  "code": 5001,
  "message": "Data source unavailable"
}
```

**解决**：稍后重试，通常会自动恢复。

#### 5002 - 服务暂时不可用

```json
{
  "code": 5002,
  "message": "Service temporarily unavailable"
}
```

**解决**：服务可能正在维护，稍后重试。

---

## 错误处理示例

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
        throw new Error('认证失败，请检查 API Key');
      case 2002:
        throw new Error(`交易品种 ${symbol} 不存在`);
      case 3001:
        const retryAfter = response.headers.get('Retry-After') || 60;
        console.log(`请求过快，${retryAfter} 秒后重试`);
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
            raise Exception('认证失败，请检查 API Key')
        elif data['code'] == 2002:
            raise Exception(f'交易品种 {symbol} 不存在')
        elif data['code'] == 3001:
            retry_after = response.headers.get('Retry-After', 60)
            print(f'请求过快，{retry_after} 秒后重试')
        else:
            raise Exception(data['message'])
    
    return data['data']
```

---

*如有疑问，请联系技术支持。*
