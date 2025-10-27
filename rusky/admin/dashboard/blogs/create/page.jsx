'use client'

import { Plus } from 'lucide-react'

export default function CreateBlogPage() {
  return (
    <div className="max-w-7xl mx-auto flex-1 pt-8">
      <h1 className="text-3xl font-bold text-foreground mb-6">Create new blog</h1>
      <form className="space-y-6">
        <input
          type="text"
          placeholder="Title"
          className="w-full p-3 border border-border rounded bg-background text-foreground"
        />

        <div>
          <div className="flex flex-wrap gap-2 mb-2 border border-border p-2 rounded bg-muted">
            <button type="button" className="p-2 rounded hover:bg-background text-foreground" title="Button">
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <textarea
            id="content"
            className="w-full h-96 p-3 border border-border rounded bg-background text-foreground font-mono text-sm"
          />
        </div>

        <div className="flex justify-end gap-3">
          <button type="button" className="px-6 py-3 bg-secondary text-secondary-foreground rounded hover:opacity-90">
            Preview
          </button>
          <button type="submit" className="px-6 py-3 bg-primary text-primary-foreground rounded hover:opacity-90">
            Publish Blog
          </button>
        </div>
      </form>
    </div>
  )
}
