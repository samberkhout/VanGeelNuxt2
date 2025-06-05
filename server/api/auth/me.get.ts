import { prisma } from '../../prisma'
import { getCookie } from 'h3'

export default defineEventHandler(async (event) => {
  const id = getCookie(event, 'userId')
  if (!id) {
    return null
  }
  const user = await prisma.user.findUnique({
    where: { id },
    select: { id: true, email: true, name: true, rol: true },
  })
  return user
})
