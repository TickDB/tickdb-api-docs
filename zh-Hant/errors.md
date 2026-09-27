---
title: 錯誤碼說明
description: 接口返回的錯誤碼含義及處理建議。
---

## 錯誤響應約定

- 成功響應的 `code` 為數字 `0`
- 錯誤響應的 `code` 可能是整數或字符串；客戶端應先使用 `String(code)` 歸一化後再比較
- 不要根據 `message` 文本編寫判斷邏輯；`message` 用於說明錯誤，可能隨具體場景變化
- HTTP 狀態碼表示請求層面的結果，`code` 表示具體業務原因，客戶端應同時檢查兩者

### HTTP API

HTTP 錯誤響應至少包含 `code` 和 `message`，部分接口還會返回 `error` 或 `data`：

```json
{
  "code": "2001",
  "message": "symbol parameter is required",
  "error": "2001"
}
```

財務與基本面接口通常返回以下結構：

```json
{
  "code": 40001,
  "message": "granularity must be daily or monthly",
  "data": null
}
```

### WebSocket 建連失敗

在 WebSocket 升級完成前發生的鑒權錯誤是普通 HTTP 錯誤響應，此時連接尚未建立，客戶端不會收到 WebSocket 消息。

| HTTP 狀態 | `code` | 含義 | 處理建議 |
| ---: | --- | --- | --- |
| 401 | `UNAUTHORIZED` | 未提供 API Key | 在連接 URL 中傳入 `api_key` |
| 401 | `INVALID_TOKEN` | API Key 無效或已失效 | 檢查或重新生成 API Key |
| 403 | `PERMISSION_DENIED` | 當前 API Key 無權建立連接 | 檢查套餐權限或聯繫支持 |

### WebSocket 建連後錯誤

連接建立後的訂閱或消息錯誤通過 WebSocket 消息返回，`cmd` 表示觸發錯誤的命令：

```json
{
  "cmd": "error",
  "code": 2001,
  "message": "Invalid message format",
  "data": null
}
```

## 錯誤碼速查表

### 認證錯誤（1xxx）

| 錯誤碼 | HTTP／場景 | 含義 | 處理建議 |
| ---: | --- | --- | --- |
| `1001` | 401 | API Key 無效 | 檢查 API Key 是否正確 |
| `1002` | 401 | 未提供 API Key | 在請求頭中添加 `X-API-Key` |
| `1004` | 403 | 權限不足 | 檢查當前套餐權限 |
| `1005` | 401 | API Key 已過期 | 續費或升級套餐後重試 |

### 參數錯誤（2xxx）

| 錯誤碼 | HTTP／場景 | 含義 | 處理建議 |
| ---: | --- | --- | --- |
| `2001` | 400／WS 消息 | 請求參數錯誤 | 根據 `message` 檢查缺失參數、格式或參數組合 |
| `2002` | 404／WS 消息 | 交易品種不存在或不受支持 | 使用 `/v1/symbols/available` 查詢可用代碼 |
| `2003` | 400／WS 消息 | 時間範圍無效；在部分 WebSocket 訂閱中也表示代碼存在歧義 | 根據 `message` 和 `data` 修正時間，或補充 `type` |
| `2004` | 400 | 請求數量超過接口限制 | 根據對應接口說明減少請求數量 |
| `2005` | 400 | 交易產品代碼格式不受支持 | 使用數據規範中公開的代碼格式 |
| `2006` | 400／WS 消息 | 代碼後綴與請求的 `type` 衝突 | 修正代碼或 `type`，確保二者一致 |
| `2008` | 406 | 全量行情請求未啟用壓縮 | 按接口文檔啟用 HTTP 響應壓縮 |

HTTP 請求中的代碼歧義返回字符串 `AMBIGUOUS_SYMBOL`；WebSocket 訂閱中的代碼歧義當前返回數字 `2003`。兩者都應根據響應中的 `available_types` 補充 `type`。

### 訪問限制與配額錯誤（3xxx）

| 錯誤碼 | HTTP／場景 | 含義 | 處理建議 |
| ---: | --- | --- | --- |
| `3001` | 429 | 請求頻率超限 | 根據 `Retry-After` 等待後重試 |
| `3002` | 403 | 配額已用盡 | 等待配額重置或升級套餐 |
| `3003` | 429 | WebSocket 連接數超限 | 關閉不再使用的連接 |
| `3004` | 403／WS 消息 | 訂閱數量超限 | 取消部分訂閱或減少代碼數量 |
| `3005` | 429 | 該代碼短時間內請求過於頻繁 | 短暫等待後重試，避免集中重複請求同一代碼 |
| `3006` | 403 | 當前套餐不支持該交易產品 | 更換產品或調整套餐 |
| `3007` | 403 | K 線查詢範圍超過當前套餐限制 | 縮短歷史範圍或調整套餐 |
| `3008` | 403 | 當前套餐不支持按時間範圍查詢 K 線 | 改用支持的查詢方式或調整套餐 |
| `3009` | 403 | 當前 API Key 無權訪問該接口 | 檢查 API Key 權限或調整套餐 |
| `3010` | 403 | 當前 API Key 無權訪問該市場的財務與基本面數據 | 更換市場或調整套餐 |
| `3011` | 403 | 財務與基本面歷史查詢深度超過限制 | 縮短歷史範圍或調整套餐 |
| `3012` | 403 | 財務與基本面批量查詢數量超過限制 | 減少單次查詢的代碼數量 |

