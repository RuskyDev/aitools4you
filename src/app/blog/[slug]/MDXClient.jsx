'use client'

import { MDXRemote } from 'next-mdx-remote'
import * as components from '../components'

export default function MDXClient({ source }) {
  return <MDXRemote {...source} components={components} />
}
