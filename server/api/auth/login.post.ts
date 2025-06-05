import { prisma } from '../../prisma'
import { setCookie } from 'h3'
import { z } from 'zod'
import { compare } from 'bcryptjs'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, password } = z
    .object({
      email: z.string().email(),
      password: z.string(),
    })
    .parse(body)

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user || !user.password) {
    throw createError({ statusCode: 401, statusMessage: 'Ongeldige inloggegevens' })
  }
  const valid = await compare(password, user.password)
  if (!valid) {
    throw createError({ statusCode: 401, statusMessage: 'Ongeldige inloggegevens' })
  }

  setCookie(event, 'userId', user.id, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
  })
  return { id: user.id, email: user.email, name: user.name, rol: user.rol }
})
