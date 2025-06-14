import Link from "@/components/Link";
import Tag from "@/components/Tag";
import NewsletterForm from "@/components/NewsletterForm";

function formatDate(date: string, locale: string = "en-US"): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(date).toLocaleDateString(locale, options);
}

const MAX_DISPLAY = 5;

export default function Home({ posts }: any) {
  return (
    <div className="flex flex-col">
      <div className="divide-y divide-cyan-700 px-4 md:px-8 w-full max-w-3xl mx-auto">
        <div className="pb-8 md:space-y-5 max-w-3xl mx-auto">
          <h1 className="text-3xl leading-9 font-extrabold tracking-tight sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 text-gray-100">
            Latest
          </h1>
          <p className="text-lg leading-7 text-gray-400">
            Stay updated with the latest updates about the Automated Aquarium.
          </p>
        </div>
        <ul className="divide-y divide-cyan-700 max-w-3xl mx-auto">
          {!posts.length && "No posts found."}
          {posts.slice(0, MAX_DISPLAY).map((post: any) => {
            const { slug, date, title, summary, tags } = post;
            return (
              <li key={slug} className="py-12">
                <article>
                  <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-base leading-6 font-medium text-gray-400">
                        <time dateTime={date}>{formatDate(date, "en-EN")}</time>
                      </dd>
                    </dl>
                    <div className="space-y-5 xl:col-span-3">
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl leading-8 font-bold tracking-tight">
                            <Link
                              href={`/blog/${slug}`}
                              className="text-gray-100"
                            >
                              {title}
                            </Link>
                          </h2>
                          <div className="flex flex-wrap">
                            {tags.map((tag: any) => (
                              <Tag key={tag} text={tag} />
                            ))}
                          </div>
                        </div>
                        <div className="prose max-w-none text-gray-400">
                          {summary}
                        </div>
                      </div>
                      <div className="text-base leading-6 font-medium">
                        <Link
                          href={`/blog/${slug}`}
                          className="text-cyan-500 hover:text-cyan-600"
                          aria-label={`Read more: "${title}"`}
                        >
                          Read more &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
        <div className="w-full mt-12 pt-12 max-w-3xl mx-auto ">
          <div className="max-w-xl mx-auto px-6 py-8  rounded-lg shadow-md border border-cyan-700">
            <NewsletterForm
              title="Subscribe to the Automated Aquarium Newsletter"
              description="Get notified when new content is published. No spam, unsubscribe anytime."
              buttonText="Subscribe"
              errorMessage="An error occurred. Please try again."
              successMessage="Thanks for subscribing!"
              inputPlaceholder="Enter your email"
            />
          </div>
        </div>
      </div>
      {/* {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base leading-6 font-medium mt-6">
          <Link
            href="/tags"
            className="text-cyan-500 hover:text-cyan-600"
            aria-label="All posts"
          >
            All Posts &rarr;
          </Link>
        </div>
      )} */}
    </div>
  );
}
