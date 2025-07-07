import { ReactNode } from "react";
import { CoreContent } from 'pliny/utils/contentlayer.js';
import type { Blog, Authors } from "contentlayer2/generated";
import Link from "@/components/Link";
import PageTitle from "@/components/PageTitle";
import SectionContainer from "@/components/SectionContainer";
import Image from "@/components/Image";
import Tag from "@/components/Tag";
import ScrollTopAndComment from "@/components/ScrollTopAndComment";

const postDateTemplate: Intl.DateTimeFormatOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

interface LayoutProps {
  content: CoreContent<Blog>;
  authorDetails: CoreContent<Authors>[];
  next?: { path: string; title: string };
  prev?: { path: string; title: string };
  children: ReactNode;
}

export default function PostLayout({
  content,
  authorDetails,
  next,
  prev,
  children,
}: LayoutProps) {
  const { /*filePath,*/ path, /*slug,*/ date, title, tags } = content;
  const basePath = path.split("/")[0];

  return (
    <SectionContainer>
      <ScrollTopAndComment />
      <article>
        <div className="xl:divide-y divide-cyan-700 xl:divide-cyan-700 divide-y">
          <header className="pt-6 xl:pb-6">
            <div className="space-y-1 text-center">
              <dl className="space-y-10">
                <div>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base leading-6 font-medium text-gray-400">
                    <time dateTime={date}>
                      {new Date(date).toLocaleDateString(
                        "en-EN",
                        postDateTemplate
                      )}
                    </time>
                  </dd>
                </div>
              </dl>
              <div>
                <PageTitle>{title}</PageTitle>
              </div>
            </div>
          </header>
          <div className="grid-rows-[auto_1fr] pb-8 xl:grid xl:grid-cols-4 xl:gap-x-6 xl:divide-y-0 divide-cyan-700">
            <dl className="pt-6 pb-10 xl:border-b xl:pt-11 border-gray-700">
              <dt className="sr-only">Authors</dt>
              <dd>
                <ul className="flex flex-wrap justify-center gap-4 sm:space-x-12 xl:block xl:space-y-8 xl:space-x-0">
                  {authorDetails.map((author) => (
                    <li
                      className="flex items-center space-x-2"
                      key={author.name}
                    >
                      {author.avatar && (
                        <Image
                          src={author.avatar}
                          width={38}
                          height={38}
                          alt="avatar"
                          className="h-10 w-10 rounded-full"
                        />
                      )}
                      <dl className="text-sm leading-5 font-medium whitespace-nowrap">
                        <dt className="sr-only">Name</dt>
                        <dd className="text-gray-100">{author.name}</dd>
                      </dl>
                    </li>
                  ))}
                </ul>
              </dd>
              <dd>
              <div className="text-sm leading-5 font-medium xl:col-start-1 xl:row-start-2 xl:divide-y divide-cyan-700 divide-y">
                {tags && (
                  <div className="py-4 xl:py-8">
                    <h2 className="text-xs tracking-wide uppercase text-gray-400">
                      Tags
                    </h2>
                    <div className="flex flex-wrap">
                      {tags.map((tag) => (
                        <Tag key={tag} text={tag} />
                      ))}
                    </div>
                  </div>
                )}
                {(next || prev) && (
                  <div className="py-4 xl:block xl:space-y-8 xl:py-8">
                    {prev && prev.path && (
                      <div>
                        <h2 className="text-xs tracking-wide  uppercase text-gray-400">
                          Previous Article
                        </h2>
                        <div className="text-primary-500 hover:text-primary-400">
                          <Link href={`/${prev.path}`}>{prev.title}</Link>
                        </div><br></br>
                      </div>
                    )}
                    {next && next.path && (
                      <div>
                        <h2 className="text-xs tracking-wide  uppercase text-gray-400">
                          Next Article
                        </h2>
                        <div className="text-primary-500 hover:text-primary-400">
                          <Link href={`/${next.path}`}>{next.title}</Link>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="pt-4 xl:pt-8">
                <Link
                  href={`/${basePath}`}
                  className="text-cyan-500 hover:text-cyan-600"
                  aria-label="Back to the blog"
                >
                  &larr; Back to the blog
                </Link>
              </div>
              </dd>
            </dl>
            <div className="divide-y  xl:col-span-3 xl:row-span-2 xl:pb-0 divide-cyan-700 ml-16">
              <div className="prose-invert max-w-none pt-10 pb-8">
                {children}
              </div>
            </div>
            <footer className="divide-y divide-cyan-700">
              
            </footer>
          </div>
        </div>
      </article>
    </SectionContainer>
  );
}
