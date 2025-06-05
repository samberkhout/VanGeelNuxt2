import { prisma } from '../prisma'
import { z } from 'zod'

const schema = z.object({
  naam: z.string(),
  leverancierId: z.number()
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const data = schema.parse(body)
  const record = await prisma.soort.create({ data })
  return record
})
