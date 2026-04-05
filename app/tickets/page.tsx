import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { PlusCircle, ArrowLeft } from "lucide-react";

export default async function TicketsPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const userRole = (session.user as any).role;
  const userId = (session.user as any).id;

  const tickets = await prisma.ticket.findMany({
    where: userRole === "USER" ? { creatorId: userId } : {},
    orderBy: { createdAt: 'desc' },
    include: {
      creator: true,
      category: true,
      assignee: true,
    }
  });

  return (
    <div className="min-h-screen p-8 bg-background">
      <header className="flex justify-between items-center mb-8 pb-4 border-b border-border">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold text-foreground">Tickets</h1>
        </div>
        <Link 
          href="/tickets/new" 
          className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-xl transition-all shadow-[0_0_15px_rgba(var(--primary),0.3)]"
        >
          <PlusCircle size={18} />
          <span>New Ticket</span>
        </Link>
      </header>

      <main className="max-w-6xl mx-auto animate-in">
        <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 text-muted-foreground border-b border-border">
              <tr>
                <th className="px-6 py-4 font-medium">Title</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Priority</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium text-right">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {tickets.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                    No tickets found.
                  </td>
                </tr>
              ) : (
                tickets.map((ticket) => (
                  <tr key={ticket.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4 font-medium text-foreground">
                      <Link href={`/tickets/${ticket.id}`} className="hover:underline hover:text-primary">
                        {ticket.title}
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                        {ticket.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{ticket.priority}</td>
                    <td className="px-6 py-4 text-muted-foreground">{ticket.category?.name || '-'}</td>
                    <td className="px-6 py-4 text-right text-muted-foreground">
                      {new Date(ticket.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
