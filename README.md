
---

# 📘 **Gym Membership Management App**

A modern gym management system built with **Next.js 15** and **Supabase**.
Proyek ini dirancang untuk menunjukkan kemampuan **full-stack engineering**, **clean architecture**, dan **business understanding** yang relevan untuk kebutuhan perusahaan teknologi modern.

---

## 🚀 **Overview**

Aplikasi ini bertujuan untuk membantu pemilik gym mengelola:

* Membership pelanggan
* Workout program
* Progress tracking (berat badan, BMI, dan progress latihan)
* Dashboard analitik untuk admin

Dibangun dengan fokus pada:

* **Scalability**
* **Security (RLS Supabase)**
* **Clean UI**
* **Production-readiness**

---

# 🎯 **Key Features**

### 👤 **Admin User & Authentication**

* Login & Register via Supabase Auth
* Role-based access: **admin** & **member**

### 🧾 **Membership Management**

* Admin: CRUD membership plans
* Member: beli / perpanjang membership
* Riwayat transaksi
* Membership status (active / expired)

### 🏋️ **Workout Program**

* Daftar program latihan (beginner → advanced)
* Member dapat melakukan progress tracking

### 📊 **Admin Dashboard**

* Income analytics
* Active vs expired members
* Membership growth chart
* Member workout progress

---

# 🏗️ **Tech Stack**

### **Frontend**

* Next.js 15 (App Router)
* Tailwind CSS + shadcn/ui
* React Server Components
* Server Actions
* Zustand (optional)
* React Query (optional)

### **Backend**

* Supabase (Postgres, Auth, RLS)
* Supabase Edge Functions (QR code validity)
* Supabase Storage (foto member / docs)

### **Tools**

* Chart.js / Recharts
* TypeScript
* Vercel (deployment)

---

# 🗂️ **Project Structure**

```
src/
 ├─ app/
 │   ├─ dashboard/
 │   ├─ membership/
 │   ├─ checkin/
 │   ├─ api/
 │   └─ layout.tsx
 ├─ components/
 ├─ hooks/
 ├─ lib/
 ├─ types/
 └─ utils/
```

---

# 🧩 **Database Schema (ERD)**

### **members**

```sql
id (uuid)
email
full_name
role (admin/member)
created_at
```

### **membership_plans**

```sql
id (int)
name
price
duration_days
description
created_at
```

### **memberships**

```sql
id (uuid)
member_id (fk)
plan_id (fk)
start_date
end_date
status (active/expired)
payment_method
created_at
```

### **check_in_logs**

```sql
id (uuid)
member_id
check_in_time
device
check_in_method
```

### **workout_programs**

```sql
id
title
description
level
created_at
```

### **workout_progress**

```sql
id
member_id
program_id
date
progress_note
completed
```

### **member_metrics**

```sql
id
member_id
weight
height
bmi
date_recorded
```

---

# 🔐 **Security**

Proyek ini menggunakan:

### ✔ Row Level Security (RLS)

* Member hanya bisa melihat data miliknya sendiri
* Admin dapat melihat semua data
* Policies di Supabase dijaga ketat untuk tabel:

  * `memberships`
  * `member_metrics`


---

# 📈 **Business Value**

Proyek ini dirancang untuk melatih:

* Sistem berlangganan (SaaS-like)
* Payment flow
* Dashboard analytics
* Role-based system
* Real-world gym operations workflow

Menunjukkan kemampuan engineering pada skala production:

* Security
* Scalability
* Database modelling
* API contracts
* Cloud deployment

---

# ▶️ **Running the Project Locally**

## **1. Clone**

```bash
git clone https://github.com/yourusername/gym-app
cd gym-app
```

## **2. Install dependencies**

```bash
npm install
```

## **3. Setup environment variables**

Buat file `.env.local`

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

## **4. Run the app**

```bash
npm run dev
```

---

# ☁️ **Deployment (Vercel)**

* Commit ke GitHub
* Klik “Deploy to Vercel”
* Masukkan env vars Supabase
* Selesai

Vercel + Next.js + Supabase otomatis siap production.

---

# 📝 **Roadmap**

### Phase 1 (Core MVP)

* Auth
* Membership CRUD
* Buy membership
* Admin dashboard basic

### Phase 2 (Gym Operations)


### Phase 3 (Member Features)

* Workout program
* Progress tracking
* BMI metrics

---

# 🌟 **Screenshots (Optional)**

Tambahkan nanti setelah UI selesai.

---

# 🤝 **Contributing**

Proyek ini dibuat untuk demonstrasi skill.
Terbuka untuk kontribusi, PR, dan masukan.

---

# 🎨 **Color Guidelines**

## Primary Colors

- **Brand Color**: `#d6fb00` - Used for primary buttons, highlights, and brand elements
- **Brand Hover**: `#c2ea00` - Hover state for brand-colored elements
- **Brand Dark**: `#a8d400` - Darker shade for active states and depth

## Background Colors

- **Dark Background**: `#0f0f0f` - Primary page background (abu tua/dark gray)
- **Secondary Background**: To be defined based on UI needs

## Text Colors

- **Primary Text**: `#ffffff` - Main content text on dark backgrounds
- **Secondary Text**: `rgba(255, 255, 255, 0.75)` - Secondary text like navigation links
- **Hover Text**: `#ffffff` - Text color on hover states

## Accent Colors

- **Social Hover**: `#22c55e` (green-500) - Used for social media links on hover
- **Border Color**: `#d6fb00` - Brand-colored borders for important elements

## Usage Guidelines

### Buttons & Interactive Elements
- Primary buttons: `--brand` background color
- Button hover: `--brand-hover` background color
- Button active: `--brand-dark` background color

### Navigation
- Unselected navigation links: Secondary text color (`rgba(255, 255, 255, 0.75)`)
- Selected/hovered navigation links: White text with brand-colored underline effect
- Navigation underline: `#d6fb00` color with transition effect

### General Styling
- All transitions use 0.2s ease for background-color and color properties
- Brand color (`#d6fb00`) is used consistently for highlighting important elements

---

# 📄 **License**

MIT License

---

