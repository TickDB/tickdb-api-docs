---
title: TickDB Documentation
description: Unified real-time market data API for Forex, indices, US stocks, HK stocks, A-shares, and crypto.
---

Welcome to the **TickDB Online Documentation**.

TickDB is a **developer-first unified real-time market data API** that provides access to real-time and historical market data across multiple financial markets through a single connection, allowing developers to focus on products and strategies without managing multiple data sources or protocols.

---

## What is TickDB?

TickDB is built for developers who **require reliable, low-latency, and production-grade** market data.

Through **one connection**, you can seamlessly access market data across Forex, precious metals, indices, US stocks, HK stocks, A-shares, and cryptocurrencies.

TickDB supports multiple data types, including **tick-level trades, order book depth, and candlestick (K-line) data**,  
and can be accessed via **REST APIs and WebSocket streams**, making it suitable for quantitative trading, real-time market systems, trading platforms, and data analytics.

---

## Key Features

- **Unified Access**  
  One API covering multiple markets and asset classes

- **Real-time Data**  
  WebSocket-based streaming suitable for real-time market applications

- **Multi-Market Support**  
  Forex, precious metals, indices, US stocks, HK stocks, A-shares, and crypto

- **Developer-Friendly**  
  REST APIs and WebSocket with clear interfaces, complete documentation, and practical examples

- **AI-Friendly**  
  Three tiers of AI integration — Skill, MCP, and CLI — covering everything from chat to deep automation

---

## AI Integration

TickDB offers three tiers of AI-native access, from zero-config chat to terminal automation.

### Skill — Chat-ready, Zero Config

Install via [ClawHub](https://clawhub.com) and use TickDB market data with any LLM instantly.

```bash
npx clawhub@latest install tickdb-market-data
```

- Zero signup, auto trial
- 72 core symbols free
- Works with any LLM

### MCP — Permanent Integration, One-time Setup

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

### CLI — Terminal & AI Agent Ready

Install globally to query market data from the terminal, also suitable for Agent bash-tool invocation.

```bash
npm install -g tickdb
tickdb config set-key <YOUR_KEY>
tickdb ticker BTCUSDT,XAUUSD,AAPL.US
```

- JSON / table dual output
- 16 native commands
- Bash-tool friendly, ideal for Agent workflows

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

- **Financial Services Integration**  
  Integration into existing trading platforms or financial infrastructure

---

## Documentation Sections

### Getting Started
- **Quick Start** - Get up and running in minutes
- **Changelog** - Version update history

### REST API

#### Market Data APIs
- **Available Symbols** - Query supported trading symbols
- **Ticker Snapshot** - Real-time market ticker data
- **Historical K-Line** - Historical candlestick data for completed periods
- **Real-time K-Line** - Current period K-line data being formed
- **Order Book** - Real-time order book depth data
- **Recent Trades** - Latest trade executions
- **Kline Periods** - Supported K-line period list

#### Stock Market APIs
- **Intraday Data** - Intraday time-series data for stocks
- **Stock Information** - Detailed stock information and fundamentals
- **Trading Sessions** - Market trading session information
- **Trading Calendar** - Trading days list query
- **Market Metrics** - Comprehensive market metrics data
- **Capital Flow** - Stock capital flow data

### WebSocket Docs
- **Quick Start** - WebSocket connection and subscription guide
- **Channels & Messages** - Channel subscription and message formats

### Reference
- **Data Specification** - Symbol naming and formats
- **Error Codes** - Error codes and handling

---

**Docs Version**: v1.0.1
