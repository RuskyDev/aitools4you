"use client";

import { useState, useEffect } from "react";
import PopupModal from "../../../components/PopupModal";
import { checkSession, getAuthHeaders } from "../../../utils/auth";

export default function AddPrompt({
  isOpen,
  onClose,
  onPromptCreated,
  title,
  setTitle,
  description,
  setDescription,
  selectedTags,
  setSelectedTags,
  promptText,
  setPromptText,
  imageFile,
  setImageFile,
}) {
  const [tags, setTags] = useState([]);
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputClass = "w-full px-3 py-2 border border-border rounded mb-2 focus:outline-none focus:ring focus:ring-primary";

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
  }, []);

  useEffect(() => {
    if (imageFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(imageFile);
    } else {
      setImagePreview(null);
    }
  }, [imageFile]);

  const handleFileChange = (e) => {
    setError("");
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      setError("Invalid file type. Only JPEG, JPG, PNG, WEBP allowed.");
      return;
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      setError("File is too large. Maximum size is 5MB.");
      return;
    }

    setImageFile(file);
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setError("");
  };

  const handleSubmit = async () => {
    setError("");
    setIsSubmitting(true);

    try {
      if (!title || !promptText || selectedTags.length === 0) {
        setError("Please fill in all required fields: title, prompt text, and at least one tag.");
        setIsSubmitting(false);
        return;
      }

      const session = await checkSession();
      const headers = getAuthHeaders(session);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("content", promptText);
      formData.append("tags", JSON.stringify(selectedTags));
      
      if (imageFile) {
        formData.append("image", imageFile);
      }

      const response = await fetch("/api/admin/prompts", {
        method: "POST",
        headers,
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create prompt");
      }

      // Success - call onPromptCreated to refresh the list
      if (onPromptCreated) {
        onPromptCreated(data);
      }
      
      onClose();
    } catch (err) {
      setError(err.message || "An error occurred while creating the prompt");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PopupModal 
      title="Add New Prompt" 
      isOpen={isOpen} 
      onClose={onClose} 
      confirmText={isSubmitting ? "Creating..." : "Create"} 
      onConfirm={handleSubmit}
      disabled={isSubmitting}
    >
      <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" className={inputClass} />
      <input type="text" value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" className={inputClass} />

      <div className="w-full px-3 py-2 border border-border rounded mb-2 bg-background">
        <label className="block text-sm text-muted-foreground mb-1">Select up to 3 tags</label>
        <div className="flex flex-wrap gap-2">
          {tags.filter(tag => tag.type.includes("Prompt")).length ? (
            tags
              .filter(tag => tag.type.includes("Prompt"))
              .map(tag => (
                <button
                  key={tag.id}
                  type="button"
                  className={`px-2 py-1 rounded border ${
                    selectedTags.includes(tag.id) ? "bg-primary text-white" : "border-border text-muted-foreground"
                  }`}
                  onClick={() =>
                    setSelectedTags(prev =>
                      prev.includes(tag.id)
                        ? prev.filter(t => t !== tag.id)
                        : prev.length < 3
                        ? [...prev, tag.id]
                        : prev
                    )
                  }
                >
                  {tag.name}
                </button>
              ))
          ) : (
            <p className="text-sm text-muted-foreground">No Prompt-type tags available.</p>
          )}
        </div>
      </div>

      <div className="w-full px-3 py-2 border border-border rounded mb-3 bg-background">
        <label className="block text-sm text-muted-foreground mb-2">Image (JPEG, JPG, PNG, WEBP, max 5MB)</label>
        <div className="flex items-center gap-3">
          {imagePreview ? (
            <div className="relative group">
              <img 
                src={imagePreview} 
                alt="Preview" 
                className="w-20 h-20 object-cover rounded border border-border cursor-pointer"
                onClick={() => document.getElementById("imageUpload").click()}
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition"
              >
                ×
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => document.getElementById("imageUpload").click()}
              className="w-20 h-20 border-2 border-dashed border-border rounded flex items-center justify-center hover:border-primary hover:bg-primary/5 transition cursor-pointer"
            >
              <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          )}
          {imageFile && (
            <div className="flex flex-col">
              <span className="text-sm truncate max-w-xs">{imageFile.name}</span>
              <span className="text-xs text-muted-foreground">File Size: {(imageFile.size / 1024).toFixed(2)} KB</span>
            </div>
          )}
        </div>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <input
          id="imageUpload"
          type="file"
          accept=".jpeg,.jpg,.png,.webp"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      <textarea
        rows="4"
        value={promptText}
        onChange={e => setPromptText(e.target.value)}
        placeholder="Prompt"
        className={inputClass}
      />
    </PopupModal>
  );
}