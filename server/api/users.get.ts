import { prisma } from '../prisma'
import { getCookie } from 'h3'

export default defineEventHandler(async (event) => {
  const id = getCookie(event, 'userId')
  if (!id) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }
  const current = await prisma.user.findUnique({ where: { id } })
  if (!current || current.rol !== 'ADMIN') {
    throw createError({ statusCode: 403, statusMessage: 'Forbidden' })
  }
  return await prisma.user.findMany({
    select: { id: true, email: true, name: true, rol: true }
  })
})
