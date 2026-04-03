# Person App - Deployment Guide

## Project Setup ✅
- ✅ Next.js 16 + React 19 + TypeScript
- ✅ Prisma ORM with SQLite (local) and PostgreSQL (production)
- ✅ Full CRUD API routes (`/api/people`, `/api/people/[id]`)
- ✅ React UI component with form and table
- ✅ Documentation pages: `/about`, `/database`, `/github`
- ✅ 6 sample person records seeded in database
- ✅ Responsive Tailwind CSS design

## Local Testing
```bash
npm install
npm run seed  # Seeds 6 sample people
npm run dev   # Start on http://localhost:3000
```

View the app:
- Home (CRUD): http://localhost:3000
- About: http://localhost:3000/about
- Database: http://localhost:3000/database
- GitHub: http://localhost:3000/github
- API: http://localhost:3000/api/people

## Deployment to Vercel

### 1. Prepare PostgreSQL Schema for Production

Before deploying, update `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"  // Change from "sqlite"
  url      = env("DATABASE_URL")
}
```

Create a new Prisma migration:
```bash
npx prisma migrate dev --name production_setup
```

### 2. Git Setup
```bash
git init
git add .
git commit -m "Initial Person App deployment"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/person-app.git
git push -u origin main
```

### 3. Create Vercel Project
1. Go to https://vercel.com
2. Click "New Project"
3. Import your GitHub repository
4. Select "Next.js" framework

### 4. Set Environment Variables in Vercel
In Vercel project settings → Environment Variables, add:
```
DATABASE_URL=postgresql://postgres:[b%K7Y2DLWb4fht_]@db.kuhjsqtvgpviekemfzma.supabase.co:5432/postgres
```

### 5. Deploy
Vercel will automatically:
- Run `npm install`
- Run postinstall script: `prisma generate`
- Run `npm run build`
- Deploy to production

### 6. Run Migrations on Production
After first deployment, run migrations:
```bash
# From your local machine:
DATABASE_URL="postgresql://..." npx prisma migrate deploy

# Or seed the production database:
npm run seed
```

## API Endpoints

### GET /api/people
Get all person records
```bash
curl http://localhost:3000/api/people
```

### POST /api/people
Create a new person
```bash
curl -X POST http://localhost:3000/api/people \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "email": "test@example.com",
    "phone": "555-0000",
    "age": 30,
    "city": "Austin",
    "bio": "Test bio"
  }'
```

### GET /api/people/[id]
Get a specific person
```bash
curl http://localhost:3000/api/people/7
```

### PUT /api/people/[id]
Update a person
```bash
curl -X PUT http://localhost:3000/api/people/7 \
  -H "Content-Type: application/json" \
  -d '{"firstName": "Updated", ...}'
```

### DELETE /api/people/[id]
Delete a person
```bash
curl -X DELETE http://localhost:3000/api/people/7
```

## Troubleshooting

### Prisma Client Not Found
```bash
rm -rf node_modules .next
npm install
npx prisma generate
```

### Database Connection Error
- Check DATABASE_URL is set correctly in Vercel
- Verify PostgreSQL server is running and accessible
- Test connection: `npx prisma db execute --stdin < test.sql`

### Migrations Not Applied
```bash
npx prisma migrate deploy
```

### Seed Database
```bash
npm run seed
```

## Project Structure
```
person-app/
├── app/
│   ├── api/
│   │   └── people/
│   │       ├── route.ts          # GET, POST endpoints
│   │       └── [id]/
│   │           └── route.ts      # GET, PUT, DELETE endpoints (by ID)
│   ├── about/
│   │   └── page.tsx              # Architecture & tech stack
│   ├── database/
│   │   └── page.tsx              # Prisma schema explanation
│   ├── github/
│   │   └── page.tsx              # GitHub repo link
│   ├── layout.tsx                # Navigation bar
│   ├── page.tsx                  # Home with CRUD interface
│   └── globals.css
├── components/
│   └── PersonCRUD.tsx            # React form & table for CRUD
├── lib/
│   └── prisma.ts                 # Prisma client instance
├── prisma/
│   ├── schema.prisma             # Database schema
│   └── migrations/               # Database migrations
├── scripts/
│   └── seed.ts                   # Sample data
├── .env                          # Local: SQLite
├── .env.local                    # Local development
├── package.json                  # Dependencies & scripts
├── tsconfig.json                 # TypeScript config
├── next.config.ts                # Next.js config
├── tailwind.config.js            # Tailwind CSS config
└── README.md                     # This file
```

## Database Schema

### Person Model
```prisma
model Person {
  id        Int     @id @default(autoincrement())
  firstName String
  lastName  String
  email     String  @unique
  phone     String?
  age       Int?
  city      String?
  bio       String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## Technology Stack
- **Frontend**: React 19.2.4, Next.js 16.2.2, TypeScript 5
- **Styling**: Tailwind CSS 4
- **Database**: Prisma ORM 5, SQLite (dev), PostgreSQL (prod)
- **Deployment**: Vercel

## Features Implemented
- ✅ Create person records with validation
- ✅ Read all people with ordered list
- ✅ Update existing person records
- ✅ Delete person records with confirmation
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Error handling and user feedback
- ✅ Database migrations
- ✅ Sample data seeding
- ✅ Documentation pages
- ✅ GitHub repository link

## Next Steps
1. Update GitHub URL in `/github` page
2. Push to GitHub repository
3. Deploy to Vercel with environment variables
4. Test all CRUD operations in production
5. Monitor logs in Vercel dashboard

---

Made with ❤️ using Next.js, Prisma, and Tailwind CSS
