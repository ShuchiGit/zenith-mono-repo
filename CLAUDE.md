# Zenith Estate — Full Project Context for Claude Code

> Read this entire file before doing anything. This is the single source of truth.

---

## 1. PROJECT OVERVIEW

**Brand:** Zenith Estate  
**Domain:** zenithestate.in  
**Type:** Premium Real Estate Consultancy Portal (Delhi NCR)  
**Root Path:** `/Users/ritisha/zenithestate`

### Directory Structure
```
/Users/ritisha/zenithestate/
├── CLAUDE.md              ← this file
├── code/
│   ├── backend/           ← EXISTS ✅ Express.js API running on :5000
│   ├── frontend/          ← NEEDS CREATION ❌ Next.js 14
│   └── admin/             ← NEEDS CREATION ❌ React + Vite
└── infra/                 ← NEEDS CREATION ❌ Terraform
    ├── modules/
    │   ├── vpc/
    │   ├── ec2/
    │   ├── rds/
    │   ├── s3/
    │   ├── s3_admin/
    │   ├── cloudfront/
    │   └── secrets/
    └── environments/
        ├── local/
        └── prod/
```

---

## 2. CURRENT STATE

### Backend ✅ DONE & RUNNING
- Running at `http://localhost:5000`
- MySQL connected: `zenith_estate` DB at localhost:3306
- DB user: `zenith_user` / `Zenith@12345`
- DATABASE_URL: `mysql://zenith_user:Zenith@12345@localhost:3306/zenith_estate?connection_limit=5`
- Prisma migrations run, DB seeded
- Admin login seeded: `admin@zenithestate.in` / `admin@zenith2024`

### Frontend ❌ NOT CREATED YET
### Admin ❌ NOT CREATED YET
### Infra ❌ NOT CREATED YET

---

## 3. TECH STACK

| Layer | Technology |
|---|---|
| Frontend | Next.js 14+ TypeScript, App Router |
| Admin Portal | React + Vite TypeScript |
| Backend | Express.js JavaScript (DONE) |
| Database | MySQL 8.0 via Prisma ORM |
| Styling | Tailwind CSS |
| UI Components | shadcn/ui + Radix UI primitives |
| Icons | Lucide React |
| Animation | Framer Motion |
| Forms | React Hook Form + Zod validation |
| State (Admin) | Zustand |
| HTTP Client | Axios (central wrapper) |
| Fonts | Clash Display (headings) + Inter (body) |
| Image Storage | AWS S3 + CloudFront CDN |
| Infra | Terraform (local + prod environments) |

---

## 4. DESIGN SYSTEM

### Color Palette
```css
--color-primary:     #006d77;  /* Stormy Teal   — CTAs, headings, nav */
--color-secondary:   #83c5be;  /* Pearl Aqua    — accents, hover, borders */
--color-background:  #edf6f9;  /* Alice Blue    — page backgrounds */
--color-warm:        #ffddd2;  /* Almond Silk   — warm accents, badges */
--color-accent:      #e29578;  /* Tangerine Dream — CTA highlights, tags */
```

### Fonts
```css
font-family: 'Clash Display', sans-serif;  /* ALL headings h1-h6 */
font-family: 'Inter', sans-serif;          /* ALL body text */
```
Load Clash Display from: `https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap`  
Load Inter from: Google Fonts

### Design Style — Glassmorphism
```css
/* Glass Card */
background: rgba(237, 246, 249, 0.6);
backdrop-filter: blur(12px);
-webkit-backdrop-filter: blur(12px);
border: 1px solid rgba(131, 197, 190, 0.25);
box-shadow: 0 8px 32px rgba(0, 109, 119, 0.08);

/* Glass Nav (on scroll) */
background: rgba(255, 255, 255, 0.82);
backdrop-filter: blur(20px);
border-bottom: 1px solid rgba(131, 197, 190, 0.2);

/* Primary Button */
background: #006d77;
box-shadow: 0 4px 20px rgba(0, 109, 119, 0.3);

/* Status Badges */
UNDER_CONSTRUCTION → bg #ffddd2, text #006d77
READY_TO_MOVE      → bg #83c5be, text white
NEW_LAUNCH         → bg #e29578, text white
```

