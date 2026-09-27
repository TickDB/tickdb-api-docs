# TickDB API Documentation

TickDB API documentation repository covering real-time and historical market data, full-market quotes for A-shares, Hong Kong stocks, and US stocks, financial and fundamental data, financial calendars, and market information. **REST API and WebSocket** support forex, precious metals, indices, US stocks, HK stocks, A-shares, China futures, Hong Kong futures, and crypto.

🌐 **Website**: https://tickdb.ai  
📘 **Live Docs**: https://docs.tickdb.ai  
📝 **Changelog**: https://docs.tickdb.ai/en/release-notes  
💻 **GitHub**: https://github.com/TickDB/tickdb-api-docs

---

[简体中文](https://github.com/TickDB/tickdb-api-docs/blob/main/README.md) | [繁體中文](https://github.com/TickDB/tickdb-api-docs/blob/main/README.zh-Hant.md) | [English](https://github.com/TickDB/tickdb-api-docs/blob/main/README.en.md)

![License](https://img.shields.io/github/license/TickDB/tickdb-api-docs)
[![Website](https://img.shields.io/badge/docs.tickdb.ai-online-blue)](https://docs.tickdb.ai)
![Docs](https://img.shields.io/badge/documentation-live-brightgreen)
![API](https://img.shields.io/badge/API-REST%20%26%20WebSocket-blue)


## 🚀 Quick Start

This documentation is built with [Mintlify](https://mintlify.com) and automatically deployed through GitHub integration.

### Local Development

```bash
# Install dependencies
npm install

# Start the local development server
npm run dev
```

Visit `http://localhost:3000` to preview the documentation locally.

### Deployment

Documentation is automatically deployed to Mintlify whenever changes are pushed to the `main` branch.

- **Live Site**: https://docs.tickdb.ai
- **Deployment**: Managed via Mintlify GitHub App

## 📁 Project Structure

```
├── docs.json              # Mintlify configuration
├── openapi.base.yaml      # Canonical REST API contract
├── openapi.yaml           # Simplified Chinese REST specification (OpenAPI 3.0)
├── openapi.zh-Hant.yaml   # Traditional Chinese REST specification
├── openapi.en.yaml        # English REST specification
├── asyncapi.base.json     # Canonical WebSocket protocol contract
├── asyncapi.json          # Simplified Chinese WebSocket specification (AsyncAPI 3.0)
├── asyncapi.zh-Hant.json  # Traditional Chinese WebSocket specification
├── asyncapi.en.json       # English WebSocket specification
├── scripts/               # Localization and consistency-check scripts
├── package.json           # Node.js dependencies and scripts
├── logo.png               # TickDB logo
├── en/                    # English documentation
│   ├── index.md
│   ├── getting-started.md
│   ├── quick-start.md
│   ├── release-notes.md
│   ├── data-specification.md
│   ├── errors.md
│   ├── rest/              # REST API pages
│   └── websocket/         # WebSocket guides and channel pages
├── zh-Hans/               # Simplified Chinese documentation
└── zh-Hant/               # Traditional Chinese documentation
```

## 🌍 Multi-Language Support

The documentation is available in three languages:

- **English** (`en`)
- **Simplified Chinese** (`zh-Hans`)
- **Traditional Chinese** (`zh-Hant`)

Language switching is available from the top-right corner of the documentation site.

## 🔧 Configuration Files

### docs.json

Primary Mintlify configuration file, including:

- Theme and branding
- Multi-language navigation
- API reference integration
- AsyncAPI configuration for WebSocket playgrounds

### OpenAPI and AsyncAPI

`openapi.base.yaml` and `asyncapi.base.json` are the canonical REST and WebSocket contracts. Scripts generate the three localized specifications; pages use the matching language's specification for Try It or the WebSocket playground.

REST documentation covers general market data, stock markets, full-market quotes, financial and fundamental data, financial calendars, market information, and API key status. WebSocket documentation covers `ticker`, `depth`, `trade`, `ping`, and full-market subscriptions for A-shares, Hong Kong stocks, and US stocks.

`docs.json` manages navigation in all three languages. Each language's pages describe endpoint behavior, examples, and supported markets.

## 📚 Documentation Features

- ✅ **Multi-language support**: English, Simplified Chinese, Traditional Chinese
- ✅ **Interactive REST APIs**: Try-It testing with API key input
- ✅ **WebSocket playground**: Auto-generated from AsyncAPI
- ✅ **Multi-market examples**: Forex, precious metals, indices, US stocks, HK stocks, A-shares, China futures, Hong Kong futures, crypto
- ✅ **Full-market quotes**: One REST request retrieves a stock market's quote snapshot; one WebSocket subscription continuously receives updates for all symbols in that market
- ✅ **More data**: Company profiles, financial statements, valuations, industries, dividends, shareholder holdings, financial calendars, and market information
- ✅ **Localized API specifications**: REST Try It and the WebSocket playground use the corresponding language's specification
- ✅ **AI integration**: The homepage links to Skill, MCP, CLI, and `llms.txt` setup
- ✅ **Built-in search**: Fast, full-text documentation search
- ✅ **Responsive design**: Optimized for desktop and mobile
- ✅ **Dark mode**: Automatic light/dark theme support

## 🛠 Development Workflow

### Adding New Documentation Pages

1. Add the corresponding `.md` or `.mdx` page in all three language directories:
   - English: `en/`
   - Simplified Chinese: `zh-Hans/`
   - Traditional Chinese: `zh-Hant/`

2. Add frontmatter to the file:
   ```markdown
   ---
   title: "Page Title"
   description: "SEO-friendly page description"
   ---
   ```

3. Update navigation entries in `docs.json` for all languages

4. Preview locally with `npm run dev`

5. Push changes to GitHub to trigger automatic deployment

### Updating API Specifications

**REST API**: Update the contract in `openapi.base.yaml` and the three localized pages. Then run `npm run openapi:localize` and `npm run check:openapi`. Do not edit generated localized specifications directly.

**WebSocket API**: Update the protocol contract in `asyncapi.base.json` and the three localized pages. Then run `npm run asyncapi:localize` and `npm run check:asyncapi`. Do not edit generated localized specifications directly.

Before committing, run `npm run check` for links and `npx mintlify validate` for build validation.

## 📧 Support

- **Website**: https://tickdb.ai
- **Documentation**: https://docs.tickdb.ai
- **Email**: support@tickdb.ai
- **Telegram**: https://t.me/TickDB_Support

## 📄 License

This project is licensed under the terms specified in the LICENSE file.
