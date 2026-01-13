---
title: 快速開始
description: 在幾分鐘內開始使用 TickDB。
---

本指南幫助您在 10 分鐘內開始使用 TickDB。

## 步驟 1：創建 API 密鑰
在 https://tickdb.ai 註冊並從控制台創建 API 密鑰。

## 步驟 2：基礎 URL
```
https://api.tickdb.ai
```

## 步驟 3：第一個請求

```bash
curl -H "X-API-Key: YOUR_API_KEY" \
     "https://api.tickdb.ai/v1/market/ticker?symbols=BTCUSDT"
```