### Tailwind Config Extensions (add to tailwind.config.ts)
```js
colors: {
  'stormy-teal': '#006d77',
  'pearl-aqua': '#83c5be',
  'alice-blue': '#edf6f9',
  'almond-silk': '#ffddd2',
  'tangerine-dream': '#e29578',
  primary: {
    DEFAULT: '#006d77',
    50: '#e6f4f5', 100: '#b0d9dc', 200: '#7abec3',
    300: '#44a3aa', 400: '#1d8891', 500: '#006d77',
    600: '#005a63', 700: '#00464d', 800: '#003338', 900: '#001f22',
  },
  secondary: { DEFAULT: '#83c5be', light: '#a8d8d3', dark: '#5fa8a0' },
  accent: { DEFAULT: '#e29578', warm: '#ffddd2' },
  background: '#edf6f9',
},
fontFamily: {
  heading: ['Clash Display', 'sans-serif'],
  body: ['Inter', 'sans-serif'],
  sans: ['Inter', 'sans-serif'],
},
boxShadow: {
  glass: '0 8px 32px rgba(0, 109, 119, 0.08)',
  'glass-lg': '0 20px 60px rgba(0, 109, 119, 0.12)',
  primary: '0 4px 20px rgba(0, 109, 119, 0.3)',
  'primary-lg': '0 8px 40px rgba(0, 109, 119, 0.4)',
  card: '0 2px 16px rgba(0, 109, 119, 0.06)',
  'card-hover': '0 12px 40px rgba(0, 109, 119, 0.15)',
},
backdropBlur: { xs: '2px', sm: '4px', md: '12px', lg: '20px', xl: '40px' },
```

### Reusable CSS Classes (add to globals.css @layer components)
```css
.glass-card {
  background: rgba(237, 246, 249, 0.6);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(131, 197, 190, 0.25);
  box-shadow: 0 8px 32px rgba(0, 109, 119, 0.08);
}
.glass-nav {
  background: rgba(255, 255, 255, 0.82);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(131, 197, 190, 0.2);
}
.btn-primary {
  @apply bg-primary-500 text-white px-6 py-3 rounded-xl font-medium
         shadow-primary hover:bg-primary-600 hover:shadow-primary-lg
         active:scale-95 transition-all duration-200;
}
.btn-secondary {
  @apply bg-white text-primary-500 border border-primary-200 px-6 py-3 rounded-xl
         font-medium hover:bg-alice-blue active:scale-95 transition-all duration-200;
}
.input-field {
  @apply w-full px-4 py-3 rounded-xl border border-pearl-aqua/40 bg-white/70
         placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2
         focus:ring-primary-300 focus:border-primary-400 transition-all duration-200;
}
.section-padding { @apply py-16 md:py-24; }
.section-title { @apply font-heading text-3xl md:text-4xl text-primary-500 mb-4; }
.status-badge-under-construction { @apply bg-almond-silk text-primary-500 text-xs font-semibold px-3 py-1 rounded-full; }
.status-badge-ready-to-move { @apply bg-pearl-aqua text-white text-xs font-semibold px-3 py-1 rounded-full; }
.status-badge-new-launch { @apply bg-tangerine-dream text-white text-xs font-semibold px-3 py-1 rounded-full; }
```

---

## 5. BACKEND API REFERENCE (already built)

**Base URL (local):** `http://localhost:5000/v1`  
**Base URL (prod):** `https://api.zenithestate.in/v1`

### Public Endpoints (no auth)
```
GET  /health                     → API health check
GET  /v1/projects                → list projects (filters: city, status, bhkType, search, page, limit)
GET  /v1/projects/featured       → featured projects (max 6)
GET  /v1/projects/:slug          → single project by slug
GET  /v1/properties              → list properties (filters: city, status, type, bhkType, search, page, limit)
GET  /v1/properties/:slug        → single property by slug
POST /v1/enquiries               → submit lead { name, phone, email?, message?, source, projectId?, propertyId? }
GET  /v1/videos                  → list active videos
GET  /v1/settings                → all site settings as key-value map
```

