# Project Setup Guide

## Overview
This guide covers the complete setup process for the DoktorABC_Redesign project, including prerequisites, installation, and initial configuration.

## Prerequisites

### System Requirements
- **macOS**: 12.0 or later
- **Node.js**: Version 25.2.1 or later
- **Git**: Version 2.30 or later
- **Cursor IDE**: Latest version with MCP support

### Required Accounts
- **GitHub Account**: For repository access
- **Mixpanel Account**: For analytics integration
- **HubSpot Account**: For CRM integration
- **Notion Account**: For documentation

## Installation Steps

### 1. Clone Repository
```bash
git clone git@github.com:mon-amit/DoktorABC_Redesign.git
cd "DoktorABC_Redesign"
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Verify Installation
```bash
node --version
npm --version
git --version
```

## Configuration

### Git Configuration
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### SSH Key Setup
1. Generate SSH key (if not already done):
   ```bash
   ssh-keygen -t ed25519 -C "your.email@example.com"
   ```

2. Add to SSH agent:
   ```bash
   ssh-add ~/.ssh/id_ed25519
   ```

3. Add public key to GitHub Settings → SSH and GPG keys

### MCP Server Configuration
The MCP servers are pre-configured in Cursor. Restart Cursor after initial setup to load the servers.

## Verification

### Test Git Connection
```bash
ssh -T git@github.com
# Should show: "Hi mon-amit! You've successfully authenticated..."
```

### Test MCP Servers
After Cursor restart, check that these MCP servers are available:
- Mixpanel Analytics
- HubSpot CRM
- Notion Documentation

## Troubleshooting

### Common Issues
- **Permission denied (publickey)**: SSH key not added to GitHub
- **Repository not found**: Check repository URL and permissions
- **MCP servers not loading**: Restart Cursor completely

### Getting Help
1. Check this knowledge base for solutions
2. Review the RCA document for known issues
3. Contact the development team

## Next Steps

After setup completion:
1. Review the project architecture
2. Familiarize yourself with MCP integrations
3. Read the contribution guidelines
4. Start development work

---

**Author**: Amit Yogev
**Last Updated**: December 14, 2025
**Version**: 1.0
**Tags**: #setup #installation #configuration
