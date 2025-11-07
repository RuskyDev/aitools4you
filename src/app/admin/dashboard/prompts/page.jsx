"use client";

import { useState, useEffect } from "react";
import { Pencil, Trash2 } from "lucide-react";
import Pagination from "../../components/Pagination";
import PopupModal from "../../components/PopupModal";
import Spinner from "../../components/Spinner";
import AddPrompt from "./components/addPrompt";
import EditPrompt from "./components/editPrompt";
import { supabase } from "@/utils/supabase/client";
import { checkSession, getAuthHeaders } from "../../utils/auth";

export default function Page() {
  const [prompts, setPrompts] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [promptToEdit, setPromptToEdit] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [promptText, setPromptText] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [promptToDelete, setPromptToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const pageSize = 10;
  const paginatedPrompts = prompts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  const totalPages = Math.ceil(prompts.length / pageSize);

  const fetchPrompts = async () => {
    try {
      const session = await checkSession();
      const headers = getAuthHeaders(session);
      const res = await fetch("/api/admin/prompts", { headers });
      const data = await res.json();
      setPrompts(data || []);
    } catch (error) {
      console.error("Error fetching prompts:", error);
      setPrompts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    async function fetchTags() {
      const session = await checkSession();
      const headers = getAuthHeaders(session);
      try {
        const res = await fetch("/api/admin/tags", { headers });
        const data = await res.json();
        setTags(data || []);
      } catch {
        setTags([]);
      }
    }

    fetchTags();
    fetchPrompts();
  }, []);

  const openAddModal = () => {
    setModalMode("add");
    setTitle("");
    setDescription("");
    setSelectedTags([]);
    setPromptText("");
    setImageFile(null);
    setShowModal(true);
  };

  const openEditModal = (prompt) => {
    setModalMode("edit");
    setPromptToEdit(prompt);
    setShowModal(true);
  };

  const handlePromptCreated = async () => {
    setShowModal(false);
    setLoading(true);
    await fetchPrompts();
  };

  const handlePromptUpdated = async () => {
    setShowModal(false);
    setLoading(true);
    await fetchPrompts();
  };

  const handleDeleteConfirmed = async () => {
    if (!promptToDelete) return;
    try {
      const session = await checkSession();
      const headers = getAuthHeaders(session);
      const res = await fetch(`/api/admin/prompts/${promptToDelete.id}`, {
        method: "DELETE",
        headers,
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setPrompts((prev) => prev.filter((p) => p.id !== promptToDelete.id));
      } else {
        console.error("Delete failed:", data.error);
      }
    } catch (err) {
      console.error("Error deleting prompt:", err);
    } finally {
      setShowDeleteModal(false);
    }
  };

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
                    <td className="px-4 py-2 truncate max-w-xs">
                      {prompt.content}
                    </td>
                    <td className="px-4 py-2 flex justify-center gap-2">
                      <button
                        onClick={() => openEditModal(prompt)}
                        className="hover:text-primary"
                      >
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

      {modalMode === "add" && (
        <AddPrompt
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onPromptCreated={handlePromptCreated}
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
          promptText={promptText}
          setPromptText={setPromptText}
          imageFile={imageFile}
          setImageFile={setImageFile}
        />
      )}

      {modalMode === "edit" && promptToEdit && (
        <EditPrompt
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          promptData={promptToEdit}
          onPromptUpdated={handlePromptUpdated}
        />
      )}

      <PopupModal
        title="Delete Prompt"
        message={
          promptToDelete
            ? `Are you sure you want to delete "${promptToDelete.title}"?`
            : ""
        }
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteConfirmed}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
}
