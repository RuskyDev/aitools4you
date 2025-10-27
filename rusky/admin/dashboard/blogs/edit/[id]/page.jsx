'use client'

import { useParams } from "next/navigation"

export default function EditBlogPage() {
  const { id } = useParams()

  return (
    <div className="max-w-7xl mx-auto flex-1 pt-8">
      <h1 className="text-3xl font-bold text-foreground">Edit Blog #{id}</h1>
      <p>Form for editing blog with ID {id} will go here.</p>
    </div>
  )
}
