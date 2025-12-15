# MCP Integration Overview

## What is MCP?

MCP (Model Context Protocol) is a protocol that enables AI assistants to interact with external tools and services through standardized interfaces. It allows seamless integration between AI models and various business tools.

## Our MCP Architecture

### Integrated Services

#### 1. Mixpanel Analytics
- **Purpose**: Track user events, page views, and analytics data
- **MCP Server**: `mixpanel-mcp-server` (npm package)
- **Authentication**: API token via command line
- **Tools Available**:
  - `mixpanel_track_event` - Track custom events
  - `mixpanel_track_pageview` - Track page views
  - `mixpanel_track_signup` - Track user signups
  - `mixpanel_set_user_profile` - Update user profiles

#### 2. HubSpot CRM
- **Purpose**: Customer relationship management and contact operations
- **MCP Server**: `@chinchillaenterprises/mcp-hubspot`
- **Authentication**: Access token via environment variable
- **Tools Available**:
  - Contact creation and management
  - Company creation and management
  - Deal tracking and updates
  - Engagement logging

#### 3. Confluence Wiki
- **Purpose**: Enterprise documentation and knowledge base management
- **MCP Server**: `@aashari/mcp-server-atlassian-confluence`
- **Authentication**: API token via environment variables
- **Tools Available**:
  - Page creation, reading, and updating
  - Space management
  - Content search and filtering
  - Blog post management
  - Label and metadata operations

#### 4. Notion Documentation
- **Purpose**: Enhanced documentation and knowledge management
- **MCP Server**: Official Notion MCP server
- **Authentication**: API integration (currently none configured)
- **Tools Available**:
  - Document creation and editing
  - Database operations
  - Enhanced Markdown formatting

## Configuration Details

### Mixpanel Configuration
```json
{
  "command": "/opt/homebrew/bin/npx",
  "args": ["-y", "mixpanel-mcp-server", "--token", "YOUR_TOKEN"]
}
```

### HubSpot Configuration
```json
{
  "command": "mcp-hubspot",
  "args": [],
  "env": {
    "HUBSPOT_ACCESS_TOKEN": "YOUR_TOKEN"
  }
}
```

### Confluence Configuration
```json
{
  "command": "npx",
  "args": ["-y", "@aashari/mcp-server-atlassian-confluence"],
  "env": {
    "ATLASSIAN_SITE_NAME": "doktorabc",
    "ATLASSIAN_USER_EMAIL": "nir.l@helfy.co",
    "ATLASSIAN_API_TOKEN": "YOUR_API_TOKEN"
  }
}
```

### Notion Configuration
```json
{
  "url": "https://mcp.notion.com/mcp",
  "headers": {}
}
```

## Usage Patterns

### Analytics Tracking
```javascript
// Track user events
mixpanel_track_event({
  event_name: "user_action",
  properties: { feature: "new_design" }
});

// Track page views
mixpanel_track_pageview({
  page_name: "/dashboard",
  user_id: "12345"
});
```

### CRM Operations
```javascript
// Create new contact
hubspot_create_contact({
  email: "user@example.com",
  firstname: "John",
  lastname: "Doe",
  company: "Example Corp"
});
```

### Wiki Operations
```javascript
// Get spaces
conf_get({
  path: "/wiki/api/v2/spaces",
  queryParams: { limit: "10" },
  jq: "results[*].{id: id, key: key, name: name}"
});

// Create a new page
conf_post({
  path: "/wiki/api/v2/pages",
  body: {
    spaceId: "140606812",
    title: "Project Documentation",
    body: {
      representation: "storage",
      value: "<p>This is the project documentation.</p>"
    }
  }
});
```

### Documentation
```markdown
<!-- Enhanced Notion-style formatting -->
# Meeting Notes

**Date**: December 14, 2025
**Attendees**: Development Team

## Discussion Points
- MCP integration progress
- Project timeline updates
- Next steps for Q1
```

## Best Practices

### Error Handling
- Always check for authentication errors
- Implement retry logic for transient failures
- Log MCP operations for debugging

### Performance Considerations
- Batch operations when possible
- Cache frequently accessed data
- Monitor API rate limits

### Security
- Never expose API tokens in logs
- Use environment variables for secrets
- Regularly rotate access tokens

## Troubleshooting

### Common Issues
- **Authentication failures**: Check token validity and permissions
- **Connection timeouts**: Verify network connectivity and server status
- **Rate limiting**: Implement backoff strategies

### Debugging Steps
1. Check MCP server logs in Cursor
2. Verify token permissions in respective services
3. Test API endpoints directly
4. Review network connectivity

## Future Enhancements

### Planned Integrations
- Slack for team communications
- Jira for project management
- Google Workspace for document collaboration
- Additional analytics platforms

### Architecture Improvements
- Centralized authentication management
- Improved error handling and recovery
- Enhanced monitoring and alerting
- API rate limit optimization

---

**Author**: Amit Yogev
**Last Updated**: December 14, 2025
**Version**: 1.0
**Tags**: #mcp #integration #architecture
