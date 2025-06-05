import { prisma } from '../../prisma'
import { getCookie } from 'h3'
import { z } from 'zod'
import { hash } from 'bcryptjs'

const schema = z.object({
  email: z.string().email().optional(),
  name: z.string().optional(),
  password: z.string().min(6).optional(),
  rol: z.enum(['USER', 'ADMIN']).optional(),
})

export default defineEventHandler(async (event) => {
  const currentId = getCookie(event, 'userId')
  if (!currentId) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }
  const current = await prisma.user.findUnique({ where: { id: currentId } })
  if (!current || current.rol !== 'ADMIN') {
    throw createError({ statusCode: 403, statusMessage: 'Forbidden' })
  }

  const id = event.context.params?.id as string

  if (event.req.method === 'PATCH') {
    const body = await readBody(event)
    const parsed = schema.parse(body)
    const data: any = {
      email: parsed.email,
      name: parsed.name,
      rol: parsed.rol,
    }
    if (parsed.password) {
      data.password = await hash(parsed.password, 10)
    }
    const user = await prisma.user.update({ where: { id }, data })
    return { id: user.id, email: user.email, name: user.name, rol: user.rol }
  }

  if (event.req.method === 'DELETE') {
    await prisma.user.delete({ where: { id } })
    return { success: true }
  }
})
