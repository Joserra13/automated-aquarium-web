import { allBlogs } from "contentlayer/generated";
import Main from "./Main";

export default function Blog() {
  const posts = allBlogs
    .filter((post) => post.draft !== true)
    .sort((a, b) => (a.date > b.date ? -1 : 1));
  return (
    <div className="flex grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:pl-20 ml-16 mr-16">
      <Main posts={posts} />
    </div>
  );
}
