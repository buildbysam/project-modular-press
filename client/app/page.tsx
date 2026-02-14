import PostCard from "@/components/post-card";
import { graphqlRequest } from "@/lib/graphql";
import { IPost } from "@/lib/types";
import { Metadata } from "next";

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

  const columns = [
    posts.filter((_, index) => index % 2 === 0),
    posts.filter((_, index) => index % 2 === 1),
  ];

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

      {!posts.length ? (
        <p className="text-zinc-500 dark:text-zinc-400 text-center text-xl">
          No posts available
        </p>
      ) : (
        <div className="grid md:grid-cols-2 gap-3 items-start pt-3 md:pt-5 px-0.5">
          {columns.map((col, idx) => (
            <div key={idx} className="inline-grid gap-y-3.5">
              {col.map((post, idx) => (
                <PostCard key={idx} post={post} />
              ))}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
