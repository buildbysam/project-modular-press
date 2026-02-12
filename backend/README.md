# Headless WordPress Backend

Minimal WordPress installation configured as a **pure headless CMS** using **WPGraphQL**.  
Only blog posts and pages are used. No custom post types, no ACF, no custom theme.

The frontend rendering is completely disabled. All traffic is expected to go through the `/graphql` endpoint.

## Features

- WPGraphQL endpoint fully enabled (`/graphql`)
- Frontend theme rendering blocked (returns plain text / 404)
- Unnecessary `<head>` bloat removed (emojis, generator tag, oEmbed, feeds, shortlinks, etc.)
- XML-RPC disabled
- Environment-aware CORS (permissive only in local/development)
- Custom GraphQL fields added to `Post` type:
  - `readingTimeMinutes` — calculated from content (~200 words/min)
  - `betterExcerpt` — clean fallback when manual excerpt is missing
- Uses `.env` file for configuration (database, environment type, debug flags)
- Production hardening (introspection & public mutations disabled conditionally)

## Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/buildbysam/project-modular-press"
cd project-modular-press/backend
```

### 2. Install Composer dependencies

```bash
composer install
```

### 3. Copy and configure environment file

```bash
cp .env.example .env
```

Edit .env with your values (adjust port/folder):

### 4. Create the database

Via phpMyAdmin or CLI:

```bash
mysql -u root -p -e "CREATE DATABASE wordpress_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
```

### 5. Run WordPress installer

Open in browser:

```text
http:localhost:8000
```

### 6. Install & activate WPGraphQL

1. Log in to `/wp-admin`
2. Plugins → Add New → search WPGraphQL → Install → Activate
3. Settings → Permalinks → select Post name → Save Changes

### 7. Verify GraphQL endpoint

Open:

```text
http://localhost:8000/graphql
```

You should see the GraphQL interface.

**Test query:**

```graphql
graphql{
  posts(first: 3) {
    nodes {
      title
      slug
      date
      excerpt(format: RENDERED)
      betterExcerpt
      readingTimeMinutes
      featuredImage {
        node { sourceUrl altText }
      }
    }
  }
}
```

### Production Notes

- Set `WP_ENVIRONMENT_TYPE=production` on your hosting platform
- Restrict CORS origins to your real frontend domain(s) in headless-mode.php
- Disable introspection & public mutations (already conditional)
- Use application passwords for authenticated requests
- Keep WordPress + WPGraphQL updated

---
