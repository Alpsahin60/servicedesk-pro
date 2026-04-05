# ServiceDesk Pro

A professional, production-ready fullstack IT ticket system built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Prisma**. 

## Features
- **Role-Based Access Control (RBAC):** NextAuth integration with separate permissions for Admin, Agent, and User.
- **Ticket Management:** Create, view, and manage support tickets with statuses, priorities, and assigned categories.
- **Admin Dashboard:** Overview of users and categories.
- **Premium UI:** Deep dark mode design with glassmorphism effects and Lucide icons.

## Demo Login Credentials

The local database is pre-seeded with the following demo accounts. The password for all accounts is **`password123`**.

| Role  | Email |
| ------------- | ------------- |
| **Admin**  | `admin@example.com` |
| **Agent**  | `agent@example.com` |
| **User**  | `user@example.com` |

> **Note:** You can view and modify these demo accounts in the `prisma/seed.ts` file.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Initialize the local SQLite database and seed the data:
   ```bash
   npx prisma db push
   npx prisma db seed
   ```

3. Run the complete Next.js development server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
