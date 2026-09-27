---
title: 错误码说明
description: 接口返回的错误码含义及处理建议。
---

## 错误响应约定

- 成功响应的 `code` 为数字 `0`
- 错误响应的 `code` 可能是整数或字符串；客户端应先使用 `String(code)` 归一化后再比较
- 不要根据 `message` 文本编写判断逻辑；`message` 用于说明错误，可能随具体场景变化
- HTTP 状态码表示请求层面的结果，`code` 表示具体业务原因，客户端应同时检查两者

### HTTP API

HTTP 错误响应至少包含 `code` 和 `message`，部分接口还会返回 `error` 或 `data`：

```json
{
  "code": "2001",
  "message": "symbol parameter is required",
  "error": "2001"
}
```

财务与基本面接口通常返回以下结构：

```json
{
  "code": 40001,
  "message": "granularity must be daily or monthly",
  "data": null
}
```

### WebSocket 建连失败

在 WebSocket 升级完成前发生的鉴权错误是普通 HTTP 错误响应，此时连接尚未建立，客户端不会收到 WebSocket 消息。

| HTTP 状态 | `code` | 含义 | 处理建议 |
| ---: | --- | --- | --- |
| 401 | `UNAUTHORIZED` | 未提供 API Key | 在连接 URL 中传入 `api_key` |
| 401 | `INVALID_TOKEN` | API Key 无效或已失效 | 检查或重新生成 API Key |
| 403 | `PERMISSION_DENIED` | 当前 API Key 无权建立连接 | 检查套餐权限或联系支持 |

### WebSocket 建连后错误

连接建立后的订阅或消息错误通过 WebSocket 消息返回，`cmd` 表示触发错误的命令：

```json
{
  "cmd": "error",
  "code": 2001,
  "message": "Invalid message format",
  "data": null
}
```

## 错误码速查表

### 认证错误（1xxx）

| 错误码 | HTTP／场景 | 含义 | 处理建议 |
| ---: | --- | --- | --- |
| `1001` | 401 | API Key 无效 | 检查 API Key 是否正确 |
| `1002` | 401 | 未提供 API Key | 在请求头中添加 `X-API-Key` |
| `1004` | 403 | 权限不足 | 检查当前套餐权限 |
| `1005` | 401 | API Key 已过期 | 续费或升级套餐后重试 |

### 参数错误（2xxx）

| 错误码 | HTTP／场景 | 含义 | 处理建议 |
| ---: | --- | --- | --- |
| `2001` | 400／WS 消息 | 请求参数错误 | 根据 `message` 检查缺失参数、格式或参数组合 |
| `2002` | 404／WS 消息 | 交易品种不存在或不受支持 | 使用 `/v1/symbols/available` 查询可用代码 |
| `2003` | 400／WS 消息 | 时间范围无效；在部分 WebSocket 订阅中也表示代码存在歧义 | 根据 `message` 和 `data` 修正时间，或补充 `type` |
| `2004` | 400 | 请求数量超过接口限制 | 根据对应接口说明减少请求数量 |
| `2005` | 400 | 交易产品代码格式不受支持 | 使用数据规范中公开的代码格式 |
| `2006` | 400／WS 消息 | 代码后缀与请求的 `type` 冲突 | 修正代码或 `type`，确保二者一致 |
| `2008` | 406 | 全量行情请求未启用压缩 | 按接口文档启用 HTTP 响应压缩 |

HTTP 请求中的代码歧义返回字符串 `AMBIGUOUS_SYMBOL`；WebSocket 订阅中的代码歧义当前返回数字 `2003`。两者都应根据响应中的 `available_types` 补充 `type`。

### 访问限制与配额错误（3xxx）

| 错误码 | HTTP／场景 | 含义 | 处理建议 |
| ---: | --- | --- | --- |
| `3001` | 429 | 请求频率超限 | 根据 `Retry-After` 等待后重试 |
| `3002` | 403 | 配额已用尽 | 等待配额重置或升级套餐 |
| `3003` | 429 | WebSocket 连接数超限 | 关闭不再使用的连接 |
| `3004` | 403／WS 消息 | 订阅数量超限 | 取消部分订阅或减少代码数量 |
| `3005` | 429 | 该代码短时间内请求过于频繁 | 短暂等待后重试，避免集中重复请求同一代码 |
| `3006` | 403 | 当前套餐不支持该交易产品 | 更换产品或调整套餐 |
| `3007` | 403 | K 线查询范围超过当前套餐限制 | 缩短历史范围或调整套餐 |
| `3008` | 403 | 当前套餐不支持按时间范围查询 K 线 | 改用支持的查询方式或调整套餐 |
| `3009` | 403 | 当前 API Key 无权访问该接口 | 检查 API Key 权限或调整套餐 |
| `3010` | 403 | 当前 API Key 无权访问该市场的财务与基本面数据 | 更换市场或调整套餐 |
| `3011` | 403 | 财务与基本面历史查询深度超过限制 | 缩短历史范围或调整套餐 |
| `3012` | 403 | 财务与基本面批量查询数量超过限制 | 减少单次查询的代码数量 |

### WebSocket 频道权限错误（4xxx）

当前公开 WebSocket 连接使用以下 4xxx 错误：

