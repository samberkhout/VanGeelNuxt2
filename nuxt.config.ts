export default defineNuxtConfig({
  css: ['@/assets/tailwind.css'],
  modules: ['@nuxtjs/tailwindcss'],
  tailwindcss: {
    configPath: 'tailwind.config.js'
  },
  runtimeConfig: {
    minio: {
      endPoint: process.env.MINIO_ENDPOINT || 'localhost',
      port: parseInt(process.env.MINIO_PORT || '9000'),
      useSSL: process.env.MINIO_USE_SSL === 'true',
      accessKey: process.env.MINIO_ACCESS_KEY || '',
      secretKey: process.env.MINIO_SECRET_KEY || '',
      bucket: process.env.MINIO_BUCKET || ''
    },
    supabase: {
      url:
        process.env.SUPABASE_URL ||
        process.env.NEXT_PUBLIC_SUPABASE_URL ||
        '',
      key:
        process.env.SUPABASE_SERVICE_ROLE_KEY ||
        process.env.SUPABASE_KEY ||
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
        '',
      bucket: process.env.SUPABASE_BUCKET || 'public',
      offersTable: process.env.SUPABASE_OFFERS_TABLE || 'offertes'
    }
  },
  app: {
    head: {
      title: 'BBQ Garage',
      meta: [
        { name: 'description', content: 'Industriële BBQ catering en verhuur van licht en geluid' }
      ]
    }
  }
})
