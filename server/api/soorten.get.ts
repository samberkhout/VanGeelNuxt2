import { prisma } from '../prisma'

export default defineEventHandler(async () => {
  return await prisma.soort.findMany({
    select: { id: true, naam: true, leverancierId: true, leverancier: { select: { naam: true } } }
  })
})
