'use client'

import { useState, useEffect } from "react";
import { Pencil, Trash2 } from "lucide-react";
import Pagination from "../../components/Pagination";
import PopupModal from "../../components/PopupModal";
import Spinner from "../../components/Spinner";

export default function TagsPage() {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [selectedTag, setSelectedTag] = useState(null);
  const [tagInput, setTagInput] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [tagToDelete, setTagToDelete] = useState(null);

  const pageSize = 10;

  const fetchTags = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/tags");
      const data = await res.json();
      setTags(data || []);
    } catch (err) {
      console.error("Error fetching tags:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTags();
  }, []);

  const openAddModal = () => {
    setModalMode("add");
    setTagInput("");
    setSelectedTag(null);
    setShowModal(true);
  };

  const openEditModal = (tag) => {
    setModalMode("edit");
    setTagInput(tag.name);
    setSelectedTag(tag);
    setShowModal(true);
  };

  const handleConfirmModal = async () => {
    if (!tagInput.trim()) return;

    try {
      if (modalMode === "add") {
        await fetch("/api/admin/tags", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: tagInput.trim() }),
        });
      } else if (modalMode === "edit" && selectedTag) {
        await fetch(`/api/admin/tags/${selectedTag.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: tagInput.trim() }),
        });
      }
    } catch (err) {
      console.error(err);
    }

    await fetchTags();
    setShowModal(false);
    setTagInput("");
    setSelectedTag(null);
  };

  const handleDeleteConfirmed = async () => {
    if (!tagToDelete) return;

    try {
      await fetch(`/api/admin/tags/${tagToDelete.id}`, {
        method: "DELETE",
      });
    } catch (err) {
      console.error(err);
    }

    await fetchTags();
    setTagToDelete(null);
    setShowDeleteModal(false);

    if ((currentPage - 1) * pageSize >= tags.length - 1) {
      setCurrentPage(Math.max(currentPage - 1, 1));
    }
  };

  const totalPages = Math.ceil(tags.length / pageSize);
  const paginatedTags = tags.slice((currentPage - 1) * pageSize, currentPage * pageSize);

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
                  <th className="px-4 py-2 text-left">Used By (# of Tools)</th>
                  <th className="px-4 py-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedTags.map((tag) => (
                  <tr key={tag.id} className="border-t border-border">
                    <td className="px-4 py-2">{tag.name}</td>
                    <td className="px-4 py-2">{tag.count || 0}</td>
                    <td className="px-4 py-2 flex justify-center gap-2">
                      <button onClick={() => openEditModal(tag)} className="hover:text-primary">
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

      {/* Add/Edit Tag Modal */}
      <PopupModal
        title={modalMode === "add" ? "Add New Tag" : "Edit Tag"}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirmModal}
        confirmText={modalMode === "add" ? "Create" : "Save"}
      >
        <input
          type="text"
          maxLength={14}
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          placeholder="Tag name (max 14 chars)"
          className="w-full px-3 py-2 border border-border rounded mb-2 focus:outline-none focus:ring focus:ring-primary"
        />
      </PopupModal>

      {/* Delete Confirmation Modal */}
      <PopupModal
        title="Delete Tag"
        message={tagToDelete ? `Are you sure you want to delete "${tagToDelete.name}"?` : ""}
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteConfirmed}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
}
