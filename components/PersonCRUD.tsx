"use client";

import { useState, useEffect } from "react";

interface Person {
  id: string;
  name: string;
  age: number;
  email: string;
  phone?: string;
  position?: string;
  department?: string;
  bio?: string;
  createdAt: string;
}

const PersonCRUD = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    phone: "",
    position: "",
    department: "",
    bio: "",
  });

  useEffect(() => {
    fetchPeople();
  }, []);

  const fetchPeople = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/people");
      if (!response.ok) throw new Error("Failed to fetch people");
      const data = await response.json();
      setPeople(data);
      setError("");
    } catch (err) {
      setError("Failed to load people");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const url = editingId ? `/api/people/${editingId}` : "/api/people";
      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          age: parseInt(formData.age),
          email: formData.email,
          phone: formData.phone || undefined,
          position: formData.position || undefined,
          department: formData.department || undefined,
          bio: formData.bio || undefined,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save person");
      }

      setFormData({
        name: "",
        age: "",
        email: "",
        phone: "",
        position: "",
        department: "",
        bio: "",
      });
      setEditingId(null);
      fetchPeople();
      setError("");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (person: Person) => {
    setEditingId(person.id);
    setFormData({
      name: person.name,
      email: person.email,
      age: person.age.toString(),
      phone: person.phone || "",
      position: person.position || "",
      department: person.department || "",
      bio: person.bio || "",
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this person?")) return;

    try {
      setLoading(true);
      const response = await fetch(`/api/people/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete person");
      fetchPeople();
      setError("");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({
      name: "",
      age: "",
      email: "",
      phone: "",
      position: "",
      department: "",
      bio: "",
    });
    setError("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-slate-900 mb-3">
            Manage Your Team
          </h1>
          <p className="text-xl text-slate-600">
            Add, edit, and manage team member information with ease.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              {editingId ? "Edit Team Member" : "Add New Team Member"}
            </h2>

            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. John Doe"
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Age *
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    placeholder="e.g. 28"
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="e.g. john@example.com"
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="e.g. +1-555-0101"
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Position/Job Title
                </label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  placeholder="e.g. Senior Developer"
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Department
                </label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select a department</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Product">Product</option>
                  <option value="Design">Design</option>
                  <option value="Sales">Sales</option>
                  <option value="Marketing">Marketing</option>
                  <option value="HR">HR</option>
                  <option value="Finance">Finance</option>
                  <option value="Operations">Operations</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Bio / Notes
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  placeholder="Brief description about this team member..."
                  rows={3}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-2.5 rounded-lg transition-colors"
                >
                  {loading ? "Saving..." : editingId ? "Update" : "Add Person"}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="flex-1 bg-slate-300 hover:bg-slate-400 text-slate-900 font-semibold py-2.5 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Team Members ({people.length})
            </h2>

            {loading && !people.length ? (
              <div className="text-center py-8 text-slate-600">Loading...</div>
            ) : people.length === 0 ? (
              <div className="text-center py-8 text-slate-600">
                No team members yet. Add one to get started!
              </div>
            ) : (
              <div className="space-y-4 max-h-[calc(100vh-400px)] overflow-y-auto">
                {people.map((person) => (
                  <div
                    key={person.id}
                    className="border border-slate-200 rounded-lg p-4 hover:border-blue-300 hover:bg-blue-50 transition-all"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-slate-900 text-lg">
                          {person.name}
                        </h3>
                        {person.position && (
                          <p className="text-sm text-blue-600 font-medium">
                            {person.position}
                          </p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(person)}
                          className="px-3 py-1.5 bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold rounded transition-colors text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(person.id)}
                          className="px-3 py-1.5 bg-red-100 hover:bg-red-200 text-red-700 font-semibold rounded transition-colors text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-sm text-slate-600">
                      <p>
                        <span className="font-semibold text-slate-700">Age:</span>{" "}
                        {person.age}
                      </p>
                      <p>
                        <span className="font-semibold text-slate-700">Email:</span>{" "}
                        <a
                          href={`mailto:${person.email}`}
                          className="text-blue-600 hover:underline"
                        >
                          {person.email}
                        </a>
                      </p>
                      {person.phone && (
                        <p>
                          <span className="font-semibold text-slate-700">
                            Phone:
                          </span>{" "}
                          <a
                            href={`tel:${person.phone}`}
                            className="text-blue-600 hover:underline"
                          >
                            {person.phone}
                          </a>
                        </p>
                      )}
                      {person.department && (
                        <p>
                          <span className="font-semibold text-slate-700">
                            Department:
                          </span>{" "}
                          {person.department}
                        </p>
                      )}
                    </div>

                    {person.bio && (
                      <p className="mt-2 text-sm text-slate-600 italic border-t border-slate-700 pt-2">
                        {person.bio}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonCRUD;
