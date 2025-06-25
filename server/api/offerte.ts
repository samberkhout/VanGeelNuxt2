import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const config = useRuntimeConfig()

  if (!config.supabase.url || !config.supabase.key) {
    throw createError({ statusCode: 500, statusMessage: 'Supabase not configured' })
  }

  const supabase = createClient(config.supabase.url, config.supabase.key)

  const { error } = await supabase
    .from(config.supabase.offersTable)
    .insert([body])

  if (error) {
    console.error(error)
    throw createError({ statusCode: 500, statusMessage: 'Database error' })
  }

  return { success: true }
})
