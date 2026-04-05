# ServiceDesk Pro 🎫

A professional, full-stack IT Helpdesk and Ticketing System built with modern web technologies. This project demonstrates robust role-based access control, relational database management, and a premium "glassmorphism" user interface.

## 🚀 Features

- **Role-Based Access Control (RBAC):** Three distinct roles (`USER`, `AGENT`, `ADMIN`) with protected routes and restricted data access.
- **Ticket Management:** Create, view, and manage IT tickets seamlessly. Includes details like status, priority, and category grouping.
- **Admin Dashboard:** Centralized view for managing users and system metadata.
- **Premium UI:** Deep-dark mode aesthetics with custom Tailwind v4 configurations, smooth animations, and loading states.
- **Modern Stack:** Built on Next.js 15 (App Router), Server Actions, Prisma ORM, and NextAuth.js.

## 🔑 Demo Access (Login Credentials)

To test the application, you can use the following pre-configured demo accounts once you've seeded the database. 
**The password for all accounts is: `password123`**

| Role | Email | Capabilities |
| :--- | :--- | :--- |
| **Admin** | `admin@example.com` | Full access. Can manage users, categories, and all tickets. |
| **Agent** | `agent@example.com` | Can view and process all helpdesk tickets. |
| **User** | `user@example.com` | Can only create and view their own personal tickets. |

## 🛠️ Getting Started Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Alpsahin60/servicedesk-pro.git
   cd servicedesk-pro
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Initialize the Database & Demo Data:**
   ```bash
   npx prisma db push
   npx prisma db seed
   ```

4. **Start the Development Server:**
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) to view the application!
