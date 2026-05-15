# Contributing

Developer guide for **ServiceDesk Pro**.

> Documentation convention: this guide is tool-agnostic. No editor- or AI-assistant-specific instructions.

---

## 1. Project Overview

ServiceDesk Pro is a fullstack IT ticket system with role-based access for Admin, Agent, and end-user roles. Tickets carry status, priority, and category metadata; the admin dashboard provides user and category management.

For a feature-level overview, see the project [README.md](./README.md).

---

## 2. Tech Stack

- **Framework:** Next.js 16 (App Router), React 19, TypeScript 5
- **Styling:** Tailwind CSS 4
- **Database:** Prisma 6 (SQLite for local dev, `prisma/dev.db`)
- **Auth:** NextAuth v4 with `@next-auth/prisma-adapter`
- **Password hashing:** bcryptjs
- **Forms:** React Hook Form + Zod
- **Icons:** Lucide

---

## 3. Project Structure

```text
prisma/
  schema.prisma   # Database schema (User, Ticket, Category, …)
  seed.ts         # Demo account + sample data seeder
  dev.db          # Local SQLite (gitignored)
src/
  app/            # App Router pages, layouts, route handlers
  components/     # Shared UI components
  lib/            # DB client, auth helpers, utilities
```

---

## 4. Development Setup

### Prerequisites

- Node.js 20+
- npm 10+

### Install

```bash
npm install
```

### Initialize the local database

```bash
npx prisma db push        # create the SQLite schema
npx prisma db seed        # populate demo accounts and categories
```

The seeder pre-creates three demo accounts (Admin / Agent / User) with a shared development password — see `prisma/seed.ts`. **These credentials are dev-only and must not survive into production.**

### Run

```bash
npm run dev               # http://localhost:3000
```

### Commands

| Command | Description |
|---|---|
| `npm run dev` | Next.js dev server |
| `npm run build` | Production build |
| `npm run start` | Run production build |
| `npm run lint` | ESLint |
| `npx prisma studio` | Browse the local DB |
| `npx prisma migrate dev` | Generate + apply migration |

---

## 5. Coding Conventions

- TypeScript strict mode; avoid `any` unless documented
- Server components by default; `"use client"` only where interactivity is required
- Route handlers under `src/app/api/*` use Zod schemas at the boundary
- Database access goes through a single Prisma client (`src/lib/db.ts` or equivalent)
- Passwords hashed with bcryptjs — never store plaintext
- Tailwind utility-first; component-level abstraction lives in `src/components/`
- Commit messages follow Conventional Commits: `feat:`, `fix:`, `refactor:`, `chore:`, `docs:`, `style:`, `test:`, `perf:`, `security:`

---

## 6. Workflow

- Solo repo, direct commits to `main`
- Run `npm run lint` and `npm run build` before pushing non-trivial changes
- Schema changes go through Prisma migrations (`npx prisma migrate dev --name <change>`), never edit `schema.prisma` without a migration

---

## 7. Architecture Notes

### Auth

NextAuth v4 with the Prisma adapter. Credentials provider verifies hashed passwords. RBAC is enforced via the `role` field on the `User` model; route-level checks happen in the App Router layouts/route handlers.

### Data Layer

Prisma is the only path to the database. Local dev uses SQLite (`prisma/dev.db`). For production, swap the datasource in `schema.prisma` to PostgreSQL / MySQL and run `prisma migrate deploy`.

### Production Hardening Checklist

Before any non-local deployment:

- Replace SQLite with a production-grade database
- Remove the demo seed credentials or gate them behind `NODE_ENV !== "production"`
- Set strong `NEXTAUTH_SECRET` and a stable `NEXTAUTH_URL`
- Enable HTTPS-only cookies (NextAuth `useSecureCookies`)
- Configure rate-limiting on auth endpoints

### Next.js Version Note

The pinned Next.js version (16.x) introduces breaking changes compared to older majors — APIs, conventions, and file structure may differ from older tutorials. When in doubt, consult `node_modules/next/dist/docs/` for version-specific guides. See [`AGENTS.md`](./AGENTS.md) for a brief reminder.
