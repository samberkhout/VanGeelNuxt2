import { prisma } from '../prisma'

export default defineEventHandler(async () => {
  return await prisma.leverancier.findMany({ select: { id: true, naam: true } })
})
