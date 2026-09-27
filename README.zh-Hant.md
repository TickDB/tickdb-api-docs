# TickDB API 文檔

TickDB API 文件倉庫，涵蓋即時與歷史行情、A 股／港股／美股全量行情、財務與基本面、財經日曆及市場資訊。支援 **REST API 與 WebSocket**，涵蓋外匯、貴金屬、指數、美股、港股、A 股、中國期貨、香港期貨和加密貨幣。

🌐 **官網**：https://tickdb.ai  
📘 **線上文件**：https://docs.tickdb.ai  
📝 **更新日誌**：https://docs.tickdb.ai/zh-Hant/release-notes  
💻 **GitHub**：https://github.com/TickDB/tickdb-api-docs

---

[简体中文](https://github.com/TickDB/tickdb-api-docs/blob/main/README.md) | [繁體中文](https://github.com/TickDB/tickdb-api-docs/blob/main/README.zh-Hant.md) | [English](https://github.com/TickDB/tickdb-api-docs/blob/main/README.en.md)

![License](https://img.shields.io/github/license/TickDB/tickdb-api-docs)
[![Website](https://img.shields.io/badge/docs.tickdb.ai-online-blue)](https://docs.tickdb.ai)
![Docs](https://img.shields.io/badge/documentation-live-brightgreen)
![API](https://img.shields.io/badge/API-REST%20%26%20WebSocket-blue)


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
├── openapi.base.yaml      # REST 介面契約來源檔
├── openapi.yaml           # 簡體中文 REST 規範（OpenAPI 3.0）
├── openapi.zh-Hant.yaml   # 繁體中文 REST 規範
├── openapi.en.yaml        # 英文 REST 規範
├── asyncapi.base.json     # WebSocket 協定契約來源檔
├── asyncapi.json          # 簡體中文 WebSocket 規範（AsyncAPI 3.0）
├── asyncapi.zh-Hant.json  # 繁體中文 WebSocket 規範
├── asyncapi.en.json       # 英文 WebSocket 規範
├── scripts/               # 規範本地化與一致性檢查腳本
├── package.json           # Node.js 相依套件與腳本
├── logo.png               # TickDB 標誌
├── zh-Hant/               # 繁體中文文件
│   ├── index.md
│   ├── getting-started.md
│   ├── quick-start.md
│   ├── release-notes.md
│   ├── data-specification.md
│   ├── errors.md
│   ├── rest/              # REST 介面頁面
│   └── websocket/         # WebSocket 指南與頻道頁面
├── zh-Hans/               # 簡體中文文件
└── en/                    # 英文文件
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

### OpenAPI 與 AsyncAPI

`openapi.base.yaml` 和 `asyncapi.base.json` 分別是 REST 與 WebSocket 的介面契約來源檔。三種語言的規範檔案由腳本產生；頁面透過對應語言的規範提供 Try It 或 WebSocket Playground。

REST 文件包括通用行情、股票市場、全量行情、財務與基本面、財經日曆、市場資訊及 API Key 查詢。WebSocket 文件包括 `ticker`、`depth`、`trade`、`ping` 和 A 股、港股、美股全量行情訂閱。

`docs.json` 管理三語導覽；介面的說明、範例及支援市場以對應語言的頁面為準。

## 📚 文件特色

- ✅ **多語言支援**：繁體中文、簡體中文、英文
- ✅ **互動式 REST API**：支援 API Key 輸入的 Try-It 測試
- ✅ **WebSocket Playground**：由 AsyncAPI 規範自動產生
- ✅ **多市場範例**：外匯、貴金屬、指數、美股、港股、A 股、中國期貨、香港期貨、加密貨幣
- ✅ **全量行情**：單次 REST 請求取得指定股票市場的行情快照；一次 WebSocket 訂閱持續接收該市場全部標的的即時更新
- ✅ **更多數據**：公司資料、財務報表、估值、行業、分紅、股東持倉、財經日曆和市場資訊
- ✅ **三語 API 規範**：REST Try It 與 WebSocket Playground 使用對應語言的規範檔案
- ✅ **AI 接入**：首頁提供 Skill、MCP、CLI 與 `llms.txt` 的使用入口
- ✅ **內建搜尋**：快速全文搜尋
- ✅ **響應式設計**：適用桌機與行動裝置
- ✅ **深色模式**：自動明暗主題切換

## 🛠 開發工作流程

### 新增文件頁面

1. 在三個語言目錄新增對應的 `.md` 或 `.mdx` 頁面：
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

**REST API**：修改 `openapi.base.yaml` 的介面契約及三語頁面，再執行 `npm run openapi:localize` 和 `npm run check:openapi`。不要直接修改產生的三語規範檔案。

**WebSocket API**：修改 `asyncapi.base.json` 的協定契約及三語頁面，再執行 `npm run asyncapi:localize` 和 `npm run check:asyncapi`。不要直接修改產生的三語規範檔案。

提交前可執行 `npm run check` 檢查文件連結，並使用 `npx mintlify validate` 驗證建置。

## 📧 支援

- **官網**：https://tickdb.ai
- **文件**：https://docs.tickdb.ai
- **電子郵件**：support@tickdb.ai
- **Telegram**：https://t.me/TickDB_Support

## 📄 授權條款

本專案依據 LICENSE 檔案中所述條款進行授權。
