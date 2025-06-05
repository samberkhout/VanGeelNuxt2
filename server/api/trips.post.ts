import { prisma } from '../prisma'
import { z } from 'zod'

const schema = z.object({
  leverweek: z.number(),
  oppotweek: z.number(),
  rasId: z.number(),
  aantal: z.number(),
  locatieX: z.number(),
  locatieY: z.number()
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const data = schema.parse(body)
  const record = await prisma.trip.create({ data })
  return record
})
