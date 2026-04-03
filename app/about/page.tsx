import Link from "next/link";

export default function About() {
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
          <h1 className="text-4xl font-bold mb-8">About Person App</h1>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Overview</h2>
            <p className="text-gray-700 mb-4">
              Person App is a full-stack web application demonstrating modern
              CRUD (Create, Read, Update, Delete) operations with a responsive,
              professional user interface. This application showcases complete
              database integration and backend API development.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Architecture</h2>
            <p className="text-gray-700 mb-4">
              The application follows a modern serverless architecture with clear
              separation between frontend and backend:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>
                <strong>Frontend:</strong> React with Next.js App Router for
                server and client-side rendering
              </li>
              <li>
                <strong>Backend:</strong> Next.js API routes providing RESTful
                endpoints
              </li>
              <li>
                <strong>ORM:</strong> Prisma for type-safe database access and
                migrations
              </li>
              <li>
                <strong>Database:</strong> SQLite for development, PostgreSQL
                for production
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Technology Stack</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-blue-600">
                  Frontend
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• React 19.2.4</li>
                  <li>• Next.js 16.2.2</li>
                  <li>• TypeScript</li>
                  <li>• Tailwind CSS 4</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3 text-blue-600">
                  Backend & Database
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Prisma ORM</li>
                  <li>• SQLite / PostgreSQL</li>
                  <li>• TypeScript</li>
                  <li>• Next.js API Routes</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Features</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-600 mr-3">✓</span>
                <span>
                  <strong>Create:</strong> Add new person records with multiple
                  fields (name, email, phone, age, city, bio)
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-3">✓</span>
                <span>
                  <strong>Read:</strong> View all person records in a responsive
                  table with pagination
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-3">✓</span>
                <span>
                  <strong>Update:</strong> Edit existing person records with full
                  form validation
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-3">✓</span>
                <span>
                  <strong>Delete:</strong> Remove person records with confirmation
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-3">✓</span>
                <span>
                  <strong>Responsive Design:</strong> Works seamlessly on desktop,
                  tablet, and mobile devices
                </span>
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Development Setup</h2>
            <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm">
              <p className="mb-2"># Install dependencies</p>
              <p className="text-gray-600 mb-4">npm install</p>

              <p className="mb-2"># Run database migrations</p>
              <p className="text-gray-600 mb-4">
                npx prisma migrate dev --name init
              </p>

              <p className="mb-2"># Start development server</p>
              <p className="text-gray-600">npm run dev</p>
            </div>
            <p className="text-gray-700 mt-4">
              The application will be available at http://localhost:3000
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">API Endpoints</h2>
            <div className="space-y-3">
              <div className="bg-blue-50 p-4 rounded">
                <p className="font-semibold text-blue-900">GET /api/people</p>
                <p className="text-gray-700">Retrieve all person records</p>
              </div>
              <div className="bg-green-50 p-4 rounded">
                <p className="font-semibold text-green-900">POST /api/people</p>
                <p className="text-gray-700">Create a new person record</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded">
                <p className="font-semibold text-yellow-900">PUT /api/people/[id]</p>
                <p className="text-gray-700">Update an existing person record</p>
              </div>
              <div className="bg-red-50 p-4 rounded">
                <p className="font-semibold text-red-900">DELETE /api/people/[id]</p>
                <p className="text-gray-700">Delete a person record</p>
              </div>
            </div>
          </section>

          <section className="pt-8 border-t">
            <p className="text-gray-600">
              Visit the{" "}
              <Link href="/github" className="text-blue-600 hover:text-blue-800">
                GitHub page
              </Link>{" "}
              to view the source code, or check the{" "}
              <Link href="/database" className="text-blue-600 hover:text-blue-800">
                Database page
              </Link>{" "}
              for schema details.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
