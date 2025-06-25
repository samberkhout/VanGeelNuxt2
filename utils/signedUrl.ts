import { Client } from 'minio'

export async function getSignedUrls(prefix: string) {
  const config = useRuntimeConfig()
  const client = new Client({
    endPoint: config.minio.endPoint,
    port: config.minio.port,
    useSSL: config.minio.useSSL,
    accessKey: config.minio.accessKey,
    secretKey: config.minio.secretKey
  })
  const bucket = config.minio.bucket

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
