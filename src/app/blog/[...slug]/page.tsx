import {
  sortPosts,
  coreContent,
  allCoreContent,
} from "pliny/utils/contentlayer.js";
import { allBlogs, allAuthors } from "contentlayer/generated";
import type { Authors, Blog } from "contentlayer/generated";
import PostLayout from "@/layouts/PostLayout";
import { notFound } from "next/navigation";
import MDXContentRenderer from "@/components/MDXContentRenderer"; // Import the new component

const defaultLayout = "PostLayout";
const layouts = { PostLayout };

export const generateStaticParams = async () => {
  return allBlogs.map((p) => ({
    slug: p.slug.split("/").map(decodeURI),
  }));
};

// Fetch post data separately
async function getPostData(slug: string) {
  const sortedCoreContents = allCoreContent(sortPosts(allBlogs));
  const postIndex = sortedCoreContents.findIndex((p) => p.slug === slug);
  if (postIndex === -1) return null;

  const post = allBlogs.find((p) => p.slug === slug) as Blog;
  const prev = sortedCoreContents[postIndex + 1] || null;
  const next = sortedCoreContents[postIndex - 1] || null;
  const authorDetails = (post?.authors || ["default"]).map((author) =>
    coreContent(allAuthors.find((p) => p.slug === author) as Authors)
  );

  return { post, prev, next, authorDetails };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const resolvedParams = await params;
  const slug = decodeURI(resolvedParams.slug.join("/"));
  const postData = await getPostData(slug);

  if (!postData) return notFound();

  const { post, prev, next, authorDetails } = postData;
  const Layout = layouts[defaultLayout];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            ...post.structuredData,
            author: authorDetails.map((author) => ({
              "@type": "Person",
              name: author.name,
            })),
          }),
        }}
      />
      <Layout
        content={coreContent(post)}
        authorDetails={authorDetails}
        next={next}
        prev={prev}
      >
        <MDXContentRenderer code={post.body.code} toc={post.toc} />
      </Layout>
    </>
  );
}
