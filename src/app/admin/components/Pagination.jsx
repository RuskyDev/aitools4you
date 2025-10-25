'use client'

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="flex justify-end items-center gap-2 mt-4">
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded border border-border hover:bg-muted transition disabled:opacity-50"
      >
        Previous
      </button>

      <span className="px-2">{currentPage} / {totalPages}</span>

      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded border border-border hover:bg-muted transition disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
