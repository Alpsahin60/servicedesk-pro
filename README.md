# ServiceDesk Pro

A small fullstack IT ticket system built as a portfolio / learning project with
**Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS 4**, and **Prisma 6**
on **SQLite**. Demonstrates credentials-based auth, role-aware routing, React
Server Components, and a Server Action for data mutation.

> This is a work-in-progress portfolio repo, not a production system. See
> [Status / TODO](#status--todo) below for an honest list of what is and isn't
> wired up yet.

---

## Features

- **Credentials auth** (NextAuth v4) with bcrypt-hashed passwords and JWT sessions.
- **Three seeded demo roles** — `ADMIN`, `AGENT`, `USER` — backed by a `role`
  column on `User`.
- **Role-aware ticket list**: regular users see only their own tickets;
  agents / admins see all tickets.
- **Create tickets** via a typed React **Server Action** (`app/tickets/new/actions.ts`).
- **Ticket detail view** with description, metadata sidebar (status, priority,
  category) and people sidebar (requestor, assignee).
- **Admin page** with read-only tables of users and categories, gated by an
  `ADMIN` role check.
- **Dark UI** as default (Tailwind v4 design tokens, `glass-card` accents,
  Lucide icons).

## Tech Stack

| Area | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router) |
| UI runtime | React 19 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 |
| Database | Prisma 6 + SQLite (`prisma/dev.db`) |
| Auth | NextAuth v4 (Credentials, JWT, `@next-auth/prisma-adapter`) |
| Hashing | bcryptjs |
| Icons | lucide-react |

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+

### Setup

```bash
npm install
npx prisma db push      # create the SQLite schema
npx prisma db seed      # seed demo accounts, categories, sample tickets
npm run dev             # http://localhost:3000
```

Create a `.env` in the project root with at minimum:

```env
DATABASE_URL="file:./prisma/dev.db"
NEXTAUTH_SECRET="any-long-random-string-for-local-dev"
NEXTAUTH_URL="http://localhost:3000"
```

### Demo accounts

The seeder creates three accounts. Password for all of them is `password123`.

| Role  | Email                 |
| ----- | --------------------- |
| Admin | `admin@example.com`   |
| Agent | `agent@example.com`   |
| User  | `user@example.com`    |

> The login page is pre-filled with the admin credentials for convenience.

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Next.js dev server |
| `npm run build` | Production build |
| `npm run start` | Run production build |
| `npm run lint` | ESLint |
| `npx prisma studio` | Browse the local SQLite DB |

## Project Structure

```
app/
  api/auth/[...nextauth]/route.ts   NextAuth handler
  admin/page.tsx                    Admin page (users + categories, read-only)
  login/page.tsx                    Sign-in form
  tickets/
    page.tsx                        Ticket list (role-filtered)
    new/page.tsx + actions.ts       Create-ticket form + Server Action
    [id]/page.tsx                   Ticket detail view
  layout.tsx, page.tsx, providers.tsx, globals.css, loading.tsx
lib/
  auth.ts                           NextAuth options (Credentials + Prisma adapter)
  prisma.ts                         Prisma client singleton
prisma/
  schema.prisma                     User, Ticket, Category, Comment, NextAuth tables
  seed.ts                           Demo data
types/
  next-auth.d.ts                    Session / User type augmentation
```

## Screenshots

<!--
Add screenshots here once captured, for example:

  ![Login](docs/screenshots/login.png)
  ![Dashboard](docs/screenshots/dashboard.png)
  ![Tickets list](docs/screenshots/tickets.png)
  ![Ticket detail](docs/screenshots/ticket-detail.png)
  ![Admin page](docs/screenshots/admin.png)

Place the image files under docs/screenshots/.
-->

## Status / TODO

This repo is a learning / portfolio project, not production-ready. The
following gaps are intentional and tracked here in the open:

- **Dashboard counters are hardcoded.** The four tiles on `app/page.tsx`
  ("Total Tickets: 3", "Open: 2", "In Progress: 1", "Users: 3") are static
  numbers, not aggregates from the database.
- **Comment form is UI-only.** The `Comment` model exists in `schema.prisma`,
  but the textarea + Post button on the ticket detail page have no submit
  handler and don't persist anything yet.
- **No ticket editing.** Tickets can be created but not edited, reassigned,
  status-changed, or deleted from the UI. The schema supports it; the screens
  don't yet.
- **Admin page is read-only.** No CRUD for users, roles, or categories.
- **No form-level validation.** `react-hook-form` and `zod` are listed in
  `package.json` but not yet imported anywhere; the new-ticket Server Action
  reads `FormData` without a schema.
- **`docker-compose.yml` defines a Postgres service but is unused** — the live
  database is SQLite. The compose file is a placeholder for an eventual
  Postgres migration.
- **`dev.db` is committed** so the project runs with zero setup after `npm
  install` + `db push`. This must be removed before any non-local deployment.
- **No automated tests yet.**
- A few transitive deps (`date-fns`, `tailwind-merge`, `clsx`, `@hookform/resolvers`)
  are installed but not yet imported in source.

For deployment-hardening notes (Postgres migration, `NEXTAUTH_SECRET`, secure
cookies, rate limiting on auth) see
[CONTRIBUTING.md](./CONTRIBUTING.md#7-architecture-notes).
