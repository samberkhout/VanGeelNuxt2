import { getSignedUrls } from '~/utils/signedUrl'

export default defineEventHandler(async (event) => {
  const { type } = getQuery(event)
  const prefix = type === 'catering' ? 'catering-fotos/' : 'verhuur-fotos/'

  const config = useRuntimeConfig()
  if (!config.minio.bucket) {
    // When no MinIO bucket is configured, return placeholder images
    return [
      `https://placehold.co/600x400?text=${type}+1`,
      `https://placehold.co/600x400?text=${type}+2`
    ]
  }

  return await getSignedUrls(prefix)
})
