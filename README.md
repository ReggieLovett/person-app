# Person App - Production Ready CRUD Application

A full-stack web application demonstrating production-grade CRUD (Create, Read, Update, Delete) operations with a modern tech stack.

## 🎯 Key Features

- ✅ **Complete CRUD** - Create, read, update, and delete person records
- ✅ **Responsive Design** - Works on desktop, tablet, and mobile devices
- ✅ **Production Database** - PostgreSQL with Prisma ORM
- ✅ **Documentation** - Built-in pages explaining architecture and database
- ✅ **API Routes** - RESTful endpoints for all operations
- ✅ **Type Safety** - Full TypeScript support throughout
- ✅ **Sample Data** - 6 pre-built person records for testing

## 🚀 Quick Start

### Local Development
```bash
# 1. Install dependencies
npm install

# 2. Seed database with sample data
npm run seed

# 3. Start development server
npm run dev
```

Visit http://localhost:3000

### Production Deployment (Vercel)
See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete instructions.

## 📋 Tech Stack

| Component | Technology |
|-----------|-----------|
| **Frontend** | React 19.2.4, Next.js 16.2.2, TypeScript |
| **Styling** | Tailwind CSS 4 |
| **Backend** | Next.js API Routes, Node.js |
| **Database** | Prisma ORM, PostgreSQL (production), SQLite (development) |
| **Deployment** | Vercel |

## 📖 Pages

| Page | Route | Purpose |
|------|-------|---------|
| **Home/CRUD** | `/` | Main interface with form and person table |
| **About** | `/about` | Architecture and technology stack |
| **Database** | `/database` | Prisma schema explanation |
| **GitHub** | `/github` | Link to source code repository |

## 🔌 API Endpoints

```
GET    /api/people              # Get all people
POST   /api/people              # Create person
GET    /api/people/[id]         # Get person by ID
PUT    /api/people/[id]         # Update person
DELETE /api/people/[id]         # Delete person
```

## 🗄️ Database Schema

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

## 📁 Project Structure

```
person-app/
├── app/
│   ├── api/people/             # CRUD API endpoints
│   │   ├── route.ts
│   │   └── [id]/route.ts
│   ├── about/                  # About page
│   ├── database/               # Database explanation
│   ├── github/                 # GitHub link page
│   ├── page.tsx                # Home (CRUD interface)
│   ├── layout.tsx              # Layout with navigation
│   └── globals.css
├── components/
│   └── PersonCRUD.tsx          # CRUD React component
├── lib/
│   └── prisma.ts               # Prisma client
├── prisma/
│   ├── schema.prisma           # Schema definition
│   └── migrations/             # Database migrations
├── scripts/
│   └── seed.ts                 # Sample data seeder
├── .env                        # Environment (development)
├── .env.local                  # Local overrides
├── package.json
├── tsconfig.json
├── next.config.ts
└── tailwind.config.js
```

## 💻 Development Scripts

```bash
npm run dev       # Start dev server (http://localhost:3000)
npm run build     # Build for production
npm run start     # Start production server
npm run seed      # Seed database
npm run lint      # Run ESLint
```

## 🔐 Environment Variables

### Local Development (.env)
```
DATABASE_URL="file:./dev.db"
```

### Production (Vercel Dashboard)
```
DATABASE_URL=postgresql://...
NEXT_PUBLIC_GITHUB_URL=https://github.com/YOUR_USERNAME/person-app
```

## 🧪 Testing the API

### List all people
```bash
curl http://localhost:3000/api/people
```

### Create a person
```bash
curl -X POST http://localhost:3000/api/people \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "age": 30,
    "city": "San Francisco",
    "bio": "Developer"
  }'
```

### Update a person
```bash
curl -X PUT http://localhost:3000/api/people/1 \
  -H "Content-Type: application/json" \
  -d '{"firstName": "Jane", ...}'
```

### Delete a person
```bash
curl -X DELETE http://localhost:3000/api/people/1
```

## 📋 Requirements Checklist

- ✅ Single production URL for submission
- ✅ Full CRUD operations (Create, Read, Update, Delete)
- ✅ Working database integration with real records
- ✅ All CRUD operations functional and tested
- ✅ Responsive design (desktop & mobile)
- ✅ `/about` page with architecture explanation
- ✅ `/github` page with public repository link
- ✅ `/database` page with Prisma schema details
- ✅ Professional UI/UX design
- ✅ Sample data for testing (6 people)
- ✅ Proper Prisma schema and migrations

## 🚀 Deployment Steps

1. **Update GitHub data** in `/github` page
2. **Push to GitHub** repository
3. **Deploy to Vercel**:
   - Connect GitHub repo
   - Set `DATABASE_URL` environment variable
   - Auto-deploy on push
4. **Test production** at your Vercel URL

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

## 🐛 Common Issues

### Port already in use
```bash
kill -9 $(lsof -t -i :3000)
```

### Prisma client missing
```bash
rm -rf node_modules .next
npm install
npx prisma generate
```

### Database errors
```bash
npx prisma migrate deploy
npm run seed
```

## 📚 Learn More

- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Vercel Deployment](https://vercel.com/docs)

---

**Status**: ✨ Production Ready  
**Built with**: Next.js · React · TypeScript · Prisma · Tailwind CSS
