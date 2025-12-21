# shadcn MCP Server Setup

## Overview

The shadcn MCP server enables AI assistants to browse, search, and install components from shadcn/ui registries directly through natural language interactions.

## Configuration

### MCP Server Configuration

The shadcn MCP server is configured in `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "shadcn": {
      "command": "npx",
      "args": ["shadcn@latest", "mcp"],
      "timeout": 30000,
      "maxRetries": 3,
      "retryDelay": 1000
    }
  }
}
```

### Components Configuration

The `components.json` file configures shadcn component settings:

- **Style**: Default shadcn/ui styling
- **TypeScript**: Disabled (JavaScript project)
- **React Server Components**: Disabled
- **Tailwind CSS**: Configured with CSS variables
- **Registries**: Empty (uses default shadcn/ui registry)

## Usage

After restarting Cursor, you can use natural language to interact with shadcn components:

### Browse & Search
- "Show me all available components in the shadcn registry"
- "Find me a login form from the shadcn registry"

### Install Components
- "Add the button component to my project"
- "Create a login form using shadcn components"
- "Install the card, dialog, and form components"

### Work with Multiple Registries
- "Show me components from acme registry"
- "Install @internal/auth-form"
- "Build me a landing page using hero, features and testimonials sections"

## Retry Logic

The configuration includes retry logic to prevent infinite retries and hanging:

- **Timeout**: 30 seconds per request
- **Max Retries**: 3 attempts
- **Retry Delay**: 1 second between retries

This prevents the MCP server from hanging indefinitely on network issues or timeouts.

## Troubleshooting

### MCP Not Responding

1. **Restart Cursor**: Restart Cursor after configuration changes
2. **Check Configuration**: Verify `.cursor/mcp.json` exists and is valid JSON
3. **Verify Installation**: Ensure `shadcn` CLI is accessible via `npx`
4. **Check Network**: Confirm you can access the shadcn registry

### Installation Failures

1. **Check Project Setup**: Ensure `components.json` exists in project root
2. **Verify Paths**: Confirm target directories exist
3. **Check Permissions**: Ensure write permissions for component directories
4. **Review Dependencies**: Check that required dependencies are installed

### Registry Access Issues

1. **Check components.json**: Verify registry URLs are correct
2. **Test Authentication**: Ensure environment variables are set for private registries
3. **Verify Registry**: Confirm the registry is online and accessible
4. **Check Namespace**: Ensure namespace syntax is correct (`@namespace/component`)

## Next Steps

1. **Restart Cursor** to load the MCP server configuration
2. **Enable MCP Server** in Cursor Settings (if required)
3. **Test Installation** by asking to install a component
4. **Configure Registries** in `components.json` if using private registries

## References

- [shadcn MCP Documentation](https://ui.shadcn.com/docs/mcp)
- [shadcn Registry Documentation](https://ui.shadcn.com/docs/registry)
- [Cursor MCP Documentation](https://cursor.sh/docs/mcp)
