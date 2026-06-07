# Zenith Estate — Monorepo

Premium real estate consultancy portal for Delhi NCR.

## Structure

```
zenith-mono-repo/
├── code/
│   ├── backend/     Express.js API          → http://localhost:5001
│   ├── frontend/    Next.js 14 (TypeScript)  → http://localhost:3000
│   └── admin/       React + Vite (TypeScript) → http://localhost:5173
├── infra/           Terraform (AWS prod) + docker-compose (local)
├── scripts/
│   ├── setup.sh     One-command dev setup
│   └── seed_data.sql Real project/property seed data
└── CLAUDE.md        Full project specification
```

## Quick Start (New Engineer)

### Prerequisites
- Node.js 20+
- MySQL 8.0 running locally (`zenith_estate` database)

### 1. Clone & Setup
```bash
git clone git@github.com:ShuchiGit/zenith-mono-repo.git
cd zenith-mono-repo
chmod +x scripts/setup.sh
./scripts/setup.sh
```

### 2. Configure Backend
Edit `code/backend/.env`:
```
DATABASE_URL=mysql://zenith_user:YOUR_PASSWORD@localhost:3306/zenith_estate?connection_limit=5
JWT_SECRET=any_long_random_string
```

### 3. Create MySQL DB & User
```sql
CREATE DATABASE zenith_estate;
CREATE USER 'zenith_user'@'localhost' IDENTIFIED BY 'YOUR_PASSWORD';
GRANT ALL PRIVILEGES ON zenith_estate.* TO 'zenith_user'@'localhost';
FLUSH PRIVILEGES;
```

### 4. Run Migrations & Seed
```bash
cd code/backend
npx prisma migrate deploy
npx prisma db seed          # seeds admin user

# Seed real project/property data
mysql -u zenith_user -p zenith_estate < ../scripts/seed_data.sql
```

### 5. Start All Services (3 terminals)
```bash
# Terminal 1 — Backend
cd code/backend && npm run dev

# Terminal 2 — Frontend
cd code/frontend && npm run dev

# Terminal 3 — Admin
cd code/admin && npm run dev
```

## URLs

| Service  | URL |
|----------|-----|
| Frontend | http://localhost:3000 |
| Admin    | http://localhost:5173 |
| API      | http://localhost:5001 |

## Admin Login
- Email: `admin@zenithestate.in`
- Password: `admin@zenith2024`

## Tech Stack

| Layer    | Technology |
|----------|------------|
| Frontend | Next.js 16 + TypeScript + Tailwind CSS 4 |
| Admin    | React + Vite + TypeScript + Tailwind CSS 4 |
| Backend  | Express.js + Prisma ORM |
| Database | MySQL 8.0 |
| Infra    | Terraform (AWS ap-south-1) |

## Production Domains
- `zenithestate.in` — Frontend (EC2)
- `api.zenithestate.in` — Backend (EC2)
- `admin.zenithestate.in` — Admin (S3 + CloudFront)
- `cdn.zenithestate.in` — Assets CDN (S3 + CloudFront)

See `CLAUDE.md` for the full specification including API reference, data models, and design system.