### Admin Endpoints (Bearer token required)
```
POST   /v1/admin/login           → { email, password } → { accessToken, refreshToken, admin }
POST   /v1/admin/refresh         → { refreshToken } → { accessToken }
GET    /v1/admin/me              → current admin profile
PUT    /v1/admin/password        → { currentPassword, newPassword }

POST   /v1/projects              → create project
PUT    /v1/projects/:id          → update project
PATCH  /v1/projects/:id/toggle   → toggle isActive
DELETE /v1/projects/:id          → delete project
POST   /v1/projects/:id/images   → upload images (multipart, field: images)
DELETE /v1/projects/:id/images   → delete image { imageKey }

POST   /v1/properties            → create property
PUT    /v1/properties/:id        → update property
PATCH  /v1/properties/:id/toggle → toggle isActive
DELETE /v1/properties/:id        → delete property
POST   /v1/properties/:id/images → upload images
DELETE /v1/properties/:id/images → delete image

GET    /v1/enquiries             → list (filters: status, source, search, page)
GET    /v1/enquiries/:id         → single enquiry
PATCH  /v1/enquiries/:id/status  → { status: NEW|CONTACTED|CLOSED }
PATCH  /v1/enquiries/:id/notes   → { notes }

GET    /v1/videos                → list all
POST   /v1/videos                → { title, youtubeUrl, description?, views?, duration?, publishedAt? }
PUT    /v1/videos/:id            → update video
PATCH  /v1/videos/:id/order      → { sortOrder }
DELETE /v1/videos/:id            → delete

PUT    /v1/settings              → { settings: [{ key, value }] }

POST   /v1/upload/image          → upload single image (multipart, field: image, body: folder)
```

### API Response Format
```json
// Success
{ "success": true, "message": "...", "data": {} }

// Paginated
{ "success": true, "message": "...", "data": [], "pagination": { "total": 0, "page": 1, "limit": 12, "totalPages": 0 } }

// Error
{ "success": false, "message": "Specific error message", "errors": [{ "field": "name", "message": "Name required." }] }
```

---

## 6. DATA MODELS

### Project
```typescript
{
  id: number, name: string, slug: string,
  location: string, sector?: string, city: string,
  bhkTypes: string,        // "2 BHK,3 BHK,4 BHK"
  priceMin: number,        // in Crores e.g. 1.85
  priceMax: number,
  status: 'UNDER_CONSTRUCTION' | 'READY_TO_MOVE' | 'NEW_LAUNCH',
  description?: string,
  highlights: string[],    // parsed from JSON
  amenities: string[],     // parsed from JSON
  images: string[],        // CDN URLs
  coverImage?: string,     // CDN URL
  reraNumber?: string, builderName?: string, totalUnits?: number,
  isActive: boolean, isFeatured: boolean,
  metaTitle?: string, metaDesc?: string,
  createdAt: string, updatedAt: string
}
```

### Property
```typescript
{
  id: number, name: string, slug: string,
  location: string, sector?: string, city: string,
  bhkType: string,         // "3 BHK"
  price: number,           // in Crores
  type: 'FLAT' | 'SHOP' | 'PLOT' | 'STUDIO_APARTMENT',
  status: 'UNDER_CONSTRUCTION' | 'READY_TO_MOVE' | 'NEW_LAUNCH',
  description?: string, highlights: string[], images: string[],
  coverImage?: string, carpetArea?: number, superArea?: number,
  floor?: number, totalFloors?: number,
  isActive: boolean, isFeatured: boolean,
  metaTitle?: string, metaDesc?: string,
  createdAt: string, updatedAt: string
}
```

