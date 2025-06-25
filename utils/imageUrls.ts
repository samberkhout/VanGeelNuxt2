import { createClient } from '@supabase/supabase-js'
import { Client as MinioClient } from 'minio'

export async function getImageUrls(prefix: string) {
  const config = useRuntimeConfig()

  if (config.supabase.url && config.supabase.key && config.supabase.bucket) {
    const supabase = createClient(config.supabase.url, config.supabase.key)
    const { data: files, error } = await supabase
      .storage
      .from(config.supabase.bucket)
      .list(prefix)
    if (error || !files) return []
    const urls = await Promise.all(
      files.map(async (file) => {
        const { data } = await supabase
          .storage
          .from(config.supabase.bucket)
          .createSignedUrl(`${prefix}${file.name}`, 60 * 60)
        return data?.signedUrl ?? ''
      })
    )
    return urls.filter(Boolean)
  }

  const bucket = config.minio.bucket
  if (!bucket) return []

  const client = new MinioClient({
    endPoint: config.minio.endPoint,
    port: config.minio.port,
    useSSL: config.minio.useSSL,
    accessKey: config.minio.accessKey,
    secretKey: config.minio.secretKey
  })

  const objects: string[] = await new Promise((resolve, reject) => {
    const stream = client.listObjects(bucket, prefix, true)
    const names: string[] = []
    stream.on('data', (obj) => names.push(obj.name))
    stream.on('error', reject)
    stream.on('end', () => resolve(names))
  })

  return Promise.all(
    objects.map((name) => client.presignedGetObject(bucket, name, 60 * 60))
  )
}
