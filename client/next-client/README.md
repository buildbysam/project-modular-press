# Nextjs client - Headless WordPress Frontend

Simple Next.js (App Router) frontend that fetches blog posts from a headless WordPress backend via **GraphQL** (WPGraphQL).

Displays posts list on homepage and single post pages.

## Features

- Fetches all blog posts using GraphQL
- Dynamic single post pages (`/posts/[slug]`)
- Uses `graphql-request` (lightweight client)
- Server-side data fetching (App Router)
- Environment variables for backend URL & secret key
- Protected GraphQL requests using `X-Headless-Secret` header
- Tailwind CSS + responsive design

## Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/buildbysam/project-modular-press.git
cd project-modular-press/client/next-client
```

### 2. Install dependencies

```bash
npm install
```

### 3. Copy and configure environment file

```bash
cp .env.example .env.local
```

Edit .env.local with your values:

```env
# Your WordPress GraphQL endpoint
NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL=http://localhost:8000/graphql

# Secret key (must match HEADLESS_SECRET_KEY in WordPress .env)
WP_HEADLESS_SECRET=your-strong-random-secret-here-64-chars-min
```

**Important**

- `NEXT_PUBLIC_` prefix is only for the URL (publicly safe)
- `WP_HEADLESS_SECRET` is server-only, never use `NEXT_PUBLIC_` for secrets

### 4. Start development server

```bash
npm run dev
```

Open http://localhost:3000
You should see your WordPress blog posts listed.

### 5. Verify single post works

Navigate to any post slug, e.g.:

```text
http://localhost:3000/posts/hello-world
```

Data should load from WordPress GraphQL.

### 6. Troubleshooting

- 401 Invalid or missing X-Headless-Secret header
  - Make sure `WP_HEADLESS_SECRET` matches exactly the value in WordPress `.env` (`HEADLESS_SECRET_KEY`)
- CORS error
  - Add `http://localhost:3000` to `$allowed_origins` in WordPress `headless-mode.php`
- No data
  - Confirm WordPress GraphQL endpoint works in browser (`http://localhost:8000/graphql`)

### Production Deployment (Vercel)

- Push code to GitHub
- Connect repo to Vercel → auto-deploys on push
- In Vercel → Project Settings → Environment Variables → add:

```text
NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL   https://your-wp-domain.com/graphql
WP_HEADLESS_SECRET                  your-production-secret-key
```

### Security Notes

- Never expose `WP_HEADLESS_SECRET` in client-side code
- Use strong random value (64+ chars)
- In production: restrict CORS to your Vercel domain only

---
