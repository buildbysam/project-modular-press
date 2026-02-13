"use server";

import { GraphQLClient } from "graphql-request";

const endpoint = process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL;
const secret = process.env.WP_HEADLESS_SECRET;

if (!endpoint) {
  throw new Error("NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL is missing.");
}

if (!secret) {
  throw new Error("WP_HEADLESS_SECRET is missing from environment variables.");
}

const client = new GraphQLClient(endpoint, {
  headers: {
    Authorization: `Bearer ${secret}`,
  },
});

export async function graphqlRequest<T>(
  query: string,
  variables: Record<string, any> = {},
): Promise<T> {
  try {
    const data = await client.request<T>(query, variables);
    return data;
  } catch (err: any) {
    console.error(
      "GraphQL Request Failed:",
      err.response?.errors || err.message,
    );
    throw new Error("Failed to fetch data from WordPress.");
  }
}
