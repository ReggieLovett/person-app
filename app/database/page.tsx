import Link from "next/link";

export default function Database() {
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
          <h1 className="text-4xl font-bold mb-8">Database Schema</h1>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Overview</h2>
            <p className="text-gray-700 mb-4">
              This application uses Prisma as the Object-Relational Mapping (ORM)
              layer to interact with the database. Prisma provides type-safe
              database access, automatic migrations, and a powerful data modeling
              language.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Person Model</h2>
            <p className="text-gray-700 mb-4">
              The core data model in this application is the Person model,
              which represents an individual person with their associated
              information.
            </p>

            <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto font-mono text-sm mb-4">
              <pre>{`model Person {
  id        Int     @id @default(autoincrement())
  firstName String
  lastName  String
  email     String  @unique
  phone     String?
  age       Int?
  city      String?
  bio       String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}`}</pre>
            </div>

            <h3 className="text-xl font-semibold mb-3">Field Descriptions</h3>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <p className="font-semibold text-gray-900">id</p>
                <p className="text-gray-700">
                  Auto-incrementing primary key. Uniquely identifies each person
                  record.
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-4">
                <p className="font-semibold text-gray-900">firstName</p>
                <p className="text-gray-700">
                  Person's first name. Required field (String).
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-4">
                <p className="font-semibold text-gray-900">lastName</p>
                <p className="text-gray-700">
                  Person's last name. Required field (String).
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-4">
                <p className="font-semibold text-gray-900">email</p>
                <p className="text-gray-700">
                  Person's email address. Required and must be unique across all
                  records (String with @unique constraint).
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-4">
                <p className="font-semibold text-gray-900">phone</p>
                <p className="text-gray-700">
                  Person's phone number. Optional field (String?).
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-4">
                <p className="font-semibold text-gray-900">age</p>
                <p className="text-gray-700">
                  Person's age in years. Optional field (Int?).
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-4">
                <p className="font-semibold text-gray-900">city</p>
                <p className="text-gray-700">
                  Person's city of residence. Optional field (String?).
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-4">
                <p className="font-semibold text-gray-900">bio</p>
                <p className="text-gray-700">
                  Person's biographical information or description. Optional field
                  (String?).
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-4">
                <p className="font-semibold text-gray-900">createdAt</p>
                <p className="text-gray-700">
                  Timestamp when the record was created. Automatically set to
                  current time (DateTime).
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-4">
                <p className="font-semibold text-gray-900">updatedAt</p>
                <p className="text-gray-700">
                  Timestamp when the record was last updated. Automatically
                  maintained by Prisma (DateTime).
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Database Providers</h2>
            <p className="text-gray-700 mb-4">
              This application supports multiple database providers:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h3 className="font-semibold text-green-900 mb-2">SQLite</h3>
                <p className="text-gray-700 text-sm">
                  Used for local development. File-based database stored at
                  <code className="bg-white px-2 py-1 rounded ml-1">dev.db</code>
                </p>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-blue-900 mb-2">PostgreSQL</h3>
                <p className="text-gray-700 text-sm">
                  Used for production deployment on Vercel. Provides superior
                  performance and scalability.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Prisma Features Used</h2>

            <div className="space-y-3">
              <div className="flex items-start">
                <span className="text-blue-600 font-bold mr-3">@id</span>
                <span className="text-gray-700">Designates the field as the primary key</span>
              </div>

              <div className="flex items-start">
                <span className="text-blue-600 font-bold mr-3">@default()</span>
                <span className="text-gray-700">
                  Provides a default value for new records
                </span>
              </div>

              <div className="flex items-start">
                <span className="text-blue-600 font-bold mr-3">@unique</span>
                <span className="text-gray-700">
                  Ensures the field value is unique across all records
                </span>
              </div>

              <div className="flex items-start">
                <span className="text-blue-600 font-bold mr-3">@updatedAt</span>
                <span className="text-gray-700">
                  Automatically updates the timestamp when a record is modified
                </span>
              </div>

              <div className="flex items-start">
                <span className="text-blue-600 font-bold mr-3">?</span>
                <span className="text-gray-700">
                  Marks a field as optional (nullable)
                </span>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Migrations</h2>
            <p className="text-gray-700 mb-4">
              Migrations are stored in the <code className="bg-gray-100 px-2 py-1 rounded">prisma/migrations</code> directory.
              Each migration represents a change to the database schema.
            </p>
            <p className="text-gray-700">
              To create a new migration after modifying the schema:
            </p>
            <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm mt-3">
              <p>npx prisma migrate dev --name &lt;migration_name&gt;</p>
            </div>
          </section>

          <section className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg mb-8">
            <h3 className="font-semibold text-yellow-900 mb-2">
              Data Constraints
            </h3>
            <ul className="text-gray-700 space-y-2">
              <li>• Email addresses must be unique</li>
              <li>• First name, last name, and email are required</li>
              <li>• Phone, age, city, and bio are optional</li>
              <li>• All timestamps are managed automatically</li>
            </ul>
          </section>

          <section className="pt-8 border-t">
            <p className="text-gray-600">
              For information about the API endpoints that interact with this
              schema, visit the{" "}
              <Link href="/about" className="text-blue-600 hover:text-blue-800">
                About page
              </Link>
              . See the{" "}
              <Link href="/" className="text-blue-600 hover:text-blue-800">
                home page
              </Link>{" "}
              to test CRUD operations.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
