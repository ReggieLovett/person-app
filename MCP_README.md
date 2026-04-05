# Person MCP Server Setup Guide

This guide explains how to set up the Person CRUD MCP Server for use with Claude Desktop.

## What is MCP?

MCP (Model Context Protocol) enables Claude Desktop to interact with external tools and data sources. The Person MCP Server allows Claude to perform CRUD operations on your Person App database through natural conversation.

## Prerequisites

- Node.js 18 or later
- Claude Desktop installed (download from [claude.ai/download](https://claude.ai/download))
- A deployed Person App (or local running instance)
- Git

## Setup Steps

### Step 1: Find Your Platform-Specific Config File

The MCP server configuration is stored in Claude Desktop's config file:

**macOS:**
```bash
~/Library/Application Support/Claude/claude_desktop_config.json
```

**Windows:**
```
%APPDATA%\Claude\claude_desktop_config.json
```

**Linux:**
```bash
~/.config/Claude/claude_desktop_config.json
```

### Step 2: Clone the MCP Server Repository

```bash
git clone https://github.com/ReggieLovett/person-mcp-server.git
cd person-mcp-server
npm install
```

### Step 3: Configure Claude Desktop

1. Open the Claude config file from Step 1
2. If it doesn't exist, create it with this structure:

```json
{
  "mcpServers": {
    "person-crud": {
      "command": "node",
      "args": ["/absolute/path/to/person-mcp-server/mcp-server.js"],
      "env": {
        "PERSON_APP_URL": "https://your-deployed-app.vercel.app/api"
      }
    }
  }
}
```

**Important**: Replace:
- `/absolute/path/to/person-mcp-server` with your actual path (use `pwd` to get the full path)
- `https://your-deployed-app.vercel.app/api` with your Person App's actual URL

### Step 4: Restart Claude Desktop

Completely close Claude Desktop and reopen it.

### Step 5: Verify Connection

In Claude Desktop, ask:
```
Use get_server_status tool to verify the MCP connection
```

If successful, Claude will confirm the server is ready.

## Configuration Examples

### For Deployed Vercel App
```json
{
  "mcpServers": {
    "person-crud": {
      "command": "node",
      "args": ["/Users/username/person-mcp-server/mcp-server.js"],
      "env": {
        "PERSON_APP_URL": "https://person-app-prod.vercel.app/api"
      }
    }
  }
}
```

### For Local Development
```json
{
  "mcpServers": {
    "person-crud": {
      "command": "node",
      "args": ["/Users/username/person-mcp-server/mcp-server.js"],
      "env": {
        "PERSON_APP_URL": "http://localhost:3000/api"
      }
    }
  }
}
```

## Example Conversations with Claude

### Create a Person
**You:** "Create a new person with the name Alice Johnson, age 32, email alice@example.com, position Software Engineer, department Engineering"

**Claude:** *Uses create_person tool* → Creates the person in your database

### List All People
**You:** "Show me all the people in the database"

**Claude:** *Uses read_people tool* → Displays all people

### Update Someone's Job Title
**You:** "Update person ID 3 - change their position to Senior Software Engineer"

**Claude:** *Uses update_person tool* → Updates the record

### Delete Someone
**You:** "Delete the person with ID 5"

**Claude:** *Uses delete_person tool* → Removes the person

## Troubleshooting

### Tools Not Appearing in Claude

**Solution:**
1. Verify Node.js is installed: `node --version`
2. Verify the path in config.json is correct (use `pwd` in the mcp-server directory)
3. Completely close and reopen Claude Desktop
4. Check that PERSON_APP_URL is correct

### Connection Errors When Calling Tools

**Solution:**
1. Verify your Person App is running or deployed
2. Test the API URL manually:
   ```bash
   curl https://your-app.vercel.app/api/people
   ```
3. Check network connectivity
4. Verify environment variables in config.json

### "Command Not Found" for Node

**Solution:**
Use the absolute path to node:
```bash
which node  # Get the path
# Use that path in config.json instead of "node"
```

## Environment Variables

The MCP server uses:

- `PERSON_APP_URL`: Base URL for the Person App API (required)
  - Example: `https://person-app-prod.vercel.app/api`
  - Example: `http://localhost:3000/api`

## API Endpoints Used

The MCP server calls these Person App endpoints:

- `GET /api/people` - List all people
- `GET /api/people/:id` - Get specific person
- `POST /api/people` - Create person
- `PUT /api/people/:id` - Update person
- `DELETE /api/people/:id` - Delete person

## Security Considerations

1. **Keep your config file private** - Don't share paths to your server
2. **Use HTTPS in production** - Always use HTTPS URLs for deployed apps
3. **Validate inputs** - Claude will validate tool inputs, but the server validates again
4. **Rate limiting** - Be aware of API rate limits on your Person App

## Uninstalling

To remove the MCP server from Claude Desktop:

1. Edit the Claude config file
2. Remove the `person-crud` entry from `mcpServers`
3. Restart Claude Desktop

## Next Steps

1. **Test the MCP Demo**: Visit `/mcp-demo` page on your Person App to see it in action
2. **Read the MCP Setup Guide**: Visit `/mcp-setup` page for visual step-by-step instructions
3. **Explore the GitHub Repository**: Visit `/github` page for the source code

## Support

For issues or questions:
- Check the [Person App GitHub Repository](https://github.com/ReggieLovett/person-app)
- Check the [Person MCP Server GitHub Repository](https://github.com/ReggieLovett/person-mcp-server)
- Visit the MCP Setup page in your deployed Person App

---

Happy chatting with Claude!
