'use client'

import { useState } from 'react'
import { Plus, Image as ImageIcon, List, Quote, Type, Download, Eye, Trash2 } from 'lucide-react'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'

export default function CreateBlogPage() {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [role, setRole] = useState('')
  const [description, setDescription] = useState('')
  const [keywords, setKeywords] = useState('')
  const [image, setImage] = useState('')
  const [sections, setSections] = useState([])
  const [previewMode, setPreviewMode] = useState(false)

  const addSection = () => setSections([...sections, { id: `s-${Date.now()}`, type: 'text', title: '', content: '' }])
  const addImageSection = () => setSections([...sections, { id: `s-${Date.now()}`, type: 'image', src: '', alt: '' }])
  const addQuoteSection = () => setSections([...sections, { id: `s-${Date.now()}`, type: 'quote', content: '' }])
  const addListSection = () => setSections([...sections, { id: `s-${Date.now()}`, type: 'list', items: [''] }])

  const updateSection = (index, field, value) => {
    const newSections = [...sections]
    newSections[index][field] = value
    setSections(newSections)
  }

  const updateListItem = (index, itemIndex, value) => {
    const newSections = [...sections]
    newSections[index].items[itemIndex] = value
    setSections(newSections)
  }

  const addListItem = (index) => {
    const newSections = [...sections]
    newSections[index].items.push('')
    setSections(newSections)
  }

  const removeListItem = (sectionIndex, itemIndex) => {
    const newSections = [...sections]
    newSections[sectionIndex].items.splice(itemIndex, 1)
    setSections(newSections)
  }

  const deleteSection = (index) => {
    const newSections = [...sections]
    newSections.splice(index, 1)
    setSections(newSections)
  }

  const handleDragEnd = (result) => {
    if (!result.destination) return
    const newSections = Array.from(sections)
    const [moved] = newSections.splice(result.source.index, 1)
    newSections.splice(result.destination.index, 0, moved)
    setSections(newSections)
  }

  const generateMDX = () => {
    const metadata = `---
title: "${title}"
author: "${author}"
role: "${role}"
date: "${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}"
readTime: "8 min read"
description: "${description}"
keywords: [${keywords.split(',').map(k => `"${k.trim()}"`).join(', ')}]
publishedAt: "${new Date().toISOString()}"
updatedAt: "${new Date().toISOString()}"
image: "${image}"
---\n\n`

    const imports = `import { BlogHeader, Divider, BlogContent, BlogImage, BlogSection, AuthorCard, Bullet } from '../components'\nimport Link from 'next/link'\n\n`

    const header = `<BlogHeader />\n\n<Divider />\n\n<BlogContent>\n`
    const footer = `</BlogContent>\n\n<Divider />\n\n<AuthorCard />\n`

    const content = sections
      .map((section) => {
        if (section.type === 'text') {
          return `  <BlogSection title="${section.title}">\n    ${section.content.replace(/\n/g, '\n    ').trim()}\n  </BlogSection>\n`
        }
        if (section.type === 'image') {
          return `  <BlogImage src="${section.src}" alt="${section.alt}" />\n`
        }
        if (section.type === 'quote') {
          return `  <Quote>\n    ${section.content.replace(/\n/g, '\n    ').trim()}\n  </Quote>\n`
        }
        if (section.type === 'list') {
          return `  <ul className="space-y-4 my-6">\n${section.items.map(i => `    <Bullet>${i}</Bullet>`).join('\n')}\n  </ul>\n`
        }
        return ''
      })
      .join('\n')

    const finalMDX = metadata + imports + header + content + footer
    const blob = new Blob([finalMDX], { type: 'text/mdx' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `${title.replace(/\s+/g, '-') || 'post'}.mdx`
    a.click()
  }

  return (
    <div className="max-w-6xl mx-auto flex-1 py-8">
      <h1 className="text-3xl font-bold mb-6 text-foreground">Create New Blog</h1>

      <div className="space-y-4">
        {!previewMode && (
          <>
            <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" className="w-full p-3 border border-border rounded bg-background text-foreground" />

            <section className="mt-6 border border-border rounded p-4 bg-muted/30">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">Builder</h2>
                <div className="flex items-center gap-2">
                  <button onClick={addSection} type="button" className="px-3 py-2 bg-muted rounded flex items-center gap-2 hover:bg-background"><Type size={16} /> Text</button>
                  <button onClick={addImageSection} type="button" className="px-3 py-2 bg-muted rounded flex items-center gap-2 hover:bg-background"><ImageIcon size={16} /> Image</button>
                  <button onClick={addQuoteSection} type="button" className="px-3 py-2 bg-muted rounded flex items-center gap-2 hover:bg-background"><Quote size={16} /> Quote</button>
                  <button onClick={addListSection} type="button" className="px-3 py-2 bg-muted rounded flex items-center gap-2 hover:bg-background"><List size={16} /> List</button>
                </div>
              </div>

              <div className="max-h-[70vh] overflow-y-auto border-t border-border pt-4 pr-2">
                <DragDropContext onDragEnd={handleDragEnd}>
                  <Droppable droppableId="sections">
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.droppableProps}>
                        {sections.map((section, index) => (
                          <Draggable key={section.id} draggableId={section.id} index={index}>
                            {(provided) => (
                              <div ref={provided.innerRef} {...provided.draggableProps} className="border border-border rounded p-4 mb-4 bg-background relative">
                                <div className="absolute right-3 top-3 flex gap-2">
                                  <button {...provided.dragHandleProps} type="button" className="px-2 py-1 rounded hover:bg-muted">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 6h.01M8 12h.01M8 18h.01M12 6h.01M12 12h.01M12 18h.01M16 6h.01M16 12h.01M16 18h.01" /></svg>
                                  </button>
                                  <button onClick={() => deleteSection(index)} type="button" className="px-2 py-1 rounded hover:bg-red-50">
                                    <Trash2 size={16} />
                                  </button>
                                </div>

                                {section.type === 'text' && (
                                  <>
                                    <input value={section.title} onChange={e => updateSection(index, 'title', e.target.value)} placeholder="Section Title" className="w-full p-2 border border-border rounded bg-background text-foreground" />
                                    <textarea value={section.content} onChange={e => updateSection(index, 'content', e.target.value)} placeholder="Section Content" className="w-full p-2 border border-border rounded bg-background text-foreground h-32 mt-3" />
                                  </>
                                )}

                                {section.type === 'image' && (
                                  <>
                                    <input value={section.src} onChange={e => updateSection(index, 'src', e.target.value)} placeholder="Image Source (filename or URL)" className="w-full p-2 border border-border rounded bg-background text-foreground" />
                                    <input value={section.alt} onChange={e => updateSection(index, 'alt', e.target.value)} placeholder="Alt Text" className="w-full p-2 border border-border rounded bg-background text-foreground mt-3" />
                                  </>
                                )}

                                {section.type === 'quote' && (
                                  <textarea value={section.content} onChange={e => updateSection(index, 'content', e.target.value)} placeholder="Quote Content" className="w-full p-2 border border-border rounded bg-background text-foreground h-24" />
                                )}

                                {section.type === 'list' && (
                                  <div>
                                    {section.items.map((item, i) => (
                                      <div key={i} className="flex gap-2 items-center mb-2">
                                        <input value={item} onChange={e => updateListItem(index, i, e.target.value)} placeholder={`List Item ${i + 1}`} className="flex-1 p-2 border border-border rounded bg-background text-foreground" />
                                        <button onClick={() => removeListItem(index, i)} type="button" className="px-2 py-1 rounded hover:bg-red-50">
                                          <Trash2 size={14} />
                                        </button>
                                      </div>
                                    ))}
                                    <div>
                                      <button onClick={() => addListItem(index)} type="button" className="px-3 py-2 bg-muted rounded hover:bg-background text-sm">+ Add Item</button>
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </div>
            </section>

            <section className="mt-6 border border-border rounded p-4 bg-muted/30">
              <h2 className="text-lg font-semibold mb-4 text-foreground">Blog Options</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input value={author} onChange={e => setAuthor(e.target.value)} placeholder="Author" className="w-full p-3 border border-border rounded bg-background text-foreground" />
                <input value={role} onChange={e => setRole(e.target.value)} placeholder="Role (e.g. Technical Writer)" className="w-full p-3 border border-border rounded bg-background text-foreground" />
                <input value={image} onChange={e => setImage(e.target.value)} placeholder="Image filename (e.g. my-image.webp)" className="w-full p-3 border border-border rounded bg-background text-foreground" />
                <input value={keywords} onChange={e => setKeywords(e.target.value)} placeholder="Keywords (comma separated)" className="w-full p-3 border border-border rounded bg-background text-foreground" />
              </div>
              <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Short Description" className="w-full p-3 border border-border rounded bg-background text-foreground h-20 mt-4" />
            </section>
          </>
        )}

        {previewMode && (
          <div className="border border-border rounded p-6 bg-background text-foreground space-y-6">
            <h2 className="text-2xl font-bold">{title}</h2>
            <p className="text-sm text-muted-foreground">By {author} — {role}</p>
            <p className="italic text-muted-foreground">{description}</p>
            {image && <img src={image} alt={title} className="rounded-md my-4" />}
            {sections.map((section, i) => (
              <div key={i}>
                {section.type === 'text' && (
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{section.title}</h3>
                    <p className="whitespace-pre-line leading-relaxed">{section.content}</p>
                  </div>
                )}
                {section.type === 'image' && <img src={section.src} alt={section.alt} className="rounded-md my-4" />}
                {section.type === 'quote' && <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground">{section.content}</blockquote>}
                {section.type === 'list' && (
                  <ul className="list-disc list-inside space-y-1">
                    {section.items.map((item, j) => <li key={j}>{item}</li>)}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-end gap-3 mt-6">
          <button onClick={() => setPreviewMode(!previewMode)} type="button" className="px-6 py-3 bg-muted rounded flex items-center gap-2 hover:bg-background">
            <Eye size={18} /> {previewMode ? 'Edit Mode' : 'Preview'}
          </button>

          <button onClick={generateMDX} type="button" className="px-6 py-3 bg-primary text-primary-foreground rounded flex items-center gap-2 hover:opacity-90">
            <Download size={18} /> Generate MDX
          </button>
        </div>
      </div>
    </div>
  )
}