'use client'

import { usePathname } from 'next/navigation'
import { slug } from 'github-slugger'
import { formatDate } from 'pliny/utils/formatDate.js'
import { CoreContent } from 'pliny/utils/contentlayer.js'
import type { Blog } from 'contentlayer2/generated'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import tagData from '@/app/tag-data.json'

interface PaginationProps {
  totalPages: number
  currentPage: number
}
interface ListLayoutProps {
  posts: CoreContent<Blog>[]
  title: string
  initialDisplayPosts?: CoreContent<Blog>[]
  pagination?: PaginationProps
}

function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname()
  const segments = pathname.split('/')
  const lastSegment = segments[segments.length - 1]
  const basePath = pathname
    .replace(/^\//, '') // Remove leading slash
    .replace(/\/page\/\d+$/, '') // Remove any trailing /page
  console.log(pathname)
  console.log(basePath)
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <div className="py-8">
      <nav className="flex items-center justify-between">
        {!prevPage && (
          <button className="px-4 py-2 text-gray-400 border rounded cursor-not-allowed opacity-50 border-gray-700" disabled={!prevPage}>
            Previous
          </button>
        )}
        {prevPage && (
          <Link
            href={currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`}
            rel="prev"
            className="px-4 py-2 border rounded transition-colors duration-200 bg-cyan-800 text-gray-200 hover:bg-cyan-300 border-cyan-500"
          >
            Previous
          </Link>
        )}
        <span className="font-medium text-gray-200">
          {currentPage} of {totalPages}
        </span>
        {!nextPage && (
          <button className="px-4 py-2 text-gray-400 border rounded cursor-not-allowed opacity-50 border-gray-700" disabled={!nextPage}>
            Next
          </button>
        )}
        {nextPage && (
          <Link 
            href={`/${basePath}/page/${currentPage + 1}`} 
            rel="next"
            className="px-4 py-2 border rounded transition-colors duration-200 bg-cyan-800 text-gray-200 hover:bg-cyan-300 border-cyan-500"
          >
            Next
          </Link>
        )}
      </nav>
    </div>
  )
}

export default function ListLayoutWithTags({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
}: ListLayoutProps) {
  const pathname = usePathname()
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])

  const displayPosts = initialDisplayPosts.length > 0 ? initialDisplayPosts : posts

  return (
    <>
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 border-b border-cyan-700 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
            Tag: {title}
          </h1>
        </div>
        
        <div className="mt-6 flex flex-col sm:flex-row gap-8">
          {/* Sidebar */}
          <div className="sm:block w-half sm:w-72 flex-shrink-0 sticky top-8 self-start">
            <div className="rounded-lg shadow-md bg-cyan-700 shadow-cyan-700/40 overflow-hidden py-2">
              <div className="px-6 py-5">
                {pathname.startsWith('/tags') ? (
                  <h3 className="text-primary-500 font-bold uppercase mb-4">All Posts</h3>
                ) : (
                  <Link
                    href={`/tags`}
                    className="font-bolduppercase text-gray-300 hover:text-primary-500 hover:text-primary-500 mb-4 block"
                  >
                    All Posts
                  </Link>
                )}
                <ul className="space-y-1">
                  {sortedTags.map((t) => {
                    return (
                      <li key={t}>
                        {decodeURI(pathname.split('/tags/')[1]) === slug(t) ? (
                          <span className="text-primary-500 block px-3 py-2 text-sm font-bold uppercase rounded bg-primary-50 bg-primary-900/20">
                            {`${t} (${tagCounts[t]})`}
                          </span>
                        ) : (
                          <Link
                            href={`/tags/${slug(t)}`}
                            className="block px-3 py-2 text-sm font-medium uppercase text-gray-300 hover:text-primary-500 hover:text-primary-500 hover:bg-gray-100 hover:bg-gray-700/30 rounded transition-colors"
                            aria-label={`View posts tagged ${t}`}
                          >
                            {`${t} (${tagCounts[t]})`}
                          </Link>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
          </div>
          
          {/* Main content */}
          <div className="flex-grow">
            <ul className="divide-y divide-cyan-700">
              {displayPosts.map((post) => {
                const { path, date, title, summary, tags } = post
                return (
                  <li key={path} className="py-4">
                    <article>
                      <div className="space-y-4 py-2">
                        <dl>
                          <dt className="sr-only">Published on</dt>
                          <dd className="text-sm font-medium text-gray-400">
                            <time dateTime={date} suppressHydrationWarning>
                              {formatDate(date, 'en-EN')}
                            </time>
                          </dd>
                        </dl>
                        <div>
                          <h2 className="text-2xl font-bold tracking-tight mb-3">
                            <Link href={`/${path}`} className=" text-gray-100 hover:text-primary-600 hover:text-primary-400 transition-colors">
                              {title}
                            </Link>
                          </h2>
                          {tags && tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-3">
                              {tags.map((tag) => <Tag key={tag} text={tag} />)}
                            </div>
                          )}
                        </div>
                        <div className="prose max-w-none text-gray-400">
                          {summary}
                        </div>
                      </div>
                    </article>
                  </li>
                )
              })}
            </ul>
            
            {pagination && pagination.totalPages > 1 && (
              <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
            )}
          </div>
        </div>
      </div>
    </>
  )
}