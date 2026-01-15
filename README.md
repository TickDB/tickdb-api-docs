# TickDB API Documentation

Official API documentation for TickDB - Real-time market data API.

## 🚀 Quick Start

This documentation is built with [Mintlify](https://mintlify.com) and automatically deployed via GitHub integration.

### Local Development

```bash
# Install dependencies
npm install

# Start local development server
npm run dev
```

Visit `http://localhost:3000` to preview the documentation locally.

### Deployment

Documentation is automatically deployed to Mintlify when changes are pushed to the `main` branch.

- **Live Site**: https://docs.tickdb.ai
- **Mintlify Dashboard**: Connected via GitHub App

## 📁 Project Structure

```
├── docs.json              # Mintlify configuration
├── asyncapi.json          # WebSocket API specification (AsyncAPI 3.0)
├── openapi.yaml           # REST API OpenAPI spec
├── package.json           # Dependencies and scripts
├── vercel.json            # Vercel deployment configuration
├── logo.png               # TickDB logo
├── .gitignore             # Git ignore rules
├── index.md               # Homepage
├── quick-start.md         # Quick start guide
├── getting-started.md     # Getting started guide
├── authentication.md      # Authentication guide
├── data-specification.md  # Data formats
├── errors.md              # Error codes reference
├── rest/                  # REST API documentation
│   ├── api_symbols.md
│   ├── api_ticker.md
│   ├── api_kline.md
│   ├── api_depth.md
│   └── api_trades.md
└── websocket/             # WebSocket API documentation
    ├── websocket_overview.md
    ├── websocket_quickstart.md
    ├── websocket_subscribe.md
    └── websocket_message_schema.md
```

## 🔧 Configuration Files

### docs.json
Main Mintlify configuration file containing:
- Theme and branding settings
- Navigation structure
- API integration settings
- AsyncAPI integration for WebSocket playground

### asyncapi.json
WebSocket API specification (AsyncAPI 3.0) defining:
- WebSocket connection endpoints
- Channel definitions (ticker, depth, trade)
- Message schemas and examples
- Authentication requirements

**Note**: Mintlify automatically generates an interactive WebSocket playground from this file under "WebSocket Docs → WebSocket Playground".

### openapi.yaml
REST API specification (OpenAPI 3.0) defining:
- All REST endpoints
- Request/response schemas
- Authentication methods
- Try-It interactive examples

## 📚 Documentation Features

- ✅ **Interactive REST API Testing**: Try-It functionality with API key input
- ✅ **WebSocket Playground**: Auto-generated from AsyncAPI spec
- ✅ **Multi-Market Examples**: Crypto, US Stocks, HK Stocks, Forex, Metals, Indices
- ✅ **OpenAPI Integration**: Automatic API reference generation
- ✅ **AsyncAPI Integration**: Interactive WebSocket testing
- ✅ **Search Functionality**: Built-in documentation search
- ✅ **Mobile Responsive**: Optimized for all devices
- ✅ **Dark Mode Support**: Automatic theme switching

## 🛠 Development Workflow

### Adding New Documentation Pages

1. Create a new `.md` file in the appropriate directory:
   - REST API docs → `rest/`
   - WebSocket docs → `websocket/`
   - General docs → root directory

2. Add frontmatter to the file:
   ```markdown
   ---
   title: "Page Title"
   description: "Page description for SEO"
   ---
   ```

3. Update `docs.json` navigation to include the new page

4. Test locally with `npm run dev`

5. Push to GitHub - auto-deploys to Mintlify

### Updating API Specifications

**REST APIs**:
- Edit `openapi.yaml`
- Mintlify automatically updates the Try-It interface
- Changes reflect immediately after deployment

**WebSocket APIs**:
- Edit `asyncapi.json`
- Mintlify regenerates the WebSocket playground
- Interactive testing UI updates automatically

### Navigation Structure

The documentation is organized in a single "Documentation" tab with the following groups:

- **Introduction**: Overview and welcome
- **Getting Started**: Quick start and authentication
- **REST API**: All REST endpoints with Try-It functionality
- **WebSocket Docs**: WebSocket guides + auto-generated playground
- **Reference**: Data specifications and error codes

## 📧 Support

- **Email**: support@tickdb.ai
- **Dashboard**: https://tickdb.ai
- **Mintlify Docs**: https://mintlify.com/docs
