import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Shield, ArrowLeft, Users, Tag } from "lucide-react";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  if (!session || (session.user as any).role !== "ADMIN") {
    redirect("/");
  }

  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' }
  });

  const categories = await prisma.category.findMany({
    orderBy: { name: 'asc' }
  });

  return (
    <div className="min-h-screen p-8 bg-background">
      <header className="flex items-center gap-4 mb-8 pb-4 border-b border-border">
        <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div className="flex items-center gap-2">
          <Shield className="text-brand" />
          <h1 className="text-2xl font-bold text-foreground">Admin Center</h1>
        </div>
      </header>

      <main className="max-w-6xl mx-auto animate-in space-y-8">
        
        {/* Users Section */}
        <div className="bg-card glass-card border border-border rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-border flex items-center gap-2">
            <Users size={20} className="text-primary" />
            <h2 className="text-lg font-semibold text-foreground">User Management</h2>
          </div>
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 text-muted-foreground border-b border-border">
              <tr>
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Email</th>
                <th className="px-6 py-4 font-medium">Role</th>
                <th className="px-6 py-4 font-medium text-right">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-foreground">{u.name || 'Unnamed'}</td>
                  <td className="px-6 py-4 text-muted-foreground">{u.email}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                      u.role === 'ADMIN' ? 'bg-brand/10 text-brand border-brand/20' :
                      u.role === 'AGENT' ? 'bg-primary/10 text-primary border-primary/20' :
                      'bg-muted text-muted-foreground border-border'
                    }`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-muted-foreground">
                    {new Date(u.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Categories Section */}
        <div className="bg-card glass-card border border-border rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-border flex items-center gap-2">
             <Tag size={20} className="text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Categories</h2>
          </div>
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 text-muted-foreground border-b border-border">
              <tr>
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {categories.map((c) => (
                <tr key={c.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-foreground">{c.name}</td>
                  <td className="px-6 py-4 text-muted-foreground">{c.description || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </main>
    </div>
  );
}
