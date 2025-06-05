import { prisma } from '../prisma'
import { z } from 'zod'

const schema = z.object({
  jaar: z.number(),
  week: z.number(),
  afdeling1: z.number(),
  afdeling16: z.number()
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const data = schema.parse(body)
  const record = await prisma.potworm.create({ data })
  return record
})
