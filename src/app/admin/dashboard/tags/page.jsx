"use client";

import { useState, useEffect } from "react";
import { Pencil, Trash2 } from "lucide-react";
import Pagination from "../../components/Pagination";
import PopupModal from "../../components/PopupModal";
import Spinner from "../../components/Spinner";
import { supabase } from "@/utils/supabase/client";

export default function TagsPage() {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [selectedTag, setSelectedTag] = useState(null);
  const [tagInput, setTagInput] = useState("");
  const [tagTypes, setTagTypes] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [tagToDelete, setTagToDelete] = useState(null);
  const [session, setSession] = useState(null);

  const pageSize = 10;

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
    };
    getSession();
  }, []);

  const getAuthHeaders = () => {
    if (!session) return {};
    return { Authorization: `Bearer ${session.access_token}` };
  };

  const fetchTags = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/tags", {
        headers: getAuthHeaders(),
      });
      const data = await res.json();
      setTags(data || []);
    } catch (err) {
      console.error("Error fetching tags:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (session) fetchTags();
  }, [session]);

  const openAddModal = () => {
    setModalMode("add");
    setTagInput("");
    setTagTypes([]);
    setSelectedTag(null);
    setShowModal(true);
  };

  const openEditModal = (tag) => {
    setModalMode("edit");
    setTagInput(tag.name);
    setTagTypes(Array.isArray(tag.type) ? tag.type : []);
    setSelectedTag(tag);
    setShowModal(true);
  };

  const handleTypeChange = (value) => {
    setTagTypes((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value]
    );
  };

  const handleConfirmModal = async () => {
    if (!tagInput.trim()) return;

    const payload = {
      id: selectedTag?.id,
      name: tagInput.trim(),
      type: tagTypes,
    };

    try {
      await fetch("/api/admin/tags", {
        method: modalMode === "add" ? "POST" : "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders(),
        },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.error("Error saving tag:", err);
    }

    await fetchTags();
    setShowModal(false);
    setTagInput("");
    setTagTypes([]);
    setSelectedTag(null);
  };

  const handleDeleteConfirmed = async () => {
    if (!tagToDelete) return;
    try {
      await fetch(`/api/admin/tags?id=${tagToDelete.id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
    } catch (err) {
      console.error("Error deleting tag:", err);
    }

    await fetchTags();
    setTagToDelete(null);
    setShowDeleteModal(false);

    if ((currentPage - 1) * pageSize >= tags.length - 1) {
      setCurrentPage(Math.max(currentPage - 1, 1));
    }
  };

  const totalPages = Math.ceil(tags.length / pageSize);
  const paginatedTags = tags.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="max-w-7xl mx-auto flex-1 pt-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-foreground">Tags</h1>
        <button
          onClick={openAddModal}
          className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary-foreground hover:text-primary transition"
        >
          Add New Tag
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Spinner size={12} color="border-t-primary" />
        </div>
      ) : tags.length === 0 ? (
        <div className="flex justify-center items-center h-64 text-muted-foreground text-lg">
          No tags found.
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full table-auto border border-border rounded-lg">
              <thead className="bg-muted text-muted-foreground">
                <tr>
                  <th className="px-4 py-2 text-left">Tag Name</th>
                  <th className="px-4 py-2 text-left">Type(s)</th>
                  <th className="px-4 py-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedTags.map((tag) => (
                  <tr key={tag.id} className="border-t border-border">
                    <td className="px-4 py-2">{tag.name}</td>
                    <td className="px-4 py-2">
                      {Array.isArray(tag.type)
                        ? tag.type.join(", ")
                        : tag.type || "—"}
                    </td>
                    <td className="px-4 py-2 flex justify-center gap-2">
                      <button
                        onClick={() => openEditModal(tag)}
                        className="hover:text-primary"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setTagToDelete(tag);
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
            disabled={tags.length === 0}
          />
        </>
      )}

      <PopupModal
        title={modalMode === "add" ? "Add New Tag" : "Edit Tag"}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirmModal}
        confirmText={modalMode === "add" ? "Create" : "Save"}
      >
        <label className="block mb-1 font-medium text-sm">
          Enter tag name (max 32 characters)
        </label>
        <input
          type="text"
          maxLength={32}
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          placeholder="Tag name"
          className="w-full px-3 py-2 border border-border rounded mb-3 focus:outline-none focus:ring focus:ring-primary"
        />

        <label className="block mb-1 font-medium text-sm">
          Select applicable tag types
        </label>
        <div className="flex gap-4 mb-3">
          {["Tool", "Prompt"].map((type) => (
            <label key={type} className="flex items-center gap-2">
              <input
                type="checkbox"
                value={type}
                checked={tagTypes.includes(type)}
                onChange={() => handleTypeChange(type)}
                className="accent-primary"
              />
              {type}
            </label>
          ))}
        </div>
      </PopupModal>

      <PopupModal
        title="Delete Tag"
        message={
          tagToDelete
            ? `Are you sure you want to delete "${tagToDelete.name}"?`
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
