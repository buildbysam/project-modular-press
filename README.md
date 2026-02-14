# Project Modular Press | Headless WordPress + Next.js Blog

Modern headless blog built with **WordPress** (backend) + **Next.js** (frontend).  
WordPress serves content via **WPGraphQL**, Next.js consumes it statically and dynamically.

## Features

- **WordPress as CMS only**: editors use familiar admin panel, no theme needed
- **GraphQL**: efficient, typed queries (only fetch what you need)
- **Next.js App Router**: server-side rendering, dynamic routes
- **Protected API**: `X-Headless-Secret` header secures GraphQL endpoint
- **Minimal footprint**: backend repo only contains config + mu-plugin

## Screenshots

### Home Page / Blog List

![Blog List](/screenshots/blog-list-screenshot.png)

### Single Post / Blog Detail Page

![Single Post](/screenshots/single-blog-screenshot.png)

## Quick Start

### Backend (WordPress)

See `/wordpress/README.md` for local setup and deployment.

### Frontend (Next.js)

See `/client/README.md` for local dev and Vercel deployment.

## Tech Stack

- WordPress + WPGraphQL (backend API)
- Next.js 16+ App Router (frontend)
- graphql-request (lightweight GraphQL client)
- Tailwind CSS
- Environment-based secret protection

---