### Video
```typescript
{
  id: number, title: string, youtubeUrl: string, youtubeId: string,
  description?: string, views?: string, duration?: string,
  publishedAt?: string, isActive: boolean, sortOrder: number
}
```

### SiteSettings (key-value map returned from /settings)
```typescript
{
  years_of_excellence: string, sqft_sold: string,
  inventory_sold_cr: string,   team_size: string,
  phone: string,               whatsapp: string,
  email: string,               office_hours: string,
  address_noida: string,       address_gzb: string,
  social_facebook: string,     social_instagram: string,
  social_linkedin: string,     social_youtube: string,
  social_whatsapp: string,     gtm_id: string,
  meta_pixel_id: string
}
```

---

## 7. FRONTEND — Next.js 14 (TypeScript)

### Setup Commands
```bash
cd /Users/ritisha/zenithestate/code
npx create-next-app@latest frontend \
  --typescript --tailwind --eslint --app \
  --no-src-dir --import-alias="@/*" --no-git --use-npm

cd frontend
npm install framer-motion lucide-react clsx tailwind-merge \
  class-variance-authority axios next-seo \
  react-hook-form @hookform/resolvers zod \
  @radix-ui/react-dialog @radix-ui/react-select \
  @radix-ui/react-toast @radix-ui/react-accordion \
  @radix-ui/react-tabs tailwindcss-animate
```

### Environment Variables (frontend/.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:5000/v1
NEXT_PUBLIC_CDN_URL=http://localhost:4566/zenith-estate-local-assets
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Folder Structure
```
frontend/
├── app/
│   ├── layout.tsx                    ← root layout, loads fonts, Toaster
│   ├── globals.css                   ← Tailwind + glass classes + fonts
│   ├── (public)/
│   │   ├── layout.tsx                ← Navbar + Footer + StickyWidget
│   │   ├── page.tsx                  ← Homepage
│   │   ├── projects/
│   │   │   ├── page.tsx              ← Projects listing (SSR + ISR)
│   │   │   └── [slug]/page.tsx       ← Project detail
│   │   ├── properties/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── about-us/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── budget/page.tsx           ← client-side calculator
│   │   ├── privacy/page.tsx          ← hardcoded
│   │   ├── disclaimer/page.tsx       ← hardcoded
│   │   └── terms/page.tsx            ← hardcoded
│   └── not-found.tsx
├── components/
│   ├── ui/                           ← shadcn primitives (Button, Input, Dialog, Toast etc.)
│   ├── common/
│   │   ├── Navbar.tsx                ← glass on scroll, mobile hamburger
│   │   ├── Footer.tsx                ← conditional social icons (hide if URL empty)
│   │   ├── StickyEnquiryWidget.tsx   ← floating form + WhatsApp + Call buttons
│   │   ├── ErrorBoundary.tsx         ← class component error boundary
│   │   ├── Loader.tsx                ← full page and inline loaders
│   │   └── PageHeader.tsx            ← reusable hero-style page header
│   └── features/
│       ├── home/
│       │   ├── HeroSection.tsx       ← full viewport, search bar, gradient bg
│       │   ├── AboutSection.tsx      ← stats from API settings
│       │   ├── PostPropertyCTA.tsx   ← 3-step CTA section
│       │   ├── VideoInsightsSection.tsx ← hidden if no videos
│       │   └── SeoFooterLinks.tsx    ← limited programmatic links
│       ├── projects/
│       │   ├── ProjectCard.tsx       ← glass card with status badge
│       │   ├── ProjectsClientPage.tsx ← filters + grid + pagination
│       │   └── ProjectDetailClient.tsx ← image gallery + enquiry form
│       └── properties/
│           ├── PropertyCard.tsx
│           ├── PropertiesClientPage.tsx
│           └── PropertyDetailClient.tsx
├── services/
│   ├── projectService.ts
│   ├── propertyService.ts
│   ├── enquiryService.ts
│   ├── videoService.ts
│   └── settingsService.ts
├── lib/
│   └── apiClient.ts                  ← axios instance, GET/POST/PUT/PATCH/DELETE wrappers
├── hooks/
│   ├── useToast.ts
│   └── useSettings.ts
├── constants/
│   ├── api.ts                        ← API_BASE_URL, all endpoint strings
│   ├── site.ts                       ← NAV_LINKS, FOOTER_LINKS, LOCATIONS, BHK_TYPES
│   └── budget.ts                     ← calculator config values
└── types/
    └── index.ts                      ← all TypeScript interfaces
```

