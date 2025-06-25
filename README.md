# BBQ Garage Website

This Nuxt 3 project powers the BBQ Garage catering and rental website. Images are loaded from MinIO or Supabase storage and quote requests are stored in Supabase.

## Setup

1. Copy `.env.example` to `.env` and fill in the values for MinIO or Supabase.
2. Install dependencies with `npm install`.
3. (Optional) Create the Supabase bucket and table using:
   ```bash
   npm run setup:supabase
   ```
   This uses the service role key to create the bucket defined in `SUPABASE_BUCKET` and a table defined in `SUPABASE_OFFERS_TABLE`.
4. Start the development server with `npm run dev`.

## Deploy

Deploy the project to Vercel. The runtime environment should include the same variables from `.env`.
