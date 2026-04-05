import Link from "next/link";

export default function MCPSetup() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-4 md:p-8">
        <Link
          href="/"
          className="inline-block mb-8 text-blue-600 hover:text-blue-800"
        >
          ← Back to Home
        </Link>

        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <h1 className="text-4xl font-bold mb-8">MCP Server Setup Guide</h1>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Overview</h2>
            <p className="text-gray-700 mb-4">
              The Person App provides a Model Context Protocol (MCP) server that
              enables Claude Desktop to perform CRUD operations on Person
              records. This guide walks you through setting up the MCP server.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-blue-600">
              Step 1: Install Claude Desktop
            </h2>
            <p className="text-gray-700 mb-4">
              If you haven't already, download and install Claude Desktop from:{" "}
              <a
                href="https://claude.ai/download"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                https://claude.ai/download
              </a>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-blue-600">
              Step 2: Locate Claude Desktop Configuration File
            </h2>
            <p className="text-gray-700 mb-4">
              The MCP configuration is stored in Claude Desktop's config file:
            </p>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm mb-4">
              <p className="mb-2">
                <strong>macOS:</strong>
              </p>
              <pre className="overflow-x-auto">
                ~/Library/Application Support/Claude/claude_desktop_config.json
              </pre>
              <p className="mt-4 mb-2">
                <strong>Windows:</strong>
              </p>
              <pre className="overflow-x-auto">
                %APPDATA%\Claude\claude_desktop_config.json
              </pre>
              <p className="mt-4 mb-2">
                <strong>Linux:</strong>
              </p>
              <pre className="overflow-x-auto">
                ~/.config/Claude/claude_desktop_config.json
              </pre>
            </div>
            <p className="text-gray-700 mb-4">
              If the file doesn't exist, create it with the structure below.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-blue-600">
              Step 3: Clone and Setup the MCP Server Repository
            </h2>
            <p className="text-gray-700 mb-4">
              Clone the Person MCP server repository:
            </p>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm mb-4 overflow-x-auto">
              <pre>
git clone https://github.com/ReggieLovett/person-mcp-server.git
cd person-mcp-server
npm install</pre>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-blue-600">
              Step 4: Update Claude Desktop Config
            </h2>
            <p className="text-gray-700 mb-4">
              Edit your <code className="bg-gray-100 px-2 py-1 rounded">claude_desktop_config.json</code> file and add the Person MCP server configuration:
            </p>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm mb-4 overflow-x-auto">
              <pre>{`{
  "mcpServers": {
    "person-crud": {
      "command": "node",
      "args": [
        "/path/to/person-mcp-server/mcp-server.js"
      ],
      "env": {
        "PERSON_APP_URL": "https://your-deployed-app.vercel.app/api"
      }
    }
  }
}`}</pre>
            </div>
            <p className="text-gray-700 mb-4">
              Replace <code className="bg-gray-100 px-2 py-1 rounded">/path/to/person-mcp-server</code> with the actual path where you cloned the repository.
            </p>
            <p className="text-gray-700 mb-4">
              Replace <code className="bg-gray-100 px-2 py-1 rounded">https://your-deployed-app.vercel.app/api</code> with your actual deployed Person App URL.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-blue-600">
              Step 5: Restart Claude Desktop
            </h2>
            <p className="text-gray-700 mb-4">
              Completely close Claude Desktop and reopen it. The MCP server should now be connected.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-blue-600">
              Step 6: Test the Connection
            </h2>
            <p className="text-gray-700 mb-4">
              In a Claude conversation, try asking:
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded mb-4">
              <p className="font-mono text-sm">
                "Use the get_server_status tool to check if the MCP server is
                connected"
              </p>
            </div>
            <p className="text-gray-700 mb-4">
              If successful, Claude will show that the MCP server is ready and
              list the available tools.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Available Tools</h2>
            <p className="text-gray-700 mb-4">
              Once connected, you can use these tools in Claude:
            </p>
            <div className="space-y-4">
              <div className="border-l-4 border-green-600 pl-4">
                <h3 className="font-semibold text-lg">create_person</h3>
                <p className="text-gray-700">
                  Create a new person record with name, age, email, and optional
                  fields like phone, position, department, and bio.
                </p>
              </div>
              <div className="border-l-4 border-blue-600 pl-4">
                <h3 className="font-semibold text-lg">read_people</h3>
                <p className="text-gray-700">
                  Fetch all people or get details about a specific person by ID.
                </p>
              </div>
              <div className="border-l-4 border-yellow-600 pl-4">
                <h3 className="font-semibold text-lg">update_person</h3>
                <p className="text-gray-700">
                  Update a person's information by providing their ID and the
                  fields to update.
                </p>
              </div>
              <div className="border-l-4 border-red-600 pl-4">
                <h3 className="font-semibold text-lg">delete_person</h3>
                <p className="text-gray-700">
                  Delete a person record by their ID.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Example Conversations</h2>
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Create a Person</h3>
                <p className="text-gray-700 text-sm mb-2">
                  "Create a new person with the name John Smith, age 35, email john@example.com, position Senior Developer,
                  and department Engineering"
                </p>
                <p className="text-gray-600 text-sm italic">
                  Claude will use the create_person tool automatically.
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">List All People</h3>
                <p className="text-gray-700 text-sm mb-2">
                  "Show me all the people in the database"
                </p>
                <p className="text-gray-600 text-sm italic">
                  Claude will use the read_people tool without an ID.
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Update a Person</h3>
                <p className="text-gray-700 text-sm mb-2">
                  "Update person with ID 5: change their position to Lead Architect and department to Architecture"
                </p>
                <p className="text-gray-600 text-sm italic">
                  Claude will use the update_person tool with the specified fields.
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Delete a Person</h3>
                <p className="text-gray-700 text-sm mb-2">
                  "Delete the person with ID 3"
                </p>
                <p className="text-gray-600 text-sm italic">
                  Claude will use the delete_person tool.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Troubleshooting</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-red-600 mb-2">
                  Tools not appearing in Claude
                </h3>
                <p className="text-gray-700 mb-2">
                  Make sure you have:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Restarted Claude Desktop completely</li>
                  <li>Correct path to the MCP server in config.json</li>
                  <li>Node.js installed and in your PATH</li>
                  <li>Correct PERSON_APP_URL environment variable</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-red-600 mb-2">
                  Connection errors when calling tools
                </h3>
                <p className="text-gray-700 mb-2">
                  Verify that:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>
                    Your Person App is deployed and accessible at the URL in
                    PERSON_APP_URL
                  </li>
                  <li>
                    The Person App API is responding to requests at /api/people
                  </li>
                  <li>Network connectivity allows Claude to reach the API</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8 bg-blue-50 border-l-4 border-blue-600 p-4 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Next Steps</h2>
            <p className="text-gray-700 mb-4">
              After setting up the MCP server:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>
                Test the connection using the examples above in Claude Desktop
              </li>
              <li>
                Try the <Link href="/mcp-demo" className="text-blue-600 hover:underline">
                  MCP Demo
                </Link>{" "}
                page to see live examples
              </li>
              <li>Explore how MCP enables AI agents to interact with databases</li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
