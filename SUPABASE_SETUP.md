# Supabase Database Setup Guide

## Current Status

The production deployment at https://person-app-eight.vercel.app/ is **live but needs database configuration**.

### What's Working ✅
- Next.js application deployed to Vercel
- All pages load: `/`, `/about`, `/database`, `/github`
- API routes exist and respond (GET, POST, PUT, DELETE)
- Code is production-ready

### What Needs Setup ⚠️
- Production PostgreSQL database tables need to be created
- The code attempts to connect to `db.kuhjsqtvgpviekemfzma.supabase.co` but this address doesn't resolve or isn't accessible

## How to Fix It

### Option 1: Create a New Supabase Project (Recommended)

1. **Create a new Supabase project:**
   - Go to https://supabase.com
   - Sign up or log in 
   - Create a new project
   - Note the **Project Reference** (e.g., `xyzabc123defgh`)

2. **Get the connection string:**
   - Go to Project Settings → Database
   - Copy the "Connection Pooling" connection string, OR
   - Copy the standard PostgreSQL connection string
   - Format: `postgresql://postgres:[password]@[host]:5432/postgres`

3. **Update Vercel environment variable:**
   - Go to https://vercel.com → Your Project → Settings → Environment Variables
   - Add/Update `DATABASE_URL` with the connection string from step 2
   - Redeploy the project (git push or click Redeploy in Vercel)

4. **Run migrations:**
   - Option A: Migrations will auto-run during Vercel build (recommended)
   - Option B: Manually run from CLI:
     ```bash
     DATABASE_URL="your_connection_string" npx prisma migrate deploy
     npm run seed  # Optional: seed with sample data
     ```

5. **Verify:**
   - Visit https://person-app-eight.vercel.app/
   - Try creating a person in the form
   - Check the GET /api/people endpoint

### Option 2: Use Your Current Supabase Project (If It Exists)

If you created the original Supabase project:

1. **Check Supabase network settings:**
   - Go to https://supabase.com → Your Project → Settings → Network
   - Verify  firewall rules allow connections from Vercel
   - Whitelist: `0.0.0.0/0` (allows all IPs) for testing

2. **Verify connection string is correct:**
   - Go to Project Settings → Database
   - Copy the exact PostgreSQL connection string
   - Make sure the project reference in the hostname matches your project

3. **Update Vercel:**
   - Add correct `DATABASE_URL` to Vercel environment variables
   - Trigger a redeploy

## Step-by-Step for Beginners

### Create Supabase Project:
```
1. Visit https://supabase.com/
2. Click "Sign In" or "Start Your Project"
3. Create account or sign in
4. Click "New Project"
5. Give it a name (e.g., "person-app")
6. Set a strong password
7. Select desired region
8. Wait for project to initialize (~1-2 minutes)
```

### Get Database Connection String:
```
1. In Supabase dashboard, go to Project Settings (bottom left)
2. Click "Database"
3. Copy the connection string labeled "Postgres" or "Connection pooler"
4. It should look like:
   postgresql://postgres:yourpassword@hostname.supabase.co:5432/postgres
```

### Update Vercel:
```
1. Go to https://vercel.com
2. Find your "person-app" project
3. Click Settings
4. Click "Environment Variables"  
5. Click "Add New"
6. Name: DATABASE_URL
7. Value: Paste the connection string from above
8. Click "Save"
9. Go back to Deployments tab
10. Click the three dots on the latest deployment
11. Click "Redeploy"
```

### Test It:
```bash
# After Vercel finishes redeploying (~2-3 minutes):
curl https://person-app-eight.vercel.app/api/people

# Should return [] instead of error
```

## What's Happening

When you deploy:
1. Vercel runs: `npm run build`
2. Which runs: `prisma migrate deploy --skip-generate`
3. This applies the migration creating the "Person" table
4. The Next.js app starts and can now query the database

If you see errors in Vercel build logs, it's likely the `DATABASE_URL` environment variable is missing or incorrect.

## Database Schema

The migration creates a "Person" table with these fields:
- `id` - Auto-incrementing primary key
- `firstName` - Required text
- `lastName` - Required text
- `email` - Required, must be unique
- `phone` - Optional text
- `age` - Optional number
- `city` - Optional text
- `bio` - Optional text  
- `createdAt` - Timestamp (auto-set)
- `updatedAt` - Timestamp (auto-set)

## API Endpoints

Once database is set up:
- `GET /api/people` - Get all people
- `POST /api/people` - Create new person
- `GET /api/people/[id]` - Get one person
- `PUT /api/people/[id]` - Update person
- `DELETE /api/people/[id]` - Delete person

## Local Development

For local testing with SQLite:
```bash
npm install
npm run dev
# Visit http://localhost:3000
# CRUD operations work against local SQLite database
```

## Troubleshooting

### Error: "Failed to fetch people"
- DATABASE_URL not set in Vercel
- Migrations haven't run yet
- Solution: Check Vercel settings, wait for redeploy, check build logs

### Error: "Can't reach database server"
- Connection string incorrect
- Firewall blocking connection
- Supabase project doesn't exist
- Solution: Verify connection string, check Supabase network settings

### Migrations won't apply
- DATABASE_URL format is wrong
- Password contains special characters needing escaping
- Solution: Use Supabase dashboard to copy exact connection string

## Support

- Supabase Docs: https://supabase.com/docs
- Prisma Docs: https://www.prisma.io/docs
- Vercel Docs: https://vercel.com/docs

## Files Related to Database

- `prisma/schema.prisma` - Database schema and models
- `prisma/migrations/` - Migration files
- `lib/prisma.ts` - Prisma client setup
- `.env` - Local database URL (SQLite)
- Vercel Settings - Production database URL (PostgreSQL)
