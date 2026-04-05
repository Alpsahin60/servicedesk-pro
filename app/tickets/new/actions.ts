"use server"

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function createTicket(formData: FormData) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    throw new Error("Unauthorized");
  }

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const priority = formData.get("priority") as string;
  const categoryId = formData.get("categoryId") as string;
  
  await prisma.ticket.create({
    data: {
      title,
      description,
      priority,
      status: "OPEN",
      categoryId: categoryId === "none" ? null : categoryId,
      creatorId: (session.user as any).id,
    }
  });

  redirect("/tickets");
}
