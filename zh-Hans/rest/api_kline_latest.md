---
title: 实时 K 线
description: 获取当前时间周期内正在形成并实时更新的 K 线数据。
openapi: GET /v1/market/kline/latest
---

**GET** `/v1/market/kline/latest`

## 📌 接口说明

本接口返回**当前时间周期内正在形成的 K 线数据**。

- 数据会随着成交持续更新
- 当前时间周期结束后，该 K 线将成为历史 K 线
- 若需查询已结束周期的数据，请使用 👉历史K线： `/v1/market/kline`

---

## 🧠 生命周期说明

周期开始 → 实时更新 → 周期结束 → 进入历史数据
实时 K 线表示“周期进行中”的数据状态。

---

## 🎯 适用场景

- 实时行情图表展示
- 当前价格监控
- 分时动态更新

---

## ⚠️ 不建议用于

- 历史回测
- 技术指标统计
- 固定数据存储

---

## 🔍 与历史 K 线的区别

| 项目 | 实时 K 线 | 历史 K 线 |
|------|------------|------------|
| 时间范围 | 当前周期 | 已结束周期 |
| 数据状态 | 会持续变化 | 固定不变 |
| 适用场景 | 实时展示 | 回测 / 分析 |
| 是否更新 | 会 | 不会 |

---

## 多市场示例

**外汇**：`EURUSD`、`GBPUSD`、`USDJPY`  
**贵金属**：`XAUUSD`、`XAGUSD`  
**美股**：`AAPL.US`、`TSLA.US`、`MSFT.US`  
**港股**：`700.HK`、`9988.HK`、`3690.HK`  
**加密货币**：`BTCUSDT`、`ETHUSDT`、`ADAUSDT`

---

## 支持的时间间隔

- **分钟**：`1m`、`5m`、`15m`、`30m`
- **小时**：`1h`、`4h`、`12h`
- **天**：`1d`、`1w`、`1M`

---

## 请求示例

```bash
curl -H "X-API-Key: YOUR_API_KEY" \
     "https://api.tickdb.ai/v1/market/kline/latest?symbols=AAPL.US,00700.HK&interval=3m"
```

## 响应示例

```json
{
    "code": 0,
    "message": "success",
    "data": [
        {
            "symbol": "AAPL.US",
            "interval": "3m",
            "klines": [
                {
                    "time": 1768942620000,
                    "open": "246.035",
                    "high": "246.93",
                    "low": "245.58",
                    "close": "246.7",
                    "volume": "3608863",
                    "quote_volume": "889235872.74"
                }
            ]
        },
        {
            "symbol": "00700.HK",
            "interval": "3m",
            "klines": [
                {
                    "time": 1768982400000,
                    "open": "602",
                    "high": "602",
                    "low": "601.5",
                    "close": "601.5",
                    "volume": "35900",
                    "quote_volume": "21599833.33"
                }
            ]
        }
    ]
}
```
