export interface ISinglePost {
  id: string;
  title: string;
  date: string;
  modified: string;
  content: string;
  readingTimeMinutes: string;
  betterExcerpt: string;
  categories: { nodes: { name: string; slug: string }[] };
}

export interface IPost {
  id: string;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  readingTimeMinutes: string;
  betterExcerpt: string;
}
