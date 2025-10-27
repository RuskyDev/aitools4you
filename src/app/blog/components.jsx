import Image from 'next/image'
import { Calendar, Clock, User } from 'lucide-react'

export function BlogHeader({ title, author, date, readTime }) {
  return (
    <header className="mb-12">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground mb-6 leading-tight">
        {title}
      </h1>
      <div className="flex flex-wrap items-center gap-6 text-muted-foreground" aria-label="Article metadata">
        <div className="flex items-center gap-2" itemProp="author" itemScope itemType="https://schema.org/Person">
          <User size={18} />
          <span itemProp="name">{author}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar size={18} />
          <time dateTime={date}>{date}</time>
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
    <ul className="mt-6 flex gap-3 flex-wrap" aria-label="Tags">
      {tags.map((tag, idx) => (
        <li key={idx}>
          <span className="px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-full">
            {tag}
          </span>
        </li>
      ))}
    </ul>
  )
}

export function Divider() {
  return (
    <div className="w-full my-12" role="separator">
      <div className="h-px bg-linear-to-r from-transparent via-primary/50 to-transparent" />
    </div>
  )
}

export function BlogImage({ src, alt, width = 1200, height = 675 }) {
  return (
    <figure className="bg-card border border-border rounded-xl overflow-hidden mb-8 w-full">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="w-full h-auto object-cover"
        priority
      />
    </figure>
  )
}

export function BlogQuote({ text }) {
  return (
    <blockquote className="bg-primary/5 border-l-4 border-primary p-6 rounded-r-lg my-8">
      <p className="text-foreground italic">{text}</p>
    </blockquote>
  )
}

export function BlogContent({ children }) {
  return (
    <article className="prose prose-lg max-w-none text-muted-foreground space-y-6" itemScope itemType="https://schema.org/Article">
      {children}
    </article>
  )
}

export function BlogSection({ title, children }) {
  return (
    <section className="mt-12">
      <h2 className="text-3xl font-bold text-foreground mb-4">{title}</h2>
      {children}
    </section>
  )
}

export function BlogTable({ columns, data }) {
  return (
    <div className="overflow-x-auto my-8 rounded-xl border border-border bg-card">
      <table className="w-full border-collapse text-left text-muted-foreground">
        <thead className="bg-primary/5 text-foreground">
          <tr>
            {columns.map((col, idx) => (
              <th key={idx} className="px-6 py-3 text-sm font-semibold uppercase tracking-wide border-b border-border">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rIdx) => (
            <tr key={rIdx} className="hover:bg-primary/5 transition-colors">
              {row.map((cell, cIdx) => (
                <td key={cIdx} className="px-6 py-4 border-b border-border text-foreground/90">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
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
    <aside className="flex items-center gap-4 mt-12" itemProp="author" itemScope itemType="https://schema.org/Person">
      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
        <User className="text-primary" size={24} />
      </div>
      <div>
        <p className="font-bold text-foreground" itemProp="name">{name}</p>
        <p className="text-sm text-muted-foreground">{role}</p>
      </div>
    </aside>
  )
}
