import { prisma } from '../prisma'
import { z } from 'zod'

const schema = z.object({
  leverweek: z.number(),
  rasId: z.number(),
  weggegooid: z.number(),
  reden: z.string(),
  extraReden: z.string().optional()
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const data = schema.parse(body)

  const plant = await prisma.plant.upsert({
    where: { soortId_leverweek: { soortId: data.rasId, leverweek: data.leverweek } },
    update: {},
    create: { soortId: data.rasId, leverweek: data.leverweek }
  })

  const record = await prisma.ziekZoeken.create({
    data: {
      plantId: plant.id,
      soortId: data.rasId,
      leverweek: data.leverweek,
      aantalWeggooi: data.weggegooid,
      redenWeggooi: data.reden,
      andereReden: data.extraReden
    }
  })
  return record
})
