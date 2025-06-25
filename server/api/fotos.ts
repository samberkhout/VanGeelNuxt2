import { getSignedUrls } from '~/utils/signedUrl'

export default defineEventHandler(async (event) => {
  const { type } = getQuery(event)
  const prefix = type === 'catering' ? 'catering-fotos/' : 'verhuur-fotos/'
  return await getSignedUrls(prefix)
})
