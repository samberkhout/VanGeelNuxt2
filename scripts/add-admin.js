import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const email = process.env.ADMIN_EMAIL || 'admin@example.com'
  const password = process.env.ADMIN_PASSWORD || 'admin123'
  const name = process.env.ADMIN_NAME || 'Admin'

  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    console.log('Admin user already exists')
    return
  }

  const hashed = await hash(password, 10)
  await prisma.user.create({
    data: { email, name, password: hashed, rol: 'ADMIN' }
  })
  console.log(`Admin created: ${email}`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
