# Setup Supabase

1. [Create a new Supabase project](https://database.new)
2. When the Supabase project is created, go to the project settings and copy the URL and the anon key under the API tab
3. Open the [`wrangler.toml`](wrangler.toml):
   1. Replace the `SUPABASE_CLIENT_URL` with the URL you copied
   2. Replace the `SUPABASE_CLIENT_KEY` with the anon key you copied
4. Go back to the Supabase project settings and copy the URL and the service role key under the API tab
5. Open the [`wrangler.toml`](wrangler.toml):
   1. Replace the `SUPABASE_SERVER_URL` with the URL you copied
   - If running in development/preview:
     1. Create a new `.dev.vars` file in the root of the project
     2. Add the following lines to the file:
     ```
     SUPABASE_SERVER_KEY=<service role key>
     ```
   - If running in production (Cloudflare Workers):
     1. Create a new secret with the following command:
     ```
      wrangler secret put SUPABASE_SERVER_KEY
     ```
     2. Add the service role key as the value
6. Go back to the Supabase project and open the SQL editor
7. Copy the SQL code from the [`data/supabase.sql`](data/supabase.sql) file
8. Run the SQL code in the SQL editor