### Key Rules for Frontend
- `revalidate = 60` on all server pages (ISR)
- All project/property data fetched from API — never hardcoded
- About, Privacy, Disclaimer, Terms content can be hardcoded
- Responsive: mobile + desktop on all public pages
- Every async action needs: loading state + toast feedback
- Error boundary wraps entire app
- Navbar goes glass (backdrop-blur) on scroll past 20px
- Footer social icons: only render icon if URL is not empty string
- Video section: entire section hidden if videos array is empty
- Cookie banner: NOT needed
- No login/auth flow on public site

### apiClient.ts pattern
```typescript
import axios from 'axios'
// Single axios instance with base URL
// Response interceptor: unwrap data, normalize errors to { message, errors, status }
// Export: get<T>, post<T>, put<T>, patch<T>, del<T>
```

### Price Display Format
```typescript
// priceMin/priceMax are in Crores
const fmt = (n: number) => n >= 1 ? `₹ ${n.toFixed(2)} Cr` : `₹ ${(n*100).toFixed(0)} L`
```

### Enquiry Sources (use these exact strings)
```
'hero' | 'project_detail' | 'property_detail' | 'sticky_widget' | 'contact_page'
```

---

## 8. ADMIN PORTAL — React + Vite (TypeScript)

### Setup Commands
```bash
cd /Users/ritisha/zenithestate/code
npm create vite@latest admin -- --template react-ts
cd admin
npm install
npm install react-router-dom axios lucide-react clsx tailwind-merge \
  class-variance-authority @radix-ui/react-dialog @radix-ui/react-select \
  @radix-ui/react-toast react-hook-form @hookform/resolvers zod \
  zustand react-dropzone tailwindcss-animate
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Environment Variables (admin/.env.local)
```
VITE_API_URL=http://localhost:5000/v1
```

### Folder Structure
```
admin/src/
├── App.tsx                           ← BrowserRouter + routes + ProtectedRoute
├── main.tsx
├── index.css                         ← Tailwind base
├── components/
│   ├── layout/
│   │   └── AdminLayout.tsx           ← sidebar nav + top bar + Outlet
│   └── ui/                           ← shadcn primitives
├── pages/
│   ├── LoginPage.tsx
│   ├── DashboardPage.tsx             ← stats cards (total projects, properties, enquiries)
│   ├── ProjectsPage.tsx              ← table + toggle active + delete + link to form
│   ├── ProjectFormPage.tsx           ← create/edit form with image upload
│   ├── PropertiesPage.tsx
│   ├── PropertyFormPage.tsx
│   ├── EnquiriesPage.tsx             ← table + status filter + detail modal + notes
│   ├── VideosPage.tsx                ← list + add/edit/delete YouTube videos
│   └── SettingsPage.tsx              ← grouped key-value settings form
├── store/
│   └── authStore.ts                  ← Zustand: admin, login(), logout(), fetchMe()
├── services/                         ← all API calls, one file per domain
├── lib/
│   └── apiClient.ts                  ← axios + Bearer token injection + 401 redirect
├── constants/
│   └── api.ts                        ← all admin API endpoint strings
└── types/
    └── index.ts
