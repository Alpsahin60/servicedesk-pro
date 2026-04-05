import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { createTicket } from "./actions";

export default async function NewTicketPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const categories = await prisma.category.findMany();

  return (
    <div className="min-h-screen p-8 bg-background">
      <header className="flex items-center gap-4 mb-8 pb-4 border-b border-border">
        <Link href="/tickets" className="text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold text-foreground">Create New Ticket</h1>
      </header>

      <main className="max-w-2xl mx-auto animate-in">
        <div className="bg-card glass-card border border-border p-8 rounded-2xl shadow-xl">
          <form action={createTicket} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium text-foreground">Title</label>
              <input 
                id="title"
                name="title"
                required
                className="w-full bg-background border border-border rounded-xl py-3 px-4 text-sm text-foreground focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                placeholder="Brief summary of the issue"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium text-foreground">Description</label>
              <textarea 
                id="description"
                name="description"
                required
                rows={5}
                className="w-full bg-background border border-border rounded-xl py-3 px-4 text-sm text-foreground focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all resize-none"
                placeholder="Detailed explanation of what happened..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="priority" className="text-sm font-medium text-foreground">Priority</label>
                <select 
                  id="priority" 
                  name="priority"
                  defaultValue="MEDIUM"
                  className="w-full bg-background border border-border rounded-xl py-3 px-4 text-sm text-foreground focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none"
                >
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                  <option value="URGENT">Urgent</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="categoryId" className="text-sm font-medium text-foreground">Category</label>
                <select 
                  id="categoryId" 
                  name="categoryId" 
                  className="w-full bg-background border border-border rounded-xl py-3 px-4 text-sm text-foreground focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none"
                >
                  <option value="none">-- select category --</option>
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="pt-4 flex justify-end gap-3">
              <Link 
                href="/tickets"
                className="px-6 py-3 rounded-xl border border-border hover:bg-muted text-foreground font-medium transition-colors"
              >
                Cancel
              </Link>
              <button 
                type="submit"
                className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-medium shadow-[0_0_15px_rgba(var(--primary),0.2)] transition-all active:scale-95"
              >
                <Save size={18} />
                Submit Ticket
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