| 错误码 | 含义 | 处理建议 |
| ---: | --- | --- |
| `4005` | 当前 API Key 无权订阅该频道 | 检查 WebSocket 频道权限 |

非法 JSON 和未知命令当前均返回 `cmd="error"`、`code=2001`。`4001–4004` 不属于当前公开接口的返回契约，因此不应依赖这些代码编写客户端逻辑。

### 服务错误（5xxx）

| 错误码 | HTTP／场景 | 含义 | 处理建议 |
| ---: | --- | --- | --- |
| `5000` | 500 | 服务器内部错误 | 稍后重试；持续出现时联系支持 |
| `5001` | 503 | 市场数据暂不可用 | 稍后重试 |
| `5002` | 503 | 服务暂时不可用 | 稍后重试 |
| `5003` | 503 | 当前请求暂无可用的数据服务 | 稍后重试，或更换交易产品／查询条件 |
| `5004` | 503／WS 消息 | 实时行情暂不可用 | 稍后重试响应中标记为可重试的代码 |
| `5005` | 503 | 复权因子暂不可用 | 稍后重试或改用不复权 K 线 |
| `5006` | 422 | 当前周期缺少生成复权 K 线所需的基础数据 | 更换周期或改用不复权 K 线 |

`5004` 的 WebSocket 订阅响应中，`data` 可能包含以下字段：

```json
{
  "channel": "ticker",
  "symbols": ["700.HK"],
  "failed_symbols": ["AAPL.US", "BTCUSDT"],
  "retryable_symbols": ["AAPL.US"],
  "retryable": true
}
```

- `symbols`：已经订阅成功的代码，不要重复订阅
- `failed_symbols`：本次未成功的全部代码
- `retryable_symbols`：可以稍后重试的代码子集
- `retryable`：是否存在可重试代码

## 字符串错误码

| `code` | 场景 | 处理建议 |
| --- | --- | --- |
| `"2001"`、`"2002"`、`"5000"` 等 | 部分 HTTP 接口以字符串返回数字错误码 | 使用 `String(code)` 后按相同数字错误码处理 |
| `AMBIGUOUS_SYMBOL` | HTTP 请求中的代码存在多个产品类型 | 根据 `data.available_types` 传入 `type` |
| `UNAUTHORIZED` | WebSocket 建连前缺少 API Key | 在连接 URL 中传入 `api_key` |
| `INVALID_TOKEN` | WebSocket 建连前 API Key 无效或已失效 | 检查或重新生成 API Key |
| `PERMISSION_DENIED` | WebSocket 建连前权限不足 | 检查套餐和连接权限 |

## 财务与基本面接口错误

以下五位错误码适用于标准财务与基本面接口；个股新闻接口可能使用不同的错误映射，应以其实际响应为准。

| 错误码 | HTTP | 含义 | 处理建议 |
| ---: | ---: | --- | --- |
| `40001` | 400 | 请求参数错误 | 根据 `message` 检查参数格式和组合 |
| `40101` | 401 | 身份验证失败 | 检查 API Key |
| `40404` | 404 | 请求的资源不存在 | 检查代码、对象 ID 或查询条件 |
| `40405` | 404 | 查询条件下没有可用业务数据 | 更换代码、日期范围或查询条件 |
| `50001` | 500 | 接口内部错误 | 稍后重试；持续出现时联系支持 |

## 错误处理示例

### JavaScript

```javascript
const BASE_URL = 'https://api.tickdb.ai';
const API_KEY = 'YOUR_API_KEY';

async function fetchTicker(symbol) {
  const url = new URL('/v1/market/ticker', BASE_URL);
  url.searchParams.set('symbols', symbol);

  const response = await fetch(url, {
    headers: { 'X-API-Key': API_KEY }
  });

  let body;
  try {
    body = await response.json();
  } catch {
    throw new Error(`HTTP ${response.status}：响应不是 JSON`);
  }

  if (!response.ok || String(body.code) !== '0') {
    const code = String(body.code ?? 'UNKNOWN');
    const retryAfter = response.headers.get('Retry-After');
    const message = code === '3001' && retryAfter
      ? `请求频率超限，请在 ${retryAfter} 秒后重试`
      : body.message || `HTTP ${response.status}`;

    const error = new Error(message);
    error.status = response.status;
    error.code = code;
    error.retryAfter = retryAfter;
    error.details = body;
    throw error;
  }

  return body.data;
}
```

### Python

```python
import requests

BASE_URL = 'https://api.tickdb.ai'

def fetch_ticker(symbol, api_key):
    response = requests.get(
        f'{BASE_URL}/v1/market/ticker',
        params={'symbols': symbol},
        headers={'X-API-Key': api_key},
        timeout=10,
    )

    try:
        body = response.json()
    except requests.exceptions.JSONDecodeError as exc:
        raise RuntimeError(f'HTTP {response.status_code}：响应不是 JSON') from exc

    code = str(body.get('code', 'UNKNOWN'))
    if not response.ok or code != '0':
        retry_after = response.headers.get('Retry-After')
        if code == '3001' and retry_after:
            message = f'请求频率超限，请在 {retry_after} 秒后重试'
        else:
            message = body.get('message') or f'HTTP {response.status_code}'
        raise RuntimeError(f'[{code}] {message}')

    return body['data']
```
