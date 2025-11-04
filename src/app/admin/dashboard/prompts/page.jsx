'use client'

import { useState, useEffect } from "react";
import { Pencil, Trash2 } from "lucide-react";
import Pagination from "../../components/Pagination";
import PopupModal from "../../components/PopupModal";
import Spinner from "../../components/Spinner";

export default function PromptsPage() {
  const [prompts, setPrompts] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [promptText, setPromptText] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [promptToDelete, setPromptToDelete] = useState(null);
  const pageSize = 10;

  const fetchPrompts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/prompts");
      const data = await res.json();
      setPrompts(data || []);
    } catch (err) {
      console.error("Error fetching prompts:", err);
    }
    setLoading(false);
  };

  const fetchTags = async () => {
    try {
      const res = await fetch("/api/admin/tags");
      const data = await res.json();
      setTags(data || []);
    } catch (err) {
      console.error("Error fetching tags:", err);
    }
  };

  useEffect(() => {
    fetchPrompts();
    fetchTags();
  }, []);

  const openAddModal = () => {
    setModalMode("add");
    setTitle("");
    setDescription("");
    setPromptText("");
    setSelectedTags([]);
    setSelectedPrompt(null);
    setShowModal(true);
  };

  const openEditModal = (prompt) => {
    setModalMode("edit");
    setTitle(prompt.title);
    setDescription(prompt.description);
    setPromptText(prompt.content);
    setSelectedTags(prompt.tags || []);
    setSelectedPrompt(prompt);
    setShowModal(true);
  };

  const handleTagChange = (e) => {
    const value = e.target.value;
    setSelectedTags((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : prev.length < 3
        ? [...prev, value]
        : prev
    );
  };

  const handleConfirmModal = async () => {
    if (!title.trim() || !promptText.trim() || selectedTags.length === 0) return;

    const body = {
      title: title.trim(),
      description: description.trim(),
      content: promptText.trim(),
      tags: selectedTags,
    };

    try {
      if (modalMode === "add") {
        await fetch("/api/admin/prompts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
      } else if (modalMode === "edit" && selectedPrompt) {
        await fetch(`/api/admin/prompts/${selectedPrompt.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
      }
    } catch (err) {
      console.error(err);
    }

    await fetchPrompts();
    setShowModal(false);
    setSelectedPrompt(null);
  };

  const handleDeleteConfirmed = async () => {
    if (!promptToDelete) return;
    try {
      await fetch(`/api/admin/prompts/${promptToDelete.id}`, { method: "DELETE" });
    } catch (err) {
      console.error(err);
    }
    await fetchPrompts();
    setPromptToDelete(null);
    setShowDeleteModal(false);
    if ((currentPage - 1) * pageSize >= prompts.length - 1)
      setCurrentPage(Math.max(currentPage - 1, 1));
  };

  const totalPages = Math.ceil(prompts.length / pageSize);
  const paginatedPrompts = prompts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="max-w-7xl mx-auto flex-1 pt-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-foreground">Prompts</h1>
        <button
          onClick={openAddModal}
          className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary-foreground hover:text-primary transition"
        >
          Add New Prompt
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Spinner size={12} color="border-t-primary" />
        </div>
      ) : prompts.length === 0 ? (
        <div className="flex justify-center items-center h-64 text-muted-foreground text-lg">
          No prompts found.
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full table-auto border border-border rounded-lg">
              <thead className="bg-muted text-muted-foreground">
                <tr>
                  <th className="px-4 py-2 text-left">Title</th>
                  <th className="px-4 py-2 text-left">Description</th>
                  <th className="px-4 py-2 text-left">Tags</th>
                  <th className="px-4 py-2 text-left">Prompt</th>
                  <th className="px-4 py-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedPrompts.map((prompt) => (
                  <tr key={prompt.id} className="border-t border-border">
                    <td className="px-4 py-2">{prompt.title}</td>
                    <td className="px-4 py-2">{prompt.description}</td>
                    <td className="px-4 py-2">
                      {(prompt.tags || [])
                        .map((id) => tags.find((t) => t.id === id)?.name)
                        .filter(Boolean)
                        .join(", ")}
                    </td>
                    <td className="px-4 py-2 truncate max-w-xs">{prompt.content}</td>
                    <td className="px-4 py-2 flex justify-center gap-2">
                      <button onClick={() => openEditModal(prompt)} className="hover:text-primary">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setPromptToDelete(prompt);
                          setShowDeleteModal(true);
                        }}
                        className="hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            disabled={prompts.length === 0}
          />
        </>
      )}

      <PopupModal
        title={modalMode === "add" ? "Add New Prompt" : "Edit Prompt"}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirmModal}
        confirmText={modalMode === "add" ? "Create" : "Save"}
      >
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full px-3 py-2 border border-border rounded mb-2 focus:outline-none focus:ring focus:ring-primary"
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="w-full px-3 py-2 border border-border rounded mb-2 focus:outline-none focus:ring focus:ring-primary"
        />

        <div className="w-full px-3 py-2 border border-border rounded mb-2 bg-background">
          <label className="block text-sm text-muted-foreground mb-1">
            Select up to 3 tags
          </label>
          <div className="flex flex-wrap gap-2">
            {tags.map((t) => (
              <label key={t.id} className="flex items-center gap-1 text-sm">
                <input
                  type="checkbox"
                  value={t.id}
                  checked={selectedTags.includes(t.id)}
                  onChange={handleTagChange}
                  className="accent-primary"
                />
                {t.name}
              </label>
            ))}
          </div>
        </div>

        <textarea
          rows="4"
          value={promptText}
          onChange={(e) => setPromptText(e.target.value)}
          placeholder="Prompt"
          className="w-full px-3 py-2 border border-border rounded focus:outline-none focus:ring focus:ring-primary"
        />
      </PopupModal>

      <PopupModal
        title="Delete Prompt"
        message={promptToDelete ? `Are you sure you want to delete "${promptToDelete.title}"?` : ""}
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteConfirmed}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
}
