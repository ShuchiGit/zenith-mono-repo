#!/usr/bin/env bash
set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

log() { echo -e "${GREEN}[setup]${NC} $1"; }
warn() { echo -e "${YELLOW}[warn]${NC} $1"; }

ROOT="$(cd "$(dirname "$0")/.." && pwd)"

# ── Prerequisites check ────────────────────────────────────────────────────────
command -v node >/dev/null || { echo "Node.js is required. Install from https://nodejs.org"; exit 1; }
command -v npm  >/dev/null || { echo "npm is required."; exit 1; }
log "Node $(node -v) / npm $(npm -v)"

# ── Backend ────────────────────────────────────────────────────────────────────
log "Setting up backend..."
cd "$ROOT/code/backend"

if [ ! -f .env ]; then
  cp .env.example .env
  warn "Created code/backend/.env from .env.example — edit it with your DB password and JWT secret before starting."
fi

npm install
npx prisma generate
log "Backend dependencies installed."

# ── Frontend ───────────────────────────────────────────────────────────────────
log "Setting up frontend..."
cd "$ROOT/code/frontend"

if [ ! -f .env.local ]; then
  cp .env.local.example .env.local
  log "Created code/frontend/.env.local"
fi

npm install
log "Frontend dependencies installed."

# ── Admin ──────────────────────────────────────────────────────────────────────
log "Setting up admin..."
cd "$ROOT/code/admin"

if [ ! -f .env.local ]; then
  cp .env.local.example .env.local
  log "Created code/admin/.env.local"
fi

npm install
log "Admin dependencies installed."

# ── Done ───────────────────────────────────────────────────────────────────────
echo ""
log "Setup complete! Next steps:"
echo "  1. Edit code/backend/.env  — set DATABASE_URL and JWT_SECRET"
echo "  2. Run DB migrations:  cd code/backend && npx prisma migrate deploy"
echo "  3. Seed the database:  mysql -u zenith_user -p zenith_estate < scripts/seed_data.sql"
echo "  4. Start services:"
echo "     Terminal 1 → cd code/backend  && npm run dev"
echo "     Terminal 2 → cd code/frontend && npm run dev"
echo "     Terminal 3 → cd code/admin    && npm run dev"
echo ""
echo "  URLs: Frontend http://localhost:3000 | Admin http://localhost:5173 | API http://localhost:5001"
echo "  Admin login: admin@zenithestate.in / admin@zenith2024"
