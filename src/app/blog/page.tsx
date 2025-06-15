import { allBlogs } from "contentlayer2/generated";
import Main from "./Main";

export default function Blog() {
  const posts = allBlogs
    .filter((post) => post.draft !== true)
    .sort((a, b) => (a.date > b.date ? -1 : 1));
  return (
    <div className="grid-rows-[20px_1fr_20px] items-center justify-items-center p-4 pb-20 gap-16 sm:p-8 md:pl-20 mx-auto max-w-7xl w-full">
      <Main posts={posts} />
    </div>
  );
}
