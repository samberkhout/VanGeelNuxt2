import { randomBytes } from 'crypto'

export default defineEventHandler(async (event) => {
  const { type } = getQuery(event)
  const files =
    type === 'catering'
      ? ['catering1.jpg', 'catering2.jpg', 'catering3.jpg']
      : ['verhuur1.jpg', 'verhuur2.jpg', 'verhuur3.jpg']

  return files.map((file) => {
    const token = randomBytes(8).toString('hex')
    return `https://example.com/${file}?token=${token}`
  })
})
