# 🚀 GitHub & Vercel Deployment Guide

## Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. **Repository name**: `person-app`
3. **Description**: "Production-ready CRUD application with Next.js, Prisma, and PostgreSQL"
4. **Public** (so you can share the link)
5. **Do NOT initialize with README, .gitignore, or license** (we have these)
6. Click **"Create repository"**

## Step 2: Push to GitHub

After creating your repo, GitHub will show commands. Run these in your terminal:

```bash
cd /Users/reggielovett/Desktop/person/person-app

# Connect to GitHub (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/person-app.git

# Rename branch to main (if needed)
git branch -M main

# Push code to GitHub
git push -u origin main
```

Your repository is now at: `https://github.com/YOUR_USERNAME/person-app`

## Step 3: Deploy to Vercel

### 3a. Connect GitHub to Vercel

1. Go to https://vercel.com
2. Click **"New Project"**
3. Click **"Import Git Repository"**
4. Search for **`person-app`** and select it
5. Click **"Import"**

### 3b. Configure Environment Variables

On the Vercel import screen:

1. Under **"Environment Variables"**, click **"Add"**
2. **Name**: `DATABASE_URL`
3. **Value**: `postgresql://postgres:[b%K7Y2DLWb4fht_]@db.kuhjsqtvgpviekemfzma.supabase.co:5432/postgres`
4. Click **"Add"**

### 3c. Update Prisma Schema for Production

Before deploying, update your schema to use PostgreSQL:

```bash
# Edit the file
nano prisma/schema.prisma

# Change this:
# datasource db {
#   provider = "sqlite"
#   url      = env("DATABASE_URL")
# }

# To this:
# datasource db {
#   provider = "postgresql"
#   url      = env("DATABASE_URL")
# }
```

Then commit and push:
```bash
git add prisma/schema.prisma
git commit -m "Use PostgreSQL for production"
git push origin main
```

Vercel will automatically redeploy.

### 3d. Deploy

Back on the Vercel import screen:
1. Click **"Deploy"**
2. Wait for deployment to complete (2-3 minutes)
3. You'll get a production URL like: `https://person-app-xyz.vercel.app`

## Step 4: Setup Production Database

After Vercel deployment completes:

```bash
# Apply migrations to PostgreSQL
DATABASE_URL="postgresql://postgres:[b%K7Y2DLWb4fht_]@db.kuhjsqtvgpviekemfzma.supabase.co:5432/postgres" \
npx prisma migrate deploy --skip-generate

# Optional: Seed production database
DATABASE_URL="postgresql://postgres:[b%K7Y2DLWb4fht_]@db.kuhjsqtvgpviekemfzma.supabase.co:5432/postgres" \
npm run seed
```

## Step 5: Verify Deployment

Visit your Vercel URL and test:
- ✅ Home page loads with empty table
- ✅ Create a person (form should work)
- ✅ All CRUD operations work
- ✅ `/about` page displays correctly
- ✅ `/database` page works
- ✅ `/github` page shows your repo link

## 📊 Summary

| Item | URL |
|------|-----|
| GitHub Repository | https://github.com/YOUR_USERNAME/person-app |
| Live Production App | https://person-app-xyz.vercel.app |
| Vercel Dashboard | https://vercel.com/dashboard |

## 🔧 Environment Variables

### Local Development (.env)
```
DATABASE_URL="file:./dev.db"
```

### Vercel (Dashboard Settings)
```
DATABASE_URL=postgresql://postgres:[b%K7Y2DLWb4fht_]@db.kuhjsqtvgpviekemfzma.supabase.co:5432/postgres
```

## 🆘 Troubleshooting

### Build fails on Vercel
- Check Environment Variables are set
- Verify DATABASE_URL is correct
- Check logs in Vercel dashboard

### Database connection error
- Ensure PostgreSQL server is accessible
- Verify firewall/network settings
- Test connection: `psql postgresql://...`

### Migrations not applied
```bash
# Run migrations manually
DATABASE_URL="postgresql://..." npx prisma migrate deploy
```

### Reset database
```bash
# ⚠️ WARNING: This deletes all data!
DATABASE_URL="postgresql://..." npx prisma migrate reset
npm run seed
```

---

## ✨ You're Done!

After deployment:
1. ✅ Share your production URL
2. ✅ GitHub repo is public
3. ✅ App is live on Vercel
4. ✅ Database is connected

**Your submission URL will be**: `https://person-app-YOUR-DOMAIN.vercel.app`
