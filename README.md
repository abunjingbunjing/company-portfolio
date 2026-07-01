# Practical Exam for SearchWorksPH (Headless CMS)

# Default Admin Account (For documentation/test purposes only) *for sir oliver only

Email

```
admin@example.com
```

Password

```
julian123
```

## Technologies Used

### Frontend

- Next.js 16
- React
- Tailwind CSS
- Lucide React

### Backend

- Express.js
- Prisma ORM
- PostgreSQL
- JWT Authentication
- Multer (Image Uploads)

### Deployment

Frontend: Vercel
Backend: Railway
Database: PostgreSQL

---

# Features

## Public Website

- Homepage
- About
- Services
- Case Studies
- Working Process
- Team Members
- Testimonials
- Contact Form
- Smooth scrolling navigation

## Admin Dashboard

Secure Login

Manage:

- Services
- Case Studies
- Working Process
- Team Members
- Testimonials
- Contact Submissions

Image Uploads

- Team member photos

Authentication

- JWT Cookies
- Protected Admin Routes

---

# Installation

## 1. Clone Repository

```bash
git clone https://github.com/abunjingbunjing/company-portfolio.git
```

or unzip the provided project.

---

## 2. Install Frontend

```bash
cd frontend
npm install
```

---

## 3. Install Backend

```bash
cd backend
npm install
```

---

# Environment Variables

## Backend (.env) for documentation purposes *only for sir oliver

```env
DATABASE_URL="postgresql://postgres:admin123@localhost:5432/portfolio_cms_dev"
JWT_SECRET=JWT_SECRET="a89729d47d6d3ad81fa36c55fe7b696e8e306781dec12266a48c2ee9f207d256ef62d42be049e1b28a9ddde86975a597c8ec23c529c3fdc2bf36ada4de0f0ff9"

PORT=4000
```

---

## Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api

NEXT_PUBLIC_BACKEND_URL=http://localhost:4000
```

---

# Database Setup

Run migrations

```bash
npx prisma migrate deploy
```

or

```bash
npx prisma migrate dev
```

Seed database

```bash
node src/scripts/seed.js
```

---

# Run Development Server

Backend

```bash
npm run dev
```

Runs on

```
http://localhost:4000
```

Frontend

```bash
npm run dev
```

Runs on

```
http://localhost:3000
```

---

# API Endpoints

Authentication

```
POST /api/auth/login
POST /api/auth/logout
GET /api/auth/me
```

Services

```
GET /api/services
POST /api/services
PUT /api/services/:id
DELETE /api/services/:id
```

Case Studies

```
GET /api/case-studies
...
```

Working Process

```
GET /api/working-process
...
```

Team Members

```
GET /api/team
POST /api/team/upload
...
```

Testimonials

```
GET /api/testimonials
...
```

Contact

```
POST /api/contact
GET /api/contact
```

---

# Deployment

Frontend

Vercel

Backend

Railway

Database

Railway PostgreSQL

---

# Author

Julian Miguel Roxas

Holy Angel University

Computer Science
