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

  const plant = await prisma.plant.upsert({
    where: { soortId_leverweek: { soortId: data.rasId, leverweek: data.leverweek } },
    update: {},
    create: { soortId: data.rasId, leverweek: data.leverweek }
  })

  const record = await prisma.trips.create({
    data: {
      plantId: plant.id,
      soortId: data.rasId,
      leverweek: data.leverweek,
      oppotweek: data.oppotweek,
      aantalPlanten: data.aantal,
      locatie: { x: data.locatieX, y: data.locatieY }
    }
  })
  return record
})
