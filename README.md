# DoktorABC_Redesign

A redesign project for DoktorABC with integrated analytics and CRM capabilities.

## Overview

This project contains the redesigned implementation of DoktorABC with MCP (Model Context Protocol) integrations for Mixpanel analytics and HubSpot CRM operations.

## Status

- ✅ **Git Repository**: Initialized and connected to GitHub
- ✅ **SSH Authentication**: Configured and working
- ✅ **MCP Servers**: Mixpanel and HubSpot integrations active
- ✅ **Project Structure**: Basic framework established

## Tech Stack

- **Version Control**: Git + GitHub (private repository)
- **Analytics**: Mixpanel (via MCP)
- **CRM**: HubSpot (via MCP)
- **Documentation**: Notion (via MCP)
- **Runtime**: Node.js 25.2.1

## Getting Started

### Prerequisites

- Node.js (version 25+)
- Git
- Cursor IDE (for MCP server support)

### Installation

```bash
# Clone the repository
git clone git@github.com:mon-amit/DoktorABC_Redesign.git
cd DoktorABC_Redesign

# Install dependencies
npm install
```

### MCP Server Configuration

The project includes MCP server integrations that are automatically configured in Cursor:

```json
{
  "mcpServers": {
    "Notion": {
      "url": "https://mcp.notion.com/mcp"
    },
    "Mixpanel": {
      "command": "/opt/homebrew/bin/npx",
      "args": ["-y", "mixpanel-mcp-server", "--token", "[CONFIGURED]"]
    },
    "HubSpot": {
      "command": "mcp-hubspot",
      "env": {"HUBSPOT_ACCESS_TOKEN": "[CONFIGURED]"}
    }
  }
}
```

### Development

```bash
npm run dev
```

### Testing

```bash
npm test
```

## MCP Integrations

### Mixpanel Analytics
- **Purpose**: Track user events, page views, and analytics
- **Tools Available**: Event tracking, user profiles, signup tracking
- **Status**: ✅ Active and configured

### HubSpot CRM
- **Purpose**: Customer relationship management and contact operations
- **Tools Available**: Contact creation, company management, engagement tracking
- **Status**: ✅ Active and configured

### Notion Documentation
- **Purpose**: Enhanced Markdown and documentation support
- **Tools Available**: Document formatting, content management
- **Status**: ✅ Active and configured

## Project Structure

```
├── src/                 # Source code
├── tests/              # Test files
├── docs/               # Documentation
├── RCA_MCP_Configuration.md  # Root cause analysis of setup issues
├── .gitignore         # Git ignore rules
├── package.json       # Dependencies and scripts
└── README.md          # This file (project documentation)
```

## Recent Updates

### MCP Configuration Resolution
- **Issue**: Multiple authentication and configuration failures
- **Root Cause**: Invalid command arguments and PATH isolation
- **Resolution**: Updated to use correct flags and full command paths
- **Details**: See `RCA_MCP_Configuration.md` for complete analysis

### Infrastructure Setup
- **SSH Keys**: Generated and configured for GitHub authentication
- **Git Repository**: Initialized with proper commit history
- **Remote Origin**: Connected to GitHub private repository
- **Branch Structure**: Main branch established

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Troubleshooting

### MCP Server Issues
- **Error**: "spawn npx ENOENT" → Use full path `/opt/homebrew/bin/npx`
- **Error**: "unknown option '--project-id'" → Remove flag, only `--token` supported
- **Error**: OAuth failures → Use environment variables for authentication

### Git/SSH Issues
- **Permission denied**: Ensure SSH key is added to GitHub
- **Repository not found**: Verify repository exists and remote URL is correct

## Security Notes

- All API tokens and credentials are properly configured
- SSH keys use Ed25519 encryption with passphrase protection
- Repository is private and access-controlled

## License

This project is private and proprietary.

---

**Last Updated**: December 14, 2025
**MCP Status**: All servers active and functional
**Repository**: https://github.com/mon-amit/DoktorABC_Redesign
