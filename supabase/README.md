# Supabase membership setup

From the repository root, link the Supabase CLI to the target project and deploy the migration and function:

```sh
supabase link --project-ref YOUR_PROJECT_REF
supabase db push
supabase functions deploy submit-membership --no-verify-jwt
```

Set the public site origins accepted by the function. Use a comma-separated list when production and preview sites are both required:

```sh
supabase secrets set ALLOWED_ORIGINS=https://example.com,http://localhost:5173
```

`SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are provided automatically to hosted Edge Functions. The browser only uses `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.

The migration creates two private buckets. The payment receipt bucket and database fields are reserved for a future upload flow; the current public form does not use them.
