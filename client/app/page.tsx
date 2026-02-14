import PostCard from "@/components/post-card";
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
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </main>
  );
}
