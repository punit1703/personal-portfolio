"use client";

import React, { useState } from "react";
import { Lock, Plus, Save } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    techStack: "",
    tags: "",
    githubLink: "",
    previewLink: "",
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // A simple hardcoded passcode for demonstration
    if (passcode === "punitadmin") {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Incorrect passcode");
    }
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    const newProject = {
      title: formData.title,
      description: formData.description,
      techStack: formData.techStack.split(",").map((s) => s.trim()).filter(Boolean),
      tags: formData.tags.split(",").map((s) => s.trim()).filter(Boolean),
      githubLink: formData.githubLink,
      previewLink: formData.previewLink,
    };

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProject),
      });

      if (!res.ok) throw new Error("Failed to add project");

      setSuccess("Project added successfully!");
      setFormData({
        title: "",
        description: "",
        techStack: "",
        tags: "",
        githubLink: "",
        previewLink: "",
      });
    } catch (err) {
      setError("Failed to save project.");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[var(--card)] p-8 rounded-3xl border border-[var(--border)] max-w-md w-full shadow-2xl relative overflow-hidden"
        >
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-[var(--primary)] rounded-full blur-[60px] opacity-20" />
          
          <div className="flex justify-center mb-6 text-[var(--primary)]">
            <Lock size={48} />
          </div>
          <h1 className="text-2xl font-bold text-center mb-6">Admin Access</h1>
          
          <form onSubmit={handleLogin} className="space-y-4 relative z-10">
            <div>
              <input
                type="password"
                placeholder="Enter Passcode"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full px-4 py-3 bg-[var(--muted)] border border-[var(--border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full bg-[var(--primary)] text-white font-bold py-3 rounded-xl hover:bg-opacity-90 transition"
            >
              Unlock
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-10">
          <div className="p-3 bg-[var(--primary)]/20 rounded-xl text-[var(--primary)]">
            <Plus size={24} />
          </div>
          <h1 className="text-4xl font-bold">Add New Project</h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[var(--card)] p-8 rounded-3xl border border-[var(--border)] shadow-xl relative overflow-hidden"
        >
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-[var(--accent)] rounded-full blur-[100px] opacity-10" />

          {success && (
            <div className="mb-6 p-4 bg-green-500/20 border border-green-500 rounded-xl text-green-400">
              {success}
            </div>
          )}
          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded-xl text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={handleAddProject} className="space-y-6 relative z-10">
            <div>
              <label className="block text-sm font-medium mb-2 text-[var(--muted-foreground)]">Project Title</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 bg-[var(--muted)] border border-[var(--border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                placeholder="e.g. NextGen E-commerce"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-[var(--muted-foreground)]">Description</label>
              <textarea
                required
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-3 bg-[var(--muted)] border border-[var(--border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                placeholder="Describe the project..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-[var(--muted-foreground)]">Tech Stack (comma separated)</label>
                <input
                  type="text"
                  value={formData.techStack}
                  onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                  className="w-full px-4 py-3 bg-[var(--muted)] border border-[var(--border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                  placeholder="React, Node.js, MongoDB"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-[var(--muted-foreground)]">Tags (comma separated)</label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  className="w-full px-4 py-3 bg-[var(--muted)] border border-[var(--border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                  placeholder="Featured, ML, Fullstack"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-[var(--muted-foreground)]">GitHub Link</label>
                <input
                  type="url"
                  value={formData.githubLink}
                  onChange={(e) => setFormData({ ...formData, githubLink: e.target.value })}
                  className="w-full px-4 py-3 bg-[var(--muted)] border border-[var(--border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                  placeholder="https://github.com/..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-[var(--muted-foreground)]">Preview Link (optional)</label>
                <input
                  type="url"
                  value={formData.previewLink}
                  onChange={(e) => setFormData({ ...formData, previewLink: e.target.value })}
                  className="w-full px-4 py-3 bg-[var(--muted)] border border-[var(--border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                  placeholder="https://..."
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center items-center gap-2 bg-[var(--primary)] text-white font-bold py-4 rounded-xl hover:bg-opacity-90 transition mt-8"
            >
              <Save size={20} />
              Save Project
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
