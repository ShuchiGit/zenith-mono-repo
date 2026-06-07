# Zenith Estate — Monorepo

Premium real estate consultancy portal for Delhi NCR (zenithestate.in).  
Three services live in this repo: a public-facing Next.js website, a React + Vite admin portal, and an Express.js REST API.

---

## Repository Structure

```
zenith-mono-repo/
├── code/
│   ├── backend/          Express.js API (Node 20, Prisma ORM, MySQL 8)
│   ├── frontend/         Next.js 16 public website (TypeScript, Tailwind CSS 4)
│   └── admin/            React + Vite admin portal (TypeScript, Tailwind CSS 4)
├── infra/
│   ├── environments/
│   │   ├── local/        docker-compose.yml (MySQL + LocalStack S3)
│   │   └── prod/         Terraform for AWS ap-south-1
│   └── modules/          vpc, ec2, rds, s3, cloudfront, secrets
├── scripts/
│   ├── setup.sh          One-command dev environment setup
│   └── seed_data.sql     Real Delhi NCR project & property data
└── CLAUDE.md             Full project specification (API, data models, design system)
```

---

## Local URLs

| Service  | URL                      |
|----------|--------------------------|
| Frontend | http://localhost:3000    |
| Admin    | http://localhost:5173    |
| API      | http://localhost:5001    |

---

## Prerequisites

Install these before anything else.

| Tool        | Version   | Install |
|-------------|-----------|---------|
| Node.js     | 20+       | https://nodejs.org or `nvm install 20` |
| npm         | 10+       | Bundled with Node 20 |
| MySQL       | 8.0       | https://dev.mysql.com/downloads/ or `brew install mysql` |
| Git         | any       | https://git-scm.com |

Verify:
```bash
node -v      # v20.x.x
npm -v       # 10.x.x
mysql --version
```

---

## Installation (Step by Step)

### Step 1 — Clone the repo

```bash
git clone git@github.com:ShuchiGit/zenith-mono-repo.git
cd zenith-mono-repo
```

---

### Step 2 — Create MySQL database and user

Log in to MySQL as root:

```bash
mysql -u root -p
```

Run these SQL commands:

```sql
CREATE DATABASE zenith_estate CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'zenith_user'@'localhost' IDENTIFIED BY 'Zenith@12345';
GRANT ALL PRIVILEGES ON zenith_estate.* TO 'zenith_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

> You can choose a different password — just update `DATABASE_URL` in `code/backend/.env` in the next step.

---

### Step 3 — Set up environment files

Each service needs its own `.env` file. Copy the examples and fill in your values.

#### Backend — `code/backend/.env`

```bash
cp code/backend/.env.example code/backend/.env
```

Then edit `code/backend/.env`:

```env
NODE_ENV=local
PORT=5001

# Replace YOUR_DB_PASSWORD with the password you set in Step 2
DATABASE_URL=mysql://zenith_user:YOUR_DB_PASSWORD@localhost:3306/zenith_estate?connection_limit=5

# Any long random string — used to sign JWT tokens
JWT_SECRET=change_this_to_a_long_random_secret_string

# LocalStack (local S3 mock) — keep these exact values for local dev
AWS_REGION=ap-south-1
AWS_ENDPOINT=http://localhost:4566
AWS_ACCESS_KEY_ID=test
AWS_SECRET_ACCESS_KEY=test
S3_BUCKET=zenith-estate-local-assets
CDN_URL=http://localhost:4566/zenith-estate-local-assets
```

#### Frontend — `code/frontend/.env.local`

```bash
cp code/frontend/.env.local.example code/frontend/.env.local
```

Contents (`code/frontend/.env.local`):

```env
NEXT_PUBLIC_API_URL=http://localhost:5001/v1
NEXT_PUBLIC_CDN_URL=http://localhost:4566/zenith-estate-local-assets
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

#### Admin — `code/admin/.env.local`

```bash
cp code/admin/.env.local.example code/admin/.env.local
```

Contents (`code/admin/.env.local`):

```env
VITE_API_URL=http://localhost:5001/v1
```

---

### Step 4 — Install dependencies

Run the setup script — it installs npm packages for all three services and generates the Prisma client:

```bash
chmod +x scripts/setup.sh
./scripts/setup.sh
```

Or manually:

```bash
cd code/backend  && npm install && npx prisma generate && cd ../..
cd code/frontend && npm install && cd ../..
cd code/admin    && npm install && cd ../..
```

---

### Step 5 — Run database migrations

```bash
cd code/backend
npx prisma migrate deploy
```

This creates all tables in `zenith_estate`.

---

### Step 6 — Seed the database

Seed the admin user and site settings:

```bash
# Still inside code/backend/
npx prisma db seed
```

Then seed real project and property data:

```bash
mysql -u zenith_user -p zenith_estate < ../../scripts/seed_data.sql
# Enter the password you set in Step 2
```

---

### Step 7 — Start all three services

Open three terminal tabs/windows:

**Terminal 1 — Backend API**
```bash
cd code/backend
npm run dev
# Running on http://localhost:5001
```

