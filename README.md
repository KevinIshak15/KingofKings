# Idea-Assets

A full-stack web application (React + Express + PostgreSQL) migrated from Replit.

## Prerequisites

- **Node.js** 20+ 
- **PostgreSQL** 16+ (or a hosted Postgres instance)
- **npm**

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. (Optional) Set up the database

**To run without a database:** You can skip this step. The app will run with in-memory mock storage—forms will work but data won't persist (useful for UI development until you add Firebase or PostgreSQL).

**To use PostgreSQL:** Copy the example env file and configure it:

```bash
copy .env.example .env
```

Edit `.env` and set your `DATABASE_URL`:

```
DATABASE_URL=postgresql://username:password@localhost:5432/database_name
```

Then push the schema:

```bash
npm run db:push
```

### 3. Start the development server

```bash
npm run dev
```

The app will be available at **http://localhost:5000**.

## Scripts

| Command        | Description                              |
|----------------|------------------------------------------|
| `npm run dev`  | Start dev server (Vite + Express)        |
| `npm run build`| Build for production                     |
| `npm run start`| Run production build (after `npm run build`) |
| `npm run db:push` | Push Drizzle schema to PostgreSQL   |
| `npm run check`   | TypeScript check                     |

## Project structure

- `client/` – React frontend (Vite) — legacy SPA
- `web-next/` – **Next.js 14 marketing site (SEO-optimized, SSG)**
- `server/` – Express API
- `shared/` – Shared types and schema (Drizzle)
- `script/` – Build and utility scripts
- `attached_assets/` – Static assets

### Running the Next.js site (SEO-ready)

```bash
cd web-next
npm install
npm run dev
```

See `web-next/README.md` for full setup and SEO features.

## Database schema

Tables: contact submissions, investor applications, rental analysis requests, and subscribers.