```

### Admin Rules
- Desktop only (no mobile responsive needed)
- JWT token stored in localStorage key: `zenith_admin_token`
- 401 response → auto redirect to /login
- Sidebar: primary-900 background, white text
- All tables have search + filter
- All forms have validation via Zod + React Hook Form
- Toast on every create/update/delete
- Image upload via drag-and-drop (react-dropzone) + POST /upload/image

### Admin Sidebar Navigation
```
Dashboard   → /dashboard
Projects    → /projects
Properties  → /properties
Enquiries   → /enquiries
Videos      → /videos
Settings    → /settings
```

---

## 9. INFRASTRUCTURE — Terraform

### Overview
```
Local:  Docker Compose (MySQL + LocalStack S3)
Prod:   AWS ap-south-1 (Mumbai)
```

### AWS Services Used
| Service | Purpose |
|---|---|
| EC2 t3.small | Backend (Express.js + PM2 + Nginx) |
| EC2 t3.small | Frontend (Next.js + PM2 + Nginx) |
| RDS db.t3.micro | MySQL 8.0 (private subnet) |
| S3 | Asset storage (images, private) |
| S3 | Admin portal static hosting (private) |
| CloudFront | CDN for assets → cdn.zenithestate.in |
| CloudFront | Admin portal → admin.zenithestate.in |
| ACM | SSL certificate (manually issued) |
| Secrets Manager | DB password + JWT secret |
| VPC | 2 public + 2 private subnets |
| NAT Gateway | Private subnet internet access |

### Subdomains
```
zenithestate.in          → EC2 Frontend (Next.js)
api.zenithestate.in      → EC2 Backend (Express)
admin.zenithestate.in    → CloudFront → S3 (React build)
cdn.zenithestate.in      → CloudFront → S3 (assets)
```

### DNS
- GoDaddy manages DNS (manual CNAME/A records pointing to AWS)
- ACM certificate issued manually in AWS console
- No Route53 needed

### Terraform Folder Structure
```
infra/
├── environments/
│   ├── local/
│   │   └── docker-compose.yml        ← MySQL + LocalStack
│   └── prod/
│       ├── main.tf                   ← wires all modules
│       ├── variables.tf
│       ├── outputs.tf
│       └── terraform.tfvars.example  ← example vars (never commit real values)
└── modules/
    ├── vpc/
    │   ├── main.tf                   ← VPC, 2 public + 2 private subnets, IGW, NAT
    │   ├── variables.tf
    │   └── outputs.tf
    ├── ec2/
    │   ├── main.tf                   ← EC2, SG, EIP, IAM role, Nginx + PM2 user_data
    │   ├── variables.tf
    │   └── outputs.tf
    ├── rds/
    │   ├── main.tf                   ← RDS MySQL 8.0, private subnet, encrypted
    │   ├── variables.tf
    │   └── outputs.tf
    ├── s3/
    │   ├── main.tf                   ← private S3 for assets, versioning, encryption
    │   ├── variables.tf
    │   └── outputs.tf
    ├── s3_admin/
    │   ├── main.tf                   ← private S3 + CloudFront for admin SPA
    │   ├── variables.tf              ← SPA routing: 403/404 → index.html
    │   └── outputs.tf
    ├── cloudfront/
    │   ├── main.tf                   ← CloudFront for assets CDN with OAI
    │   ├── variables.tf
    │   └── outputs.tf
    └── secrets/
        ├── main.tf                   ← Secrets Manager for db_password + jwt_secret
        ├── variables.tf
        └── outputs.tf
```

### Terraform Variables (prod)
```hcl
aws_region    = "ap-south-1"
env           = "prod"
project       = "zenith-estate"
domain        = "zenithestate.in"
vpc_cidr      = "10.0.0.0/16"
db_name       = "zenith_estate"
db_username   = "zenith_user"
db_password   = "PROD_PASSWORD"       # sensitive
jwt_secret    = "PROD_JWT_SECRET"     # sensitive
acm_cert_arn  = "arn:aws:acm:..."     # from AWS console
cdn_domain    = "cdn.zenithestate.in"
key_pair_name = "zenith-estate-key"   # EC2 SSH key pair name
```

### EC2 User Data (both instances — Nginx + Node setup)
```bash
#!/bin/bash
yum update -y
curl -fsSL https://rpm.nodesource.com/setup_20.x | bash -
yum install -y nodejs git nginx
npm install -g pm2
# Nginx configured as reverse proxy to app port
systemctl enable nginx && systemctl start nginx
```

### Deploy Scripts
```bash
# Admin portal (S3 + CloudFront invalidation)
scripts/deploy-admin.sh

