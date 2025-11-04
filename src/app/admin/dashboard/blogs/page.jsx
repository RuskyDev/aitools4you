'use client'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Trash2 } from "lucide-react";
import Pagination from "../../components/Pagination";
import PopupModal from "../../components/PopupModal";
import Spinner from "../../components/Spinner";

export default function BlogsPage() {
  const router = useRouter();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);

  const pageSize = 10;

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/blogs");
      const data = await res.json();
      setBlogs(data || []);
    } catch (err) {
      console.error("Error fetching blogs:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDeleteConfirmed = async () => {
    if (!blogToDelete) return;

    try {
      await fetch(`/api/admin/blogs/${blogToDelete.id}`, {
        method: "DELETE",
      });
    } catch (err) {
      console.error(err);
    }

    await fetchBlogs();
    setBlogToDelete(null);
    setShowDeleteModal(false);

    if ((currentPage - 1) * pageSize >= blogs.length - 1) {
      setCurrentPage(Math.max(currentPage - 1, 1));
    }
  };

  const totalPages = Math.ceil(blogs.length / pageSize);
  const paginatedBlogs = blogs.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="max-w-7xl mx-auto flex-1 pt-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-foreground">Blogs</h1>
        <button
          onClick={() => router.push("/admin/dashboard/blogs/create")}
          className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary-foreground hover:text-primary transition"
        >
          Add New Blog
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Spinner size={12} color="border-t-primary" />
        </div>
      ) : blogs.length === 0 ? (
        <div className="flex justify-center items-center h-64 text-muted-foreground text-lg">
          No blogs found.
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full table-auto border border-border rounded-lg">
              <thead className="bg-muted text-muted-foreground">
                <tr>
                  <th className="px-4 py-2 text-left">Title</th>
                  <th className="px-4 py-2 text-left">Author</th>
                  <th className="px-4 py-2 text-left">Category</th>
                  <th className="px-4 py-2 text-left">Date</th>
                  <th className="px-4 py-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedBlogs.map((blog) => (
                  <tr key={blog.id} className="border-t border-border">
                    <td className="px-4 py-2">{blog.title}</td>
                    <td className="px-4 py-2">{blog.author}</td>
                    <td className="px-4 py-2">{blog.category}</td>
                    <td className="px-4 py-2">{new Date(blog.date).toLocaleDateString()}</td>
                    <td className="px-4 py-2 flex justify-center gap-2">
                      <button
                        onClick={() => router.push(`/admin/dashboard/blogs/edit/${blog.id}`)}
                        className="hover:text-primary"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setBlogToDelete(blog);
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
            disabled={blogs.length === 0}
          />
        </>
      )}

      <PopupModal
        title="Delete Blog"
        message={blogToDelete ? `Are you sure you want to delete "${blogToDelete.title}"?` : ""}
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteConfirmed}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
}
