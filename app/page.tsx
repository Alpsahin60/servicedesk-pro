import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { LogOut, TicketIcon, Users, CheckCircle2, Clock } from "lucide-react";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen p-8 bg-background">
      <header className="flex justify-between items-center mb-8 pb-4 border-b border-border">
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="font-medium text-sm text-foreground">{session.user?.name}</p>
            <p className="text-xs text-primary capitalize font-medium">Role: {(session.user as any)?.role}</p>
          </div>
          <a
            href="/api/auth/signout"
            className="w-10 h-10 rounded-full bg-secondary border border-border text-secondary-foreground flex items-center justify-center hover:bg-muted transition-colors group"
            title="Sign out"
          >
            <LogOut size={16} className="group-hover:text-primary transition-colors" />
          </a>
        </div>
      </header>
      
      <main className="max-w-6xl mx-auto animate-in">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-card border border-border p-6 rounded-2xl shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform">
              <TicketIcon size={48} />
            </div>
            <h3 className="font-medium text-muted-foreground mb-2 flex items-center gap-2">
              <TicketIcon size={16} className="text-primary"/> Total Tickets
            </h3>
            <p className="text-4xl font-bold text-foreground">3</p>
          </div>
          <div className="bg-card border border-border p-6 rounded-2xl shadow-sm relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform">
              <Clock size={48} />
            </div>
            <h3 className="font-medium text-muted-foreground mb-2 flex items-center gap-2">
               <Clock size={16} className="text-brand"/> Open
            </h3>
            <p className="text-4xl font-bold text-foreground">2</p>
          </div>
          <div className="bg-card border border-border p-6 rounded-2xl shadow-sm relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform">
              <CheckCircle2 size={48} />
            </div>
            <h3 className="font-medium text-muted-foreground mb-2 flex items-center gap-2">
              <CheckCircle2 size={16} className="text-green-500"/> In Progress
            </h3>
            <p className="text-4xl font-bold text-foreground">1</p>
          </div>
          <div className="bg-card border border-border p-6 rounded-2xl shadow-sm relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform">
              <Users size={48} />
            </div>
            <h3 className="font-medium text-muted-foreground mb-2 flex items-center gap-2">
              <Users size={16} className="text-blue-500"/> Users
            </h3>
            <p className="text-4xl font-bold text-foreground">3</p>
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-border">
            <h2 className="text-lg font-semibold text-foreground">Quick Actions</h2>
          </div>
          <div className="p-6 flex flex-wrap gap-6 justify-center md:justify-start">
            <a href="/tickets" className="flex flex-col items-center gap-3 text-muted-foreground hover:text-primary transition-colors group w-32">
               <div className="w-14 h-14 rounded-full bg-secondary border border-border flex items-center justify-center group-hover:bg-primary/10 group-hover:border-primary/30 transition-all shadow-sm">
                 <TicketIcon size={24} className="group-hover:scale-110 transition-transform" />
               </div>
               <span className="font-medium group-hover:underline text-center">All Tickets</span>
            </a>
            <a href="/tickets/new" className="flex flex-col items-center gap-3 text-muted-foreground hover:text-primary transition-colors group w-32">
               <div className="w-14 h-14 rounded-full bg-secondary border border-border flex items-center justify-center group-hover:bg-primary/10 group-hover:border-primary/30 transition-all shadow-sm">
                 <CheckCircle2 size={24} className="group-hover:scale-110 transition-transform" />
               </div>
               <span className="font-medium group-hover:underline text-center">New Ticket</span>
            </a>
            {(session.user as any).role === "ADMIN" && (
              <a href="/admin" className="flex flex-col items-center gap-3 text-muted-foreground hover:text-brand transition-colors group w-32">
                 <div className="w-14 h-14 rounded-full bg-secondary border border-border flex items-center justify-center group-hover:bg-brand/10 group-hover:border-brand/30 transition-all shadow-sm">
                   <Users size={24} className="group-hover:scale-110 transition-transform text-foreground group-hover:text-brand" />
                 </div>
                 <span className="font-medium group-hover:underline text-center">Admin Panel</span>
              </a>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
