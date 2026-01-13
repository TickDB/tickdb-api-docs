# TickDB API Documentation

Official API documentation for TickDB - Real-time market data API.

## 🚀 Quick Start

This documentation is built with [Mintlify](https://mintlify.com) and automatically deployed from GitHub.

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
- **Mintlify Dashboard**: Connected via GitHub integration

## 📁 Project Structure

```
├── docs.json          # Mintlify configuration
├── asyncapi.json      # WebSocket API specification  
├── package.json       # Dependencies and scripts
└── docs/              # Documentation content
    ├── index.md       # Homepage
    ├── getting-started.md
    ├── authentication.md
    ├── rest/          # REST API documentation
    ├── websocket/     # WebSocket API documentation
    └── assets/        # Images and static files
```

## 🔧 Configuration

- **Main config**: `docs.json` (Mintlify configuration)
- **API spec**: `docs/openapi.yaml` (REST API specification)
- **WebSocket spec**: `asyncapi.json` (WebSocket API specification)

## 📚 Documentation Features

- ✅ Interactive API testing (Try-It functionality)
- ✅ WebSocket playground
- ✅ Multi-market examples (Crypto, Stocks, Forex, etc.)
- ✅ OpenAPI integration
- ✅ Search functionality
- ✅ Mobile responsive

## 🛠 Development

### Adding New Pages

1. Create a new `.md` file in the appropriate directory
2. Add frontmatter with title and description
3. Update `docs.json` navigation if needed
4. Push to GitHub - auto-deploys to Mintlify

### Updating API Specifications

- **REST APIs**: Edit `docs/openapi.yaml`
- **WebSocket APIs**: Edit `asyncapi.json`

Changes are automatically reflected in the interactive documentation.

## 📞 Support

- **Email**: support@tickdb.ai
- **Dashboard**: https://tickdb.ai