# TickDB API Documentation

Official TickDB API documentation repository. One unified connection for real-time market data across forex, precious metals, indices, US stocks, HK stocks, A-shares, and crypto, delivered via REST and WebSocket.

🌐 **Website**: https://tickdb.ai  
📘 **Live Docs**: https://docs.tickdb.ai  
📝 **Changelog**: https://docs.tickdb.ai/en/release-notes  
💻 **GitHub**: https://github.com/TickDB  

---

[简体中文](README.md) | [繁體中文](README.zh-Hant.md) | [English](README.en.md)

![License](https://img.shields.io/github/license/TickDB/tickdb-unified-realtime-marketdata-api)
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
├── asyncapi.json          # WebSocket API specification (AsyncAPI 3.0)
├── openapi.yaml           # REST API specification (OpenAPI 3.0)
├── package.json           # Node.js dependencies and scripts
├── logo.png               # TickDB logo
├── en/                    # English documentation
│   ├── index.md
│   ├── getting-started.md
│   ├── quick-start.md
│   ├── release-notes.md
│   ├── data-specification.md
│   ├── errors.md
│   ├── rest/
│   └── websocket/
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

### asyncapi.json

WebSocket API specification (AsyncAPI 3.0), defining:

- Connection endpoints
- Channel definitions (e.g., ticker, depth, trades)
- Message schemas and examples
- Authentication requirements

> **Note**: Mintlify automatically generates an interactive WebSocket playground from this file.

### openapi.yaml

REST API specification (OpenAPI 3.0), defining:

- All REST endpoints
- Request and response schemas
- Authentication methods
- Interactive Try-It examples

## 📚 Documentation Features

- ✅ **Multi-language support**: English, Simplified Chinese, Traditional Chinese
- ✅ **Interactive REST APIs**: Try-It testing with API key input
- ✅ **WebSocket playground**: Auto-generated from AsyncAPI
- ✅ **Multi-market examples**: Forex, precious metals, indices, US stocks, HK stocks, A-shares, crypto
- ✅ **OpenAPI integration**: Automatic REST API reference generation
- ✅ **AsyncAPI integration**: Interactive WebSocket testing
- ✅ **Built-in search**: Fast, full-text documentation search
- ✅ **Responsive design**: Optimized for desktop and mobile
- ✅ **Dark mode**: Automatic light/dark theme support

## 🛠 Development Workflow

### Adding New Documentation Pages

1. Create a new `.md` file in the appropriate language directory:
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

**REST APIs**:
- Modify `openapi.yaml`
- Mintlify updates the Try-It interface automatically
- Changes are reflected after deployment

**WebSocket APIs**:
- Modify `asyncapi.json`
- Mintlify regenerates the WebSocket playground
- Interactive UI updates automatically

## 📧 Support

- **Website**: https://tickdb.ai
- **Documentation**: https://docs.tickdb.ai
- **Email**: support@tickdb.ai
- **Telegram**: https://t.me/TickDB_Support

## 📄 License

This project is licensed under the terms specified in the LICENSE file.
