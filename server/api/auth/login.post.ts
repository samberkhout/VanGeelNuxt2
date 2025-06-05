import { prisma } from '../../prisma'
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

  const cookie = useCookie('userId', {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
  })
  cookie.value = user.id
  return { id: user.id, email: user.email, name: user.name, rol: user.rol }
})
