"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

interface Person {
  id: number;
  name: string;
  age: number;
  email: string;
  phone?: string;
  position?: string;
  department?: string;
  bio?: string;
  createdAt: string;
}

interface MCPOperation {
  tool: string;
  timestamp: string;
  status: "success" | "pending" | "error";
  result?: string;
  error?: string;
}

export default function MCPDemo() {
  const [people, setPeople] = useState<Person[]>([]);
  const [operations, setOperations] = useState<MCPOperation[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedPersonId, setSelectedPersonId] = useState<number | null>(null);

  // Form states for create person
  const [createForm, setCreateForm] = useState({
    name: "",
    age: "",
    email: "",
    phone: "",
    position: "",
    department: "",
    bio: "",
  });

  // Form states for update person
  const [updateForm, setUpdateForm] = useState({
    name: "",
    age: "",
    email: "",
    phone: "",
    position: "",
    department: "",
    bio: "",
  });

  // Load all people on mount
  useEffect(() => {
    loadPeople();
  }, []);

  // Load all people
  const loadPeople = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/people");
      const data = await response.json();
      setPeople(data);
      logOperation("read_people (all)", "success", `Loaded ${data.length} people`);
    } catch (error) {
      logOperation(
        "read_people",
        "error",
        error instanceof Error ? error.message : "Unknown error"
      );
    }
    setLoading(false);
  };

  // Get specific person
  const getPerson = async (id: number) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/people/${id}`);
      const data = await response.json();
      setSelectedPersonId(id);
      setUpdateForm({
        name: data.name || "",
        age: data.age?.toString() || "",
        email: data.email || "",
        phone: data.phone || "",
        position: data.position || "",
        department: data.department || "",
        bio: data.bio || "",
      });
      logOperation("read_people (by ID)", "success", `Retrieved person ${id}`);
    } catch (error) {
      logOperation(
        "read_people",
        "error",
        error instanceof Error ? error.message : "Unknown error"
      );
    }
    setLoading(false);
  };

  // Create person
  const handleCreatePerson = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/people", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: createForm.name,
          age: parseInt(createForm.age),
          email: createForm.email,
          phone: createForm.phone || null,
          position: createForm.position || null,
          department: createForm.department || null,
          bio: createForm.bio || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create person");
      }

      logOperation("create_person", "success", `Created: ${data.name} (ID: ${data.id})`);
      setCreateForm({
        name: "",
        age: "",
        email: "",
        phone: "",
        position: "",
        department: "",
        bio: "",
      });
      await loadPeople();
    } catch (error) {
      logOperation(
        "create_person",
        "error",
        error instanceof Error ? error.message : "Unknown error"
      );
    }
    setLoading(false);
  };

  // Update person
  const handleUpdatePerson = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPersonId) {
      alert("Please select a person first");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`/api/people/${selectedPersonId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: updateForm.name || undefined,
          age: updateForm.age ? parseInt(updateForm.age) : undefined,
          email: updateForm.email || undefined,
          phone: updateForm.phone || null,
          position: updateForm.position || null,
          department: updateForm.department || null,
          bio: updateForm.bio || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update person");
      }

      logOperation("update_person", "success", `Updated: ${data.name} (ID: ${data.id})`);
      setSelectedPersonId(null);
      setUpdateForm({
        name: "",
        age: "",
        email: "",
        phone: "",
        position: "",
        department: "",
        bio: "",
      });
      await loadPeople();
    } catch (error) {
      logOperation(
        "update_person",
        "error",
        error instanceof Error ? error.message : "Unknown error"
      );
    }
    setLoading(false);
  };

  // Delete person
  const handleDeletePerson = async (id: number) => {
    if (!confirm("Are you sure you want to delete this person?")) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`/api/people/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete person");
      }

      logOperation("delete_person", "success", `Deleted person ID: ${id}`);
      setSelectedPersonId(null);
      setUpdateForm({
        name: "",
        age: "",
        email: "",
        phone: "",
        position: "",
        department: "",
        bio: "",
      });
      await loadPeople();
    } catch (error) {
      logOperation(
        "delete_person",
        "error",
        error instanceof Error ? error.message : "Unknown error"
      );
    }
    setLoading(false);
  };

  // Log operations
  const logOperation = (tool: string, status: "success" | "pending" | "error", result: string) => {
    const now = new Date();
    setOperations((prev) => [
      {
        tool,
        timestamp: now.toLocaleTimeString(),
        status,
        result: status === "error" ? undefined : result,
        error: status === "error" ? result : undefined,
      },
      ...prev.slice(0, 9), // Keep last 10 operations
    ]);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <Link
          href="/"
          className="inline-block mb-8 text-blue-600 hover:text-blue-800"
        >
          ← Back to Home
        </Link>

        <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-8">
          <h1 className="text-4xl font-bold mb-2">MCP CRUD Operations Demo</h1>
          <p className="text-gray-600 mb-6">
            Test all Person CRUD operations. These operations mirror what Claude
            can perform via the MCP server.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Forms */}
          <div className="lg:col-span-2 space-y-8">
            {/* Create Form */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4 text-green-600">
                ➕ Create Person
              </h2>
              <form onSubmit={handleCreatePerson} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={createForm.name}
                    onChange={(e) =>
                      setCreateForm({ ...createForm, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                    placeholder="John Doe"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Age *
                    </label>
                    <input
                      type="number"
                      required
                      value={createForm.age}
                      onChange={(e) =>
                        setCreateForm({ ...createForm, age: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                      placeholder="30"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={createForm.email}
                      onChange={(e) =>
                        setCreateForm({ ...createForm, email: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <input
                  type="text"
                  value={createForm.phone}
                  onChange={(e) =>
                    setCreateForm({ ...createForm, phone: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                  placeholder="Phone (optional)"
                />
                <input
                  type="text"
                  value={createForm.position}
                  onChange={(e) =>
                    setCreateForm({ ...createForm, position: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                  placeholder="Position (optional)"
                />
                <input
                  type="text"
                  value={createForm.department}
                  onChange={(e) =>
                    setCreateForm({ ...createForm, department: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                  placeholder="Department (optional)"
                />
                <textarea
                  value={createForm.bio}
                  onChange={(e) =>
                    setCreateForm({ ...createForm, bio: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                  placeholder="Bio (optional)"
                  rows={2}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 font-semibold"
                >
                  {loading ? "Creating..." : "Create Person"}
                </button>
              </form>
            </div>

            {/* Update Form */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4 text-yellow-600">
                ✏️ Update Person
              </h2>
              {selectedPersonId ? (
                <form onSubmit={handleUpdatePerson} className="space-y-4">
                  <div className="bg-blue-50 p-3 rounded-lg mb-4">
                    <p className="text-sm text-gray-700">
                      <strong>Selected:</strong> Person ID {selectedPersonId}
                    </p>
                  </div>
                  <input
                    type="text"
                    value={updateForm.name}
                    onChange={(e) =>
                      setUpdateForm({ ...updateForm, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500"
                    placeholder="Name"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="number"
                      value={updateForm.age}
                      onChange={(e) =>
                        setUpdateForm({ ...updateForm, age: e.target.value })
                      }
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500"
                      placeholder="Age"
                    />
                    <input
                      type="email"
                      value={updateForm.email}
                      onChange={(e) =>
                        setUpdateForm({ ...updateForm, email: e.target.value })
                      }
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500"
                      placeholder="Email"
                    />
                  </div>
                  <input
                    type="text"
                    value={updateForm.phone}
                    onChange={(e) =>
                      setUpdateForm({ ...updateForm, phone: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500"
                    placeholder="Phone"
                  />
                  <input
                    type="text"
                    value={updateForm.position}
                    onChange={(e) =>
                      setUpdateForm({ ...updateForm, position: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500"
                    placeholder="Position"
                  />
                  <input
                    type="text"
                    value={updateForm.department}
                    onChange={(e) =>
                      setUpdateForm({
                        ...updateForm,
                        department: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500"
                    placeholder="Department"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 disabled:opacity-50 font-semibold"
                    >
                      {loading ? "Updating..." : "Update"}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const person = people.find((p) => p.id === selectedPersonId);
                        if (person && window.confirm(`Delete ${person.name}?`)) {
                          handleDeletePerson(selectedPersonId);
                        }
                      }}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:opacity-50 font-semibold"
                    >
                      Delete
                    </button>
                  </div>
                </form>
              ) : (
                <p className="text-gray-600">Select a person from the list to update</p>
              )}
            </div>
          </div>

          {/* Right Column: Data and Operations Log */}
          <div className="space-y-8">
            {/* People List */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4">📋 People List</h2>
              <button
                onClick={loadPeople}
                disabled={loading}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 font-semibold mb-4"
              >
                {loading ? "Loading..." : "Refresh"}
              </button>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {people.map((person) => (
                  <button
                    key={person.id}
                    onClick={() => getPerson(person.id)}
                    className={`w-full text-left p-3 rounded-lg border-2 transition ${
                      selectedPersonId === person.id
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="font-semibold text-sm">{person.name}</div>
                    <div className="text-xs text-gray-600">{person.email}</div>
                    <div className="text-xs text-gray-600">Age: {person.age}</div>
                  </button>
                ))}
                {people.length === 0 && (
                  <p className="text-gray-600 text-center py-4">No people found</p>
                )}
              </div>
            </div>

            {/* Operations Log */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4">📊 Operations Log</h2>
              <div className="space-y-2 max-h-96 overflow-y-auto font-mono text-xs">
                {operations.length === 0 ? (
                  <p className="text-gray-600">No operations yet</p>
                ) : (
                  operations.map((op, idx) => (
                    <div
                      key={idx}
                      className={`p-2 rounded ${
                        op.status === "success"
                          ? "bg-green-50 border-l-4 border-green-600"
                          : op.status === "error"
                          ? "bg-red-50 border-l-4 border-red-600"
                          : "bg-yellow-50 border-l-4 border-yellow-600"
                      }`}
                    >
                      <div className="font-semibold">
                        {op.status === "success"
                          ? "✅"
                          : op.status === "error"
                          ? "❌"
                          : "⏳"}{" "}
                        {op.tool}
                      </div>
                      <div className="text-gray-600 text-xs">{op.timestamp}</div>
                      {op.result && (
                        <div className="text-gray-700 mt-1">{op.result}</div>
                      )}
                      {op.error && (
                        <div className="text-red-700 mt-1">{op.error}</div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mt-12 bg-white rounded-lg shadow-md p-6 md:p-8">
          <h2 className="text-3xl font-bold mb-6">How MCP Demo Works</h2>
          <p className="text-gray-700 mb-4">
            This demo demonstrates the exact same CRUD operations that Claude
            Desktop can perform through the MCP server. The operations shown here
            are:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-l-4 border-green-600 pl-4">
              <h3 className="font-semibold text-lg mb-2">Create (POST)</h3>
              <p className="text-gray-700 text-sm">
                Add new people to the database with complete profile information
              </p>
            </div>
            <div className="border-l-4 border-blue-600 pl-4">
              <h3 className="font-semibold text-lg mb-2">Read (GET)</h3>
              <p className="text-gray-700 text-sm">
                Fetch all people or retrieve specific person details by ID
              </p>
            </div>
            <div className="border-l-4 border-yellow-600 pl-4">
              <h3 className="font-semibold text-lg mb-2">Update (PUT)</h3>
              <p className="text-gray-700 text-sm">
                Modify existing person records with new information
              </p>
            </div>
            <div className="border-l-4 border-red-600 pl-4">
              <h3 className="font-semibold text-lg mb-2">Delete (DELETE)</h3>
              <p className="text-gray-700 text-sm">
                Remove person records from the database
              </p>
            </div>
          </div>
          <p className="text-gray-700 mt-6">
            Claude Desktop can perform all these operations automatically using
            the MCP tools. Check the{" "}
            <Link href="/mcp-setup" className="text-blue-600 hover:underline">
              MCP Setup Guide
            </Link>{" "}
            to configure Claude Desktop for MCP integration.
          </p>
        </div>
      </div>
    </main>
  );
}
