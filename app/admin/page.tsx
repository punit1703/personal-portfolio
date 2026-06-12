"use client";

import React, { useState, useEffect } from "react";
import { Lock, LayoutDashboard, FolderKanban, Mail, User, LogOut, Plus, Edit, Trash2, Save, Eye, EyeOff, CheckCircle, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [authError, setAuthError] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");

  // Data States
  const [analytics, setAnalytics] = useState({ views: 0 });
  const [projects, setProjects] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [about, setAbout] = useState<any>({ title: '', bio: '', philosophy: '', skills: [], resumeLink: '' });

  const fetchData = async () => {
    try {
      const [resAnalytics, resProjects, resMessages, resAbout] = await Promise.all([
        fetch('/api/analytics'),
        fetch('/api/projects'),
        fetch('/api/messages', { headers: { 'Authorization': `Bearer ${passcode}` } }),
        fetch('/api/about')
      ]);
      setAnalytics(await resAnalytics.json());
      setProjects(await resProjects.json());
      if (resMessages.ok) {
        setMessages(await resMessages.json());
      }
      setAbout(await resAbout.json());
    } catch (err) {
      console.error("Failed to fetch admin data", err);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    try {
      // Ping a protected route to verify the passcode
      const res = await fetch('/api/messages', {
        headers: { 'Authorization': `Bearer ${passcode}` }
      });
      if (res.ok) {
        setIsAuthenticated(true);
      } else {
        setAuthError("Incorrect passcode");
      }
    } catch {
      setAuthError("Authentication failed");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-[var(--background)]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[var(--card)]/60 backdrop-blur-xl p-8 rounded-3xl border border-[var(--border)] max-w-md w-full shadow-2xl relative overflow-hidden"
        >
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-[var(--primary)] rounded-full blur-[60px] opacity-20" />
          
          <div className="flex justify-center mb-6 text-[var(--primary)]">
            <Lock size={48} />
          </div>
          <h1 className="text-3xl font-black text-center mb-2 tracking-tight">Admin Portal</h1>
          <p className="text-[var(--muted-foreground)] text-center mb-8">Enter your secure access key</p>
          
          <form onSubmit={handleLogin} className="space-y-4 relative z-10">
            <div>
              <input
                type="password"
                placeholder="Passcode"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full px-4 py-4 bg-[var(--muted)]/50 border border-[var(--border)] rounded-xl focus:outline-none focus:border-[var(--primary)]/50 focus:ring-1 focus:ring-[var(--primary)]/50 transition-all text-center tracking-[0.5em] font-bold"
              />
            </div>
            {authError && <p className="text-red-500 text-sm text-center">{authError}</p>}
            <button
              type="submit"
              className="w-full bg-[var(--foreground)] text-[var(--background)] font-bold py-4 rounded-xl hover:scale-[1.02] transition-transform shadow-lg"
            >
              Unlock Access
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[var(--card)]/40 backdrop-blur-xl border-r border-[var(--border)] hidden md:flex flex-col fixed h-full z-20">
        <div className="p-6 border-b border-[var(--border)]">
          <h2 className="text-2xl font-black tracking-tight flex items-center gap-2">
            <Lock className="text-[var(--primary)]" size={24} /> Admin
          </h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <SidebarItem icon={<LayoutDashboard />} label="Dashboard" isActive={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
          <SidebarItem icon={<FolderKanban />} label="Projects" isActive={activeTab === 'projects'} onClick={() => setActiveTab('projects')} />
          <SidebarItem icon={<Mail />} label="Messages" isActive={activeTab === 'messages'} onClick={() => setActiveTab('messages')} badge={messages.length} />
          <SidebarItem icon={<User />} label="About Content" isActive={activeTab === 'about'} onClick={() => setActiveTab('about')} />
        </nav>
        <div className="p-4 border-t border-[var(--border)]">
          <button onClick={() => { setIsAuthenticated(false); setPasscode(""); }} className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-red-500/10 text-red-500 transition-colors font-medium">
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-4 md:p-10 min-h-screen relative overflow-hidden">
        {/* Ambient Effects */}
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[var(--primary)] rounded-full blur-[150px] opacity-10 pointer-events-none" />
        
        <div className="relative z-10 max-w-6xl mx-auto mt-20 md:mt-0">
          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' && <DashboardTab key="dash" analytics={analytics} projects={projects} messages={messages} />}
            {activeTab === 'projects' && <ProjectsTab key="proj" projects={projects} setProjects={setProjects} passcode={passcode} />}
            {activeTab === 'messages' && <MessagesTab key="msg" messages={messages} setMessages={setMessages} passcode={passcode} />}
            {activeTab === 'about' && <AboutTab key="abt" about={about} setAbout={setAbout} passcode={passcode} />}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

// --- Sidebar Item Component ---
function SidebarItem({ icon, label, isActive, onClick, badge }: any) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${isActive ? 'bg-[var(--primary)]/10 text-[var(--primary)] font-bold' : 'text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)]'}`}
    >
      <div className="flex items-center gap-3">
        {React.cloneElement(icon, { size: 20 })}
        {label}
      </div>
      {badge !== undefined && badge > 0 && (
        <span className="bg-[var(--primary)] text-white text-xs px-2 py-0.5 rounded-full">{badge}</span>
      )}
    </button>
  );
}

// --- Dashboard Tab ---
function DashboardTab({ analytics, projects, messages }: any) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
      <h1 className="text-4xl font-bold mb-8">Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard icon={<Eye size={32} />} label="Total Page Views" value={analytics?.views || 0} color="text-blue-500" bg="bg-blue-500/10" />
        <StatCard icon={<FolderKanban size={32} />} label="Total Projects" value={projects?.length || 0} color="text-green-500" bg="bg-green-500/10" />
        <StatCard icon={<Mail size={32} />} label="Unread Messages" value={messages?.length || 0} color="text-purple-500" bg="bg-purple-500/10" />
      </div>
    </motion.div>
  );
}

function StatCard({ icon, label, value, color, bg }: any) {
  return (
    <div className="bg-[var(--card)]/60 backdrop-blur-xl border border-[var(--border)] p-8 rounded-3xl shadow-lg flex items-center gap-6">
      <div className={`p-4 rounded-2xl ${bg} ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-[var(--muted-foreground)] font-medium mb-1">{label}</p>
        <h3 className="text-4xl font-black tracking-tight">{value}</h3>
      </div>
    </div>
  );
}

// --- Projects Tab ---
function ProjectsTab({ projects, setProjects, passcode }: any) {
  const [isEditing, setIsEditing] = useState(false);
  const [currentProject, setCurrentProject] = useState<any>(null);
  
  const handleEdit = (project: any) => {
    setCurrentProject({ ...project, techStack: project.techStack?.join(", ") || "", tags: project.tags?.join(", ") || "" });
    setIsEditing(true);
  };

  const handleAdd = () => {
    setCurrentProject({ title: "", description: "", techStack: "", tags: "", githubLink: "", previewLink: "" });
    setIsEditing(true);
  };

  const handleDelete = async (title: string) => {
    if (!confirm(`Are you sure you want to delete ${title}?`)) return;
    try {
      await fetch(`/api/projects?title=${encodeURIComponent(title)}`, { 
        method: "DELETE",
        headers: { 'Authorization': `Bearer ${passcode}` }
      });
      setProjects(projects.filter((p: any) => p.title !== title));
    } catch (e) { console.error(e); }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const formattedProject = {
      ...currentProject,
      techStack: currentProject.techStack.split(",").map((s: string) => s.trim()).filter(Boolean),
      tags: currentProject.tags.split(",").map((s: string) => s.trim()).filter(Boolean),
    };

    const isUpdate = projects.some((p: any) => p.title === currentProject.originalTitle || p.title === currentProject.title);

    try {
      if (isUpdate && currentProject.originalTitle) {
        await fetch("/api/projects", {
          method: "PUT",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${passcode}`
          },
          body: JSON.stringify({ originalTitle: currentProject.originalTitle, updatedProject: formattedProject }),
        });
        setProjects(projects.map((p: any) => p.title === currentProject.originalTitle ? formattedProject : p));
      } else {
        await fetch("/api/projects", {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${passcode}`
          },
          body: JSON.stringify(formattedProject),
        });
        setProjects([formattedProject, ...projects]);
      }
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      alert("Failed to save project");
    }
  };

  if (isEditing) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-[var(--card)]/60 backdrop-blur-xl border border-[var(--border)] p-8 rounded-3xl shadow-xl">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => setIsEditing(false)} className="p-3 bg-[var(--muted)]/50 hover:bg-[var(--primary)]/20 hover:text-[var(--primary)] rounded-full transition-colors">
            <ArrowLeft size={24} />
          </button>
          <h2 className="text-3xl font-bold">{currentProject.originalTitle ? 'Edit Project' : 'Add New Project'}</h2>
        </div>
        <form onSubmit={handleSave} className="space-y-6">
          <input type="hidden" value={currentProject.originalTitle || ""} />
          <div>
            <label className="block text-sm mb-2 text-[var(--muted-foreground)]">Title</label>
            <input required type="text" value={currentProject.title} onChange={e => setCurrentProject({ ...currentProject, title: e.target.value, originalTitle: currentProject.originalTitle || currentProject.title })} className="w-full p-4 bg-[var(--muted)]/50 rounded-xl border border-[var(--border)] focus:ring-1 focus:ring-[var(--primary)]" />
          </div>
          <div>
            <label className="block text-sm mb-2 text-[var(--muted-foreground)]">Description</label>
            <textarea required rows={4} value={currentProject.description} onChange={e => setCurrentProject({ ...currentProject, description: e.target.value })} className="w-full p-4 bg-[var(--muted)]/50 rounded-xl border border-[var(--border)] focus:ring-1 focus:ring-[var(--primary)]" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-2 text-[var(--muted-foreground)]">Tech Stack (comma separated)</label>
              <input type="text" value={currentProject.techStack} onChange={e => setCurrentProject({ ...currentProject, techStack: e.target.value })} className="w-full p-4 bg-[var(--muted)]/50 rounded-xl border border-[var(--border)] focus:ring-1 focus:ring-[var(--primary)]" />
            </div>
            <div>
              <label className="block text-sm mb-2 text-[var(--muted-foreground)]">Tags (comma separated)</label>
              <input type="text" value={currentProject.tags} onChange={e => setCurrentProject({ ...currentProject, tags: e.target.value })} className="w-full p-4 bg-[var(--muted)]/50 rounded-xl border border-[var(--border)] focus:ring-1 focus:ring-[var(--primary)]" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-2 text-[var(--muted-foreground)]">GitHub Link</label>
              <input type="url" value={currentProject.githubLink} onChange={e => setCurrentProject({ ...currentProject, githubLink: e.target.value })} className="w-full p-4 bg-[var(--muted)]/50 rounded-xl border border-[var(--border)] focus:ring-1 focus:ring-[var(--primary)]" />
            </div>
            <div>
              <label className="block text-sm mb-2 text-[var(--muted-foreground)]">Preview Link</label>
              <input type="url" value={currentProject.previewLink} onChange={e => setCurrentProject({ ...currentProject, previewLink: e.target.value })} className="w-full p-4 bg-[var(--muted)]/50 rounded-xl border border-[var(--border)] focus:ring-1 focus:ring-[var(--primary)]" />
            </div>
          </div>
          <div className="flex gap-4 pt-4">
            <button type="submit" className="flex-1 bg-[var(--foreground)] text-[var(--background)] py-4 rounded-xl font-bold flex justify-center items-center gap-2 hover:scale-[1.02] shadow-lg transition-transform"><Save size={20}/> Save</button>
            <button type="button" onClick={() => setIsEditing(false)} className="flex-1 border border-[var(--border)] py-4 rounded-xl font-bold hover:bg-[var(--muted)] transition-colors">Cancel</button>
          </div>
        </form>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Projects Manager</h1>
        <button onClick={handleAdd} className="bg-[var(--primary)] text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:opacity-90 shadow-lg hover:shadow-[var(--primary)]/20 transition-all"><Plus size={20}/> Add Project</button>
      </div>
      <div className="space-y-4">
        {projects.map((p: any, i: number) => (
          <div key={i} className="bg-[var(--card)]/60 backdrop-blur-xl border border-[var(--border)] p-6 rounded-2xl flex flex-col md:flex-row gap-4 justify-between items-center shadow-sm hover:shadow-md transition-all">
            <div className="w-full md:w-auto">
              <h3 className="text-xl font-bold mb-2">{p.title}</h3>
              <div className="flex flex-wrap gap-2">
                {p.techStack?.slice(0,3).map((t: string, j: number) => <span key={j} className="text-xs px-2 py-1 bg-[var(--muted)] rounded-md text-[var(--muted-foreground)]">{t}</span>)}
              </div>
            </div>
            <div className="flex gap-2 shrink-0 w-full md:w-auto justify-end">
              <button onClick={() => handleEdit(p)} className="p-3 bg-[var(--primary)]/10 text-[var(--primary)] rounded-xl hover:bg-[var(--primary)]/20 transition-colors"><Edit size={20}/></button>
              <button onClick={() => handleDelete(p.title)} className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500/20 transition-colors"><Trash2 size={20}/></button>
            </div>
          </div>
        ))}
        {projects.length === 0 && <p className="text-center text-[var(--muted-foreground)] py-10">No projects found.</p>}
      </div>
    </motion.div>
  );
}

// --- Messages Tab ---
function MessagesTab({ messages, setMessages, passcode }: any) {
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this message?")) return;
    try {
      await fetch(`/api/messages?id=${id}`, { 
        method: "DELETE",
        headers: { 'Authorization': `Bearer ${passcode}` }
      });
      setMessages(messages.filter((m: any) => m.id !== id));
    } catch (e) { console.error(e); }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
      <h1 className="text-4xl font-bold mb-8">Inbox</h1>
      <div className="space-y-6">
        {messages.map((m: any) => (
          <div key={m.id} className="bg-[var(--card)]/60 backdrop-blur-xl border border-[var(--border)] p-6 sm:p-8 rounded-3xl shadow-sm relative group">
            <button onClick={() => handleDelete(m.id)} className="absolute top-6 right-6 p-2 text-[var(--muted-foreground)] hover:text-red-500 bg-[var(--muted)] rounded-full transition-colors opacity-0 group-hover:opacity-100"><Trash2 size={18}/></button>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-[var(--primary)]/10 rounded-full flex items-center justify-center text-[var(--primary)] font-bold text-xl">{m.name.charAt(0).toUpperCase()}</div>
              <div>
                <h3 className="font-bold text-lg">{m.name}</h3>
                <p className="text-sm text-[var(--muted-foreground)]">{m.email} • {new Date(m.date).toLocaleDateString()}</p>
              </div>
            </div>
            <h4 className="font-bold text-[var(--foreground)] mb-2">Subject: {m.subject}</h4>
            <p className="text-[var(--muted-foreground)] bg-[var(--muted)]/50 p-4 rounded-xl whitespace-pre-wrap">{m.message}</p>
          </div>
        ))}
        {messages.length === 0 && (
          <div className="text-center py-20 bg-[var(--card)]/40 rounded-3xl border border-[var(--border)] border-dashed">
            <CheckCircle className="mx-auto text-[var(--primary)]/50 mb-4" size={48} />
            <h3 className="text-xl font-bold text-[var(--muted-foreground)]">Inbox Zero</h3>
            <p className="text-[var(--muted-foreground)]/60">You have no new messages.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// --- About Content Tab ---
function AboutTab({ about, setAbout, passcode }: any) {
  const [formData, setFormData] = useState({ ...about, skills: about.skills?.join(", ") || "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setFormData({ ...about, skills: about.skills?.join(", ") || "" });
  }, [about]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const updated = { ...formData, skills: formData.skills.split(",").map((s: string) => s.trim()).filter(Boolean) };
    
    try {
      await fetch('/api/about', {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${passcode}`
        },
        body: JSON.stringify(updated)
      });
      setAbout(updated);
      alert("About section updated successfully!");
    } catch (e) {
      alert("Failed to save.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
      <h1 className="text-4xl font-bold mb-8">About Content Editor</h1>
      <div className="bg-[var(--card)]/60 backdrop-blur-xl border border-[var(--border)] p-8 rounded-3xl shadow-xl">
        <form onSubmit={handleSave} className="space-y-6">
          <div>
            <label className="block text-sm mb-2 text-[var(--muted-foreground)]">Role/Title</label>
            <input required type="text" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full p-4 bg-[var(--muted)]/50 rounded-xl border border-[var(--border)] focus:ring-1 focus:ring-[var(--primary)]" />
          </div>
          <div>
            <label className="block text-sm mb-2 text-[var(--muted-foreground)]">Bio</label>
            <textarea required rows={4} value={formData.bio} onChange={e => setFormData({ ...formData, bio: e.target.value })} className="w-full p-4 bg-[var(--muted)]/50 rounded-xl border border-[var(--border)] focus:ring-1 focus:ring-[var(--primary)]" />
          </div>
          <div>
            <label className="block text-sm mb-2 text-[var(--muted-foreground)]">Philosophy</label>
            <textarea required rows={3} value={formData.philosophy} onChange={e => setFormData({ ...formData, philosophy: e.target.value })} className="w-full p-4 bg-[var(--muted)]/50 rounded-xl border border-[var(--border)] focus:ring-1 focus:ring-[var(--primary)]" />
          </div>
          <div>
            <label className="block text-sm mb-2 text-[var(--muted-foreground)]">Skills (comma separated)</label>
            <textarea required rows={3} value={formData.skills} onChange={e => setFormData({ ...formData, skills: e.target.value })} className="w-full p-4 bg-[var(--muted)]/50 rounded-xl border border-[var(--border)] focus:ring-1 focus:ring-[var(--primary)]" placeholder="React, Node.js, Python..." />
          </div>
          <div>
            <label className="block text-sm mb-2 text-[var(--muted-foreground)]">Resume PDF Link</label>
            <input required type="text" value={formData.resumeLink} onChange={e => setFormData({ ...formData, resumeLink: e.target.value })} className="w-full p-4 bg-[var(--muted)]/50 rounded-xl border border-[var(--border)] focus:ring-1 focus:ring-[var(--primary)]" />
          </div>
          <button type="submit" disabled={saving} className="w-full flex justify-center items-center gap-2 bg-[var(--foreground)] text-[var(--background)] font-bold py-4 rounded-xl hover:scale-[1.01] transition-transform mt-8 shadow-lg">
            <Save size={20} /> {saving ? 'Saving...' : 'Save Content'}
          </button>
        </form>
      </div>
    </motion.div>
  );
}
