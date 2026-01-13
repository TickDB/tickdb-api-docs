---
title: 快速开始
description: 在几分钟内开始使用 TickDB。
---

本指南帮助您在 10 分钟内开始使用 TickDB。

## 步骤 1：创建 API 密钥
在 https://tickdb.ai 注册并从控制台创建 API 密钥。

## 步骤 2：基础 URL
```
https://api.tickdb.ai
```

## 步骤 3：第一个请求

```bash
curl -H "X-API-Key: YOUR_API_KEY" \
     "https://api.tickdb.ai/v1/market/ticker?symbols=BTCUSDT"
```
