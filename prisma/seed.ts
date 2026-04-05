import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash('password123', 10)

  // Create an Admin
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin User',
      password: hashedPassword,
      role: 'ADMIN',
    },
  })

  // Create an Agent
  const agent = await prisma.user.upsert({
    where: { email: 'agent@example.com' },
    update: {},
    create: {
      email: 'agent@example.com',
      name: 'Agent Smith',
      password: hashedPassword,
      role: 'AGENT',
    },
  })

  // Create a Regular User
  const user = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      email: 'user@example.com',
      name: 'Regular User',
      password: hashedPassword,
      role: 'USER',
    },
  })

  // Create Categories
  const hwCategory = await prisma.category.upsert({
    where: { name: 'Hardware' },
    update: {},
    create: { name: 'Hardware', description: 'Issues with physical devices' },
  })

  const swCategory = await prisma.category.upsert({
    where: { name: 'Software' },
    update: {},
    create: { name: 'Software', description: 'Issues with applications or OS' },
  })

  const nwCategory = await prisma.category.upsert({
    where: { name: 'Network' },
    update: {},
    create: { name: 'Network', description: 'Connectivity problems' },
  })

  // Create a sample ticket
  await prisma.ticket.create({
    data: {
      title: 'Laptop won\'t turn on',
      description: 'Pressing the power button does nothing. Display is black.',
      priority: 'HIGH',
      status: 'OPEN',
      creatorId: user.id,
      categoryId: hwCategory.id,
    }
  })

  await prisma.ticket.create({
    data: {
      title: 'Cannot access internal wiki',
      description: 'Getting a 403 Forbidden error when trying to access the engineering wiki.',
      priority: 'MEDIUM',
      status: 'IN_PROGRESS',
      creatorId: user.id,
      assigneeId: agent.id,
      categoryId: nwCategory.id,
    }
  })

  await prisma.ticket.create({
    data: {
      title: 'Need Adobe Creative Cloud license',
      description: 'Need access to Photoshop and Illustrator for the marketing project.',
      priority: 'LOW',
      status: 'OPEN',
      creatorId: user.id,
      categoryId: swCategory.id,
    }
  })

  console.log('Database seeded!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
