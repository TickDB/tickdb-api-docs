---
title: 最近成交
description: 獲取交易品種的最近成交執行記錄。
openapi: GET /v1/market/trades
---

## 注意事項
- 本接口不支持美股和A股市場
- side：買入（buy）/ 賣出（sell）
- 時間戳單位為毫秒（UTC）

## 支持的市場

**港股**、**加密貨幣**

示例：
- 港股：700.HK、9988.HK、3690.HK
- 加密貨幣：BTCUSDT、ETHUSDT、ADAUSDT

## 請求參數

| 參數名 | 是否必須 | 描述 |
|--------|----------|------|
| symbol | 是 | 交易產品代碼 |
| limit | 否 | 返回成交記錄數，默認50，最大200 |

## 返回字段說明

| 字段 | 說明 |
|------|------|
| id | 成交ID |
| price | 成交價格 |
| quantity | 成交數量 |
| side | 成交方向（買入/賣出） |
| timestamp | 成交時間（毫秒時間戳，UTC） |
