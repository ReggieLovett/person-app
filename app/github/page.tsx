import Link from "next/link";

export default function GitHub() {
  // Use environment variable or default
  const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL || "https://github.com/YOUR_USERNAME/person-app";

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
          <h1 className="text-4xl font-bold mb-8">GitHub Repository</h1>

          <section className="mb-8">
            <p className="text-gray-700 mb-6">
              This Person App is open source and available on GitHub. You can
              access the complete source code, contribute, report issues, or
              fork the repository using the button below.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
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
                View on GitHub
              </a>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Repository Contents</h2>
            <p className="text-gray-700 mb-4">
              The GitHub repository includes:
            </p>
            <ul className="space-y-2 text-gray-700">
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
                <span>TypeScript configurations</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-3">•</span>
                <span>Tailwind CSS styling</span>
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Contributing</h2>
            <p className="text-gray-700 mb-4">
              To contribute to this project:
            </p>
            <ol className="space-y-3 text-gray-700 list-decimal list-inside">
              <li>Fork the repository on GitHub</li>
              <li>Clone your forked repository locally</li>
              <li>Create a feature branch for your changes</li>
              <li>Make your improvements</li>
              <li>Push to your fork and submit a pull request</li>
            </ol>
          </section>

          <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
            <h3 className="text-lg font-semibold mb-2 text-blue-900">
              Repository URL
            </h3>
            <code className="text-blue-700 font-mono break-all">{githubUrl}</code>
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
              .
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
