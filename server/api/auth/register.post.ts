import { prisma } from '../../prisma'
import { hash } from 'bcryptjs'
import { z } from 'zod'

export default defineEventHandler(async (event) => {
  const currentId = useCookie(event, 'userId').value
  if (!currentId) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }
  const currentUser = await prisma.user.findUnique({ where: { id: currentId } })
  if (!currentUser || currentUser.rol !== 'ADMIN') {
    throw createError({ statusCode: 403, statusMessage: 'Forbidden' })
  }

  const body = await readBody(event)
  const { email, password, name, rol } = z
    .object({
      email: z.string().email(),
      password: z.string().min(6),
      name: z.string().optional(),
      rol: z.enum(['ADMIN', 'USER']).optional(),
    })
    .parse(body)

  const hashed = await hash(password, 10)
  const user = await prisma.user.create({
    data: { email, name, password: hashed, rol: rol ?? 'USER' },
  })
  return { id: user.id, email: user.email, name: user.name, rol: user.rol }
})
