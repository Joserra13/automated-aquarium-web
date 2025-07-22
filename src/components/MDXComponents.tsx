import TOCInline from 'pliny/ui/TOCInline.js'
import Pre from 'pliny/ui/Pre.js'
import BlogNewsletterForm from 'pliny/ui/BlogNewsletterForm.js'
import type { MDXComponents } from 'mdx/types'
import Image from 'next/image'
import CustomLink from './Link'
import TableWrapper from './TableWrapper'

export const components: MDXComponents = {
  Image,
  TOCInline,
  a: CustomLink,
  pre: Pre,
  table: TableWrapper,
  BlogNewsletterForm,
  // Add these basic markdown elements
  p: (props) => <p className="my-4" {...props} />,
  h1: (props) => <h1 className="text-3xl font-bold my-4 text-cyan-500" {...props} />,
  h2: (props) => <h2 className="text-2xl font-bold my-4 text-cyan-500" {...props} />,
  h3: (props) => {
    const { children } = props;

    // Create ID from text content
    const id = typeof children === 'string'
      ? children.toLowerCase().replace(/\s+/g, '-')
      : '';

    return (<h3 className="text-xl font-bold my-3 text-cyan-500" {...props} id={id}/>)
  },
  h4: (props) => <h4 className="text-lg font-bold my-2 text-cyan-500" {...props} />,
  ul: (props) => <ul className="list-disc pl-6 my-4" {...props} />,
  ol: (props) => <ol className="list-decimal pl-6 my-4" {...props} />,
  li: (props) => <li className="my-1" {...props} />,
  blockquote: (props) => <blockquote className="border-l-4 border-gray-500 pl-4 italic my-4" {...props} />,
  hr: () => <hr className="my-6" />,
  strong: (props) => <strong className="font-bold" {...props} />,
  em: (props) => <em className="italic" {...props} />,
  code: (props) => <code className="bg-gray-500 rounded px-1 py-0.5" {...props} />,
}