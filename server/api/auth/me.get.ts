import { prisma } from '../../prisma'

export default defineEventHandler(async (event) => {
  const id = useCookie('userId').value
  if (!id) {
    return null
  }
  const user = await prisma.user.findUnique({
    where: { id },
    select: { id: true, email: true, name: true, rol: true },
  })
  return user
})
