'use client'
import Image from 'next/image'
import { Calendar, Clock, User } from 'lucide-react'

export function BlogHeader({ title, author, date, readTime }) {
  return (
    <header className="mb-12">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground mb-6 leading-tight">
        {title}
      </h1>
      <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
        <div className="flex items-center gap-2">
          <User size={18} />
          <span>{author}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar size={18} />
          <span>{date}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock size={18} />
          <span>{readTime}</span>
        </div>
      </div>
    </header>
  )
}

export function BlogTags({ tags }) {
  return (
    <div className="mt-6 flex gap-3 flex-wrap">
      {tags.map((tag, idx) => (
        <span
          key={idx}
          className="px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-full"
        >
          {tag}
        </span>
      ))}
    </div>
  )
}

export function Divider() {
  return (
    <div className="w-full my-12">
      <div className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
    </div>
  )
}

export function BlogImage({ src, alt, width = 1200, height = 675 }) {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden mb-8 w-full">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="w-full h-auto object-cover"
        priority
      />
    </div>
  )
}

export function BlogQuote({ text }) {
  return (
    <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-r-lg my-8">
      <p className="text-foreground italic">{text}</p>
    </div>
  )
}

export function BlogContent({ children }) {
  return (
    <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
      {children}
    </div>
  )
}

export function BlogSection({ title, children }) {
  return (
    <>
      <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">{title}</h2>
      {children}
    </>
  )
}

export function Bullet({ children }) {
  return (
    <li className="flex gap-3">
      <span className="text-primary font-bold">•</span>
      <span className="text-muted-foreground">{children}</span>
    </li>
  )
}

export function AuthorCard({ name, role }) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
        <User className="text-primary" size={24} />
      </div>
      <div>
        <p className="font-bold text-foreground">{name}</p>
        <p className="text-sm text-muted-foreground">{role}</p>
      </div>
    </div>
  )
}