# Backend (SSH + git pull + pm2 reload)
scripts/deploy-backend.sh

# Frontend (SSH + git pull + npm build + pm2 reload)
scripts/deploy-frontend.sh
```

---

## 10. CODING STANDARDS

### General Rules
- NO hardcoded strings, URLs, numbers → use constants/config files
- NO console.log → use logger (Winston on backend)
- All env vars loaded from .env files, never inline
- Every file has a single responsibility
- Components small and reusable

### Backend Architecture (STRICT — no cross-layer calls)
```
Request → Router → Middleware → Controller → Service → DataProvider → Database
```
- Router: route definitions only, no logic
- Middleware: auth, validation, error handling
- Controller: req/res only, calls one service method, returns response
- Service: all business logic, can call other services
- DataProvider: Prisma queries only, no business logic
- Controllers NEVER import Prisma directly
- Routers NEVER call services directly

### Frontend Architecture
```
Page (data fetch) → Layout → Feature Component → UI Component → Service → apiClient
```
- All API calls via `services/` layer
- Services use `lib/apiClient.ts` wrappers (get/post/put/patch/del)
- Never call axios directly from components
- All props typed with TypeScript interfaces
- Use `'use client'` only when needed (forms, animations, browser APIs)

### Error Handling
- Backend: specific HTTP status codes, specific error messages, no generic "something went wrong" in dev
- Frontend: try/catch on every async, toast on error, loading state on every button
- Error boundary: wraps entire app, shows friendly fallback UI

### HTTP Status Codes Used
```
200 OK, 201 Created, 204 No Content
400 Bad Request, 401 Unauthorized, 403 Forbidden
404 Not Found, 409 Conflict, 422 Unprocessable
500 Internal Server Error
```

---

## 11. ENVIRONMENT SUMMARY

### Local
```
Frontend  → http://localhost:3000
Admin     → http://localhost:5173
Backend   → http://localhost:5000
MySQL     → localhost:3306 (zenith_user / Zenith@12345)
S3        → LocalStack http://localhost:4566 (if needed)
```

### Production
```
Frontend  → https://zenithestate.in         (EC2 t3.small)
Admin     → https://admin.zenithestate.in   (S3 + CloudFront)
Backend   → https://api.zenithestate.in     (EC2 t3.small)
CDN       → https://cdn.zenithestate.in     (S3 + CloudFront)
DB        → RDS MySQL (private subnet)
```

---

## 12. WHAT TO BUILD NOW

**Priority order:**

1. **Frontend** (`/code/frontend`)
   - Run setup commands above
   - Create all files in folder structure above
   - Start with: layout → Navbar → Footer → StickyWidget → Homepage → Projects → Properties → other pages

2. **Admin** (`/code/admin`)
   - Run setup commands above
   - Create all files in folder structure above
   - Start with: apiClient → authStore → App.tsx → AdminLayout → LoginPage → all pages

3. **Infra** (`/infra`)
   - Create all Terraform modules with separate main.tf, variables.tf, outputs.tf
   - Create docker-compose.yml for local
   - Create deploy scripts

**Do NOT touch `/code/backend` — it is complete and running.**

---

## 13. SEEDED DATA (available in DB)

### Admin
- Email: `admin@zenithestate.in`
- Password: `admin@zenith2024`

### Projects
1. Zenith Sky Residences — Sector 150, Noida — 3&4 BHK — ₹1.85–3.20 Cr — READY_TO_MOVE — Featured
2. Zenith Green Valley — Greater Noida West — 2&3 BHK — ₹0.85–1.45 Cr — UNDER_CONSTRUCTION — Featured

### Settings seeded
All keys seeded with default values (phone, email, address, social URLs, stats etc.)
