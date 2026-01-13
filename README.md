# TickDB API 文檔

[繁體中文](README.md) | [简体中文](README.zh-Hans.md) | [English](README.en.md)

![License](https://img.shields.io/github/license/TickDB/tickdb-unified-realtime-marketdata-api)
[![Website](https://img.shields.io/badge/docs.tickdb.ai-online-blue)](https://docs.tickdb.ai)
![Docs](https://img.shields.io/badge/documentation-live-brightgreen)
![API](https://img.shields.io/badge/API-REST%20%26%20WebSocket-blue)

> TickDB 官方 API 文檔。透過 REST 與 WebSocket 提供外匯、貴金屬、指數、美股、港股、A 股及加密貨幣的統一即時行情數據。

## 🚀 快速開始

本文檔使用 [Mintlify](https://mintlify.com) 建構，並透過 GitHub 整合自動部署。

### 本地開發

```bash
# 安裝依賴
npm install

# 啟動本地開發服務器
npm run dev
```

訪問 `http://localhost:3000` 在本地預覽文檔。

### 部署

當變更推送至 `main` 分支時，文檔將自動部署至 Mintlify。

- **在線站點**：https://docs.tickdb.ai
- **部署方式**：透過 Mintlify GitHub App 管理

## 📁 專案結構

```
├── docs.json              # Mintlify 配置檔
├── asyncapi.json          # WebSocket API 規範（AsyncAPI 3.0）
├── openapi.yaml           # REST API 規範（OpenAPI 3.0）
├── package.json           # Node.js 相依套件與腳本
├── logo.png               # TickDB 標誌
├── en/                    # 英文文件
│   ├── index.md
│   ├── quick-start.md
│   ├── authentication.md
│   ├── data-specification.md
│   ├── errors.md
│   ├── rest/
│   └── websocket/
├── zh-Hans/               # 簡體中文文件
│   ├── index.md
│   ├── quick-start.md
│   ├── authentication.md
│   ├── data-specification.md
│   ├── errors.md
│   ├── rest/
│   └── websocket/
└── zh-Hant/               # 繁體中文文件
    ├── index.md
    ├── quick-start.md
    ├── authentication.md
    ├── data-specification.md
    ├── errors.md
    ├── rest/
    └── websocket/
```

## 🌍 多語言支援

文件提供以下語言版本：

- **繁體中文** (`zh-Hant`)
- **简体中文** (`zh-Hans`)
- **English** (`en`)

可於文件站點右上角切換語言。

## 🔧 配置檔案說明

### docs.json

Mintlify 的主要配置檔，包含：

- 主題與品牌設定
- 多語言導覽結構
- API 參考文件整合
- WebSocket Playground 的 AsyncAPI 設定

### asyncapi.json

WebSocket API 規範（AsyncAPI 3.0），用於定義：

- WebSocket 連線端點
- 頻道定義（如 ticker、depth、trades）
- 訊息結構與範例
- 身分驗證需求

> **說明**：Mintlify 會依此檔案自動產生互動式 WebSocket Playground。

### openapi.yaml

REST API 規範（OpenAPI 3.0），用於定義：

- 所有 REST 端點
- 請求與回應結構
- 身分驗證方式
- Try-It 互動式範例

## 📚 文件特色

- ✅ **多語言支援**：繁體中文、簡體中文、英文
- ✅ **互動式 REST API**：支援 API Key 輸入的 Try-It 測試
- ✅ **WebSocket Playground**：由 AsyncAPI 規範自動產生
- ✅ **多市場範例**：外匯、貴金屬、指數、美股、港股、A 股、加密貨幣
- ✅ **OpenAPI 整合**：自動產生 REST API 參考文件
- ✅ **AsyncAPI 整合**：互動式 WebSocket 測試
- ✅ **內建搜尋**：快速全文搜尋
- ✅ **響應式設計**：適用桌機與行動裝置
- ✅ **深色模式**：自動明暗主題切換

## 🛠 開發工作流程

### 新增文件頁面

1. 於對應語言目錄中新增 `.md` 檔案：
   - 繁體中文：`zh-Hant/`
   - 简体中文：`zh-Hans/`
   - English：`en/`

2. 在檔案頂部加入 frontmatter：

   ```markdown
   ---
   title: "頁面標題"
   description: "用於 SEO 的頁面描述"
   ---
   ```

3. 更新 `docs.json` 中各語言的導覽設定

4. 使用 `npm run dev` 進行本地預覽

5. 推送至 GitHub，自動觸發部署

### 更新 API 規範

**REST APIs**：
- 編輯 `openapi.yaml`
- Mintlify 會自動更新 Try-It 介面
- 部署完成後立即生效

**WebSocket APIs**：
- 編輯 `asyncapi.json`
- Mintlify 重新產生 WebSocket Playground
- 互動式 UI 會自動更新

## 📧 支援

- **官網**：https://tickdb.ai
- **文件**：https://docs.tickdb.ai
- **電子郵件**：support@tickdb.ai
- **Telegram**：https://t.me/TickDB_Support

## 📄 授權條款

本專案依據 LICENSE 檔案中所述條款進行授權。
