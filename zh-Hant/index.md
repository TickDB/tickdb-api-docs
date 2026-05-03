---
title: TickDB 文檔
description: 統一即時行情數據 API，支援外匯、指數、美股、港股、A 股與加密貨幣。
---

歡迎使用 **TickDB 在線文檔**。

TickDB 是一個**面向開發者的統一即時行情數據 API**，透過單一連線即可存取多個金融市場的即時與歷史行情數據，幫助你避免管理多個資料來源與協議的複雜性，專注於產品與策略本身。

---

## 什麼是 TickDB？

TickDB 專為需要**可靠、低延遲、可長期依賴**行情數據的開發者所構建。

透過 **一次接入（one connection）**，即可無縫存取外匯、貴金屬、指數、美股、港股、A 股與加密貨幣等市場的行情資料。

TickDB 支援多種行情形式，包括 **tick 級成交數據、盤口深度（Order Book）、K 線（Candlestick）**，  
可透過 **REST API 與 WebSocket** 接入，適用於量化交易、即時行情系統、交易平台與資料分析等場景。

---

## 核心特性

- **統一接入**  
  一套 API 覆蓋多個市場與資產類別

- **即時數據**  
  基於 WebSocket 的串流推送，適用於即時行情場景

- **多市場支援**  
  外匯、貴金屬、指數、美股、港股、A 股、加密貨幣

- **開發者友好**  
  REST API + WebSocket，文件完整、範例清晰

- **AI 友好**  
  提供 Skill、MCP、CLI 三檔 AI 接入方式，從對話到深度整合全場景覆蓋

---

## AI 整合

TickDB 提供三檔 AI 原生接入方式，從零配置對話到終端自動化全覆蓋。

### Skill — 對話即用，零配置

透過 [ClawHub](https://clawhub.com) 一鍵安裝，任意 LLM 即可調用 TickDB 行情數據。

```bash
npx clawhub@latest install tickdb-market-data
```

- 零註冊自動試用
- 72 核心品種免費
- 任意 LLM 通用

### MCP — 永久整合，一次配置

透過 Hosted MCP Server 接入，相容 Claude Code、Cursor、Kiro、Zed 等所有 MCP 客戶端。

配置示例（以 Claude 為例，路徑：`~/.claude/settings.json`）：

```json
{
  "mcpServers": {
    "tickdb": {
      "type": "http",
      "url": "https://mcp.tickdb.ai/",
      "headers": {
        "X-TickDB-Key": "<YOUR_API_KEY>"
      }
    }
  }
}
```

- Hosted mcp.tickdb.ai，無需自部署
- HTTPS + Header 鑑權
- 相容所有 MCP 協議客戶端
- 提供 13 個工具，與 REST API 端點一一對應

### CLI — 終端 & AI Agent 就緒

全域安裝後即可在終端直接查詢行情，也適合 Agent 透過 bash-tool 調用。

```bash
npm install -g tickdb
tickdb config set-key <YOUR_KEY>
tickdb ticker BTCUSDT,XAUUSD,AAPL.US
```

- JSON / 表格雙輸出
- 16 個原生命令
- Bash-tool 友好，適合 Agent 調用

詳細資訊請訪問 [TickDB AI 接入](https://tickdb.ai/ai-tools)。

---

## 典型使用場景

- **量化交易**  
  作為策略與算法系統的即時行情數據來源

- **行情看板**  
  即時價格顯示、資產與投資組合監控

- **交易應用**  
  建構類似 TradingView 的行情介面與圖表系統

- **數據分析與回測**  
  歷史行情分析、策略研究與回測

- **金融服務整合**  
  整合至既有交易平台或金融基礎設施

---

## 文檔章節導覽

### 入門指南
- **快速開始** - 幾分鐘內開始使用
- **更新日誌** - 版本更新記錄

### REST API

#### 通用行情接口
- **可用交易品種** - 查詢支持的交易品種
- **行情快照** - 即時行情快照
- **歷史 K 線** - 已結束週期的歷史 K 線數據
- **實時 K 線** - 當前週期正在形成的 K 線數據
- **訂單簿** - 即時訂單簿深度數據
- **最近成交** - 最新成交執行記錄
- **K 線週期** - 支持的 K 線週期列表

#### 股票市場接口
- **當日分時** - 股票當日分時數據
- **股票信息** - 股票詳細信息與基本面數據
- **交易時段** - 市場交易時段信息
- **交易日曆** - 交易日列表查詢
- **市場指標** - 綜合市場指標數據
- **資金流向** - 股票資金流向數據

### WebSocket 文檔
- **快速開始** - WebSocket 連線與訂閱入門
- **頻道與消息** - 頻道訂閱與消息格式

### 參考
- **數據規範** - 交易品種命名與格式
- **錯誤碼說明** - 錯誤碼與處理方式

---

**文檔版本**: v1.0.1
