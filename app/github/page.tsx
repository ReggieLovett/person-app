import Link from "next/link";

export default function GitHub() {
  const githubUrl = "https://github.com/ReggieLovett/person-app";
  const mcpServerUrl = "https://github.com/ReggieLovett/person-mcp-server";

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
          <h1 className="text-4xl font-bold mb-8">GitHub Repositories</h1>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">📱 Person App</h2>
            <p className="text-gray-700 mb-6">
              The main Person App is open source and available on GitHub. You can
              access the complete source code, contribute, report issues, or
              fork the repository.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-gray-900 text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition font-semibold"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 . .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                View Person App on GitHub
              </a>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 mb-6">
              <h3 className="text-lg font-semibold mb-2 text-blue-900">
                Person App Repository URL
              </h3>
              <code className="text-blue-700 font-mono break-all">{githubUrl}</code>
            </div>

            <h3 className="text-lg font-semibold mb-3">Repository Contents</h3>
            <ul className="space-y-2 text-gray-700 mb-6">
              <li className="flex items-start">
                <span className="text-blue-600 mr-3">•</span>
                <span>Complete source code for the Person App</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-3">•</span>
                <span>Prisma schema and database migrations</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-3">•</span>
                <span>Next.js API routes with CRUD operations</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-3">•</span>
                <span>React components for the user interface</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-3">•</span>
                <span>MCP documentation and setup guides</span>
              </li>
            </ul>
          </section>

          <section className="mb-8 bg-purple-50 p-6 rounded-lg border-l-4 border-purple-600">
            <h2 className="text-2xl font-semibold mb-4 text-purple-900">⚙️ Person MCP Server</h2>
            <p className="text-gray-700 mb-6">
              The Person MCP Server is a separate repository that enables Claude Desktop
              to perform CRUD operations through the Model Context Protocol. This is the
              server component that handles AI-driven database management.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <a
                href={mcpServerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition font-semibold"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 . .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                View MCP Server on GitHub
              </a>
            </div>

            <div className="bg-purple-100 p-6 rounded-lg border border-purple-200 mb-6">
              <h3 className="text-lg font-semibold mb-2 text-purple-900">
                MCP Server Repository URL
              </h3>
              <code className="text-purple-700 font-mono break-all">{mcpServerUrl}</code>
            </div>

            <h3 className="text-lg font-semibold mb-3">MCP Server Features</h3>
            <ul className="space-y-2 text-gray-700 mb-6">
              <li className="flex items-start">
                <span className="text-purple-600 mr-3">•</span>
                <span><strong>create_person</strong> - Create new person records via Claude</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-3">•</span>
                <span><strong>read_people</strong> - Fetch person data with natural language queries</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-3">•</span>
                <span><strong>update_person</strong> - Modify records through Claude conversations</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-3">•</span>
                <span><strong>delete_person</strong> - Remove records with Claude prompts</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-3">•</span>
                <span>MCP server implementation with stdio communication</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-3">•</span>
                <span>Integration guide for Claude Desktop configuration</span>
              </li>
            </ul>

            <div className="bg-blue-50 p-4 rounded">
              <p className="text-gray-700 text-sm">
                <strong>Want to set up the MCP server?</strong> Visit the{" "}
                <Link href="/mcp-setup" className="text-blue-600 hover:underline">
                  MCP Setup Guide
                </Link>{" "}
                for step-by-step instructions.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Contributing</h2>
            <p className="text-gray-700 mb-4">
              To contribute to either project:
            </p>
            <ol className="space-y-3 text-gray-700 list-decimal list-inside">
              <li>Fork the repository on GitHub</li>
              <li>Clone your forked repository locally</li>
              <li>Create a feature branch for your changes</li>
              <li>Make your improvements</li>
              <li>Push to your fork and submit a pull request</li>
            </ol>
          </section>

          <section className="pt-8 border-t mt-8">
            <p className="text-gray-600">
              For more information about the app architecture, visit the{" "}
              <Link href="/about" className="text-blue-600 hover:text-blue-800">
                About page
              </Link>
              . To learn about the database schema, check the{" "}
              <Link href="/database" className="text-blue-600 hover:text-blue-800">
                Database page
              </Link>
              . To see MCP in action, try the{" "}
              <Link href="/mcp-demo" className="text-blue-600 hover:text-blue-800">
                MCP Demo
              </Link>
              .
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
