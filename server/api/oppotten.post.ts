import { prisma } from '../prisma'
import { z } from 'zod'

const schema = z.object({
  leverweek: z.number(),
  rasId: z.number(),
  opgepot: z.number(),
  weggegooid: z.number(),
  reden: z.string(),
  extraReden: z.string().optional()
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const data = schema.parse(body)
  const record = await prisma.oppotten.create({ data })
  return record
})
