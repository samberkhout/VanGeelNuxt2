import { createClient } from '@supabase/supabase-js'

const url = process.env.SUPABASE_URL
const key = process.env.SUPABASE_SERVICE_ROLE_KEY
const bucket = process.env.SUPABASE_BUCKET || 'public'
const table = process.env.SUPABASE_OFFERS_TABLE || 'offertes'

if (!url || !key) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(url, key, { auth: { persistSession: false } })

async function ensureBucket() {
  const { data: buckets, error } = await supabase.storage.listBuckets()
  if (error) throw error
  if (!buckets.find(b => b.name === bucket)) {
    console.log(`Creating bucket ${bucket}`)
    await supabase.storage.createBucket(bucket, { public: true })
  } else {
    console.log(`Bucket ${bucket} already exists`)
  }
}

async function ensureTable() {
  const { data: tables } = await supabase
    .from('pg_meta.tables')
    .select('name')
    .eq('name', table)

  if (!tables?.length) {
    console.log(`Creating table ${table}`)
    await supabase.rpc('pg_execute_sql', {
      sql: `create table if not exists public.${table} (
        id uuid primary key default gen_random_uuid(),
        naam text,
        email text,
        datum date,
        personen integer,
        type_feest text,
        pakket text,
        opmerkingen text,
        created_at timestamptz default now()
      )`
    })
  } else {
    console.log(`Table ${table} already exists`)
  }
}

ensureBucket()
  .then(ensureTable)
  .then(() => {
    console.log('Supabase setup complete')
    process.exit(0)
  })
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
