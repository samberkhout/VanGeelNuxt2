import { prisma } from '../../prisma'
import { z } from 'zod'

const schema = z.object({
  naam: z.string().optional(),
  leverancierId: z.number().optional()
})

export default defineEventHandler(async (event) => {
  const id = Number(event.context.params?.id)
  if (event.req.method === 'PATCH') {
    const body = await readBody(event)
    const data = schema.parse(body)
    return await prisma.soort.update({ where: { id }, data })
  }
  if (event.req.method === 'DELETE') {
    await prisma.soort.delete({ where: { id } })
    return { success: true }
  }
})
