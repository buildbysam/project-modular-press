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
- **GraphQL endpoint protected** with `X-Headless-Secret` header (secret key from `.env`)
- Custom GraphQL fields added to `Post` type:
  - `readingTimeMinutes` — calculated from content (~200 words/min)
  - `betterExcerpt` — clean fallback when manual excerpt is missing
- Uses `.env` file for configuration (database, environment type, debug flags)
- Production hardening (introspection & public mutations disabled conditionally)

## Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/buildbysam/project-modular-press"
cd project-modular-press/wordpress
```

### 2. Install Composer dependencies

```bash
composer install
```

### 3. Copy and configure environment file

```bash
cp .env.example .env
```

### 4. Set up full WordPress locally

1. Download latest WordPress from [https://wordpress.org/download/](https://wordpress.org/download/)
2. Extract it into a folder (e.g. `wp-local`)
3. Copy these files from this repo into the WordPress root:
   - `.env` (from step 3)
   - `wp-content/mu-plugins/headless-mode.php`
   - Your custom `wp-config.php` (or use `wp-config.example.php` → rename to `wp-config.php` and fill in values)

4. Create database (phpMyAdmin or CLI):

```bash
mysql -u root -p -e "CREATE DATABASE wordpress_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
```

5. Run installer: `http://localhost:8000` (adjust port)
6. Install & activate WPGraphQL plugin
7. Settings → Permalinks → Post name → Save Changes

### 5. Verify GraphQL endpoint

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
- Add HEADLESS_SECRET_KEY as a secure environment variable (never commit real value)
- Restrict CORS origins to your real frontend domain(s) in headless-mode.php
- Disable introspection & public mutations (already conditional)
- Use application passwords for authenticated requests
- Keep WordPress + WPGraphQL updated

---