**Terminal 2 — Frontend website**
```bash
cd code/frontend
npm run dev
# Running on http://localhost:3000
```

**Terminal 3 — Admin portal**
```bash
cd code/admin
npm run dev
# Running on http://localhost:5173
```

---

## Admin Login

| Field    | Value                        |
|----------|------------------------------|
| URL      | http://localhost:5173        |
| Email    | `admin@zenithestate.in`      |
| Password | `admin@zenith2024`           |

---

## Environment File Reference

### `code/backend/.env`

| Variable             | Description                                      | Example value |
|----------------------|--------------------------------------------------|---------------|
| `NODE_ENV`           | Runtime environment                              | `local`       |
| `PORT`               | API port (5000 is blocked by macOS AirPlay)      | `5001`        |
| `DATABASE_URL`       | Prisma MySQL connection string                   | `mysql://zenith_user:pass@localhost:3306/zenith_estate?connection_limit=5` |
| `JWT_SECRET`         | Secret for signing JWT tokens                    | any long random string |
| `AWS_REGION`         | AWS / LocalStack region                          | `ap-south-1`  |
| `AWS_ENDPOINT`       | LocalStack endpoint (local only)                 | `http://localhost:4566` |
| `AWS_ACCESS_KEY_ID`  | LocalStack dummy key (local only)                | `test`        |
| `AWS_SECRET_ACCESS_KEY` | LocalStack dummy secret (local only)          | `test`        |
| `S3_BUCKET`          | S3 bucket name for asset uploads                 | `zenith-estate-local-assets` |
| `CDN_URL`            | Base URL for serving uploaded images             | `http://localhost:4566/zenith-estate-local-assets` |

### `code/frontend/.env.local`

| Variable                  | Description                              | Example value |
|---------------------------|------------------------------------------|---------------|
| `NEXT_PUBLIC_API_URL`     | Backend API base URL (with `/v1`)        | `http://localhost:5001/v1` |
| `NEXT_PUBLIC_CDN_URL`     | CDN base URL for images                  | `http://localhost:4566/zenith-estate-local-assets` |
| `NEXT_PUBLIC_SITE_URL`    | Public site URL (used for SEO/meta)      | `http://localhost:3000` |

### `code/admin/.env.local`

| Variable       | Description              | Example value |
|----------------|--------------------------|---------------|
| `VITE_API_URL` | Backend API base URL     | `http://localhost:5001/v1` |

---

## Tech Stack

| Layer     | Technology                                           |
|-----------|------------------------------------------------------|
| Frontend  | Next.js 16, React 19, TypeScript, Tailwind CSS 4    |
| Admin     | React 18, Vite, TypeScript, Tailwind CSS 4          |
| Backend   | Express.js, Prisma ORM, MySQL 8.0, JWT auth         |
| Styling   | Tailwind CSS 4, Framer Motion, Lucide React icons   |
| Forms     | React Hook Form + Zod v4                            |
| State     | Zustand (admin), server components (frontend)       |
| Infra     | Terraform, AWS EC2 / RDS / S3 / CloudFront          |

---

## Production Domains

| Subdomain                    | Service                     | Hosted on         |
|------------------------------|-----------------------------|-------------------|
| `zenithestate.in`            | Frontend (Next.js)          | EC2 t3.small      |
| `api.zenithestate.in`        | Backend (Express)           | EC2 t3.small      |
| `admin.zenithestate.in`      | Admin portal                | S3 + CloudFront   |
| `cdn.zenithestate.in`        | Image CDN                   | S3 + CloudFront   |

DNS is managed via GoDaddy with manual CNAME/A records pointing to AWS.  
See `infra/environments/prod/` for Terraform config and `infra/scripts/` for deploy scripts.

---

## Troubleshooting

**`EADDRINUSE: address already in use :::5000`**  
macOS AirPlay Receiver occupies port 5000. The backend is already configured for port 5001 in `.env.example`. If you see this, verify your `code/backend/.env` has `PORT=5001`.

**`Access denied for user 'zenith_user'`**  
Re-run the MySQL grant commands in Step 2. Make sure the password in `DATABASE_URL` matches what you set in MySQL.

**`Can't connect to MySQL server`**  
Start MySQL: `brew services start mysql` (macOS) or `sudo systemctl start mysql` (Linux).

**Frontend shows blank page or 500**  
Ensure the backend is running on port 5001 before starting the frontend. Check `NEXT_PUBLIC_API_URL` in `code/frontend/.env.local`.

**Admin portal login fails**  
Make sure you ran `npx prisma db seed` in Step 6 — it creates the admin user. Also verify `VITE_API_URL` points to port 5001.

**Prisma schema out of sync**  
```bash
cd code/backend
npx prisma generate       # regenerate client
npx prisma migrate deploy # apply pending migrations
```

---

## Project Specification

See [`CLAUDE.md`](./CLAUDE.md) for the complete specification: full API reference, data models, design system tokens, color palette, and all coding standards.
