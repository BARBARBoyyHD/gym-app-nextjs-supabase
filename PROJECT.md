# 🏋️‍♂️ Gym Membership Management App - Project Documentation

## 📋 Table of Contents
- [Project Overview](#project-overview)
- [Technology Stack](#technology-stack)
- [Color Guidelines](#color-guidelines)
- [Design System](#design-system)
- [Component Architecture](#component-architecture)
- [Development Guidelines](#development-guidelines)
- [Deployment Process](#deployment-process)

---

## 📖 Project Overview

This is a modern gym membership management application built with cutting-edge technologies to provide a complete solution for gym operations. The application features user authentication, membership management, QR code check-in system, workout tracking, and admin analytics.

### Core Objectives
- Enable gym owners to efficiently manage memberships
- Provide a seamless check-in experience for members
- Track workout progress and user metrics
- Deliver analytics and insights for business decisions

---

## 🛠️ Technology Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Reusable UI components
- **Poppins Font** - Primary font family

### Backend
- **Supabase** - Backend-as-a-Service (PostgreSQL, Authentication, RLS)
- **Supabase Edge Functions** - Serverless functions for QR validation
- **Supabase Storage** - File storage for member photos and documents

### Tools & Libraries
- **ESLint & Prettier** - Code linting and formatting
- **React Query** - Client state management (optional)
- **Zustand** - State management (optional)
- **Chart.js/Recharts** - Data visualization
- **QR Code Generator** - QR code creation for check-ins

---

## 🎨 Color Guidelines

### Primary Brand Colors
- **Brand Primary**: `#d6fb00` (Lime Green)
  - Used for: Primary buttons, call-to-action elements, brand highlights
  - CSS Variable: `--brand`
- **Brand Hover**: `#c2ea00` (Darker Lime Green)
  - Used for: Hover states of brand-colored elements
  - CSS Variable: `--brand-hover`
- **Brand Active**: `#a8d400` (Even Darker Lime Green)
  - Used for: Active states, pressed buttons
  - CSS Variable: `--brand-dark`

### Background Colors
- **Primary Background**: `#0f0f0f` (Dark Gray/Black)
  - Used for: Main page background, consistent dark theme
  - CSS Variable: `--background-dark`
- **Card Background**: `#1a1a1a` (Slightly Lighter Gray)
  - Used for: Cards, containers, UI elements against primary background
- **Secondary Background**: `#222222` (Medium Gray)
  - Used for: Secondary containers, subtle UI elements

### Text Colors
- **Primary Text**: `#ffffff` (Pure White)
  - Used for: Main content, important information
- **Secondary Text**: `rgba(255, 255, 255, 0.75)` (Semi-transparent White)
  - Used for: Secondary information, navigation links
- **Disabled Text**: `rgba(255, 255, 255, 0.5)` (More Transparent White)
  - Used for: Disabled elements, placeholder text

### Semantic Colors
- **Success**: `#22c55e` (Green)
  - Used for: Success messages, positive feedback
- **Warning**: `#f59e0b` (Amber)
  - Used for: Warning messages, attention-required elements
- **Error**: `#ef4444` (Red)
  - Used for: Error messages, destructive actions
- **Info**: `#3b82f6` (Blue)
  - Used for: Informational messages, help text

### Status Colors
- **Active Membership**: `#22c55e` (Green)
  - Used for: Active membership indicators
- **Inactive/Expired**: `#ef4444` (Red)
  - Used for: Expired memberships, inactive statuses
- **Pending**: `#f59e0b` (Amber)
  - Used for: Pending actions, temporary states

### Accent Colors
- **Social Media Hover**: `#22c55e` (Green-500)
  - Used for: Hover effects on social media links
- **Border Highlight**: `#d6fb00` (Brand Color)
  - Used for: Important borders, dividers, focus states

---

## 🎨 Design System

### Typography
- **Primary Font**: Poppins
  - Used for: Headings, body text, UI elements
  - Available weights: 400, 500, 600, 700
- **Alternative Font**: System font stack as fallback

### Spacing Scale
- **Base Unit**: 4px
- **Scale**: 0, 1 (4px), 2 (8px), 3 (12px), 4 (16px), 5 (20px), 6 (24px), 8 (32px), 10 (40px), 12 (48px), 16 (64px), 20 (80px), 24 (96px)

### Component States
- **Normal**: Default appearance
- **Hover**: Slight color/intensity change, 0.3s transition
- **Focus**: Brand-colored outline for accessibility
- **Active**: Pressed state with darker color
- **Disabled**: Reduced opacity (0.5), no interaction

### Elevation
- **Flat**: No shadow, flush with background
- **Card**: `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)`
- **Modal**: `0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)`
- **Dropdown**: `0 5px 10px rgba(0, 0, 0, 0.12)`

---

## 🧱 Component Architecture

### Layout Components
- `Navbar` - Navigation bar with responsive mobile menu
- `Footer` - Site footer with social links and information
- `Sidebar` - Navigation sidebar for admin sections

### UI Components
- `Button` - Various button styles (primary, secondary, outline, ghost)
- `Card` - Content containers with optional headers and footers
- `Input` - Form inputs with validation states
- `Table` - Data tables with sorting and pagination
- `Modal` - Overlay dialogs for important interactions
- `Alert` - Notification messages with different severities

### Feature Components
- `AuthForm` - Login and registration forms
- `MembershipCard` - Display membership information
- `QRScanner` - QR code scanning interface
- `ProgressChart` - Visualize workout progress
- `DashboardCard` - Admin dashboard data visualization

---

## 🧪 Development Guidelines

### Code Standards
- Use TypeScript for type safety
- Follow ESLint and Prettier formatting rules
- Write JSDoc comments for functions and components
- Keep component files small and focused (single responsibility)

### Testing
- Write unit tests for business logic
- Create integration tests for API endpoints
- Perform end-to-end tests for critical user flows
- Maintain test coverage above 80% where possible

### Accessibility
- Ensure proper contrast ratios (minimum 4.5:1)
- Use semantic HTML elements
- Implement keyboard navigation support
- Add ARIA attributes where necessary

### Performance
- Optimize images and assets
- Implement lazy loading for components below the fold
- Use React.memo for components that render frequently
- Minimize bundle size with code splitting

---

## ☁️ Deployment Process

### Environment Configuration
- Production: Vercel deployment with automatic builds
- Staging: Deployed from `staging` branch to preview environment
- Development: Local Node.js server with hot reloading

### Database Migration
- Use Supabase's migration system
- Create new migration files for schema changes
- Test migrations on local and staging environments first

### CI/CD Pipeline
1. Code pushed to repository
2. Automated tests run in CI environment
3. Successful builds deployed to preview environment
4. Manual approval for production deployment
5. Post-deployment checks verify application health

---

## 📊 Project Status

### Current Phase
- Core infrastructure and authentication system setup
- Working on membership management features
- Planning QR check-in system implementation

### Upcoming Milestones
1. Complete membership purchase flow
2. Implement QR check-in functionality
3. Develop workout tracking features
4. Create comprehensive admin dashboard
5. Add advanced analytics and reporting