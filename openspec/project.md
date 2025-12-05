# 📌 Project Context — Gym Membership Management App

---

## Purpose
Gym Membership Management App is a modern full-stack application for managing gym memberships, QR check-in systems, workout programs, and user progress tracking. The platform allows gym administrators to manage members, create membership packages, monitor check-ins, and track user progress. Members can purchase memberships, check in using QR codes, and track their fitness progress.

**Engineering Goals:**
- Build a production-ready full-stack application with Next.js 16 and Supabase
- Implement secure authentication and role-based access control
- Design scalable database architecture with RLS (Row Level Security)
- Create clean, modern UI with responsive design

**Business Goals:**
- Demonstrate ability to build a SaaS application with real-world business logic
- Show experience in database design and security best practices
- Create a portfolio project that showcases full-stack development skills

---

## Tech Stack

**Frontend**
- Next.js 16 (App Router)
- React 19.2.0
- TypeScript 5+ (strict mode)
- Tailwind CSS v4
- React Server Components
- Server Actions
- Shadcn/ui components (optional)
- React Hook Form + Zod (form validation)
- SWR / React Query (data fetching, optional)

**Backend / Data**
- Supabase (PostgreSQL database)
- Supabase Auth (authentication & user management)
- Supabase RLS (Row Level Security)
- Supabase Storage (optional: for images/documents)
- Supabase Edge Functions (QR code validation)

**UI Libraries & Tools**
- Geist Font (Google Fonts)
- Chart.js / Recharts (analytics dashboards)
- QR Code Generator (for check-in system)

**Development & Build Tools**
- ESLint (Next.js recommended config + TypeScript)
- Prettier (default config)
- TypeScript path aliases (`@/*` maps to `./src/*`)

**Infra & Deployment**
- Vercel (frontend hosting with Next.js optimization)
- Supabase (backend services: database, auth, storage)
- Environment-specific configurations

---

## Project Conventions

### Code Style
- TypeScript strict mode enabled (all optional values are nullable)
- Functional components only (no class components)
- Folder-by-feature architecture rather than folder-by-type
- Naming conventions:
  - Components: `PascalCase` (e.g., `MemberDashboard.tsx`)
  - Files & folders: `kebab-case` (e.g., `membership-plans`)
  - Database tables: `snake_case` (e.g., `membership_plans`)
  - Environment variables: `NEXT_PUBLIC_*` for client-side, `SUPABASE_*` for Supabase-specific

### Formatting
- Prettier with default configuration
- ESLint with Next.js recommended + TypeScript rules
- No explicit `any` types (use proper TypeScript typing)
- Prefer named exports over default exports for components (except for Next.js pages)
- Use TypeScript path aliases: `@/*` maps to `./src/*`

### File Structure
```
src/
 ├─ app/                 # Next.js App Router pages
 │   ├─ api/            # API routes
 │   ├─ dashboard/      # Admin dashboard pages
 │   ├─ membership/     # Membership-related pages
 │   ├─ checkin/        # QR check-in pages
 │   ├─ layout.tsx      # Root layout
 │   └─ page.tsx        # Homepage
 ├─ components/         # Reusable React components
 ├─ hooks/              # Custom React hooks
 ├─ lib/                # Shared utilities and business logic
 ├─ types/              # TypeScript type definitions
 └─ utils/              # Utility functions
```

### Architecture Patterns

✔ **Server Components First**: Use React Server Components by default, Client Components only when interactivity is needed

✔ **Server Actions for Data Mutations**: Use Next.js Server Actions for form submissions and data mutations

✔ **Supabase RLS for Security**: Implement Row Level Security for database access control

✔ **Environment-Specific Configuration**: Securely manage environment variables with Next.js

✔ **Type Safety Throughout**: Strict TypeScript typing for all components and functions

✔ **Component Composition**: Build reusable UI components with clear interfaces

**High-level architecture:**

┌─ Frontend ──────────────────┐    ┌─ Backend ──────────────────┐
│                              │    │                             │
│  Next.js App Router          │◄──►│  Supabase (PostgreSQL)     │
│  React Server Components     │    │  Supabase Auth             │
│  Tailwind CSS Styling        │    │  Supabase RLS              │
│  Server Actions              │    │  Supabase Storage          │
│  API Routes                  │    │  Supabase Edge Functions   │
│                              │    │                             │
└──────────────────────────────┘    └─────────────────────────────┘
         │                                      │
         ▼                                      ▼
┌─ Deployment ──────────────────┐    ┌─ Analytics ───────────────┐
│                              │    │                             │
│  Vercel (Frontend)           │    │  Check-in analytics        │
│  Supabase Hosting (Backend)  │    │  Membership analytics      │
│                              │    │  Revenue & growth metrics  │
└──────────────────────────────┘    └─────────────────────────────┘
