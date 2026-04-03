# Manual Database Migration Guide

Since Vercel can't guarantee network access to Supabase during builds, you need to apply migrations manually:

## Option 1: Using Prisma CLI (Recommended)

```bash
# Set your Supabase DATABASE_URL
export DATABASE_URL="postgresql://postgres:b%25K7Y2DLWb4fht_@db.kuhjsqtvgpviekemfzma.supabase.co:5432/postgres"

# Run migrations
npx prisma migrate deploy
```

## Option 2: Using Supabase Dashboard

1. Go to **https://supabase.com**
2. Log in to your project
3. Go to **SQL Editor**
4. Run this SQL:

```sql
CREATE TABLE "Person" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Person_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Person_email_key" ON "Person"("email");
```

## Vercel Setup

1. Go to **https://vercel.com** → **person-app** → **Settings**
2. Click **"Environment Variables"**
3. Add new variable:
   - **Name**: `DATABASE_URL`
   - **Value**: `postgresql://postgres:b%25K7Y2DLWb4fht_@db.kuhjsqtvgpviekemfzma.supabase.co:5432/postgres`
4. Click **"Save"**

## Redeploy on Vercel

1. Go to **"Deployments"**
2. Click latest failed deployment (or click "Redeploy")
3. Build should now succeed!

Once migrations are applied and DATABASE_URL is in Vercel, your app will be fully functional!
