import { graphqlRequest } from "@/lib/graphql";
import { IPost } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { Metadata } from "next";
import Link from "next/link";

const GET_POSTS = `
  query GetPosts($first: Int = 100) {
    posts(first: $first) {
      nodes {
        id
        title
        slug
        date
        excerpt(format: RENDERED)
        readingTimeMinutes
        betterExcerpt
     }
    }
  }
`;

export const metadata: Metadata = {
  title: "Modular Press | Next Client",
  description:
    "Nextjs implementation to fetch and display blog posts from headless wordpress application",
};

export default async function IndexPage() {
  const data = await graphqlRequest<any>(GET_POSTS);
  const posts = (data?.posts?.nodes || []) as IPost[];

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <div className="mb-10 text-center md:text-left">
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          Latest Posts
        </h2>
        <p className="mt-2 text-zinc-500 dark:text-zinc-400">
          Thoughts, ideas, and technical guides.
        </p>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
        {posts.map((post) => (
          <Link key={post.id} href={`/blog/${post.slug}`}>
            <article className="group relative flex cursor-pointer flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-6 transition-all hover:border-zinc-300 hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700">
              <div>
                <time className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                  {formatDate(post.date)}
                </time>
                <h3 className="mt-2 text-xl font-semibold text-zinc-900 group-hover:text-zinc-700 dark:text-zinc-100 dark:group-hover:text-zinc-300">
                  {post.title}
                </h3>
                <p className="mt-3 line-clamp-3 text-zinc-600 dark:text-zinc-400">
                  {post.betterExcerpt}
                </p>
              </div>
              <div className="mt-6 flex items-center text-sm font-medium text-zinc-900 dark:text-zinc-100">
                Read article
                <svg
                  className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </main>
  );
}
