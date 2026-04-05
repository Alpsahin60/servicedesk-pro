import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft, User, Calendar, Tag, AlertCircle, MessageSquare } from "lucide-react";

export default async function TicketDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const { id } = await params;

  const ticket = await prisma.ticket.findUnique({
    where: { id },
    include: {
      creator: true,
      assignee: true,
      category: true,
      comments: {
        include: { author: true },
        orderBy: { createdAt: 'asc' }
      }
    }
  });

  if (!ticket) {
    return (
      <div className="min-h-screen p-8 bg-background flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-foreground mb-4">Ticket not found</h1>
        <Link href="/tickets" className="text-primary hover:underline">Return to tickets</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-background">
      <header className="flex items-center gap-4 mb-8 pb-4 border-b border-border">
        <Link href="/tickets" className="text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-foreground">{ticket.title}</h1>
          <p className="text-sm text-muted-foreground mt-1">Ticket #{ticket.id.slice(0,8)}</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto animate-in grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div className="md:col-span-2 space-y-6">
          {/* Main Content */}
          <div className="bg-card glass-card border border-border p-6 rounded-2xl shadow-sm">
            <h3 className="font-semibold text-lg border-b border-border pb-3 mb-4">Description</h3>
            <div className="text-foreground whitespace-pre-wrap">{ticket.description}</div>
          </div>

          <div className="bg-card glass-card border border-border p-6 rounded-2xl shadow-sm">
            <h3 className="font-semibold text-lg border-b border-border pb-3 mb-4 flex items-center gap-2">
              <MessageSquare size={18} /> Comments
            </h3>
            
            <div className="space-y-4 mb-6">
              {ticket.comments.length === 0 ? (
                <p className="text-muted-foreground italic text-center py-4">No comments yet.</p>
              ) : (
                ticket.comments.map(comment => (
                  <div key={comment.id} className="bg-muted/30 border border-border p-4 rounded-xl">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-sm text-foreground">{comment.author.name || comment.author.email}</span>
                      <span className="text-xs text-muted-foreground">{new Date(comment.createdAt).toLocaleString()}</span>
                    </div>
                    <p className="text-sm text-foreground">{comment.content}</p>
                  </div>
                ))
              )}
            </div>
            
            {/* Simple comment form placeholder for UI */}
            <div className="flex gap-3 mt-4 pt-4 border-t border-border">
              <textarea 
                className="flex-1 bg-background border border-border rounded-xl p-3 text-sm resize-none focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none"
                placeholder="Add a comment..."
                rows={2}
              />
              <button className="bg-primary text-white px-4 py-2 rounded-xl font-medium hover:bg-primary/90 transition-colors self-end shadow-sm">
                Post
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="bg-card glass-card border border-border p-6 rounded-2xl shadow-sm space-y-4">
            <h3 className="font-semibold text-lg border-b border-border pb-3">Details</h3>
            
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                 <AlertCircle size={16} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Status</p>
                <p className="font-medium text-sm text-foreground">{ticket.status}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
                 <AlertCircle size={16} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Priority</p>
                <p className="font-medium text-sm text-foreground">{ticket.priority}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                 <Tag size={16} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Category</p>
                <p className="font-medium text-sm text-foreground">{ticket.category?.name || 'None'}</p>
              </div>
            </div>
          </div>

          <div className="bg-card glass-card border border-border p-6 rounded-2xl shadow-sm space-y-4">
            <h3 className="font-semibold text-lg border-b border-border pb-3">People</h3>
            
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                 <User size={16} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Requestor</p>
                <p className="font-medium text-sm text-foreground">{ticket.creator.name || ticket.creator.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                 <User size={16} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Assignee</p>
                <p className="font-medium text-sm text-foreground">{ticket.assignee?.name || ticket.assignee?.email || 'Unassigned'}</p>
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