### WebSocket 頻道權限錯誤（4xxx）

當前公開 WebSocket 連接使用以下 4xxx 錯誤：

| 錯誤碼 | 含義 | 處理建議 |
| ---: | --- | --- |
| `4005` | 當前 API Key 無權訂閱該頻道 | 檢查 WebSocket 頻道權限 |

非法 JSON 和未知命令當前均返回 `cmd="error"`、`code=2001`。`4001–4004` 不屬於當前公開接口的返回契約，因此不應依賴這些代碼編寫客戶端邏輯。

### 服務錯誤（5xxx）

| 錯誤碼 | HTTP／場景 | 含義 | 處理建議 |
| ---: | --- | --- | --- |
| `5000` | 500 | 服務器內部錯誤 | 稍後重試；持續出現時聯繫支持 |
| `5001` | 503 | 市場數據暫不可用 | 稍後重試 |
| `5002` | 503 | 服務暫時不可用 | 稍後重試 |
| `5003` | 503 | 當前請求暫無可用的數據服務 | 稍後重試，或更換交易產品／查詢條件 |
| `5004` | 503／WS 消息 | 實時行情暫不可用 | 稍後重試響應中標記為可重試的代碼 |
| `5005` | 503 | 復權因子暫不可用 | 稍後重試或改用未復權 K 線 |
| `5006` | 422 | 當前週期缺少生成復權 K 線所需的基礎數據 | 更換週期或改用未復權 K 線 |

`5004` 的 WebSocket 訂閱響應中，`data` 可能包含以下字段：

```json
{
  "channel": "ticker",
  "symbols": ["700.HK"],
  "failed_symbols": ["AAPL.US", "BTCUSDT"],
  "retryable_symbols": ["AAPL.US"],
  "retryable": true
}
```

- `symbols`：已經訂閱成功的代碼，不要重複訂閱
- `failed_symbols`：本次未成功的全部代碼
- `retryable_symbols`：可以稍後重試的代碼子集
- `retryable`：是否存在可重試代碼

## 字符串錯誤碼

| `code` | 場景 | 處理建議 |
| --- | --- | --- |
| `"2001"`、`"2002"`、`"5000"` 等 | 部分 HTTP 接口以字符串返回數字錯誤碼 | 使用 `String(code)` 後按相同數字錯誤碼處理 |
| `AMBIGUOUS_SYMBOL` | HTTP 請求中的代碼存在多個產品類型 | 根據 `data.available_types` 傳入 `type` |
| `UNAUTHORIZED` | WebSocket 建連前缺少 API Key | 在連接 URL 中傳入 `api_key` |
| `INVALID_TOKEN` | WebSocket 建連前 API Key 無效或已失效 | 檢查或重新生成 API Key |
| `PERMISSION_DENIED` | WebSocket 建連前權限不足 | 檢查套餐和連接權限 |

## 財務與基本面接口錯誤

以下五位錯誤碼適用於標準財務與基本面接口；個股新聞接口可能使用不同的錯誤映射，應以其實際響應為準。

| 錯誤碼 | HTTP | 含義 | 處理建議 |
| ---: | ---: | --- | --- |
| `40001` | 400 | 請求參數錯誤 | 根據 `message` 檢查參數格式和組合 |
| `40101` | 401 | 身份驗證失敗 | 檢查 API Key |
| `40404` | 404 | 請求的資源不存在 | 檢查代碼、對象 ID 或查詢條件 |
| `40405` | 404 | 查詢條件下沒有可用業務數據 | 更換代碼、日期範圍或查詢條件 |
| `50001` | 500 | 接口內部錯誤 | 稍後重試；持續出現時聯繫支持 |

## 錯誤處理示例

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
    throw new Error(`HTTP ${response.status}：響應不是 JSON`);
  }

  if (!response.ok || String(body.code) !== '0') {
    const code = String(body.code ?? 'UNKNOWN');
    const retryAfter = response.headers.get('Retry-After');
    const message = code === '3001' && retryAfter
      ? `請求頻率超限，請在 ${retryAfter} 秒後重試`
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
        raise RuntimeError(f'HTTP {response.status_code}：響應不是 JSON') from exc

    code = str(body.get('code', 'UNKNOWN'))
    if not response.ok or code != '0':
        retry_after = response.headers.get('Retry-After')
        if code == '3001' and retry_after:
            message = f'請求頻率超限，請在 {retry_after} 秒後重試'
        else:
            message = body.get('message') or f'HTTP {response.status_code}'
        raise RuntimeError(f'[{code}] {message}')

    return body['data']
```
