# ⚡ Vercel Deployment - Quick Setup

## Your GitHub Repo
✅ **https://github.com/ReggieLovett/person-app**

## Deploy to Vercel

### Option 1: Direct Vercel Import (Recommended)

1. **Open this link** (auto-imports from your GitHub):
   ```
   https://vercel.com/new?repo=https://github.com/ReggieLovett/person-app
   ```

2. **Click "Import Project"**

3. **Add Environment Variable**:
   - **Name**: `DATABASE_URL`
   - **Value**: `postgresql://postgres:[b%K7Y2DLWb4fht_]@db.kuhjsqtvgpviekemfzma.supabase.co:5432/postgres`
   - Click "Add"

4. **Click "Deploy"** → Wait 2-3 minutes

### Option 2: Manual Import

1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Paste: `https://github.com/ReggieLovett/person-app.git`
4. Click "Import"
5. Add DATABASE_URL environment variable (same as above)
6. Click "Deploy"

---

## After Deployment

### 1. Update for PostgreSQL
File: `prisma/schema.prisma`

Change:
```prisma
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}
```

To:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

Commit and push:
```bash
git add prisma/schema.prisma
git commit -m "Use PostgreSQL for production"
git push origin main
```

Vercel auto-redeploys.

### 2. Setup Database (Run from your local machine)

```bash
cd /Users/reggielovett/Desktop/person/person-app

# Apply migrations
DATABASE_URL="postgresql://postgres:[b%K7Y2DLWb4fht_]@db.kuhjsqtvgpviekemfzma.supabase.co:5432/postgres" npx prisma migrate deploy --skip-generate

# Seed database with sample data
DATABASE_URL="postgresql://postgres:[b%K7Y2DLWb4fht_]@db.kuhjsqtvgpviekemfzma.supabase.co:5432/postgres" npm run seed
```

### 3. Test Your Live App

After Vercel deployment completes, you'll get a URL like:
```
https://person-app-abc123.vercel.app
```

Test:
- ✅ Home page loads
- ✅ Create a person
- ✅ Update/Delete work
- ✅ `/about`, `/database`, `/github` pages load

---

## 📝 Your Submission URL

Once everything works, your submission is:
```
https://person-app-[vercel-domain].vercel.app
```

This URL will be your **single submission** for the deliverable.

---

Done! 🚀
