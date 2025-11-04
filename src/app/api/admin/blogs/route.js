import { NextResponse } from "next/server"

let blogs = [
  {
    id: 1,
    title: "Understanding React Server Components",
    author: "Jane Doe",
    category: "React",
    date: "2025-10-01",
  },
  {
    id: 2,
    title: "Next.js Middleware Deep Dive",
    author: "John Smith",
    category: "Next.js",
    date: "2025-10-10",
  },
  {
    id: 3,
    title: "Optimizing Web Performance in 2025",
    author: "Alex Kim",
    category: "Web Dev",
    date: "2025-09-22",
  },
]

// GET /api/admin/blogs
export async function GET() {
  return NextResponse.json(blogs)
}

// POST /api/admin/blogs
export async function POST(req) {
  const { title, author, category } = await req.json()
  const newBlog = {
    id: blogs.length ? blogs[blogs.length - 1].id + 1 : 1,
    title,
    author,
    category,
    date: new Date().toISOString(),
  }
  blogs.push(newBlog)
  return NextResponse.json(newBlog, { status: 201 })
}

// PATCH /api/admin/blogs/:id
export async function PATCH(req) {
  const url = new URL(req.url)
  const id = parseInt(url.pathname.split("/").pop())
  const { title, author, category } = await req.json()
  blogs = blogs.map((b) =>
    b.id === id ? { ...b, title, author, category } : b
  )
  return NextResponse.json({ success: true })
}

// DELETE /api/admin/blogs/:id
export async function DELETE(req) {
  const url = new URL(req.url)
  const id = parseInt(url.pathname.split("/").pop())
  blogs = blogs.filter((b) => b.id !== id)
  return NextResponse.json({ success: true })
}
