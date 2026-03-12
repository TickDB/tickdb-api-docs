---
title: 可用交易品種
description: 查詢 TickDB 支持的所有可用交易品種。
openapi: GET /v1/symbols/available
---

## 支持的市場

- **FOREX** - 外匯市場
- **METALS** - 貴金屬
- **INDICES** - 市場指數
- **US** - 美國股票市場
- **HK** - 香港證券交易所
- **CN** - A股市場
- **CRYPTO** - 加密貨幣交易對

## 注意事項
- 市場代碼不區分大小寫
- 交易品種命名規則請參閱數據規範文檔
- US、HK、CN 三個股票市場實際上所有已上市的股票產品代碼均受支持
