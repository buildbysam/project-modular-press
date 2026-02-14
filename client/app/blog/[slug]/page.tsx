import { graphqlRequest } from "@/lib/graphql";
import { ISinglePost } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { Metadata } from "next";
import { notFound } from "next/navigation";

const GET_ALL_POST_SLUGS = `
  query GetAllPostSlugs {
    posts(first: 100) {
      nodes {
        slug
      }
    }
  }
`;

const SINGLE_POST_QUERY = `
  query SinglePost($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      id
      title
      slug
      date
      modified
      content(format: RENDERED)
      readingTimeMinutes
      betterExcerpt
      categories {
        nodes {
          name
          slug
        }
      }
    }
  }
`;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const data = await graphqlRequest<any>(GET_ALL_POST_SLUGS);
  const posts = (data?.posts?.nodes || []) as { slug: string }[];

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await graphqlRequest<any>(SINGLE_POST_QUERY, { slug });
  const post = data?.post as ISinglePost;
  if (!post) {
    return { title: "Post Not Found" };
  }
  return {
    title: `${post.title} | Modular Press`,
    description: post.betterExcerpt,
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await graphqlRequest<any>(SINGLE_POST_QUERY, { slug });

  const post = data?.post as ISinglePost;
  if (!post) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-12 sm:py-16">
      <header className="mb-10 flex flex-col items-start gap-4 border-b border-zinc-200 pb-10 dark:border-zinc-800">
        {post.categories.nodes.map((category) => (
          <span
            key={category.slug}
            className="inline-flex items-center rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-800 transition-colors hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
          >
            {category.name}
          </span>
        ))}

        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl md:text-5xl dark:text-zinc-50">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm font-medium text-zinc-500 dark:text-zinc-400">
          <time dateTime={formatDate(post.date)}>
            Published {formatDate(post.date)}
          </time>

          <span
            aria-hidden="true"
            className="h-1 w-1 rounded-full bg-zinc-300 dark:bg-zinc-700"
          />

          <time dateTime={formatDate(post.modified)}>
            Updated {formatDate(post.modified)}
          </time>

          <span
            aria-hidden="true"
            className="h-1 w-1 rounded-full bg-zinc-300 dark:bg-zinc-700"
          />

          <span>{post.readingTimeMinutes} min read</span>
        </div>
      </header>

      <article className="text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
        <div
          className="space-y-6"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* <blockquote className="my-8 border-l-4 border-zinc-300 bg-zinc-50 py-3 pl-5 pr-3 italic text-zinc-800 dark:border-zinc-700 dark:bg-zinc-900/50 dark:text-zinc-200">
        </blockquote> */}
      </article>
    </main>
  );
}
