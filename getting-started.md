---
title: Getting Started
description: Get up and running with TickDB in minutes.
---
# Getting Started

This guide helps you get started with TickDB in under 10 minutes.

## Step 1: Create an API Key
Sign up at https://tickdb.ai and create an API key from the dashboard.

## Step 2: Base URL
```
https://api.tickdb.ai
```

## Step 3: First Request

```bash
curl -H "X-API-Key: YOUR_API_KEY" \
     "https://api.tickdb.ai/v1/market/ticker?symbols=BTCUSDT"
```
