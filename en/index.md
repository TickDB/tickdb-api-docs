---
title: TickDB Documentation
description: Unified real-time market data API for Forex, indices, US stocks, HK stocks, A-shares, futures, and crypto.
---

Welcome to the **TickDB Online Documentation**.

TickDB is a **developer-first unified real-time market data API** that provides access to real-time and historical market data across multiple financial markets through a single connection, allowing developers to focus on products and strategies without managing multiple data sources or protocols.

---

## What is TickDB?

TickDB is built for developers who **require reliable, low-latency, and production-grade** market data.

Through **one connection**, you can seamlessly access market data across Forex, precious metals, indices, US stocks, HK stocks, A-shares, futures, and cryptocurrencies.

TickDB supports multiple data types, including **tick-level trades, order book depth, candlestick data, and full-market data**, together with **financial and fundamental data, financial calendars, and market information**. It is accessible through **REST APIs and WebSocket streams** for quantitative trading, real-time market systems, fundamental research, trading platforms, and data analytics.

---

## Key Features

- **Unified Access**  
  One API covering multiple markets and asset classes

- **Real-time Data**  
  WebSocket-based streaming suitable for real-time market applications

- **Full-Market Data**
  Covers A-shares, Hong Kong stocks, and US stocks. A single REST request retrieves a complete snapshot of a selected market, while one WebSocket subscription continuously delivers real-time updates for every symbol in that market

- **Multi-Market Support**  
  Forex, precious metals, indices, US stocks, HK stocks, A-shares, futures, and crypto

- **Financials and Fundamentals**
  Company profiles, financial statements, valuation, industry, dividends, and shareholder holdings

- **Financial Calendar**
  Earnings, dividends, splits, IPOs, and other events in dedicated categories

- **Market Information**
  Market status, trading sessions, trading calendar, and stock news

- **Developer-Friendly**  
  REST APIs and WebSocket with clear interfaces, complete documentation, and practical examples

- **AI-Friendly**  
  Structured real-time market, financial and fundamental, financial calendar, and market information inputs for company analysis, market monitoring, event tracking, and research assistance, with Skill, MCP, and CLI integration options

---

## AI Integration

TickDB offers three tiers of AI-native access, from zero-config chat to terminal automation.

### Skill

**Chat-ready, Zero Config**

Install via [ClawHub](https://clawhub.com) and use TickDB market data with any LLM instantly.

```bash
npx clawhub@latest install tickdb-market-data
```

- Zero signup, auto trial
- 72 core symbols free
- Works with any LLM

### MCP

**Permanent Integration, One-time Setup**

Connect via Hosted MCP Server, compatible with Claude Code, Cursor, Kiro, Zed, and all MCP clients.

Configuration example (Claude, path: `~/.claude/settings.json`):

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

- Hosted at mcp.tickdb.ai, no self-deployment needed
- HTTPS + Header authentication
- Compatible with all MCP protocol clients
- 13 tools available, mapping 1:1 to REST API endpoints

### CLI

**Terminal & AI Agent Ready**

Install globally to query market data from the terminal, also suitable for Agent bash-tool invocation.

```bash
npm install -g tickdb
tickdb config set-key YOUR_API_KEY
tickdb ticker BTCUSDT,XAUUSD,AAPL.US
```

- JSON / table dual output
- 16 native commands
- Bash-tool friendly, ideal for Agent workflows

### llms.txt

**Documentation Context for AI**

To help an AI assistant understand the TickDB documentation, provide it with the following URL:

```text
https://docs.tickdb.ai/llms.txt
```

For the complete version containing all page content, use:

```text
https://docs.tickdb.ai/llms-full.txt
```

For more details, visit [TickDB AI Access](https://tickdb.ai/ai-tools).

---

## Typical Use Cases

- **Quantitative Trading**  
  Real-time market data source for algorithmic and strategy systems

- **Market Dashboards**  
  Live price displays, asset tracking, and portfolio monitoring

- **Trading Applications**  
  Building TradingView-like market interfaces and charting systems

- **Data Analytics & Backtesting**  
  Historical market analysis, research, and strategy backtesting

- **Fundamental Research**
  Analyze companies using financial statements, valuation, industry data, and shareholder holdings

- **Market Monitoring**
  Track market changes and important events using full-market data, news, and the financial calendar

- **Financial Services Integration**  
  Integration into existing trading platforms or financial infrastructure

---

## Getting Started
- **Quick Start** - Get up and running in minutes
- **Changelog** - Version update history

## REST API

### Market Data APIs
- **Available Symbols** - Query supported trading symbols
- **Ticker Snapshot** - Real-time market ticker data
- **Candlestick Data** - Query candlesticks by interval and time range
- **Latest Candlesticks** - Get the latest candlestick for multiple symbols
- **Order Book** - Real-time order book depth data
- **Tick-by-Tick Trades** - Individual trade executions

### Stock Market APIs

#### Full-Market Data
Complete A-share, Hong Kong stock, and US stock market snapshots

#### Stock Quotes and Metrics
Stock information, intraday data, comprehensive metrics, and capital flow

#### Company Overview
Company profiles, executives and directors, and revenue breakdowns

#### Financial Statements
Recent, annual, and TTM financial data and field dictionary

#### Valuation and Industries
Latest and historical valuation, peer comparison, and industry data

#### Dividends and Corporate Actions
Dividends, dividend TTM, share buybacks, and corporate actions

#### Shareholders and Institutional Holdings
Shareholder structure, shareholder holdings, and funds holding a stock

#### Financial Calendar
Earnings Calendar, Dividend Calendar, Stock Split Calendar, IPO Calendar, and Other Calendar Events

#### Market Information
Market status, trading sessions, trading calendar, and stock news

## WebSocket Docs

### Best Practices
WebSocket connections, compression, heartbeats, and reconnection

### Playground
View subscription steps and message formats directly on seven channel pages: A-share, Hong Kong stock, and US stock full-market quotes, plus ticker, depth, trade, and ping.

## Reference
- **Data Specification** - Symbol naming and formats
- **Error Codes** - Error codes and handling

---

**Docs Version**: v1.0.3
